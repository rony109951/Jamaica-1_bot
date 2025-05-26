module.exports = {
  name: "ادعم",
  description: "رسالة دعم معنوية للمطور",
  async execute(sock, msg) {
    const message = "💬 شكرًا على دعمك! وجودك معانا هو أكبر دعم!";
    await sock.sendMessage(msg.key.remoteJid, { text: message }, { quoted: msg });
  }
};