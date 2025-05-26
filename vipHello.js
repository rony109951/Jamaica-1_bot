module.exports = {
  name: "تحية_مميز",
  description: "تحية خاصة للمميزين",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isVIP && !metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر للمميزين فقط" }, { quoted: msg });
    }

    const user = msg.pushName || "مميز";
    await sock.sendMessage(msg.key.remoteJid, { text: `اهلاً وسهلاً بـ ${user} نورتنا يا VIP 💎` }, { quoted: msg });
  }
};