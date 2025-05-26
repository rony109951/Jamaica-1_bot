module.exports = {
  name: "رفع",
  description: "ترقية عضو إلى مشرف",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const target = msg.message.extendedTextMessage?.contextInfo?.participant;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    if (!target) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على عضو لترقيته." }, { quoted: msg });
    }

    await sock.groupParticipantsUpdate(jid, [target], "promote");
    return sock.sendMessage(jid, { text: `✅ تم ترقية @${target.split("@")[0]} لمشرف.` }, { mentions: [target] });
  }
};