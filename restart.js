// commands/developer/restart.js

module.exports = {
  name: "إعادة_تشغيل",
  description: "إعادة تشغيل البوت",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر للمطور فقط." }, { quoted: msg });
    }

    await sock.sendMessage(msg.key.remoteJid, { text: "🔁 جاري إعادة تشغيل البوت..." }, { quoted: msg });
    
    setTimeout(() => {
      process.exit(0); // يقوم بإيقاف العملية لتعيد Termux تشغيلها من جديد
    }, 1000);
  }
};