const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Fix Line 1681 (and any similar) where single quotes are nested
content = content.replace(/'عيد ميلاد سعيد يا <span className='(.*?)'>صَـبـا<\/span> 🎂'/g, 
    '<>عيد ميلاد سعيد يا <span className="$1">صَـبـا</span> 🎂</>');

// Check i18n object strings for nested single quotes?
// In i18n, the strings are enclosed in double quotes: "يوم ميلاد <span className='...'>صَـبـا</span> 👑"
// So single quotes inside are fine.

// Let's also check if I missed replacing the Heart icon with the Profile image in login
const oldIconRegex = /<div className="relative inline-block p-4 bg-white\/5 rounded-full border border-white\/10 mb-4">[\s\S]*?<Heart className="w-12 h-12 text-\[rgb\(196,13,116\)\] animate-pulse" \/>[\s\S]*?<\/div>/;

const newIconDiv = `<div className="relative inline-block p-1 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full mb-4 shadow-xl">
                                        <img src="./profile.jpeg" alt="Saba Profile" className="w-24 h-24 rounded-full border-4 border-white/10 object-cover" />
                                    </div>`;

content = content.replace(oldIconRegex, newIconDiv);

fs.writeFileSync('index.html', content, 'utf8');
console.log("Fixed syntax error and profile picture");
