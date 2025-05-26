module.exports = {
  name: "تنزيل",
  description: "إزالة عضو من الإشراف",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const target = msg.message.extendedTextMessage?.contextInfo?.participant;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    if (!target) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على مشرف لإزالته." }, { quoted: msg });
    }

    await sock.groupParticipantsUpdate(jid, [target], "demote");
    return sock.sendMessage(jid, { text: `🛑 تم إزالة @${target.split("@")[0]} من المشرفين.` }, { mentions: [target] });
  }
};