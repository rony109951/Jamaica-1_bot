const fs = require("fs");
const path = "./database/warnings.json";

function loadWarnings() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
  return JSON.parse(fs.readFileSync(path));
}

function saveWarnings(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function addWarning(userId) {
  const warnings = loadWarnings();
  if (!warnings[userId]) warnings[userId] = 0;
  warnings[userId]++;
  saveWarnings(warnings);
  return warnings[userId];
}

function getWarningCount(userId) {
  const warnings = loadWarnings();
  return warnings[userId] || 0;
}

function clearWarnings(userId) {
  const warnings = loadWarnings();
  delete warnings[userId];
  saveWarnings(warnings);
}

module.exports = {
  addWarning,
  getWarningCount,
  clearWarnings,
};