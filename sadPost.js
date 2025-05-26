const posts = [
  "مفيش حد بيبعد من غير سبب.",
  "أصعب وجع، وجع الصمت وانت محتاج تحكي.",
  "أنا بخير، بس من غيرك ناقصني كتير.",
  "اللي كان بيدفيك، بقى السبب في بردك."
];

module.exports = {
  name: "حزين",
  description: "بوست حزين عشوائي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const post = posts[Math.floor(Math.random() * posts.length)];
    await sock.sendMessage(jid, { text: `💔 ${post}` }, { quoted: msg });
  }
};