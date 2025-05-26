module.exports = {
  name: "اقتباس",
  description: "يعرض لك اقتباس ملهم",
  async execute(sock, msg) {
    const quotes = [
      "لا تؤجل عمل اليوم إلى الغد، فالغد مجهول.",
      "النجاح لا يأتي بالحظ، بل بالإصرار والتحدي.",
      "لا تخف من الفشل، فالفشل بداية النجاح.",
      "العقل زينة.. بس أوقات لازم قلبك يتكلم.",
      "الصمت أبلغ من ألف كلمة، خاصة لما ما يكون في حد يستاهل الكلام."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `✨ ${randomQuote}` }, { quoted: msg });
  }
};