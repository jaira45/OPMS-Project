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
  if (content.includes('Sparkles')) {
    const hasImport = content.includes("from 'lucide-react'") || content.includes('from "lucide-react"');
    const importHasSparkles = content.match(/import\s+{[^}]*Sparkles[^}]*}\s+from\s+['"]lucide-react['"]/);
    
    console.log(`File: ${filePath}`);
    console.log(`  Included: true`);
    console.log(`  Import Line Found: ${hasImport}`);
    console.log(`  Sparkles in Import: ${!!importHasSparkles}`);
    
    // Check for potential usage without tags
    const usage = (content.match(/Sparkles/g) || []).length;
    console.log(`  Total occurrences: ${usage}`);
  }
});
