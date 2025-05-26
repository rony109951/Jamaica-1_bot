// commands/admin/badwords.js

const badWords = ["كسمك", "يامتناك", "يبن المتناكه"]; // عدل الكلمات حسب رغبتك

module.exports = {
  name: "حذف_الشتائم",
  description: "يحذف الشتائم تلقائيًا",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";

    if (badWords.some(word => text.toLowerCase().includes(word))) {
      await sock.sendMessage(jid, { text: `⚠️ تم حذف رسالة تحتوي على شتائم من @${metadata.senderNum}` }, { quoted: msg, mentions: [msg.key.participant] });
      return await sock.sendMessage(jid, { delete: msg.key });
    }
  }
};