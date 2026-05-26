const fs = require('fs');

const files = ['index.html', 'saba.html'];

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Change Kasra
    content = content.replace(/صَـبـا/g, 'صِـبـا');
    
    // In case there is "صَبا" without the tatweel (kashida)
    content = content.replace(/صَبا/g, 'صِبا');

    // Change English "Seba" to "Siba" or "Seba"? 
    // The user wrote "عدل الاسم Seba في موقع كلوو اسمها صبا بي الكسره". 
    // Wait, the user said: "عدل الاسم Seba في موقع كلوو اسمها صبا بي الكسره مش فتححه". This implies they just mean the Arabic name because they explain "الصاد عليها كسره". But they also said "عدل الاسم Seba". They might want me to change "Seba" to "Siba", or maybe they just meant "Saba" -> "Siba"? 
    // The current english name is "Saba". Wait, let me check. In finalMessageAR they had "To: Dr,Seba".
    // I should probably change "Saba" to "Siba" in English texts if needed? "Seba" is what they wrote in the message. 
    // I will change "Saba" to "Siba" where applicable in English? 
    // Actually, "صِبا" in english is often spelled "Siba". Let's check how "Saba" is spelled in the file.
});
