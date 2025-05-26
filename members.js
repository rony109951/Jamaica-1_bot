module.exports = {
  name: "الاعضاء",
  description: "عرض قائمة الأعضاء في الجروب",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const groupMetadata = await sock.groupMetadata(jid);
    const members = groupMetadata.participants;

    const list = members.map((m, i) => `${i + 1}- @${m.id.split("@")[0]}`).join("\n");

    return sock.sendMessage(jid, {
      text: `👥 أعضاء الجروب:\n\n${list}`,
      mentions: members.map(m => m.id)
    }, { quoted: msg });
  }
};