// commands/fun/romanticPosts.js

const romanticQuotes = [
  "الحب مش كلام، الحب أفعال واهتمام.",
  "كنت بشوف الدنيا بعيني، ولما عرفتك شفتها بقلبك.",
  "كل لحظة معاك بتخليني أحبك أكتر.",
  "مش لازم تقول بحبك، نظرة عينيك بتكفي.",
  "الحب الحقيقي هو اللي يخليك تبتسم وانت تعبان."
];

module.exports = {
  name: "رومانسيه",
  description: "يعرض بوست رومانسي عشوائي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const post = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];

    await sock.sendMessage(jid, { text: `💞 ${post}` }, { quoted: msg });
  }
};