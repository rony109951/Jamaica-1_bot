module.exports = {
  name: "هل_انا_vip",
  description: "تحقق إذا كنت من المميزين",
  async execute(sock, msg, args, metadata) {
    const isVIP = metadata.isVIP || metadata.isDeveloper;
    const response = isVIP ? "✅ نعم، أنت مميز VIP" : "❌ لا، أنت لست ضمن قائمة VIP";

    await sock.sendMessage(msg.key.remoteJid, { text: response }, { quoted: msg });
  }
};