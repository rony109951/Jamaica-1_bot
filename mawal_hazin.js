module.exports = {
  name: "موال_حزين",
  description: "يعرض لك موال حزين",
  async execute(sock, msg) {
    const mawalat = [
      "ياللي نسيت الود.. ما بيني وبينك كان أكتر من سلام",
      "أنا اللي كنت بداري.. دلوقتي ببكي في العلن",
      "عيني دموعها ما بتنشف، وقلبي من الألم مش شايف",
      "صوتي مبحوح من كتر الشكوى، والليل بيشهد عليّ",
      "عايش على الذكرى، وبنادي في صمتك.. ليه سبتني؟"
    ];

    const randomMawal = mawalat[Math.floor(Math.random() * mawalat.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `💔 ${randomMawal}` }, { quoted: msg });
  }
};