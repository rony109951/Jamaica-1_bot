const axios = require("axios");
const apiKey = "YOUR_API_KEY"; // ← استبدله بمفتاحك الحقيقي

module.exports = {
  name: "طقس",
  description: "يعرض الطقس لمدينة معينة",
  async execute(sock, msg, args) {
    const city = args.join(" ");
    if (!city) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❗ اكتب اسم المدينة بعد الأمر"
      }, { quoted: msg });
    }

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ar`);
      const data = res.data;

      const text = `☁️ حالة الطقس في *${data.name}*\n\nالحرارة: ${data.main.temp}°C\nالرطوبة: ${data.main.humidity}%\nالوصف: ${data.weather[0].description}`;
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ لم أستطع جلب الطقس، تأكد من اسم المدينة."
      }, { quoted: msg });
    }
  }
};