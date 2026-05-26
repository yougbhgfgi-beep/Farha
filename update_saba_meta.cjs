const fs = require('fs');

const filePath = 'saba.html';
let content = fs.readFileSync(filePath, 'utf8');

// Update OG Metadata for perfect WhatsApp sharing
content = content.replace(/<meta property="og:title" content=".*?" \/>/, '<meta property="og:title" content="عيد ميلاد صبا 🎂✨" />');
content = content.replace(/<meta property="og:description" content=".*?" \/>/, '<meta property="og:description" content=" From Eng Mohamed to Dr Seba..  أجمل قصة حب مكتوبة في يوم ميلادك 💖" />');
content = content.replace(/<meta property="og:image" content=".*?" \/>/, '<meta property="og:image" content="./profile.jpeg" />');

// Ensure the title is also updated
content = content.replace(/<title>.*?<\/title>/, '<title>Saba\'s Birthday 🎂</title>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Saba.html metadata updated for WhatsApp.');
