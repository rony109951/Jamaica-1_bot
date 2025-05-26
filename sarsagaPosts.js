// commands/fun/sarsagaPosts.js

const sarsagaPosts = [
  "أنا مش جامد، أنا جامد جداً وانت اللي مش شايف.",
  "كله بيحب السهل، بس أنا خلقت للصعب.",
  "إللي شايفني قليل، يبقى ناقص كتير.",
  "أنا كاريزما بطبيعي، مش محتاج أبان.",
  "سيبك من الكلام وتعالى شوف الأفعال."
];

module.exports = {
  name: "سرسجيه",
  description: "يعرض بوست سرسجي عشوائي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const post = sarsagaPosts[Math.floor(Math.random() * sarsagaPosts.length)];

    await sock.sendMessage(jid, { text: `🔥 ${post}` }, { quoted: msg });
  }
};