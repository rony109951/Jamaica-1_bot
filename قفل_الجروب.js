module.exports = {
  name: "قفل",
  description: "قفل الجروب للرسائل (للمشرفين فقط)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    await sock.groupSettingUpdate(jid, "announcement");
    return sock.sendMessage(jid, { text: "🔒 تم قفل الجروب، فقط المشرفين يمكنهم الإرسال." }, { quoted: msg });
  }
};