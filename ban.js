// commands/admin/ban.js

module.exports = {
  name: "طرد",
  description: "طرد عضو من الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على رسالة الشخص الذي تريد طرده" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage.contextInfo.participant;
    await sock.groupRemove(jid, [target]);
    return sock.sendMessage(jid, { text: `✅ تم طرد @${target.split('@')[0]}` }, { mentions: [target] });
  }
};