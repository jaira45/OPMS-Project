const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = path.join(dir, file).replace(/\\/g, '/');
    if (fs.statSync(name).isDirectory()) {
      if (!name.includes('node_modules')) getFiles(name, files);
    } else if (file.endsWith('.jsx')) {
      files.push(name);
    }
  }
  return files;
}

const allFiles = getFiles('e:/OPMS/frontend/src');
console.log(`Found ${allFiles.length} files.`);
allFiles.forEach(f => {
    if (f.includes('HomeScreen')) console.log(`Found: ${f}`);
});
