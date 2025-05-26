module.exports = {
  name: "الرابط",
  description: "يعرض رابط الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    try {
      const code = await sock.groupInviteCode(jid);
      const url = `https://chat.whatsapp.com/${code}`;
      return sock.sendMessage(jid, { text: `رابط الجروب:\n${url}` }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(jid, { text: "❌ لم أستطع جلب رابط الجروب." }, { quoted: msg });
    }
  }
};