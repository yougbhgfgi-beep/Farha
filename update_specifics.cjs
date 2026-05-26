const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. LoveNote Text
content = content.replace(/<>ضحكتك بتنور دنيتي يا <span className=".*?">صَـبـا<\/span> ✨<\/>/, '"ضحكتك بتنور دنيتي يا صبا ✨"');
content = content.replace(/"ضحكتك بتنور دنيتي يا <span className='.*?'>صَـبـا<\/span> ✨"/, '"ضحكتك بتنور دنيتي يا صبا ✨"');
content = content.replace(/'<>ضحكتك بتنور دنيتي يا <span className=".*?">صَـبـا<\/span> ✨<\/>'/, '"ضحكتك بتنور دنيتي يا صبا ✨"');

// 2. Clock2 subtitle
content = content.replace(/subtitle: "منذ \(9\/5\/2025\)"/g, 'subtitle: "منذ (9/5)"');

// 3. Clock1 title and subtitle
content = content.replace(/title: "اكتملت هديتك يا أجمل صبا! ✨"/g, 'title: "اليوم الي عرفنا بعض ✨"');
// Wait, the subtitle for clock1 needs to be changed? 
// User said: "عدل عداد تاني اكتملت هديتك يا أجمل صبا! ✨ كل نجمة في السما بتشهد على حبي ليكي... نورتي دنيتي يا ست البنات ده وغير كلام خلي اليوم الي عرفنا بعض و خلي تاريخ 2025/5/24"
// I will change the title to "اليوم الي عرفنا بعض ✨" and change the date.
content = content.replace(/const firstSightDate = new Date\("2025-05-09T00:00:00"\);/g, 'const firstSightDate = new Date("2025-05-24T00:00:00");');

// 4. Timeline items
const newTimelineItems = `items: [
                        { pic: "saba1.jpg", text: "أجمل صدفة في حياتي 💖", desc: "اليوم اللي دخلتي فيه حياتي كان أحلى يوم، وجودك نور دنيتي وفرح قلبي." },
                        { pic: "saba2.jpg", text: "بحبك أكتر من أي حاجة 💜", desc: "كل يوم بيمر عليا بتأكد إنك العوض الجميل اللي كنت بستناه، بحبك قد الدنيا." },
                        { pic: "profile.jpeg", text: "يا أحلى اختياراتي 💍", desc: "لو الأيام رجعت بيا ألف مرة، هختارك إنتي برضه، مفيش حد يقدر يملا مكانك." }
                    ]`;
// Replace the old items array (for ar)
content = content.replace(/items: \[\s*\{\s*pic: "saba1\.jpg"[\s\S]*?\]/g, newTimelineItems);

// 5. Profile Picture Styling
content = content.replace(/<img src="\.\/profile\.jpeg" alt="Saba Profile" className="w-24 h-24 rounded-full border-4 border-white\/10 object-cover" \/>/g, 
                          '<img src="./profile.jpeg" alt="Saba Profile" className="w-28 h-28 rounded-full border-4 border-white/10 object-cover object-center" />');
// The user says "عدل صوره الي ع بروفايل مقاس ظبتها" (adjust profile picture size to be fixed/better). I changed it to w-28 h-28 object-cover object-center.

// 6. Login Title
content = content.replace(/login: \{ title: "<span className='font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold'>صَـبـا<\/span> 👑"/g, 'login: { title: "بحبك"');
// Wait, the actual line is:
// login: { title: "يوم ميلاد <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>صَـبـا</span> 👑", ...
content = content.replace(/login: \{ title: "يوم ميلاد <span className='font-script text-\[rgb\(196,13,116\)\] text-shimmer px-1 font-bold'>صَـبـا<\/span> 👑"/g, 'login: { title: "بحبك"');
// Fallback if already changed
content = content.replace(/login: \{ title: "يوم ميلاد صبا 👑"/g, 'login: { title: "بحبك"');

// 7. Login Password Date
content = content.replace(/checkDay === "9" \|\| checkDay === "09"/g, 'checkDay === "24"');
// Year is already 2025, month is 5.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Specific updates applied successfully');
