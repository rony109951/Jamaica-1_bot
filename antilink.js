// commands/admin/antilink.js

module.exports = {
  name: "منع_الروابط",
  description: "منع إرسال الروابط في الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return;
    }

    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";

    if (text.includes("http://") || text.includes("https://")) {
      if (!metadata.isSenderAdmin && !metadata.isDeveloper) {
        await sock.sendMessage(jid, { text: `⛔ تم حذف الرابط @${metadata.senderNum}` }, { quoted: msg, mentions: [msg.key.participant] });
        return await sock.sendMessage(jid, { delete: msg.key });
      }
    }
  }
};