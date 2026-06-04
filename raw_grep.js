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

allFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const count = (content.match(/Sparkles/g) || []).length;
  if (count > 0) {
      console.log(`${filePath}: ${count} matches`);
  }
});
