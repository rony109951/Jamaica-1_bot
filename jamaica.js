const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const { onMessage } = require("./handlers/messageHandler");
const { onParticipantAdd, onParticipantRemove } = require("./handlers/groupHandler");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startBot();
      } else {
        console.log("تم تسجيل الخروج، امسح مجلد auth_info وسجّل دخول جديد.");
      }
    } else if (connection === "open") {
      console.log("بوت اسبيدو شغال دلوقتي...");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    onMessage(sock, msg);
  });

  sock.ev.on("group-participants.update", async (update) => {
    const metadata = await sock.groupMetadata(update.id);
    for (const participant of update.participants) {
      if (update.action === "add") {
        await onParticipantAdd(sock, participant, metadata);
      } else if (update.action === "remove") {
        await onParticipantRemove(sock, participant, metadata);
      }
    }
  });
}

startBot();