const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Revert the broken classes
content = content.replace(/backdrop-blur- \[-webkit-backdrop-filter:blur\(var\(--tw-backdrop-blur\)\)\]/g, 'backdrop-blur-');

// Make sure body class bg-[#090A0F] is applied safely and body bg color is set in style tag
// I will check the babel script to ensure no other syntax errors were introduced
const match = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (match) {
    fs.writeFileSync('checker2.jsx', match[1]);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed invalid Tailwind arbitrary values.');
