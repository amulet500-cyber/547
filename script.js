let allJatakas = [];

async function loadJatakas() {
    try {
        const response = await fetch('547.txt');
        const text = await response.text();
        
        // แยกข้อความโดยหาจุดที่ขึ้นต้นด้วย [เลข]
        const matches = text.match(/\[.*?\][\s\S]*?(?=\[|$)/g);
        
        if (matches) {
            allJatakas = matches.map(item => ({
                fullText: item.trim()
            }));
            console.log("โหลดชาดกสำเร็จ:", allJatakas.length, "เรื่อง");
        }
    } catch (e) {
        console.error("โหลดไฟล์ไม่สำเร็จเจ้าค่ะ:", e);
    }
}

loadJatakas();

function predictThreeCards() {
    if (allJatakas.length === 0) {
        alert("กำลังอ่านชาดก 547 เรื่องอยู่เจ้าค่ะ รอสักครู่...");
        return;
    }

    let selections = [];
    while (selections.length < 3) {
        let rand = allJatakas[Math.floor(Math.random() * allJatakas.length)];
        if (!selections.includes(rand)) selections.push(rand);
    }

    document.getElementById("result").innerHTML = selections.map((item, index) => {
        // อัปเดต Regex: ใช้ ^ เพื่อหาเฉพาะบรรทัดที่ขึ้นต้นด้วยคำว่า "บทสรุป โพธิพยากรณ์:"
        // และรองรับทั้งเครื่องหมายคำพูดไทยและสากล
        const match = item.fullText.match(/^บทสรุป โพธิพยากรณ์:\s*[""“](.*?)[""”]/m);
        const summaryTitle = match ? match[1].trim() : "โพธิพยากรณ์";
        
        return `
        <div class="prediction-card" style="margin-bottom:20px; padding:25px; border: 3px solid #b8860b; border-radius: 15px; background: #fffaf0; text-align: left; box-shadow: 4px 4px 10px rgba(0,0,0,0.1);">
            <h4 style="color:#d35400; margin-top:0; border-bottom: 2px solid #d35400; padding-bottom: 8px;">
                ${['เหตุ จากอดีต', 'สภาวะ ปัจจุบัน', 'โพธิธรรม สู่อนาคต'][index]}
            </h4>
            <h3 style="color:#8b4513; font-size: 20px; margin: 15px 0; font-weight: bold;">✨ ${summaryTitle}</h3>
            <div style="font-size: 15px; white-space: pre-wrap; color: #333; line-height: 1.6;">${item.fullText}</div>
        </div>
    `;
    }).join('');
}
