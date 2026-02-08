/* ===========================
   Layer 2 Quiz — 15 Questions
   Data Link Layer
   =========================== */

const layer2Questions = [
    {
        q: "מה תפקידה העיקרי של שכבה 2 (Data Link Layer) במודל OSI?",
        options: ["ניתוב חבילות בין רשתות", "העברת מסגרות אמינה בין מכשירים באותה רשת פיזית", "המרת ביטים לאותות חשמליים", "ניהול חיבורי אפליקציה"],
        correct: 1,
        explain: "שכבה 2 אחראית על העברת Frames (מסגרות) בצורה אמינה בתוך אותה רשת מקומית (LAN), בעוד שכבה 3 מטפלת בניתוב בין רשתות."
    },
    {
        q: "מהו אורך כתובת MAC?",
        options: ["32 ביטים (4 בתים)", "48 ביטים (6 בתים)", "64 ביטים (8 בתים)", "128 ביטים (16 בתים)"],
        correct: 1,
        explain: "כתובת MAC היא בת 48 ביטים (6 בתים), הנכתבת בפורמט הקסדצימלי כמו AA:BB:CC:11:22:33."
    },
    {
        q: "מה מייצגים 3 הבתים הראשונים בכתובת MAC?",
        options: ["כתובת הרשת", "מזהה המכשיר", "OUI — מזהה היצרן", "גרסת הפרוטוקול"],
        correct: 2,
        explain: "OUI (Organizationally Unique Identifier) — 3 הבתים הראשונים מזהים את יצרן כרטיס הרשת (Cisco, Intel, Apple וכו')."
    },
    {
        q: "מהי כתובת ה-Broadcast ב-Ethernet?",
        options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "11:11:11:11:11:11", "AA:AA:AA:AA:AA:AA"],
        correct: 1,
        explain: "FF:FF:FF:FF:FF:FF היא כתובת ה-Broadcast — מסגרת שנשלחת לכתובת זו תגיע לכל המכשירים ברשת המקומית."
    },
    {
        q: "מה ההבדל העיקרי בין Hub ל-Switch?",
        options: ["Hub מהיר יותר מ-Switch", "Switch שולח מסגרות רק לפורט היעד, Hub שולח לכולם", "Hub תומך ב-VLAN, Switch לא", "אין הבדל — הם עובדים אותו דבר"],
        correct: 1,
        explain: "Switch לומד כתובות MAC ומעביר מסגרת רק לפורט שבו נמצא היעד. Hub שולח הכל לכל הפורטים — בזבזני ויוצר Collisions."
    },
    {
        q: "איך Switch לומד כתובות MAC?",
        options: ["מנהל הרשת מזין אותן ידנית", "הוא קורא את Source MAC מכל מסגרת נכנסת", "הוא שולח ARP לכל המכשירים", "הוא מקבל את הכתובות מ-DHCP"],
        correct: 1,
        explain: "כשמסגרת מגיעה לפורט, ה-Switch קורא את Source MAC Address ושומר בטבלת ה-MAC שלו: 'כתובת X נמצאת בפורט Y'."
    },
    {
        q: "מה עושה Switch כשכתובת היעד (Destination MAC) לא מופיעה בטבלה שלו?",
        options: ["זורק את המסגרת", "שולח את המסגרת לכל הפורטים (Flooding)", "שולח שגיאה למקור", "מעביר את המסגרת לנתב"],
        correct: 1,
        explain: "כשה-Destination MAC לא מוכר, ה-Switch מבצע Flooding — שולח את המסגרת לכל הפורטים חוץ מהמקור, כדי למצוא את היעד."
    },
    {
        q: "מה תפקידו של FCS (Frame Check Sequence) במסגרת Ethernet?",
        options: ["הצפנת הנתונים", "בדיקת שגיאות (Error Detection)", "דחיסת הנתונים", "ניתוב המסגרת"],
        correct: 1,
        explain: "FCS משתמש באלגוריתם CRC (Cyclic Redundancy Check) כדי לזהות אם המסגרת נפגמה במהלך השידור. אם יש שגיאה — המסגרת נזרקת."
    },
    {
        q: "מהו ARP ומה הוא עושה?",
        options: ["פרוטוקול ניתוב שמוצא נתיבים", "פרוטוקול שממפה כתובת IP לכתובת MAC", "פרוטוקול שמצפין תעבורה", "פרוטוקול שמקצה כתובות IP"],
        correct: 1,
        explain: "ARP (Address Resolution Protocol) מתרגם כתובת IP לכתובת MAC. המחשב שולח ARP Request (Broadcast) ומקבל ARP Reply עם כתובת ה-MAC."
    },
    {
        q: "מהי הבעיה שנוצרת כשיש לולאות (Loops) ברשת Switched?",
        options: ["האינטרנט מתנתק", "Broadcast Storm — מסגרות מוכפלות ללא סוף והרשת קורסת", "הכתובות IP משתנות", "ה-Switch מתחמם יותר מדי"],
        correct: 1,
        explain: "לולאה גורמת ל-Broadcast Storm: מסגרות Broadcast מוכפלות שוב ושוב בכל Switch, עד שהרשת מוצפת לחלוטין וקורסת."
    },
    {
        q: "מה עושה STP (Spanning Tree Protocol)?",
        options: ["מצפין תעבורה ברשת", "מונע לולאות על ידי חסימת נתיבים מיותרים", "מגדיל את מהירות הרשת", "מקצה כתובות IP למכשירים"],
        correct: 1,
        explain: "STP בוחר Root Bridge, מחשב נתיבים, וחוסם פורטים מיותרים כדי ליצור טופולוגיית עץ ללא לולאות. אם נתיב נופל — הוא פותח חלופה."
    },
    {
        q: "מי נבחר כ-Root Bridge ב-STP?",
        options: ["ה-Switch עם הכי הרבה פורטים", "ה-Switch עם ה-Bridge ID (BID) הנמוך ביותר", "ה-Switch הראשון שהודלק", "ה-Switch עם הכי הרבה VLANs"],
        correct: 1,
        explain: "ה-Switch עם ה-Bridge ID (BID) הנמוך ביותר נבחר כ-Root Bridge. ה-BID מורכב מ-Priority (ברירת מחדל 32768) + MAC Address."
    },
    {
        q: "מה היתרון העיקרי של VLAN?",
        options: ["מגדיל את מהירות הרשת פי 10", "מאפשר חלוקה לוגית של רשת פיזית אחת למספר רשתות נפרדות", "מחליף את הצורך בכבלים פיזיים", "מבטל את הצורך ב-Switch"],
        correct: 1,
        explain: "VLAN מאפשר לחלק Switch פיזי אחד לרשתות לוגיות נפרדות — לדוגמה, הנהלה ב-VLAN 10 וכספים ב-VLAN 30, עם הפרדה מלאה ביניהם."
    },
    {
        q: "מה ההבדל בין Access Port ל-Trunk Port?",
        options: ["Access מהיר יותר מ-Trunk", "Access שייך ל-VLAN אחד, Trunk מעביר מספר VLANs עם Tag", "Trunk מחובר רק למדפסות", "אין הבדל — שניהם עובדים אותו דבר"],
        correct: 1,
        explain: "Access Port שייך ל-VLAN אחד בלבד (מחובר למכשיר קצה). Trunk Port מעביר מסגרות ממספר VLANs, עם תיוג 802.1Q שמציין לאיזה VLAN כל מסגרת שייכת."
    },
    {
        q: "כדי שמכשירים ב-VLANs שונים יוכלו לתקשר ביניהם, מה צריך?",
        options: ["Switch נוסף", "Hub", "נתב (Router) או Layer 3 Switch", "כבל Crossover"],
        correct: 2,
        explain: "מכשירים ב-VLANs שונים לא יכולים לתקשר ישירות — צריך Router או Layer 3 Switch שיבצע Inter-VLAN Routing. הפתרון הנפוץ: Router-on-a-Stick או SVI."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-card').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = layer2Questions[currentQuestion];
    document.getElementById('q-number').textContent = currentQuestion + 1;
    document.getElementById('q-text').textContent = q.q;

    const optionsEl = document.getElementById('quiz-options');
    optionsEl.innerHTML = q.options.map((opt, i) =>
        `<div class="quiz-option" data-index="${i}" onclick="selectAnswer(${i})">${opt}</div>`
    ).join('');

    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('quiz-next-btn').disabled = true;
    answered = false;

    // Progress
    const fill = ((currentQuestion) / layer2Questions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = fill + '%';
    document.getElementById('quiz-progress-text').textContent = `שאלה ${currentQuestion + 1} מתוך ${layer2Questions.length}`;
}

function selectAnswer(idx) {
    if (answered) return;
    answered = true;
    const q = layer2Questions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('correct');
        if (i === idx && idx !== q.correct) opt.classList.add('wrong');
    });

    const isCorrect = idx === q.correct;
    if (isCorrect) score++;

    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden');
    feedback.style.background = isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';
    document.getElementById('feedback-icon').textContent = isCorrect ? '✅' : '❌';
    document.getElementById('feedback-text').textContent = q.explain;
    document.getElementById('quiz-next-btn').disabled = false;

    if (currentQuestion === layer2Questions.length - 1) {
        document.getElementById('quiz-next-btn').querySelector('span').textContent = 'סיכום';
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= layer2Questions.length) {
        showResults();
        return;
    }
    showQuestion();
}

function showResults() {
    document.getElementById('quiz-card').style.display = 'none';
    const results = document.getElementById('quiz-results');
    results.classList.remove('hidden');

    const pct = score / layer2Questions.length;
    const emoji = pct >= 0.8 ? '🏆' : pct >= 0.6 ? '👍' : '📚';
    const title = pct >= 0.8 ? 'מצוין!' : pct >= 0.6 ? 'כל הכבוד!' : 'צריך עוד תרגול';
    const text = pct >= 0.8 ? 'שליטה מעולה בשכבה 2!' : pct >= 0.6 ? 'בדרך הנכונה — חזרו על הנושאים שפספסתם' : 'חזרו על החומר ונסו שוב!';

    document.getElementById('results-icon').textContent = emoji;
    document.getElementById('results-title').textContent = title;
    document.getElementById('results-text').textContent = text;
    document.getElementById('score-text').textContent = score + '/' + layer2Questions.length;

    const circumference = 2 * Math.PI * 54;
    const offset = circumference * (1 - pct);
    setTimeout(() => {
        document.getElementById('score-fill').style.strokeDashoffset = offset;
    }, 100);

    document.getElementById('quiz-progress-fill').style.width = '100%';
}

function resetQuiz() {
    initQuiz();
}

window.initQuiz = initQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.resetQuiz = resetQuiz;
