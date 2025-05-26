// commands/fun/sadPosts.js

const sadQuotes = [
  "أنا مش كويس، بس مش حابب حد يعرف.",
  "اللي بيضحك كتير، ممكن يكون جواه وجع مالوش نهاية.",
  "كتمان الوجع أسهل من شرحه.",
  "أوقات بنضحك علشان منبكيش.",
  "كل يوم بعدك، بحس الدنيا بتبعد أكتر."
];

module.exports = {
  name: "حزينه",
  description: "يعرض بوست حزين عشوائي",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const post = sadQuotes[Math.floor(Math.random() * sadQuotes.length)];

    await sock.sendMessage(jid, { text: `💔 ${post}` }, { quoted: msg });
  }
};