module.exports = {
  name: "اغنية",
  description: "تنزيل أغنية من يوتيوب باسمها",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const song = args.join(" ");

    if (!song) {
      return sock.sendMessage(jid, { text: "❗ اكتب اسم الأغنية بعد الأمر" }, { quoted: msg });
    }

    await sock.sendMessage(jid, {
      text: `🎶 يتم الآن البحث عن: *${song}*\n⬇️ تحميل تجريبي:\nhttps://youtube.fake/audio/${encodeURIComponent(song)}`
    }, { quoted: msg });
  }
};