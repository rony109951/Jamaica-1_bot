module.exports = {
  name: "تيك",
  description: "تحميل فيديو من تيك توك باسم",
  async execute(sock, msg, args) {
    const query = args.join(" ");
    const jid = msg.key.remoteJid;

    if (!query) return sock.sendMessage(jid, { text: "❗ اكتب اسم الفيديو لتحميله من تيك توك" }, { quoted: msg });

    // تحميل وهمي (يجب استخدام API حقيقي للبحث)
    return sock.sendMessage(jid, { text: `⬇️ جاري البحث عن: ${query}...` }, { quoted: msg });
  }
};