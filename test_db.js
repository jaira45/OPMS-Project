const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const uris = [
  "mongodb+srv://jyotigupta85188_db_user:jyotigupta85188_db_user@cluster0.3edaqfz.mongodb.net/?appName=Cluster0",
  "mongodb+srv://jyotigupta85188:jyotigupta85188@cluster0.3edaqfz.mongodb.net/?appName=Cluster0",
  "mongodb+srv://jyotigupta85188:jyotigupta@cluster0.3edaqfz.mongodb.net/?appName=Cluster0"
];

async function test() {
  for (let uri of uris) {
    try {
      console.log("Testing:", uri);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log("SUCCESS");
      process.exit(0);
    } catch (err) {
      console.log("FAILED:", err.message);
    }
  }
  process.exit(0);
}
test();
