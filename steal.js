module.exports = {
  name: "سرقت",
  description: "سرقة ملصق من عضو وإعادة إرساله باسم معين",
  async execute(sock, msg, args) {
    const name = args.join(" ");
    const jid = msg.key.remoteJid;

    if (!msg.message.stickerMessage) {
      return sock.sendMessage(jid, { text: "❗ من فضلك قم بالرد على ملصق" }, { quoted: msg });
    }

    if (!name) {
      return sock.sendMessage(jid, { text: "❗ اكتب اسم الشخص الذي سرقت منه الملصق" }, { quoted: msg });
    }

    const sticker = msg.message.stickerMessage;
    return sock.sendMessage(jid, {
      sticker: sticker,
      caption: `تمت سرقة الملصق من ${name}`
    }, { quoted: msg });
  }
};