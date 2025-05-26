const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, "../commands");

module.exports = async function handleMessage(sock, msg, metadata) {
  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
  if (!text) return;

  const args = text.trim().split(" ");
  const commandName = args.shift().toLowerCase();

  const commandFiles = [];

  function getCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getCommands(filePath);
      } else if (file.endsWith(".js")) {
        commandFiles.push(filePath);
      }
    }
  }

  getCommands(commandsPath);

  for (const file of commandFiles) {
    const command = require(file);
    if (command.name === commandName) {
      return command.execute(sock, msg, args, metadata);
    }
  }
};