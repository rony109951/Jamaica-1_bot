const fs = require("fs");
const path = require("path");

const complaintsPath = path.join(__dirname, "../../database/complaints.json");

module.exports = {
  name: "عرض_الشكاوى",
  description: "عرض كل الشكاوى المسجلة (للمطور فقط)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    if (!metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر للمطور فقط" }, { quoted: msg });
    }

    if (!fs.existsSync(complaintsPath)) {
      return sock.sendMessage(jid, { text: "❗ لا توجد شكاوى حتى الآن." }, { quoted: msg });
    }

    const complaints = JSON.parse(fs.readFileSync(complaintsPath));
    if (complaints.length === 0) {
      return sock.sendMessage(jid, { text: "❗ لا توجد شكاوى حالياً." }, { quoted: msg });
    }

    let output = "📋 قائمة الشكاوى:\n\n";
    complaints.slice(-10).forEach((item, i) => {
      output += `${i + 1}. من ${item.sender}:\n${item.complaint}\n\n`;
    });

    await sock.sendMessage(jid, { text: output }, { quoted: msg });
  }
};