// commands/fun/request.js

module.exports = {
  name: "طلب",
  description: "أرسل طلبًا للإدارة أو المطور",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    const requestText = args.join(" ");
    
    if (!requestText) {
      return sock.sendMessage(jid, { text: "❗ من فضلك أكتب الطلب بعد الأمر." }, { quoted: msg });
    }

    const forwardMessage = `📥 طلب جديد من @${msg.key.participant?.split("@")[0] || "عضو"}:\n\n${requestText}`;
    await sock.sendMessage("01212843252@s.whatsapp.net", { text: forwardMessage, mentions: [msg.key.participant] });

    await sock.sendMessage(jid, { text: "✅ تم إرسال طلبك للمطور، سيتم الرد قريبًا." }, { quoted: msg });
  }
};