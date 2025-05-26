module.exports = {
  name: "ستيكر_مميز",
  description: "إرسال ستيكر خاص للمميزين",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isVIP && !metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر للمميزين فقط" }, { quoted: msg });
    }

    await sock.sendMessage(msg.key.remoteJid, {
      sticker: { url: "./media/vip-sticker.webp" }
    }, { quoted: msg });
  }
};