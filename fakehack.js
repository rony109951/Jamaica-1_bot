module.exports = {
  name: "اختراق",
  description: "اختراق وهمي يضحك مع الأصدقاء",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const target = msg.message.extendedTextMessage?.contextInfo?.participant || msg.key.participant || msg.key.remoteJid;

    // إرسال رسالة التهديد
    await sock.sendMessage(jid, {
      text: `⚠️ تم بدء اختراق جهاز @${target.split("@")[0]}...\nجارٍ تحميل الملفات السرية...`,
      mentions: [target]
    }, { quoted: msg });

    // الانتظار 55 ثانية ثم إرسال أنها خدعة
    setTimeout(async () => {
      await sock.sendMessage(jid, {
        text: `✅ تم الاختراق بنجاح!\n🧠 جاري بيع البيانات في السوق السوداء...\n\n⌛️ انتظر...\n\n❗❗❗\nههههه خدعة يا عم!`,
      }, { quoted: msg });
    }, 55000);
  }
};