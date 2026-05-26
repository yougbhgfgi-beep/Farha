const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure all instances of Rawan/روان are replaced with the decorated Saba
// I'll use a more robust replacement for the names in the translation objects
content = content.replace(/Rawan/g, 'Saba');
content = content.replace(/روان/g, 'صبا');

// 2. Refine the translation objects for a more "luxurious" feel
content = content.replace(/يوم ميلاد صبا 👑/g, 'ميلاد ملكة قلبي صبا 👑');
content = content.replace(/عيد ميلاد صبا 💜/g, 'أفخم هدية لأغلى صبا 💜');
content = content.replace(/إلى صبا 💜/g, 'إلى نبض قلبي صبا 💜');
content = content.replace(/عيد ميلاد سعيد يا صبا 🎂/g, 'كل سنة وأنتي أجمل وأرقى صبا 🎂');

// 3. Update the final scene text to be more romantic and "gift-like"
content = content.replace(/النهاردة مش يوم عادي/g, 'النهاردة أجمل يوم في تاريخي');
content = content.replace(/أعظم هدية جاتلي/g, 'أغلى وأفخم هدية نورت حياتي');
content = content.replace(/اليوم اللي الدنيا نورت فيه/g, 'اليوم اللي اتولدت فيه ملكة دنيتي');

// 4. Ensure the dates are correct
content = content.replace(/2025-03-09/g, '2025-05-24');
content = content.replace(/9\/3\/2005/g, '24/5/2025');
content = content.replace(/9\/3/g, '24/5');

// 5. Replace "حكاية عشقنا" if it exists (searching for likely variations)
content = content.replace(/حكاية عشقنا/g, 'بحبك');
content = content.replace(/قصة حبنا/g, 'بحبك');

// 6. Make sure the counters use the correct date
content = content.replace(/const firstSightDate = new Date\(".*"\);/g, 'const firstSightDate = new Date("2025-05-24T00:00:00");');
content = content.replace(/const birthDate = new Date\(".*"\);/g, 'const birthDate = new Date("2025-05-24T00:00:00");');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Premium update applied successfully!');
