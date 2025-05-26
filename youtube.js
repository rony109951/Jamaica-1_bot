const ytdl = require('ytdl-core');

module.exports = {
  name: "تحميل",
  description: "تحميل أغنية من يوتيوب باسمها",
  async execute(sock, msg, args) {
    const query = args.join(" ");
    const jid = msg.key.remoteJid;

    if (!query) return sock.sendMessage(jid, { text: "❗ اكتب اسم الأغنية لتحميلها من يوتيوب" }, { quoted: msg });

    // وهمي للتجربة، في التطبيق الحقيقي يتم استخدام API أو yts/ytdl للبحث
    const url = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`; // مثال ثابت
    const info = await ytdl.getInfo(url);
    const audio = ytdl(url, { filter: "audioonly" });

    return sock.sendMessage(jid, { text: `⬇️ جاري تحميل: ${info.videoDetails.title}` }, { quoted: msg });
  }
};