// commands/fun/meme.js

module.exports = {
  name: "ميم",
  description: "يُرسل صورة ميم عشوائية",
  async execute(sock, msg) {
    const memes = [
      "https://i.imgflip.com/4/30b1gx.jpg",
      "https://i.imgflip.com/26am.jpg",
      "https://i.imgflip.com/1bij.jpg",
      "https://i.imgflip.com/4t0m5.jpg"
    ];

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    await sock.sendMessage(msg.key.remoteJid, {
      image: { url: randomMeme },
      caption: "🤣 ميم عشوائي"
    }, { quoted: msg });
  }
};