const { addComplaint } = require("../../handlers/complaints");

module.exports = {
  name: "شكوى",
  description: "إرسال شكوى لإدارة البوت",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const from = msg.key.participant || msg.key.remoteJid;
    const complaintText = args.join(" ");

    if (!complaintText) {
      return sock.sendMessage(jid, { text: "❗ من فضلك اكتب نص الشكوى بعد الأمر" }, { quoted: msg });
    }

    addComplaint({
      from,
      group: jid,
      text: complaintText
    });

    return sock.sendMessage(jid, { text: "✅ تم إرسال شكوتك للإدارة، سيتم مراجعتها قريبًا" }, { quoted: msg });
  }
};