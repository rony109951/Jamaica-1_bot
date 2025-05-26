// commands/admin/warn.js

const { addWarning, getWarningCount, clearWarnings } = require("../../handlers/warnings");

module.exports = {
  name: "تحذير",
  description: "إعطاء تحذير لعضو",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على العضو الذي تريد تحذيره" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage.contextInfo.participant;
    const userId = target.split('@')[0];
    const warningCount = addWarning(userId);

    if (warningCount >= 4) {
      await sock.groupRemove(jid, [target]);
      clearWarnings(userId);
      return sock.sendMessage(jid, { text: `🚫 تم طرد @${userId} بعد 3 تحذيرات.` }, { mentions: [target] });
    }

    return sock.sendMessage(jid, { text: `⚠️ تحذير رقم ${warningCount} لـ @${userId}` }, { mentions: [target] });
  }
};