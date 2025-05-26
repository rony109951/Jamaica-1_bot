module.exports = {
  name: "طلاق",
  description: "أمر طلاق بينك وبين الطرف الآخر",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const user = msg.pushName;

    const replyText = `❌ ${user} قرر الطلاق... الله يعوض عليك`;

    await sock.sendMessage(jid, { text: replyText }, { quoted: msg });
  }
};