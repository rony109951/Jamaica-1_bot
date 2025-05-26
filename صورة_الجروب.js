module.exports = {
  name: "صورة",
  description: "تغيير صورة الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    const image = msg.message?.imageMessage;
    if (!image) {
      return sock.sendMessage(jid, { text: "📸 من فضلك أرسل صورة مع الأمر." }, { quoted: msg });
    }

    const buffer = await sock.downloadMediaMessage(msg);
    await sock.updateProfilePicture(jid, buffer);
    return sock.sendMessage(jid, { text: "✅ تم تغيير صورة الجروب." }, { quoted: msg });
  }
};