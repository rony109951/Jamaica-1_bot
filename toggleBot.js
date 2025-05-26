// commands/developer/toggleBot.js

const config = require("../../config/config");

module.exports = {
  name: "قفل_البوت",
  description: "قفل أو فتح البوت مؤقتًا (للمطور فقط)",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر للمطور فقط." }, { quoted: msg });
    }

    config.botActive = !config.botActive;

    const status = config.botActive ? "✅ تم تفعيل البوت." : "⛔ تم إيقاف البوت مؤقتًا.";
    await sock.sendMessage(msg.key.remoteJid, { text: status }, { quoted: msg });
  }
};