module.exports = {
  name: "عن",
  description: "معلومات عن البوت",
  async execute(sock, msg) {
    return sock.sendMessage(msg.key.remoteJid, {
      text: "🤖 هذا البوت تم تطويره بواسطة المطور المصري روني البحيره، يحتوي على مميزات شاملة لإدارة المجموعات والترفيه.",",
    }, { quoted: msg });
  }
};