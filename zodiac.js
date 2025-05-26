module.exports = {
  name: "برجي",
  description: "يعرض توقعات برجك اليوم",
  async execute(sock, msg, args) {
    const zodiac = args.join(" ");
    if (!zodiac) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❗ اكتب اسم برجك بعد الأمر (مثلاً: برج الأسد)"
      }, { quoted: msg });
    }

    const responses = [
      "اليوم مناسب للقرارات الكبيرة.",
      "حاول تبعد عن المشاكل، خليك هادي.",
      "أخبار سعيدة قادمة لك قريباً.",
      "ركز على شغلك، وهتلاقي نتيجة.",
      "حد قريب محتاجك، متتأخرش عليه."
    ];

    const random = responses[Math.floor(Math.random() * responses.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `♈ ${zodiac}:\n${random}` }, { quoted: msg });
  }
};