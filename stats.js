// commands/fun/stats.js

const fs = require("fs");

module.exports = {
  name: "احصائيات",
  description: "عرض إحصائيات البوت",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    const users = JSON.parse(fs.readFileSync("./database/users.json"));
    const userCount = Object.keys(users).length;

    const stats = `📊 إحصائيات البوت:
    
👥 عدد المستخدمين: ${userCount}
✅ البوت يعمل: نعم
⚙️ آخر تحديث: ${new Date().toLocaleString("ar-EG")}`;

    await sock.sendMessage(jid, { text: stats }, { quoted: msg });
  }
};