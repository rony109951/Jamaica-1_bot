const { enableWelcome, disableWelcome, isWelcomeEnabled } = require("../../handlers/groupHandler");

module.exports = {
  name: "ترحيب",
  description: "تفعيل أو تعطيل الترحيب في الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    const subCmd = args[0];
    if (subCmd === "تفعيل") {
      enableWelcome(jid);
      return sock.sendMessage(jid, { text: "✅ تم تفعيل الترحيب" }, { quoted: msg });
    }

    if (subCmd === "تعطيل") {
      disableWelcome(jid);
      return sock.sendMessage(jid, { text: "🛑 تم تعطيل الترحيب" }, { quoted: msg });
    }

    return sock.sendMessage(jid, {
      text: "استخدم: /ترحيب تفعيل أو /ترحيب تعطيل"
    }, { quoted: msg });
  }
};