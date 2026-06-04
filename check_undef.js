const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = path.join(dir, file);
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
  const hasSparkles = content.includes('Sparkles');
  if (hasSparkles) {
    const isImported = /import\s+({[^}]*Sparkles[^}]*}|Sparkles)\s+from\s+['"]lucide-react['"]/s.test(content);
    const isUsed = content.includes('<Sparkles') || 
                   content.includes('icon: Sparkles') || 
                   content.includes('icon={Sparkles}') || 
                   content.includes('Sparkles className');
    
    if (isUsed && !isImported) {
      console.log(`[UNDEF] ${filePath}`);
    }
  }
});
