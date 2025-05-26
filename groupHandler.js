
const config = require("../config/config");

module.exports = {
  async onParticipantAdd(sock, participant, groupMetadata) {
    if (!config.welcomeMessages) return;

    const message = `نورت يا شق🫢💓 @${participant.split("@")[0]} في جروب ${groupMetadata.subject}`;
    await sock.sendMessage(groupMetadata.id, { text: message, mentions: [participant] });
  },

  async onParticipantRemove(sock, participant, groupMetadata) {
    const message = `مع السلامة @${participant.split("@")[0]}، اهو غار في داهية 😂`;
    await sock.sendMessage(groupMetadata.id, { text: message, mentions: [participant] });
  }
};