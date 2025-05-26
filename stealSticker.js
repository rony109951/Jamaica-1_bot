module.exports = {
  name: "سرقت",
  description: "سرقة ملصق من شخص مع تغيير الاسم",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;

    if (!msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage) {
      return sock.sendMessage(jid, { text: "❗ لازم ترد على ملصق علشان تسرقه" }, { quoted: msg });
    }

    const name = args.join(" ") || "مجهول";

    const sticker = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;

    await sock.sendMessage(jid, {
      sticker: sticker,
      caption: `تمت سرقة الملصق بواسطة ${name}`
    }, { quoted: msg });
  }
};