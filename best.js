module.exports = {
  name: "بستة",
  description: "يعرض لك بستة عشوائية",
  async execute(sock, msg) {
    const bestat = [
      "أكبر غلط إني حبيت بصدق في زمن الكذب.",
      "عشان أرتاح، بطلت أشرح وبطلت أبرر.",
      "أنا مش قاسي، بس اتعلمت أبعد عن اللي يوجعني.",
      "كان نفسي تفهمني من غير ما أتكلم، بس إنت ما سمعتنيش حتى وأنا بصوت.",
      "مش كل ضحكة وراها سعادة.. أوقات بتكون دمعة مستخبية."
    ];

    const randomBest = bestat[Math.floor(Math.random() * bestat.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `📌 ${randomBest}` }, { quoted: msg });
  }
};