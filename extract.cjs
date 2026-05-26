const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Extract the script tag content
const match = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (match) {
    fs.writeFileSync('checker.jsx', match[1]);
    console.log("Extracted checker.jsx");
} else {
    console.log("Could not find script block");
}
