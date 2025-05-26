const activeGames = new Map();

module.exports = {
  name: "احزر",
  description: "لعبة احزر الرقم من 1 إلى 10",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;

    if (activeGames.has(sender)) {
      return sock.sendMessage(jid, { text: "❗ عندك لعبة شغالة بالفعل! جاوب أو انتظر تنتهي." }, { quoted: msg });
    }

    const number = Math.floor(Math.random() * 10) + 1;
    activeGames.set(sender, number);

    await sock.sendMessage(jid, { text: "🎲 اخترت رقم من 1 إلى 10. حاول تخمنه!" }, { quoted: msg });

    // الانتظار 30 ثانية لتلقي الرد
    const timeout = setTimeout(() => {
      if (activeGames.has(sender)) {
        activeGames.delete(sender);
        sock.sendMessage(jid, { text: `⏰ انتهى الوقت! الرقم كان: ${number}` }, { quoted: msg });
      }
    }, 30000);

    sock.ev.on("messages.upsert", async ({ messages }) => {
      const reply = messages[0];
      if (!reply.message?.conversation || reply.key.remoteJid !== jid || reply.key.participant !== sender) return;

      const guess = parseInt(reply.message.conversation.trim());
      if (!isNaN(guess)) {
        if (guess === number) {
          clearTimeout(timeout);
          activeGames.delete(sender);
          await sock.sendMessage(jid, { text: `✅ صح! الرقم هو ${number}. مبروك!` }, { quoted: reply });
        } else {
          clearTimeout(timeout);
          activeGames.delete(sender);
          await sock.sendMessage(jid, { text: `❌ غلط! الرقم كان ${number}` }, { quoted: reply });
        }
      }
    });
  }
};