const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix hardcoded JSX tags to use className instead of class
content = content.replace(/<span class='/g, "<span className='");

// 2. Use dangerouslySetInnerHTML for fields containing HTML
// - scene3
content = content.replace(/{t\.scene3}/g, '<span dangerouslySetInnerHTML={{ __html: t.scene3 }}></span>');
// - infinity
content = content.replace(/{t\.infinity}/g, '<span dangerouslySetInnerHTML={{ __html: t.infinity }}></span>');
// - thanks (if it had HTML, but checking just in case)
// - any other t fields that might have HTML now

// Let's check for t.clock1.title and t.clock2.title as well
content = content.replace(/{t\.clock1\.title}/g, '<span dangerouslySetInnerHTML={{ __html: t.clock1.title }}></span>');
content = content.replace(/{t\.clock2\.title}/g, '<span dangerouslySetInnerHTML={{ __html: t.clock2.title }}></span>');

// Check EnvelopeComponent title (Line 1635)
// It's currently: <h2 className="text-3xl md:text-5xl font-bold text-gray-800 font-premium">إلى <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>صَـبـا</span> 💜</h2>
// This is actually fine as JSX now because I fixed the className in step 1.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final JSX and HTML rendering fixes applied!');
