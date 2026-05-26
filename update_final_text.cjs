const fs = require('fs');

const files = ['index.html', 'saba.html'];

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Update scene3b in finalScene
    content = content.replace(
        /scene3b: "كل سنة وأنتِ الأمان والونس والبيت\."/g,
        'scene3b: "كل سنه وانا جمبك وكل سنه واحنا مع بعض"'
    );

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Final scene text updated.');
