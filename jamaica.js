// jamaica.js - الملف الرئيسي لتشغيل البوت

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore } = require("@whiskeysockets/baileys"); const { Boom } = require("@hapi/boom"); const pino = require("pino"); const fs = require("fs"); const path = require("path");

// إعدادات التخزين const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) }); store.readFromFile("./baileys_store.json"); setInterval(() => { store.writeToFile("./baileys_store.json"); }, 10_000);

// إعداد الاتصال async function startBot() { const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys"); const sock = makeWASocket({ logger: pino({ level: "silent" }), printQRInTerminal: true, auth: state, browser: ["JamaicaBot", "Safari", "1.0.0"], syncFullHistory: true });

store.bind(sock.ev);

sock.ev.on("connection.update", async (update) => { const { connection, lastDisconnect } = update; if (connection === "close") { const shouldReconnect = lastDisconnect.error instanceof Boom && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut; if (shouldReconnect) { startBot(); } } else if (connection === "open") { console.log("[BOT] Bot connected successfully"); } });

sock.ev.on("creds.update", saveCreds);

// تحميل ومعالجة الرسائل sock.ev.on("messages.upsert", async (m) => { if (!m.messages || !m.messages[0]) return; const msg = m.messages[0]; if (msg.key && msg.key.remoteJid === "status@broadcast") return; if (!msg.message) return;

try {
  const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith(".js") && file !== "jamaica.js");
  for (const file of commandFiles) {
    const filePath = path.join(__dirname, file);
    try {
      const command = require(filePath);
      if (typeof command ===  function ) {
        await command(sock, msg);
      }
    } catch (err) {
      console.error("[ERROR] في الملف:", file, err.message);
    }
  }
} catch (err) {
  console.error("[ERROR] أثناء معالجة الأوامر:", err);
}

}); }

startBot();

