// commands/fun/roast.js
const roasts = [
  "إنت عبقري بس في عالم موازي.",
  "لو الذكاء كان فلوس، كنت أعلنت إفلاسك.",
  "كمية الفشل اللي فيك محتاجة مؤتمر لحلها.",
  "شكلك محتاج ريستارت."
];

module.exports = {
  name: "هكر_فيك",
  description: "رد تهزيقي مضحك",
  async execute(sock, msg) {
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: roast }, { quoted: msg });
  }
};