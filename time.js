module.exports = {
  name: "الوقت",
  description: "يعرض الوقت الحالي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const now = new Date();
    const time = now.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    await sock.sendMessage(jid, { text: `⏰ الوقت الحالي: ${time}` }, { quoted: msg });
  }
};