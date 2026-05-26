const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the nested quotes issue by replacing double quotes inside the span with single quotes
// Also ensures we don't have broken strings
content = content.replace(/<span class=\\"/g, "<span class='");
content = content.replace(/<span class="/g, "<span class='");
content = content.replace(/text-shimmer px-1 font-bold\\">/g, "text-shimmer px-1 font-bold'>");
content = content.replace(/text-shimmer px-1 font-bold">/g, "text-shimmer px-1 font-bold'>");

// Also fix the [rgb(...)] issue which might be interpreted as an array or something if not careful, 
// though in a string it's fine. The main issue is the double quotes.

// Fix other occurrences like the result-heart
content = content.replace(/result: "النتيجة: حب لا نهائي <span class='result-heart'>/g, 'result: "النتيجة: حب لا نهائي <span class=\'result-heart\'>');

// Let's do a more global fix for any double quotes inside the strings in i18n
// This is risky with regex, so I'll just target the specific ones I added.

const sabaSpanFixed = "<span class='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>صَـبـا</span>";
const sabaSpanBroken = '<span class="font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold">صَـبـا</span>';

// Escape the broken one for regex
const sabaSpanBrokenRegex = /<span class="font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold">صَـبـا<\/span>/g;
content = content.replace(sabaSpanBrokenRegex, sabaSpanFixed);

// Now handle the escaping in React components
// 1. Login Title
content = content.replace(/<h1 className="text-4xl font-bold text-white tracking-tight">\{t\.login\.title\}<\/h1>/, 
                         '<h1 className="text-4xl font-bold text-white tracking-tight" dangerouslySetInnerHTML={{ __html: t.login.title }}></h1>');

// 2. Envelope Header
content = content.replace(/<h2 className="text-3xl md:text-5xl font-bold text-gray-800 font-premium">إلى \{lang === 'ar' \? finalMessageAR : finalMessageEN\}<\/h2>/, 
                         ''); // Wait, I need to check where this was.

// Let's check line 1635 again.
// <h2 className="text-3xl md:text-5xl font-bold text-gray-800 font-premium">إلى <span class="font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold">صَـبـا</span> 💜</h2>
// This is hardcoded in JSX, so it MUST use single quotes for the class or be a string.
// Since it's in a JSX block, `class` should be `className`.
content = content.replace(/<h2 className="text-3xl md:text-5xl font-bold text-gray-800 font-premium">إلى <span class="font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold">صَـبـا<\/span> 💜<\/h2>/g, 
                         '<h2 className="text-3xl md:text-5xl font-bold text-gray-800 font-premium">إلى <span className=\'font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold\'>صَـبـا</span> 💜</h2>');

// 3. Final Scene Names
content = content.replace(/<h1 className="text-4xl xs:text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 animate-pulse-slow mb-8 px-4">\s*<span class="font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold">صَـبـا<\/span>\s*<\/h1>/g,
                         '<h1 className="text-4xl xs:text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 animate-pulse-slow mb-8 px-4"><span className=\'font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold\'>صَـبـا</span></h1>');

content = content.replace(/<p className="mt-12 text-2xl font-script text-white\/60 animate-slide-up"><span class="font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold">صَـبـا<\/span> و بس 💖<\/p>/g,
                         '<p className="mt-12 text-2xl font-script text-white/60 animate-slide-up"><span className=\'font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold\'>صَـبـا</span> و بس 💖</p>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Syntax and React fixes applied successfully!');
