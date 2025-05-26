const posts = [
  "أنا مش مغرور، بس عارف قيمتي.",
  "اللي بيجي عليا، بنهيه.",
  "متغركش الطيبة، ساعات بتوجع.",
  "أنا مش بتاع كلام، أنا بتاع أفعال."
];

module.exports = {
  name: "سرسجي",
  description: "بوست سرسجي جامد",
  async execute(sock, msg) {
    const jid = msg.key.remoteJid;
    const post = posts[Math.floor(Math.random() * posts.length)];
    await sock.sendMessage(jid, { text: `🔥 ${post}` }, { quoted: msg });
  }
};