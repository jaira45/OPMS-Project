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
  
  // Find all Component-like tags ( <IconName )
  const tags = content.match(/<([A-Z][a-zA-Z0-9]*)/g) || [];
  const uniqueTags = [...new Set(tags.map(t => t.slice(1)))];
  
  // Find all icon: IconName
  const icons = content.match(/icon:\s*([A-Z][a-zA-Z0-9]*)/g) || [];
  const uniqueIcons = [...new Set(icons.map(i => i.split(':')[1].trim()))];
  
  const allUsed = [...new Set([...uniqueTags, ...uniqueIcons])];
  
  // Exclude common ones
  const excluded = ['Navbar', 'Footer', 'BottomNav', 'Link', 'Route', 'Routes', 'BrowserRouter', 'AuthProvider', 'ThemeProvider', 'ComparisonProvider', 'SocketProvider', 'PrivateRoute', 'AnimatePresence', 'motion', 'ResponsiveContainer', 'AreaChart', 'Area', 'BarChart', 'Bar', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'PieChart', 'Pie', 'Cell', 'API_URL', 'LazyImage', 'InteractiveMap', 'ThreeDPreview', 'Recommendations', 'SkeletonDetails', 'SkeletonCard', 'PropertyCard', 'Hero', 'PropertyReels', 'StatsSection', 'NewsSection', 'Testimonials', 'VoiceSearch', 'App', 'SplashScreen', 'LoginSignup', 'HomeScreen', 'UserDashboard', 'AddProperty', 'Property', 'PropertyProfile', 'Favorites', 'Inquiry', 'Admin', 'About', 'Agents', 'AgentProfile', 'Contact', 'Comparison', 'Chatbot'];

  const potIcons = allUsed.filter(u => !excluded.includes(u));

  potIcons.forEach(icon => {
      const isImported = content.includes(icon); // Simple check first
      if (isImported) {
          // Check if it's in an import from 'lucide-react'
          const regex = new RegExp(`import\\s+{[^}]*${icon}[^}]*}\\s+from\\s+['"]lucide-react['"]`, 's');
          if (!regex.test(content) && content.includes('<' + icon) && !excluded.includes(icon)) {
              // Check if it's imported from somewhere else?
              if (!content.match(new RegExp(`import\\s+${icon}\\s+from`, 's')) && !content.match(new RegExp(`import\\s+{[^}]*${icon}[^}]*}\\s+from`, 's'))) {
                  console.log(`Potential Undefined Icon/Component: ${icon} in ${filePath}`);
              }
          }
      }
  });
});
