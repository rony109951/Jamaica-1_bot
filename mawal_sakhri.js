module.exports = {
  name: "موال_ساخر",
  description: "يعرض لك موال ساخر أو مضحك",
  async execute(sock, msg) {
    const mawalat = [
      "قال إيه بيحبني.. وما بيفتكرني إلا لما يقفل النت!",
      "حبك شبه الرصيد.. دايمًا فاصل",
      "أنا كنت فاكرها ملاك.. طلعت فلاتر سناب",
      "قال يحبني.. طلع بس عايز باسورد الواي فاي",
      "سألوني إنت بتحب؟ قلت أحب أضحك مش أتوجع"
    ];

    const randomMawal = mawalat[Math.floor(Math.random() * mawalat.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `😂 ${randomMawal}` }, { quoted: msg });
  }
};