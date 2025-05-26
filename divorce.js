module.exports = {
  name: "طلاق",
  description: "طلب الطلاق من الشريك",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    return sock.sendMessage(jid, { text: "⚡ تم الطلاق بنجاح... كل واحد يروح في حاله!" }, { quoted: msg });
  }
};