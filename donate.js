module.exports = {
  name: "تبرع",
  description: "عرض وسيلة التبرع لدعم البوت",
  async execute(sock, msg) {
    const message = `
💖 شكرًا لرغبتك في دعم البوت!

يمكنك التبرع عبر فودافون كاش:
📱 رقم المحفظة: 01212843252
📩 بعد التحويل، أرسل لقطة شاشة للمطور.

دعمك يساعدنا نستمر ونطوّر أكتر.
    `;
    await sock.sendMessage(msg.key.remoteJid, { text: message }, { quoted: msg });
  }
};