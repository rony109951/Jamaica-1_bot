module.exports = {
  name: "موال",
  description: "يعرض لك موال عشوائي",
  async execute(sock, msg) {
    const mawalat = [
      "والله ما تطمن قلوبنا إلا لما نشوفكم.. يا أغلى الأحباب",
      "ياللي ظلمت الحُب.. مين قالك تعيش؟",
      "أنا قلبي كان طيب.. طيب ليه؟ ما نفعنيش",
      "كل ما أقول التوبة.. يرجعلي الشوق يدوبني",
      "أنا اللي كنت أقولك حب، فين الحب؟! كله راح"
    ];

    const randomMawal = mawalat[Math.floor(Math.random() * mawalat.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🎤 ${randomMawal}` }, { quoted: msg });
  }
};