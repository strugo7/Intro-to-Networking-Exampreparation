/* ===========================
   Layer 3 Quiz — 15 Questions
   Network Layer Knowledge Check
   =========================== */

const layer3Questions = [
    {
        q: 'מהו התפקיד העיקרי של שכבת הרשת (Layer 3)?',
        options: [
            'חיבור פיזי בין מכשירים',
            'ניתוב חבילות מידע ממקור ליעד',
            'הצפנת נתונים',
            'ניהול סשנים'
        ],
        correct: 1,
        explain: 'שכבת הרשת אחראית על ניתוב (Routing) חבילות מידע ממקור ליעד, כולל הגדרת כתובות לוגיות (IP) ובחירת נתיבים.'
    },
    {
        q: 'כמה ביטים יש בכתובת IPv4?',
        options: ['16 ביטים', '32 ביטים', '64 ביטים', '128 ביטים'],
        correct: 1,
        explain: 'כתובת IPv4 מורכבת מ-32 ביטים, המחולקים ל-4 אוקטטים (כל אוקטט = 8 ביטים).'
    },
    {
        q: 'מהו הערך העשרוני של הבינארי 11000000?',
        options: ['128', '192', '224', '240'],
        correct: 1,
        explain: '11000000 = 128 + 64 = 192. הביט השמאלי ביותר שווה 128, הבא שווה 64.'
    },
    {
        q: 'לאיזו מחלקה (Class) שייכת הכתובת 172.16.0.1?',
        options: ['Class A', 'Class B', 'Class C', 'Class D'],
        correct: 1,
        explain: 'Class B מכסה את הטווח 128.0.0.0 — 191.255.255.255. הכתובת 172.16.0.1 נופלת בטווח זה.'
    },
    {
        q: 'מהי הכתובת 192.168.1.0/24 — כתובת רשת או כתובת מארח?',
        options: [
            'כתובת מארח',
            'כתובת רשת',
            'כתובת Broadcast',
            'כתובת Multicast'
        ],
        correct: 1,
        explain: 'כשכל ביטי ה-Host הם 0, מדובר בכתובת הרשת עצמה (Network Address). הכתובת 192.168.1.0 עם מסכה /24 היא כתובת הרשת.'
    },
    {
        q: 'ברשת /26, כמה כתובות מארחים זמינות?',
        options: ['30', '62', '126', '254'],
        correct: 1,
        explain: '/26 = 32-26 = 6 ביטים למארח. 2⁶ - 2 = 62 מארחים (מחסירים את כתובת הרשת וה-Broadcast).'
    },
    {
        q: 'מהו Subnet Mask של /28?',
        options: [
            '255.255.255.0',
            '255.255.255.192',
            '255.255.255.224',
            '255.255.255.240'
        ],
        correct: 3,
        explain: '/28 = 28 ביטים של 1. האוקטט האחרון: 11110000 = 240. לכן המסכה היא 255.255.255.240.'
    },
    {
        q: 'איזו כתובת היא כתובת Loopback?',
        options: [
            '0.0.0.0',
            '127.0.0.1',
            '192.168.0.1',
            '255.255.255.255'
        ],
        correct: 1,
        explain: '127.0.0.1 היא כתובת Loopback — משמשת לבדיקת תקשורת של המכשיר עם עצמו (localhost).'
    },
    {
        q: 'מהו העיקרון של Longest Prefix Match?',
        options: [
            'הנתב בוחר את הנתיב הקצר ביותר',
            'הנתב בוחר את הנתיב עם המסכה הארוכה ביותר',
            'הנתב בוחר את הנתיב הראשון בטבלה',
            'הנתב בוחר נתיב אקראי'
        ],
        correct: 1,
        explain: 'Longest Prefix Match — הנתב תמיד בוחר את הנתיב הספציפי ביותר, כלומר עם המסכה (Prefix) הארוכה ביותר שמתאימה לכתובת היעד.'
    },
    {
        q: 'באיזה מדד (Metric) משתמש פרוטוקול RIP?',
        options: [
            'Bandwidth (רוחב פס)',
            'Hop Count (ספירת קפיצות)',
            'Delay (השהיה)',
            'Policy (מדיניות)'
        ],
        correct: 1,
        explain: 'RIP משתמש ב-Hop Count — מספר הנתבים שחבילה צריכה לעבור. המקסימום הוא 15 (16 = אינסוף = לא ניתן להגיע).'
    },
    {
        q: 'מהו האלגוריתם שבו משתמש OSPF?',
        options: [
            'Bellman-Ford',
            'Dijkstra (SPF)',
            'A* Search',
            'Floyd-Warshall'
        ],
        correct: 1,
        explain: 'OSPF משתמש באלגוריתם Dijkstra (Shortest Path First) כדי לחשב את הנתיב הקצר ביותר מכל נתב לכל יעד.'
    },
    {
        q: 'מה ההבדל בין IGP ל-EGP?',
        options: [
            'IGP = תוך רשת פנימית, EGP = בין רשתות אוטונומיות',
            'IGP = אינטרנט גלובלי, EGP = רשת פנימית',
            'אין הבדל — שמות שונים לאותו דבר',
            'IGP = IPv4, EGP = IPv6'
        ],
        correct: 0,
        explain: 'IGP (Interior Gateway Protocol) פועל בתוך AS אחד (כמו RIP, OSPF). EGP (Exterior Gateway Protocol) פועל בין AS-ים שונים (כמו BGP).'
    },
    {
        q: 'מהו תפקידו של BGP באינטרנט?',
        options: [
            'חלוקת כתובות IP',
            'הצפנת תעבורה',
            'ניתוב בין מערכות אוטונומיות (AS)',
            'תרגום כתובות (NAT)'
        ],
        correct: 2,
        explain: 'BGP (Border Gateway Protocol) הוא פרוטוקול הניתוב של האינטרנט — הוא מנהל ניתוב בין Autonomous Systems (ספקי אינטרנט, ארגונים גדולים ומדינות).'
    },
    {
        q: 'מהו ערך ה-Administrative Distance של OSPF?',
        options: ['20', '90', '110', '120'],
        correct: 2,
        explain: 'ה-AD של OSPF הוא 110. ככל שה-AD נמוך יותר, הנתב מעדיף את הפרוטוקול. (eBGP=20, OSPF=110, RIP=120).'
    },
    {
        q: 'איזו כתובת IP היא כתובת פרטית (Private)?',
        options: [
            '8.8.8.8',
            '172.20.5.1',
            '200.100.50.1',
            '1.1.1.1'
        ],
        correct: 1,
        explain: '172.20.5.1 נמצאת בטווח Class B Private: 172.16.0.0 — 172.31.255.255. כתובות פרטיות לא ניתנות לניתוב באינטרנט.'
    }
];

// ====== QUIZ STATE ======
let currentQuestion = 0;
let score = 0;
let answered = false;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showQuestion();
}

function showQuestion() {
    const q = layer3Questions[currentQuestion];
    if (!q) return;

    // Update progress
    const fill = document.getElementById('quiz-progress-fill');
    const text = document.getElementById('quiz-progress-text');
    if (fill) fill.style.width = ((currentQuestion + 1) / layer3Questions.length * 100) + '%';
    if (text) text.textContent = `שאלה ${currentQuestion + 1} מתוך ${layer3Questions.length}`;

    // Question
    const qNum = document.getElementById('q-number');
    const qText = document.getElementById('q-text');
    if (qNum) qNum.textContent = currentQuestion + 1;
    if (qText) qText.textContent = q.q;

    // Options
    const optionsContainer = document.getElementById('quiz-options');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';
    const letters = ['א', 'ב', 'ג', 'ד'];

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
        btn.addEventListener('click', () => selectAnswer(i));
        optionsContainer.appendChild(btn);
    });

    // Hide feedback
    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
        feedback.classList.add('hidden');
        feedback.classList.remove('correct-feedback', 'wrong-feedback');
    }

    // Reset next button
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.querySelector('span').textContent = currentQuestion < layer3Questions.length - 1 ? 'השאלה הבאה' : 'סיום הבוחן';
    }

    answered = false;

    // Show quiz card, hide results
    const card = document.getElementById('quiz-card');
    const results = document.getElementById('quiz-results');
    if (card) card.style.display = '';
    if (results) results.classList.add('hidden');
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = layer3Questions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = index === q.correct;

    if (isCorrect) score++;

    // Mark answers
    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) {
            opt.classList.add('correct');
        } else if (i === index && !isCorrect) {
            opt.classList.add('wrong');
        }
    });

    // Show feedback
    const feedback = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');

    if (feedback) {
        feedback.classList.remove('hidden');
        feedback.classList.add(isCorrect ? 'correct-feedback' : 'wrong-feedback');
    }
    if (feedbackIcon) feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    if (feedbackText) feedbackText.textContent = (isCorrect ? 'נכון! ' : 'לא נכון. ') + q.explain;

    // Enable next
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= layer3Questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function showResults() {
    const card = document.getElementById('quiz-card');
    const results = document.getElementById('quiz-results');
    if (card) card.style.display = 'none';
    if (results) results.classList.remove('hidden');

    const percentage = Math.round((score / layer3Questions.length) * 100);

    // Icon
    const icon = document.getElementById('results-icon');
    if (icon) {
        if (percentage >= 80) icon.textContent = '🏆';
        else if (percentage >= 60) icon.textContent = '👏';
        else if (percentage >= 40) icon.textContent = '📚';
        else icon.textContent = '💪';
    }

    // Title
    const title = document.getElementById('results-title');
    if (title) {
        if (percentage >= 80) title.textContent = 'מצוין! מנהל רשת בכוח!';
        else if (percentage >= 60) title.textContent = 'יפה מאוד! כמעט שם!';
        else if (percentage >= 40) title.textContent = 'לא רע, אבל יש מקום לשיפור';
        else title.textContent = 'כדאי לחזור על החומר';
    }

    // Text
    const text = document.getElementById('results-text');
    if (text) text.textContent = `ענית נכון על ${score} מתוך ${layer3Questions.length} שאלות (${percentage}%)`;

    // Score
    const scoreText = document.getElementById('score-text');
    if (scoreText) scoreText.textContent = `${score}/${layer3Questions.length}`;

    // Circle animation
    const fill = document.getElementById('score-fill');
    if (fill) {
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (percentage / 100) * circumference;
        fill.style.strokeDasharray = circumference;
        fill.style.strokeDashoffset = circumference;
        setTimeout(() => {
            fill.style.strokeDashoffset = offset;
            // Color based on score
            if (percentage >= 80) fill.style.stroke = '#22c55e';
            else if (percentage >= 60) fill.style.stroke = '#3b82f6';
            else if (percentage >= 40) fill.style.stroke = '#f59e0b';
            else fill.style.stroke = '#ef4444';
        }, 100);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showQuestion();
}

// Make functions globally available
window.initQuiz = initQuiz;
window.nextQuestion = nextQuestion;
window.resetQuiz = resetQuiz;
