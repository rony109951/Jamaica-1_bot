// commands/fun/luckToday.js

const luckMessages = [
  "النهاردة حظك حلو، استغل الفرصة!",
  "خلي بالك، في حاجة حلوة جاية في السكة.",
  "حظك متوسط، خليك حذر وذكي.",
  "يومك مش الأفضل، بس هتعدي.",
  "في مفاجأة حلوة مستنياك النهاردة."
];

module.exports = {
  name: "حظي",
  description: "يعرض حظك اليوم",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const result = luckMessages[Math.floor(Math.random() * luckMessages.length)];

    await sock.sendMessage(jid, { text: `🔮 ${result}` }, { quoted: msg });
  }
};