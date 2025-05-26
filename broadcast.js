// commands/developer/broadcast.js

module.exports = {
  name: "إذاعة",
  description: "إرسال رسالة إلى جميع الجروبات",
  async execute(sock, msg, args, metadata) {
    if (!metadata.isDeveloper) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ هذا الأمر مخصص للمطور فقط." }, { quoted: msg });
    }

    const messageText = args.join(" ");
    if (!messageText) {
      return sock.sendMessage(msg.key.remoteJid, { text: "✉️ يرجى كتابة رسالة الإذاعة بعد الأمر." }, { quoted: msg });
    }

    const groups = await sock.groupFetchAllParticipating();
    const groupIds = Object.keys(groups);

    for (const groupId of groupIds) {
      try {
        await sock.sendMessage(groupId, { text: `📢 إذاعة من المطور:\n\n${messageText}` });
      } catch (err) {
        console.error(`فشل إرسال الرسالة إلى: ${groupId}`, err.message);
      }
    }

    await sock.sendMessage(msg.key.remoteJid, { text: `✅ تم إرسال الإذاعة إلى ${groupIds.length} جروب.` }, { quoted: msg });
  }
};