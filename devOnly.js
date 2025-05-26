module.exports = {
  name: "راسبيد",
  description: "رد خاص لما المطور يقول 'اسبيدر'",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (metadata.isDeveloper) {
      return sock.sendMessage(jid, {
        text: "قلب اسبيدر ودقات قلبو 🥹💗"
      }, { quoted: msg });
    } else {
      return sock.sendMessage(jid, {
        text: "بس ياض😒🖕🏻"
      }, { quoted: msg });
    }
  }
};