module.exports = {
  name: "التاريخ",
  description: "يعرض التاريخ اليوم",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const now = new Date();
    const date = now.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    await sock.sendMessage(jid, { text: `📅 تاريخ اليوم: ${date}` }, { quoted: msg });
  }
};