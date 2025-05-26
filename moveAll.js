module.exports = {
  name: "نقل_الكل",
  description: "نقل كل الأعضاء إلى جروب آخر (البوت لازم يكون مشرف في الجروب التاني)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isAdmin && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمشرفين فقط" }, { quoted: msg });
    }

    const targetGroup = args[0];
    if (!targetGroup || !targetGroup.endsWith("@g.us")) {
      return sock.sendMessage(jid, { text: "❗ أرسل رقم الجروب الهدف بصيغة Group ID (مثال: 1234567890-123456@g.us)" }, { quoted: msg });
    }

    const groupMetadata = await sock.groupMetadata(jid);
    const participants = groupMetadata.participants
      .map(p => p.id)
      .filter(id => id !== sock.user.id);

    let added = 0, failed = 0;

    for (let user of participants) {
      try {
        await sock.groupAdd(targetGroup, [user]);
        added++;
      } catch (err) {
        failed++;
      }
    }

    return sock.sendMessage(jid, {
      text: `📤 نقل الأعضاء:\n✅ تم الإضافة: ${added}\n❌ فشل الإضافة: ${failed}\nتأكد أن البوت مشرف في الجروب الهدف.`
    }, { quoted: msg });
  }
};