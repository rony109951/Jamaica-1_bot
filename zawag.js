module.exports = {
  name: "زواج",
  description: "طلب زواج من عضو",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على الشخص الذي تريد الزواج منه" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage.contextInfo.participant;
    const user = msg.pushName;

    const replyText = `💍 ${user} يطلب الزواج من @${target.split("@")[0]}... هل تقبل/ين؟`;

    await sock.sendMessage(jid, { text: replyText, mentions: [target] }, { quoted: msg });
  }
};