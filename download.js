module.exports = {
  name: "تنزيل",
  description: "تحميل فيديو من تيك توك (بالاسم)",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const query = args.join(" ");

    if (!query) {
      return sock.sendMessage(jid, { text: "❗ اكتب اسم الفيديو بعد الأمر" }, { quoted: msg });
    }

    // مبدأياً رابط وهمي
    await sock.sendMessage(jid, {
      text: `جاري البحث عن فيديو: *${query}*\n\n⬇️ رابط تجريبي:\nhttps://tiktok.fake/download/${encodeURIComponent(query)}`
    }, { quoted: msg });
  }
};