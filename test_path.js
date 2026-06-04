const fs = require('fs');
const content = fs.readFileSync('e:/OPMS/frontend/src/pages/HomeScreen.jsx', 'utf8');
console.log('Included Sparkles?', content.includes('Sparkles'));
console.log('Import regex match?', /import\s+({[^}]*Sparkles[^}]*}|Sparkles)\s+from\s+['"]lucide-react['"]/s.test(content));
console.log('Usage tags count:', (content.match(/<Sparkles/g) || []).length);
