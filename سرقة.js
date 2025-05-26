module.exports = {
  name: "سرقت",
  description: "سرقة ملصق من عضو وتعديله بالاسم المطلوب",
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;

    if (!msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage) {
      return sock.sendMessage(jid, { text: "❗ يجب الرد على ملصق لسرقته." }, { quoted: msg });
    }

    const targetName = args.join(" ");
    if (!targetName) {
      return sock.sendMessage(jid, { text: "❗ اكتب الاسم الجديد للملصق مثل: سرقت روني" }, { quoted: msg });
    }

    const sticker = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;

    await sock.sendMessage(jid, {
      sticker: sticker,
      contextInfo: {
        externalAdReply: {
          title: `تمت السرقة بواسطة ${targetName}`,
          body: "اسپيدو بوت",
        }
      }
    });
  }
};