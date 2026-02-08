import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck, RefreshCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 1,
        text: "מהו מודל ה-CIA באבטחת מידע?",
        options: [
            "Central Intelligence Agency",
            "Confidentiality, Integrity, Availability",
            "Cyber, Internet, Attack",
            "Computer, Information, Access"
        ],
        correctAnswer: 1,
        explanation: "מודל ה-CIA מורכב משלושה עקרונות: סודיות (Confidentiality), שלמות (Integrity) וזמינות (Availability)."
    },
    {
        id: 2,
        text: "איזה סוג של מתקפה פוגע ישירות בעקרון ה-Availability (זמינות)?",
        options: [
            "Phishing",
            "SQL Injection",
            "DDoS (Distributed Denial of Service)",
            "MITM (Man-in-the-Middle)"
        ],
        correctAnswer: 2,
        explanation: "מתקפת DDoS מציפה את השרת בבקשות כדי לגרום לו לקרוס, ובכך מונעת ממשתמשים לגיטימיים לגשת לשירות."
    },
    {
        id: 3,
        text: "מהי מטרת שלב ה-Reconnaissance (איסוף מודיעין) בשרשרת התקיפה?",
        options: [
            "להריץ קוד זדוני על המחשב",
            "לאסוף מידע על המטרה (כמו כתובות IP ופורטים פתוחים)",
            "לגנוב סיסמאות",
            "להצפין את הקבצים בדרישת כופר"
        ],
        correctAnswer: 1,
        explanation: "בשלב האיסוף, התוקף לומד על המטרה כדי למצוא חולשות פוטנציאליות לפני ביצוע התקיפה."
    },
    {
        id: 4,
        text: "איזה כלי משמש בעיקר לסריקת רשתות וגילוי פורטים פתוחים?",
        options: [
            "Wireshark",
            "Nmap",
            "Metasploit",
            "Burp Suite"
        ],
        correctAnswer: 1,
        explanation: "Nmap (Network Mapper) הוא הכלי הנפוץ ביותר לסריקת רשתות, גילוי מארחים ופורטים פתוחים."
    },
    {
        id: 5,
        text: "מהי מתקפת 'האדם שבאמצע' (MITM)?",
        options: [
            "תוקף שפורץ פיזית למשרד",
            "תוקף המאזין לתקשורת בין שני צדדים ללא ידיעתם",
            "וירוס שמוחק קבצים",
            "עובד לא מרוצה שמוחק מידע"
        ],
        correctAnswer: 1,
        explanation: "במתקפת MITM, התוקף מיירט את התקשורת בין המשתמש לשרת, יכול לקרוא אותה (פגיעה בסודיות) ואף לשנות אותה (פגיעה בשלמות)."
    },
    {
        id: 6,
        text: "איזו טכניקה משמשת בדרך כלל להשגת 'חדירה ראשונית' (Initial Access)?",
        options: [
            "Phishing (דיוג)",
            "Data Encryption",
            "Firewall Configuration",
            "Network Monitoring"
        ],
        correctAnswer: 0,
        explanation: "Phishing היא שיטה נפוצה מאוד בה התוקף שולח מייל מתחזה כדי לגרום למשתמש ללחוץ על לינק זדוני או למסור פרטים."
    },
    {
        id: 7,
        text: "מהי המשמעות של Integrity (שלמות) בהקשר של אבטחת מידע?",
        options: [
            "המידע הינו סודי",
            "המידע זמין תמיד",
            "המידע מדויק ולא שונה על ידי גורם לא מורשה",
            "המידע מוצפן"
        ],
        correctAnswer: 2,
        explanation: "שלמות (Integrity) מבטיחה שהמידע לא שונה, נמחק או סולף בדרך."
    },
    {
        id: 8,
        text: "מהי הזרקת SQL (SQL Injection)?",
        options: [
            "הזרקת וירוס לכרטיס המסך",
            "מניפולציה על קלט המשתמש כדי להריץ פקודות על מסד הנתונים",
            "שימוש בסיסמאות חלשות",
            "התקפה על תשתיות החשמל"
        ],
        correctAnswer: 1,
        explanation: "SQL Injection מתרחשת כאשר האתר לא מסנן קלט, ומאפשר לתוקף להריץ שאילתות SQL זדוניות על בסיס הנתונים."
    },
    {
        id: 9,
        text: "מהו תפקיד שלב ה-Exfiltration (גניבת מידע)?",
        options: [
            "למחוק את המידע",
            "להעביר מידע רגיש מתוך הארגון החוצה אל התוקף",
            "להתקין אנטי-וירוס",
            "לנתק את האינטרנט"
        ],
        correctAnswer: 1,
        explanation: "בשלב זה התוקף כבר השיג את המידע ומנסה להוציא אותו מהרשת הארגונית מבלי להתגלות."
    },
    {
        id: 10,
        text: "כיצד פרוטוקול HTTPS מגן מפני מתקפות MITM?",
        options: [
            "הוא חוסם את האינטרנט",
            "הוא מצפין את התקשורת כך שהתוקף לא יכול לקרוא אותה",
            "הוא מוחק היסטוריית גלישה",
            "הוא מאיץ את הגלישה"
        ],
        correctAnswer: 1,
        explanation: "HTTPS משתמש בהצפנה (SSL/TLS) כדי להבטיח שגם אם תוקף מאזין לתקשורת, הוא יראה רק רצף תווים חסר משמעות (ג'יבריש)."
    }
];

const SecurityQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;

        const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
        if (isCorrect) setScore(score + 1);
        setIsAnswered(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);
        setIsAnswered(false);
    };

    if (showResult) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 p-8 rounded-3xl border border-slate-700 text-center max-w-2xl mx-auto mt-12 shadow-2xl"
            >
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-slate-700">
                    <ShieldCheck size={48} className={score > 7 ? "text-emerald-400" : "text-yellow-400"} />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">סיכום המבחן</h2>
                <p className="text-slate-400 mb-8">השלמת את מודול אבטחת המידע!</p>

                <div className="text-6xl font-black text-white mb-2">
                    {Math.round((score / questions.length) * 100)}%
                </div>
                <p className="text-xl text-slate-300 mb-8">
                    ענית נכון על {score} מתוך {questions.length} שאלות
                </p>

                <div className="p-4 bg-slate-800/50 rounded-xl mb-8 border border-slate-700">
                    {score === 10 ?
                        "🏆 מושלם! אתה מוכן להיות מגן סייבר." :
                        score > 7 ? "😎 עבודה מצוינת! יש לך ידע מוצק." :
                            "ממליץ לחזור על החומר ולנסות שוב. 💪"}
                </div>

                <button
                    onClick={resetQuiz}
                    className="flex items-center justify-center gap-2 mx-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                    <RefreshCcw size={20} /> נסה שוב
                </button>
            </motion.div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="max-w-3xl mx-auto my-12">
            <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-slate-400 font-mono">
                        שאלה {currentQuestion + 1} מתוך {questions.length}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">ניקוד: {score}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                </div>

                {/* Question Text */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
                            {question.text}
                        </h2>

                        {/* Options */}
                        <div className="space-y-4 mb-8">
                            {question.options.map((option, index) => {
                                let statusClass = "border-slate-700 bg-slate-800/50 hover:bg-slate-800";
                                if (isAnswered) {
                                    if (index === question.correctAnswer) {
                                        statusClass = "border-emerald-500 bg-emerald-500/20 text-emerald-300";
                                    } else if (index === selectedOption) {
                                        statusClass = "border-red-500 bg-red-500/20 text-red-300";
                                    } else {
                                        statusClass = "border-slate-800 bg-slate-900/50 opacity-50";
                                    }
                                } else if (selectedOption === index) {
                                    statusClass = "border-blue-500 bg-blue-500/20 text-blue-300";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={isAnswered}
                                        className={`w-full p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between group ${statusClass}`}
                                    >
                                        <span className="text-lg">{option}</span>
                                        {isAnswered && index === question.correctAnswer && <CheckCircle className="text-emerald-500" />}
                                        {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle className="text-red-500" />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation & Next Button */}
                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-800/80 p-6 rounded-xl border border-slate-700"
                            >
                                <h4 className="flex items-center gap-2 font-bold text-white mb-2">
                                    <AlertTriangle size={18} className="text-yellow-400" /> הסבר:
                                </h4>
                                <p className="text-slate-300 leading-relaxed mb-6">
                                    {question.explanation}
                                </p>
                                <button
                                    onClick={handleNext}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    {currentQuestion < questions.length - 1 ? "לשאלה הבאה" : "סיים מבחן"} <ChevronLeft />
                                </button>
                            </motion.div>
                        )}

                        {!isAnswered && (
                            <button
                                onClick={handleCheckAnswer}
                                disabled={selectedOption === null}
                                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                                    ${selectedOption !== null
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                                `}
                            >
                                בדיקה
                            </button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SecurityQuiz;
