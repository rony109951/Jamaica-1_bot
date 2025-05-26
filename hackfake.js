module.exports = {
  name: "هكر",
  description: "أمر اختراق وهمي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, { text: "⏳ جاري اختراق جهازك..." }, { quoted: msg });

    setTimeout(() => {
      sock.sendMessage(jid, { text: "💀 تم اختراقك... جاري حذف ملفاتك!" }, { quoted: msg });
    }, 3000);

    setTimeout(() => {
      sock.sendMessage(jid, { text: "🤣 خدعة يا صاحبي، خالي البوت هزار بس!" }, { quoted: msg });
    }, 55000);
  }
};