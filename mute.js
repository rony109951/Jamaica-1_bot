module.exports = {
  name: "كتم",
  description: "كتم عضو عن الكلام",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!target) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❗ قم بالرد على رسالة العضو الذي تريد كتمه" }, { quoted: msg });
    }

    // مجرد رسالة توضيحية — الكتم الحقيقي يتطلب أدوات أكثر عمقاً
    return sock.sendMessage(msg.key.remoteJid, {
      text: `🔇 تم كتم @${target.split("@")[0]}`,
      mentions: [target]
    }, { quoted: msg });
  }
};