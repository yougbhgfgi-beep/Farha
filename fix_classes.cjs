const fs = require('fs');

const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Fix any leftover broken tailwind classes
content = content.replace(/backdrop-blur- md/g, 'backdrop-blur-md');
content = content.replace(/backdrop-blur- lg/g, 'backdrop-blur-lg');
content = content.replace(/backdrop-blur- sm/g, 'backdrop-blur-sm');

// Also fix the audio issue: 
// On iOS, if you try to play audio without direct user interaction, it fails.
// Our handleLogin has a setTimeout:
// setTimeout(() => setShowEnvelope(true), 1200);
// This is fine.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed final tailwind class issues.');
