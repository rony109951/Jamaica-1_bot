module.exports = {
  name: "vip",
  description: "قائمة أوامر VIP",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isVIP && !metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر مخصص للأعضاء المميزين فقط" }, { quoted: msg });
    }

    const vipCommands = `
⭐ *قائمة VIP:*
- سرقة ملصق
- زواج وطلاق
- تنزيل يوتيوب (بالاسم)
- تنزيل تيك توك (بالاسم)
- تحكم كامل بردود البوت
- أوامر خاصة في التطوير
`;

    await sock.sendMessage(jid, { text: vipCommands }, { quoted: msg });
  }
};