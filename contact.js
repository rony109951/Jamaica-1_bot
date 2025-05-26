module.exports = {
  name: "تواصل_دعم",
  description: "التواصل مع المطور مباشرة لدعم البوت",
  async execute(sock, msg) {
    const message = `
للتواصل مع مطور البوت لدعمه أو اقتراحات:

📞 واتساب: wa.me/201212843252
📧 بريد: Jamaica.bot.support@gmail.com
    `;
    await sock.sendMessage(msg.key.remoteJid, { text: message }, { quoted: msg });
  }
};