module.exports = {
  name: "زواج",
  description: "طلب زواج من عضو",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const target = msg.message.extendedTextMessage?.contextInfo?.participant;

    if (!target) return sock.sendMessage(jid, { text: "❗ قم بالرد على رسالة الشخص الذي تريد الزواج منه" }, { quoted: msg });

    const requester = msg.pushName;
    const partner = target.split("@")[0];

    return sock.sendMessage(jid, { text: `💍 ${requester} طلب الزواج من @${partner}، هل تقبل؟`, mentions: [target] });
  }
};