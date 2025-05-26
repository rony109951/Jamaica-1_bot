module.exports = {
  name: "vip",
  description: "أمر خاص بمشتركي VIP",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isVIP) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر مخصص لأعضاء VIP فقط." }, { quoted: msg });
    }

    return sock.sendMessage(jid, { text: "🎉 مرحباً بك في نادي الـ VIP! استمتع بالمميزات الحصرية." }, { quoted: msg });
  }
};