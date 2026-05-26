const fs = require('fs');

const files = ['index.html', 'saba.html'];

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Arabic Name: Change Fatha to Kasra
    // Replace صَـبـا with صِـبـا
    content = content.replace(/صَـبـا/g, 'صِـبـا');
    // Replace صَبا with صِبا
    content = content.replace(/صَبا/g, 'صِبا');

    // 2. English Name: Change Saba to Seba
    // Replace Saba -> Seba
    content = content.replace(/Saba/g, 'Seba');
    // Replace saba1.jpg, saba2.jpg back (if they were changed) - they shouldn't be affected if I just replace whole words, but let's be careful.
    // Actually, saba1.jpg and saba2.jpg are file names. I don't want to break the image links.
    // So I will revert any "seba1.jpg" back to "saba1.jpg" just in case.
    content = content.replace(/seba1\.jpg/g, 'saba1.jpg');
    content = content.replace(/seba2\.jpg/g, 'saba2.jpg');
    content = content.replace(/saba\.html/g, 'saba.html'); // revert if needed
    content = content.replace(/seba\.html/g, 'saba.html');

    // 3. Update Reason Card (r2)
    // Old: r2: { t: "أماني", d: "معاكي بحس إني مسنود على جبل، ولا حاجة تقدر تكسرني." }
    // New: r2: { t: "حبك ليا", d: "دايما ببقا واثق فيكي وانا مغمض عيني (بحبك)" }
    content = content.replace(
        /r2: \{ t: "أماني", d: "معاكي بحس إني مسنود على جبل، ولا حاجة تقدر تكسرني\." \}/g,
        'r2: { t: "حبك ليا", d: "دايما ببقا واثق فيكي وانا مغمض عيني (بحبك)" }'
    );

    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
});
