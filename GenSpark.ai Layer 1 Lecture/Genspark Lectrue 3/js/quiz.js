/* ===========================
   Quiz Logic for OSI Layer 1 Lesson
   =========================== */

const quizQuestions = [
    {
        question: 'מהי השכבה הראשונה במודל OSI?',
        options: ['שכבת הרשת (Network)', 'שכבת התעבורה (Transport)', 'השכבה הפיזית (Physical)', 'שכבת קישור הנתונים (Data Link)'],
        correct: 2,
        explanation: 'השכבה הראשונה (הנמוכה ביותר) במודל OSI היא השכבה הפיזית — Physical Layer. היא אחראית על העברת ביטים גולמיים דרך אמצעי פיזי.'
    },
    {
        question: 'כיצד סיב אופטי מעביר נתונים?',
        options: ['באמצעות אותות חשמליים', 'באמצעות פולסי אור', 'באמצעות גלי רדיו', 'באמצעות גלי קול'],
        correct: 1,
        explanation: 'סיב אופטי מעביר נתונים באמצעות פולסי אור (Light Pulses) שעוברים דרך ליבת זכוכית דקיקה. האור מוחזר פנימית בזכות שכבת ה-Cladding.'
    },
    {
        question: 'מה ההבדל העיקרי בין Single Mode ל-Multi Mode בסיבים אופטיים?',
        options: [
            'Single Mode זול יותר',
            'Multi Mode מעביר מרחקים ארוכים יותר',
            'Single Mode משתמש בלייזר וליבה דקה יותר',
            'אין הבדל משמעותי'
        ],
        correct: 2,
        explanation: 'Single Mode משתמש בליבה דקה (8-10μm) ובלייזר, ומאפשר העברה למרחקים ארוכים מאוד (100+ ק"מ). Multi Mode משתמש בליבה רחבה יותר (50-62.5μm) וב-LED.'
    },
    {
        question: 'מהו היתרון המרכזי של כבלי נחושת (UTP)?',
        options: ['מהירות הגבוהה ביותר', 'עלות נמוכה והתקנה פשוטה', 'חסינות מוחלטת ל-EMI', 'מרחק העברה ארוך'],
        correct: 1,
        explanation: 'היתרון המרכזי של כבלי UTP הוא העלות הנמוכה, הנגישות הרבה וקלות ההתקנה. הם הכבלים הנפוצים ביותר ברשתות מקומיות.'
    },
    {
        question: 'מהו המרחק המקסימלי של כבל Ethernet סטנדרטי (Cat 5e/6)?',
        options: ['10 מטר', '55 מטר', '100 מטר', '1000 מטר'],
        correct: 2,
        explanation: 'המרחק המקסימלי הסטנדרטי לכבל Ethernet (Cat 5e/6 ב-1Gbps) הוא 100 מטר. מעבר למרחק זה, האות נחלש באופן משמעותי.'
    },
    {
        question: 'באיזה תדר WiFi עובד בדרך כלל?',
        options: ['900 MHz', '1.5 GHz', '2.4 GHz ו-5 GHz', '10 GHz'],
        correct: 2,
        explanation: 'WiFi עובד בעיקר בתדרי 2.4 GHz ו-5 GHz. דור WiFi 6E הוסיף גם תדר 6 GHz לרוחב פס גדול יותר ופחות הפרעות.'
    },
    {
        question: 'מה הכוונה ב-Total Internal Reflection בסיב אופטי?',
        options: [
            'האור נבלע לחלוטין בליבה',
            'האור מוחזר פנימית בין דפנות הסיב בזכות הבדל במקדם השבירה',
            'האור יוצא מהסיב בזווית מסוימת',
            'האור עובר דרך ה-Cladding'
        ],
        correct: 1,
        explanation: 'Total Internal Reflection (החזרה פנימית מלאה) קורית כי הליבה (Core) בעלת מקדם שבירה גבוה יותר מה-Cladding, מה שגורם לאור "לקפוץ" בין הדפנות ולהישאר בתוך הליבה.'
    },
    {
        question: 'מה היתרון של תדר 5 GHz על פני 2.4 GHz ב-WiFi?',
        options: [
            'טווח ארוך יותר',
            'חדירה טובה יותר דרך קירות',
            'מהירות גבוהה יותר ופחות הפרעות',
            'עלות נמוכה יותר'
        ],
        correct: 2,
        explanation: 'תדר 5 GHz מציע מהירויות גבוהות יותר ופחות הפרעות (כי יש יותר ערוצים זמינים). החיסרון הוא טווח קצר יותר וחדירה ירודה יותר דרך קירות.'
    },
    {
        question: 'מהו ההבדל בין UTP ל-STP?',
        options: [
            'UTP מהיר יותר',
            'STP כולל שכבת הגנה מפויל/מתכת נגד EMI',
            'UTP מתאים רק לטלפון',
            'אין הבדל — זה אותו כבל'
        ],
        correct: 1,
        explanation: 'STP (Shielded Twisted Pair) כולל שכבת הגנה נוספת (פויל או קליעת מתכת) שמגנה מפני הפרעות אלקטרומגנטיות (EMI). UTP (Unshielded) מסתמך רק על השזירה עצמה להגנה.'
    },
    {
        question: 'מהי המהירות המקסימלית של WiFi 7 (802.11be)?',
        options: ['1 Gbps', '9.6 Gbps', '46 Gbps', '100 Gbps'],
        correct: 2,
        explanation: 'WiFi 7 (802.11be) מציע מהירות תיאורטית מקסימלית של עד 46 Gbps! זאת בזכות ערוצים רחבים יותר (320 MHz), MLO ו-4K QAM.'
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
    const q = quizQuestions[currentQuestion];
    document.getElementById('q-number').textContent = currentQuestion + 1;
    document.getElementById('q-text').textContent = q.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    const letters = ['א', 'ב', 'ג', 'ד'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
        btn.onclick = () => selectAnswer(i);
        optionsContainer.appendChild(btn);
    });

    // Update progress
    document.getElementById('quiz-progress-fill').style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    document.getElementById('quiz-progress-text').textContent = `שאלה ${currentQuestion + 1} מתוך ${quizQuestions.length}`;

    // Hide feedback
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('quiz-feedback').className = 'quiz-feedback hidden';
    document.getElementById('quiz-next-btn').disabled = true;
    answered = false;

    // Update button text for last question
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('quiz-next-btn').innerHTML = '<span>סיום הבוחן</span><i class="fas fa-flag-checkered"></i>';
    } else {
        document.getElementById('quiz-next-btn').innerHTML = '<span>השאלה הבאה</span><i class="fas fa-arrow-left"></i>';
    }
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');

    // Mark all options as disabled
    options.forEach(opt => opt.classList.add('disabled'));

    // Mark correct answer
    options[q.correct].classList.add('correct');

    if (index === q.correct) {
        score++;
        feedback.className = 'quiz-feedback correct-feedback';
        document.getElementById('feedback-icon').textContent = '✅';
        document.getElementById('feedback-text').textContent = 'נכון! ' + q.explanation;
    } else {
        options[index].classList.add('wrong');
        feedback.className = 'quiz-feedback wrong-feedback';
        document.getElementById('feedback-icon').textContent = '❌';
        document.getElementById('feedback-text').textContent = 'לא נכון. ' + q.explanation;
    }

    feedback.classList.remove('hidden');
    document.getElementById('quiz-next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= quizQuestions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function showResults() {
    document.getElementById('quiz-card').style.display = 'none';
    const results = document.getElementById('quiz-results');
    results.classList.remove('hidden');

    const percentage = Math.round((score / quizQuestions.length) * 100);
    document.getElementById('score-text').textContent = `${score}/${quizQuestions.length}`;

    // Animate score circle
    const circumference = 2 * Math.PI * 54; // r=54
    const offset = circumference - (percentage / 100) * circumference;
    setTimeout(() => {
        document.getElementById('score-fill').style.strokeDashoffset = offset;
    }, 100);

    if (percentage >= 90) {
        document.getElementById('results-icon').textContent = '🏆';
        document.getElementById('results-title').textContent = 'מצוין! מומחה בשכבה הפיזית!';
        document.getElementById('results-text').textContent = 'אתם יודעים את החומר ברמה גבוהה. כל הכבוד!';
        document.getElementById('score-fill').style.stroke = '#2ecc71';
    } else if (percentage >= 70) {
        document.getElementById('results-icon').textContent = '⭐';
        document.getElementById('results-title').textContent = 'כל הכבוד! תוצאה טובה!';
        document.getElementById('results-text').textContent = 'אתם מכירים את הנושא היטב. שווה לחזור על מספר נקודות.';
        document.getElementById('score-fill').style.stroke = '#3498db';
    } else if (percentage >= 50) {
        document.getElementById('results-icon').textContent = '📚';
        document.getElementById('results-title').textContent = 'לא רע, אבל יש מקום לשיפור';
        document.getElementById('results-text').textContent = 'מומלץ לחזור על החומר ולנסות שוב. אתם בכיוון הנכון!';
        document.getElementById('score-fill').style.stroke = '#f39c12';
    } else {
        document.getElementById('results-icon').textContent = '💪';
        document.getElementById('results-title').textContent = 'כדאי ללמוד עוד קצת';
        document.getElementById('results-text').textContent = 'חזרו לשיעור, עברו על הנושאים השונים ונסו שוב. אל תוותרו!';
        document.getElementById('score-fill').style.stroke = '#e74c3c';
    }
}

function resetQuiz() {
    // Reset score circle
    document.getElementById('score-fill').style.strokeDashoffset = 339.292;
    setTimeout(() => initQuiz(), 300);
}
