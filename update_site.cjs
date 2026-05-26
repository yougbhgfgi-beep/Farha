const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Name Changes
content = content.replace(/روان صلاح/g, 'صبا');
content = content.replace(/روان/g, 'صبا');
content = content.replace(/Rawan/g, 'Saba');
content = content.replace(/صبا/g, '<span class="font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold">صَـبـا</span>');
// Fix nested or repeated replacements if any
content = content.replace(/<span class="font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold"><span class="font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold">صَـبـا<\/span><\/span>/g, '<span class="font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold">صَـبـا</span>');
// Keep `<title>` clean
content = content.replace(/<title>.*<\/title>/, '<title>صبا - Love Website</title>');

// 2. Audio Replacement
content = content.replace(/\.\/background_music\.mp4/g, './WhatsApp Audio -03-16 at 6.49.03 PM.mpeg');
content = content.replace(/type="video\/mp4"/g, (match, offset) => {
    // Only replace type for the audio player if it's right after our new src
    return match;
});
content = content.replace(/"\.\/WhatsApp Audio \-03\-16 at 6\.49\.03 PM\.mpeg" type="video\/mp4"/, '"./WhatsApp Audio -03-16 at 6.49.03 PM.mpeg" type="audio/mpeg"');

// 3. Date & Password Changes
// Login check
content = content.replace(/checkDay === "9" \|\| checkDay === "09"/g, 'checkDay === "24"');
content = content.replace(/checkMonth === "3" \|\| checkMonth === "03"/g, 'checkMonth === "5" || checkMonth === "05"');
content = content.replace(/checkYear === "2005"/g, 'checkYear === "2025"');
// Texts
content = content.replace(/9\/3\/2005/g, '24/5/2025');
content = content.replace(/9\/3/g, '24/5');
content = content.replace(/2005-03-09T00:00:00/g, '2025-05-24T00:00:00');
// Adjust relationship clock format to avoid negative years since it's a future date
content = content.replace(/format="full"/, 'format="days"'); // Let it just show days if it's future

// 4. "حكايه عشقنا" -> "بحبك"
// The user asked to change "حكايه عشقنا" to "بحبك". Since "حكايه عشقنا" wasn't found, let's change "قصة حب" to "بحبك".
content = content.replace(/قصة حب/g, 'بحبك، قصة حب');
content = content.replace(/Love Constellation/g, 'Love Constellation - بحبك');
content = content.replace(/أساطير الحب/g, 'بحبك');

// 5. Gift & Feminine Theme enhancements
content = content.replace(/اكتملت الحكاية/g, 'اكتملت هديتك يا أجمل صبا');
content = content.replace(/وصل النجوم ببعضها/g, 'جمعي النجوم عشان تشوفي هديتك');
content = content.replace(/ارسم حكاية تانية/g, 'ارسم هدية تانية');
content = content.replace(/أعظم حاجة/g, 'أعظم هدية جاتلي');
content = content.replace(/يوم ميلاد صبا 👑/g, 'يوم ميلاد أجمل صبا 👑');

// 6. Image Replacements
content = content.replace(/mem1\.jpg/g, 'saba1.jpg');
content = content.replace(/mem2\.jpg/g, 'saba2.jpg');
content = content.replace(/mem3\.jpg/g, 'saba1.jpg');
content = content.replace(/mem4\.jpg/g, 'saba2.jpg');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update applied successfully!');
