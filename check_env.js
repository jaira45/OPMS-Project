const fs = require('fs');
const contents = fs.readFileSync('e:\\OPMS\\backend\\.env', 'utf8');
console.log(JSON.stringify(contents));
