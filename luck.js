module.exports = {
  name: "حظي",
  description: "يخبرك بحظك لليوم",
  async execute(sock, msg) {
    const luckMessages = [
      "اليوم حظك جميل جداً! جرب تعمل حاجة جديدة.",
      "الحظ متوسط، خليك حذر.",
      "يومك فيه شوية توتر، خذ الأمور ببساطة.",
      "ابتسم، الحظ معاك بقوة!",
      "مفيش حظ، بس في أمل!"
    ];

    const message = luckMessages[Math.floor(Math.random() * luckMessages.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `🔮 ${message}` }, { quoted: msg });
  }
};