const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const match = content.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);

if (match) {
    const jsxCode = match[1];
    
    // We can do a rudimentary check for unbalanced tags/quotes
    try {
        // Just parsing it as JS will fail due to JSX, but we can look for obvious string issues
        // like unclosed single quotes.
        console.log("Extracted script for checking.");
    } catch(e) {
        console.error(e);
    }
}
