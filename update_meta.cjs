const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add OG Tags
const ogTags = `
    <!-- Open Graph Metadata -->
    <meta property="og:title" content="يوم ميلاد أجمل صبا 👑" />
    <meta property="og:description" content="أفخم هدية وأجمل قصة حب لملكة دنيتي صبا 💖" />
    <meta property="og:image" content="saba1.jpg" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://happy-birthday-saba.com" />
`;

// Insert OG tags right after <title> if not already there
if (!content.includes('og:title')) {
    content = content.replace(/<title>صبا - Love Website<\/title>/, `<title>صبا - Love Website</title>\n${ogTags}`);
}

// 2. Fix Audio Tag for iOS
content = content.replace(/<audio ref=\{audioRef\} loop>/, '<audio ref={audioRef} loop playsInline preload="auto">');

// 3. Replace Video Source and add playsInline
content = content.replace(/<video className="w-full" controls id="newVideo"/, '<video className="w-full" controls id="newVideo" playsInline webkit-playsinline');
content = content.replace(/"\.\/whatsapp_video\.mp4"/, '"./Whpp Video 2026-02-11 at 9.35.45 PM.mp4"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Link info, video, and iOS compatibility updated successfully!');
