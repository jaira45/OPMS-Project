const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const name = path.join(dir, file);
      if (fs.statSync(name).isDirectory()) {
        if (!name.includes('node_modules')) getFiles(name, files);
      } else if (file.endsWith('.jsx')) {
        files.push(name);
      }
    }
  } catch (e) {
    console.error(`Error reading ${dir}: ${e.message}`);
  }
  return files;
}

const allFiles = getFiles('e:/OPMS/frontend/src');
console.log(`Searching in ${allFiles.length} files...`);

allFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Sparkles')) {
    const importHasSparkles = /import\s+({[^}]*Sparkles[^}]*}|Sparkles)\s+from\s+['"]lucide-react['"]/s.test(content);
    const usageTags = (content.match(/<Sparkles/g) || []).length;
    const usageIcon = (content.match(/icon:\s*Sparkles/g) || []).length;
    const usageAttr = (content.match(/={Sparkles}/g) || []).length;
    
    console.log(`\nFile: ${filePath}`);
    console.log(`  Imported correctly: ${importHasSparkles}`);
    console.log(`  Usage (<Sparkles): ${usageTags}`);
    console.log(`  Usage (icon: Sparkles): ${usageIcon}`);
    console.log(`  Usage (={Sparkles}): ${usageAttr}`);
  }
});
