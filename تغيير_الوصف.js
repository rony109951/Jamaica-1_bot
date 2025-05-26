module.exports = {
  name: "وصف",
  description: "تغيير وصف الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const description = args.join(" ");

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    if (!description) {
      return sock.sendMessage(jid, { text: "❗ اكتب الوصف الجديد بعد الأمر" }, { quoted: msg });
    }

    await sock.groupUpdateDescription(jid, description);
    return sock.sendMessage(jid, { text: "✏️ تم تحديث وصف الجروب." }, { quoted: msg });
  }
};