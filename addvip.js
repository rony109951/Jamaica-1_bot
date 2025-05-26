// commands/admin/addvip.js

const fs = require( fs );
const vipPath =  ./database/vip.json ;

function loadVIPs() {
  return fs.existsSync(vipPath) ? JSON.parse(fs.readFileSync(vipPath)) : [];
}

function saveVIPs(vips) {
  fs.writeFileSync(vipPath, JSON.stringify(vips, null, 2));
}

module.exports = {
  name: "اضف_vip",
  description: "إعطاء صلاحية VIP لعضو (للمطور فقط)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    if (!metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر خاص بالمطور فقط" }, { quoted: msg });
    }

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على العضو الذي تريد منحه VIP" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage.contextInfo.participant;
    const vipList = loadVIPs();

    if (!vipList.includes(target)) {
      vipList.push(target);
      saveVIPs(vipList);
      return sock.sendMessage(jid, { text: `✅ تم منح @${target.split( @ )[0]} صلاحية VIP` }, { mentions: [target] });
    } else {
      return sock.sendMessage(jid, { text: "ℹ️ العضو لديه صلاحية VIP بالفعل" }, { quoted: msg });
    }
  }
};