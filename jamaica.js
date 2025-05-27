
const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");

// تحميل جميع الأوامر من مجلد commands (يشمل مجلدات فرعية)
function loadCommands(dir, commands = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      loadCommands(filePath, commands); // لو مجلد داخلي
    } else if (file.endsWith(".js")) {
      const cmd = require(filePath);
      if (cmd.name && typeof cmd.run === "function") {
        commands[cmd.name] = cmd.run;
      }
    }
  }
  return commands;
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: true
  });

  // تحميل الأوامر
  const commands = loadCommands(path.join(__dirname, "commands"));

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message)[0];
    const body = msg.message[type]?.text || msg.message.conversation || "";

    const prefix = ".";
    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands[commandName]) {
      try {
        await commands[commandName](sock, msg, args);
      } catch (err) {
        console.error("خطأ في تنفيذ الأمر:", err);
        await sock.sendMessage(from, { text: "حصل خطأ أثناء تنفيذ الأمر." });
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "close") {
      console.log("تم قطع الاتصال. إعادة الاتصال...");
      startBot();
    }
  });
}

startBot();
