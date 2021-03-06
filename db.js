// Setup the DB
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ links: [], posts: [] }).write();

module.exports = db;
