module.exports = {
  name: "نكته",
  description: "يعرض لك نكتة مضحكة",
  async execute(sock, msg) {
    const jokes = [
      "واحد دخل الامتحان متأخر، المدرس قاله: إنت جاي إمتى؟ قاله: لما كتبت اسمي!",
      "فيه واحد غبي سأل واحد ذكي: إزاي تبقى ذكي؟ قاله: لما تخلص تسألني!",
      "فيه واحد راح للدكتور قاله: كل ما أشرب شاي بحس بألم في عيني، قاله: شيل المعلقة!",
      "واحد اتجوز مذيعة، كل ما يتخانقوا تقوله: بنرجعلك بعد الفاصل!",
      "واحد بيقول لصاحبه: مراتك بتصوم؟ قاله: صايمة عني!"
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🤣 ${randomJoke}` }, { quoted: msg });
  }
};