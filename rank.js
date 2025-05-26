module.exports = {
  name: "الترتيب",
  description: "عرض ترتيب الأعضاء حسب النشاط (تجريبي)",
  async execute(sock, msg, args, metadata) {
    const jid = msg.key.remoteJid;

    // هذه فقط رسالة وهمية للعرض — يمكن تطويرها لاحقًا لتقيس النشاط الحقيقي
    const fakeRanks = [
      "1- @1111111111 (الزعيم)",
      "2- @2222222222 (النشيط)",
      "3- @3333333333 (العادي)"
    ];

    return sock.sendMessage(jid, {
      text: `📊 ترتيب الأعضاء:\n\n${fakeRanks.join("\n")}`,
      mentions: fakeRanks.map(r => r.match(/@(\d+)/)[0] + "@s.whatsapp.net")
    }, { quoted: msg });
  }
};