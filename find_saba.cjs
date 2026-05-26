const fs = require('fs');
const content = fs.readFileSync('saba.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
    if (line.includes('ص')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
});
