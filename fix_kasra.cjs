const fs = require('fs');

const files = ['index.html', 'saba.html'];

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Make absolutely sure there is NO fatha on Saad anywhere.
    // Replace any remaining "صبا" (without diacritics) with "صِبا"
    content = content.replace(/صبا/g, 'صِبا');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Fixed remaining instances of Saba to have kasra');
