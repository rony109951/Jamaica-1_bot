const axios = require("axios");

module.exports = {
  name: "انمي",
  description: "يعرض لك صورة أنمي عشوائية",
  async execute(sock, msg) {
    try {
      const res = await axios.get("https://api.waifu.pics/sfw/waifu");
      const imageUrl = res.data.url;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: "صورة أنمي لك!"
      }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ حصل خطأ أثناء جلب صورة الأنمي"
      }, { quoted: msg });
    }
  }
};