const luckLevels = [
  "⭐ حظك حلو جداً النهارده! استغل الفرص.",
  "⚠️ الحذر واجب... خليك في السيف سايد.",
  "☁️ الأمور ماشية بنص نص... لا تتسرع.",
  "🔥 يومك مليان طاقة وحيوية!",
  "❄️ يوم هادي، استمتع بالروقان."
];

module.exports = {
  name: "حظي",
  description: "يشوف حظك اليوم",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const luck = luckLevels[Math.floor(Math.random() * luckLevels.length)];
    await sock.sendMessage(jid, { text: luck }, { quoted: msg });
  }
};