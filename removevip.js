// commands/admin/removevip.js

const fs = require( fs );
const vipPath =  ./database/vip.json ;

function loadVIPs() {
  return fs.existsSync(vipPath) ? JSON.parse(fs.readFileSync(vipPath)) : [];
}

function saveVIPs(vips) {
  fs.writeFileSync(vipPath, JSON.stringify(vips, null, 2));
}

module.exports = {
  name: "حذف_vip",
  description: "إلغاء صلاحية VIP لعضو (للمطور فقط)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    if (!metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر خاص بالمطور فقط" }, { quoted: msg });
    }

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على العضو الذي تريد إزالة VIP منه" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage.contextInfo.participant;
    const vipList = loadVIPs();

    if (vipList.includes(target)) {
      const updatedList = vipList.filter(id => id !== target);
      saveVIPs(updatedList);
      return sock.sendMessage(jid, { text: `❎ تم إزالة صلاحية VIP من @${target.split( @ )[0]}` }, { mentions: [target] });
    } else {
      return sock.sendMessage(jid, { text: "ℹ️ هذا العضو ليس VIP" }, { quoted: msg });
    }
  }
};