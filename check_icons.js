const fs = require('fs');
const path = require('path');

const files = [
    'e:/OPMS/frontend/src/components/PropertyReels.jsx',
    'e:/OPMS/frontend/src/components/Hero.jsx',
    'e:/OPMS/frontend/src/components/Navbar.jsx',
    'e:/OPMS/frontend/src/pages/HomeScreen.jsx',
    'e:/OPMS/frontend/src/components/PropertyCard.jsx',
    'e:/OPMS/frontend/src/pages/Agents.jsx',
    'e:/OPMS/frontend/src/pages/Contact.jsx'
];

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');

    const iconRegex = /<([A-Z][a-zA-Z0-9]+)/g;
    const usedIcons = new Set();
    let match;
    while ((match = iconRegex.exec(content)) !== null) {
        const iconName = match[1];
        if (!['motion', 'AnimatePresence', 'ReelSkeleton', 'section', 'div', 'button', 'video', 'img', 'span', 'h2', 'p', 'h3', 'Link', 'Navbar', 'Hero', 'PropertyReels', 'StatsSection', 'NewsSection', 'Testimonials', 'Footer', 'SkeletonCard', 'BottomNav', 'main', 'AnimatePresence'].includes(iconName)) {
            usedIcons.add(iconName);
        }
    }

    const importRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-react'/gs;
    let importedIcons = [];
    while ((match = importRegex.exec(content)) !== null) {
        const icons = match[1].replace(/\n/g, ' ').split(',').map(i => i.trim()).filter(Boolean);
        importedIcons = importedIcons.concat(icons);
    }

    const missing = Array.from(usedIcons).filter(icon => !importedIcons.includes(icon));
    
    if (missing.length > 0) {
        console.log(`File: ${filePath}`);
        console.log('Used Icons:', Array.from(usedIcons));
        console.log('Imported Icons:', importedIcons);
        console.log('Missing Icons:', missing);
        console.log('---');
    }
});
