const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update firstSightDate month to 7 (July)
content = content.replace(/const firstSightDate = new Date\("2025-05-24T00:00:00"\);/g, 'const firstSightDate = new Date("2025-07-24T00:00:00");');

// 2. Update login password month to 7 (July)
content = content.replace(/\(checkMonth === "5" \|\| checkMonth === "05"\)/g, '(checkMonth === "7" || checkMonth === "07")');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Month updated to 7 for meeting date and password.');
