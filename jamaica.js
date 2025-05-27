
// jamaica.js - الملف الرئيسي لتشغيل البوت

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const fs = require("fs");
const path = require("path");

// استيراد ملف معالجة الرسائل من مجلد handlers
const messageHandler = require( ./handlers/messageHandler );

// إعدادات التخزين
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
store.readFromFile("./baileys_store.json");
setInterval(() => {
  store.writeToFile("./baileys_store.json");
}, 10_000);

// إعداد الاتصال
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
    browser: ["JamaicaBot", "Safari", "1.0.0"],
    syncFullHistory: true,
  });

  store.bind(sock.ev);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = lastDisconnect.error instanceof Boom && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("[BOT] Bot connected successfully");
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // تحميل ومعالجة الرسائل باستخدام messageHandler
  sock.ev.on("messages.upsert", async (m) => {
    if (!m.messages || !m.messages[0]) return;
    const msg = m.messages[0];
    if (msg.key && msg.key.remoteJid === "status@broadcast") return;
    if (!msg.message) return;

    try {
      await messageHandler(sock, msg);
    } catch (err) {
      console.error("[ERROR] أثناء معالجة الرسالة:", err);
    }
  });
}

startBot();
