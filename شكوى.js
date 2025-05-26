const fs = require("fs");
const path = require("path");

const complaintsPath = path.join(__dirname, "../../database/complaints.json");

module.exports = {
  name: "شكوى",
  description: "إرسال شكوى للإدارة",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const sender = msg.pushName;
    const complaint = args.join(" ");

    if (!complaint) {
      return sock.sendMessage(jid, { text: "❗ يرجى كتابة الشكوى بعد الأمر" }, { quoted: msg });
    }

    const data = fs.existsSync(complaintsPath)
      ? JSON.parse(fs.readFileSync(complaintsPath))
      : [];

    data.push({
      sender,
      number: msg.key.participant || msg.key.remoteJid,
      group: jid,
      complaint,
      time: new Date().toISOString()
    });

    fs.writeFileSync(complaintsPath, JSON.stringify(data, null, 2));

    await sock.sendMessage(jid, { text: "✅ تم إرسال شكوتك للإدارة. سيتم مراجعتها قريبًا." }, { quoted: msg });
  }
};