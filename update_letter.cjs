const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change dates
content = content.replace(/checkDay === "24"/g, 'checkDay === "9" || checkDay === "09"');
content = content.replace(/2025-05-24T00:00:00/g, '2025-05-09T00:00:00');
content = content.replace(/24\/5\/2025/g, '9/5/2025');
content = content.replace(/24\/5/g, '9/5');

// 2. Replace finalMessageAR
const newFinalMessageAR = `From: eng,mohamed
To: Dr,Seba (subsubty)

اكتر حد واقرب حد لقلبي واكتر حد غيرني للاحسن   اتولد انهاردا " م محتاج اقولك اني بحبك مهما اقول م هوصف بالكلام عمري متخيلت ان حد ييجي واعمل كدا ليه او يغيرني كدا يمكن انتي مش حاسه بكدا بس انا متاكد بكدا واي حد بقا شايف كدا وبحبك اوي اوي يكل حياتي ومهما كنت بعيد عنك بسال عنك كل يوم وبطمن عليكي كل يوم من غير منتي تعرفي وانتي مش معايا كانك معايا مبعملش حاجه غلط ولا بعمل اي حاجه ممكن انها تدايقك ويومي بيعدي لما بطمن عليكي كل يوم ومكانك كدا كدا فقلبي وانشاء الله هنتقابل واحنا احسن من كدا وياريت المشكله ال عندك تقوليها ونحلها مع بعض وانا واثق وعارف ومتاكد انها ابسط مما تتخيلي بس تقوليلي ونعرف وهنوصل لحل اكيد يناسبك ويريحك وانا بحبك اوي اوي وكل سنه وانتي طيبه وانتي اقرب لقلبي يحته مني ويارب تبقي مبسوطه دايما وابقا جمبك وبطمن عليكي دي عندي كفايه (بحبك) 

"यदि आपके साथ निकटता एक युद्ध है, तो मुझे युद्धों से प्यार है!"`;

// Find the start and end of finalMessageAR
const regex = /const finalMessageAR = `[\s\S]*?`;/;
content = content.replace(regex, 'const finalMessageAR = `' + newFinalMessageAR + '`;');

// 3. Add profile image to login page
// We will replace the Heart icon div with an image div
const oldIconDiv = `<div className="relative inline-block p-4 bg-white/5 rounded-full border border-white/10 mb-4">
                                        <Heart className="w-12 h-12 text-[rgb(196,13,116)] animate-pulse" />
                                    </div>`;
const newIconDiv = `<div className="relative inline-block p-1 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full mb-4 shadow-xl">
                                        <img src="./profile.jpeg" alt="Saba Profile" className="w-24 h-24 rounded-full border-4 border-white/10 object-cover" />
                                    </div>`;

content = content.replace(oldIconDiv, newIconDiv);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update applied successfully');
