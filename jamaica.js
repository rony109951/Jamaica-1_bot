const { Boom } = require('@hapi/boom'); const makeWASocket = require('@whiskeysockets/baileys').default; const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys'); const fs = require('fs'); const path = require('path');

// تحميل جميع الأوامر من مجلد "commands" const commands = new Map(); const commandsDir = path.join(__dirname, 'commands'); fs.readdirSync(commandsDir).forEach(file => { if (file.endsWith('.js')) { const commandName = file.replace('.js', '').toLowerCase(); const command = require(path.join(commandsDir, file)); commands.set(commandName, command); } });

async function startBot() { const { state, saveCreds } = await useMultiFileAuthState('baileys_auth'); const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true
});

sock.ev.on('messages.upsert', async ({ messages, type }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

    const prefix = '.';
    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands.has(commandName)) {
        try {
            await commands.get(commandName).execute(sock, msg, args);
        } catch (err) {
            console.error('خطأ أثناء تنفيذ الأمر:', err);
            await sock.sendMessage(from, { text: 'حصل خطأ أثناء تنفيذ الأمر.' }, { quoted: msg });
        }
    }
});

sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('تم قطع الاتصال، إعادة الاتصال:', shouldReconnect);
        if (shouldReconnect) {
            startBot();
        }
    } else if (connection === 'open') {
        console.log('تم الاتصال بنجاح');
    }
});

sock.ev.on('creds.update', saveCreds);

}

startBot();

