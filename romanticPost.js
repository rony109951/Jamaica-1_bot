const posts = [
  "وأنا جنبك الدنيا لابسة فستان فرح.",
  "في حضنك، كل الكلام بيسكت.",
  "مش كل القلوب حبت زي قلبي ليك.",
  "بحبك من أول نظرة، ولسه كل نظرة كأنها أول مرة."
];

module.exports = {
  name: "رومانسي",
  description: "بوست رومانسي عشوائي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const post = posts[Math.floor(Math.random() * posts.length)];
    await sock.sendMessage(jid, { text: `❤️ ${post}` }, { quoted: msg });
  }
};