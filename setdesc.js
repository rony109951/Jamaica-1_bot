module.exports = {
  name: "وصف",
  description: "تغيير وصف الجروب",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ فقط المشرفين يمكنهم تعديل الوصف" }, { quoted: msg });
    }

    const description = args.join(" ");
    if (!description) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❗ اكتب الوصف الجديد بعد الأمر" }, { quoted: msg });
    }

    await sock.groupUpdateDescription(msg.key.remoteJid, description);
    return sock.sendMessage(msg.key.remoteJid, { text: "✅ تم تحديث الوصف" }, { quoted: msg });
  }
};