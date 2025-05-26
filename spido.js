module.exports = {
  name: "اسبيدر",
  description: "رد خاص عند قول المطور كلمة اسبيدر",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "قلب اسپيدر ودقات قلبه 🥹💗" }, { quoted: msg });
    } else {
      return sock.sendMessage(jid, { text: "بس ياض 😒🖕🏻" }, { quoted: msg });
    }
  }
};