// commands/admin/blacklist.js

const fs = require('fs');
const path = './database/blacklist.json';

function loadList() {
  return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : [];
}

function saveList(list) {
  fs.writeFileSync(path, JSON.stringify(list, null, 2));
}

module.exports = {
  name: "حظر",
  description: "حظر عضو من استخدام البوت",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;
    const list = loadList();

    if (!metadata.isDeveloper) {
      return sock.sendMessage(jid, { text: "❌ هذا الأمر خاص بالمطور فقط" }, { quoted: msg });
    }

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, { text: "❗ قم بالرد على العضو الذي تريد حظره" }, { quoted: msg });
    }

    const target = msg.message.extendedTextMessage.contextInfo.participant;
    if (!list.includes(target)) {
      list.push(target);
      saveList(list);
      return sock.sendMessage(jid, { text: `✅ تم حظر @${target.split('@')[0]}` }, { mentions: [target] });
    } else {
      return sock.sendMessage(jid, { text: "ℹ️ العضو محظور بالفعل" }, { quoted: msg });
    }
  }
};