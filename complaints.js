const fs = require("fs");
const path = "./database/complaints.json";

function loadComplaints() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "[]");
  return JSON.parse(fs.readFileSync(path));
}

function saveComplaints(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function addComplaint({ from, group, text }) {
  const complaints = loadComplaints();
  complaints.push({
    from,
    group,
    text,
    date: new Date().toISOString()
  });
  saveComplaints(complaints);
}

function getComplaints() {
  return loadComplaints();
}

module.exports = {
  addComplaint,
  getComplaints
};