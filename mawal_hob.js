module.exports = {
  name: "موال_حب",
  description: "يعرض لك موال رومانسي",
  async execute(sock, msg) {
    const mawalat = [
      "يا حبيبي وانت جنبي.. عمري بيك يهون عليه",
      "ضحكتك تنور أيامي، وتنسيني همي وأحزاني",
      "لو كنت نسمة.. كنت أجيك، لو كنت نجمة.. أبقى ليك",
      "أنا وانت قصة حب.. مالهاش نهاية",
      "الحب ليك مش كلام، ده دق قلبي من سلام"
    ];

    const randomMawal = mawalat[Math.floor(Math.random() * mawalat.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `❤️ ${randomMawal}` }, { quoted: msg });
  }
};