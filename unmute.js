module.exports = {
  name: "فك_كتم",
  description: "فك كتم العضو",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!target) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❗ قم بالرد على رسالة العضو الذي تريد فك كتمه" }, { quoted: msg });
    }

    return sock.sendMessage(msg.key.remoteJid, {
      text: `🔊 تم فك الكتم عن @${target.split("@")[0]}`,
      mentions: [target]
    }, { quoted: msg });
  }
};