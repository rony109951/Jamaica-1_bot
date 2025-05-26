module.exports = {
  name: "منع_الروابط",
  description: "منع الروابط في الجروب (إلا من المطور/المشرفين)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    const forbidden = ["https://", "wa.me/", "chat.whatsapp.com"];
    const sender = msg.key.participant || msg.key.remoteJid;
    const message = msg.message?.conversation || msg.message?.extendedTextMessage?.text;

    if (forbidden.some(word => message.includes(word))) {
      if (!metadata.isAdmin && !metadata.isDeveloper) {
        await sock.sendMessage(jid, {
          text: `🚫 ممنوع إرسال الروابط يا @${sender.split("@")[0]}`,
          mentions: [sender]
        }, { quoted: msg });

        await sock.sendMessage(jid, {
          delete: {
            remoteJid: msg.key.remoteJid,
            fromMe: false,
            id: msg.key.id,
            participant: sender
          }
        });
      }
    }
  }
};