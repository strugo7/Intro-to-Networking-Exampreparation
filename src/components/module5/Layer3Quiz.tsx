import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

const questions = [
    {
        question: "איזו כתובת מייצגת את הכתובת הייחודית של המחשב ברשת העולמית?",
        options: ["MAC Address", "IP Public Address", "IP Private Address", "Subnet Mask"],
        correct: 1,
        explanation: "כתובת IP Public היא הכתובת הייחודית שמאפשרת גלישה באינטרנט ונראית בכל העולם."
    },
    {
        question: "מה תפקיד ה-Subnet Mask?",
        options: ["להצפין את המידע", "לחלק את כתובת ה-IP ל-Network ו-Host", "למצוא את הכתובת הפיזית (MAC)", "לחבר בין רשתות שונות"],
        correct: 1,
        explanation: "המסכה (Subnet Mask) קובעת אילו ביטים מהכתובת שייכים לרשת ואילו למחשב הספציפי."
    },
    {
        question: "איזה פרוטוקול משמש למציאת כתובת MAC ע\"פ כתובת IP?",
        options: ["DNS", "DHCP", "ARP", "ICMP"],
        correct: 2,
        explanation: "ARP (Address Resolution Protocol) מתרגם כתובת לוגית (IP) לכתובת פיזית (MAC)."
    },
    {
        question: "כמה סיביות (bits) יש בכתובת IPv4?",
        options: ["32", "48", "64", "128"],
        correct: 0,
        explanation: "כתובת IPv4 מורכבת מ-32 ביטים (4 אוקטטים של 8 ביטים)."
    },
    {
        question: "איזה מכשיר פועל בשכבה 3 (Network Layer)?",
        options: ["Switch", "Hub", "Router", "Repeater"],
        correct: 2,
        explanation: "הראוטר (Router) הוא הרכיב המרכזי בשכבה 3 ומקבל החלטות ניתוב ע\"פ כתובות IP."
    },
    {
        question: "מה הפקודה לבדיקת תקשורת בסיסית בין שני מחשבים?",
        options: ["ipconfig", "ping", "tracert", "nslookup"],
        correct: 1,
        explanation: "פקודת ping שולחת הודעת ICMP Echo Request כדי לבדוק אם היעד זמין."
    },
    {
        question: "איזה טווח כתובות מוגדר כ-Private Class C?",
        options: ["10.0.0.0 - 10.255.255.255", "172.16.0.0 - 172.31.255.255", "192.168.0.0 - 192.168.255.255", "169.254.0.0 - 169.254.255.255"],
        correct: 2,
        explanation: "הטווח 192.168.x.x הוא הטווח הפרטי הנפוץ ביותר ברשתות ביתיות (Class C)."
    },
    {
        question: "מהו Default Gateway?",
        options: ["הכתובת של השרת הראשי", "היציאה מהרשת המקומית לאינטרנט (הכתובת של הראוטר)", "חומת האש של הרשת", "שרת שנותן כתובות IP"],
        correct: 1,
        explanation: "Default Gateway הוא השער שאליו המחשב שולח כל חבילה שאינה מיועדת לרשת המקומית."
    },
    {
        question: "מהו המספר המקסימלי של כתובות ב-Class C (/24)?",
        options: ["254", "256", "65,536", "16 מיליון"],
        correct: 1,
        explanation: "ב-Class C יש 256 כתובות סה\"כ (8 ביטים), שמתוכן 2 שמורות (Network & Broadcast), ולכן 254 לשימוש."
    },
    {
        question: "מה עושה TTL (Time To Live)?",
        options: ["מודד את מהירות האינטרנט", "מונע מחבילות לטייל ברשת לנצח (לולאות)", "קובע מתי המחשב ייכבה", "מסנכרן שעונים ברשת"],
        correct: 1,
        explanation: "ה-TTL יורד ב-1 בכל ראוטר שהחבילה עוברת. כשהוא מגיע ל-0, החבילה נזרקת כדי למנוע לולאות אינסופיות."
    },
    {
        question: "איזה פרוטוקול ניתוב נחשב ל-\"Distance Vector\"?",
        options: ["OSPF", "BGP", "RIP", "IS-IS"],
        correct: 2,
        explanation: "RIP הוא פרוטוקול Distance Vector שמחליט על המסלול רק לפי מספר הקפיצות (Hops)."
    },
    {
        question: "מהי כתובת Loopback?",
        options: ["127.0.0.1", "0.0.0.0", "255.255.255.255", "192.168.1.1"],
        correct: 0,
        explanation: "הכתובת 127.0.0.1 משמשת את המחשב לפנייה עצמית (בדיקה שהכרטיס רשת תקין)."
    },
    {
        question: "מה היתרון של ניתוב דינמי (Dynamic Routing)?",
        options: ["זול ופשוט", "הראוטרים מתעדכנים אוטומטית על שינויים ותקלות", "מאובטח יותר מסטטי", "לא דורש כוח עיבוד"],
        correct: 1,
        explanation: "ניתוב דינמי מאפשר לרשת להגיב לבד לשינויים, כמו כבל מנותק, ולמצוא נתיב חלופי ללא התערבות אדם."
    },
    {
        question: "מהו CIDR?",
        options: ["פרוטוקול אבטחה", "שיטת כתיבה מקוצרת ל-Subnet Mask (למשל /24)", "סוג של כבל", "מערכת הפעלה לראוטרים"],
        correct: 1,
        explanation: "CIDR (Classless Inter-Domain Routing) הוא הסטנדרט לכתיבת מסכות רשת, למשל /24 במקום 255.255.255.0."
    },
    {
        question: "למה משמשת פקודת tracert (או traceroute)?",
        options: ["לראות את כל הראוטרים בדרך ליעד", "לבדוק כרטיס רשת", "לשנות כתובת IP", "למחוק היסטוריית גלישה"],
        correct: 0,
        explanation: "tracert מראה את המסלול המלא ואת כל התחנות (Hops) שהחבילה עוברת בדרך ליעד."
    }
];

const Layer3Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
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
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    if (showResult) {
        return (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto">
                <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">כל הכבוד! סיימת את המבחן</h2>
                <div className="text-5xl font-black text-blue-600 mb-2">{Math.round((score / questions.length) * 100)}%</div>
                <p className="text-slate-500 mb-8">ענית נכון על {score} מתוך {questions.length} שאלות</p>
                <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <RotateCcw className="w-5 h-5" /> נסה שוב
                </button>
            </div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-slate-400">שאלה {currentQuestion + 1} מתוך {questions.length}</span>
                    <span className="text-sm font-bold text-blue-500">{score * 10} נקודות</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-8 text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                </h3>

                <div className="space-y-3 mb-8">
                    {q.options.map((opt, i) => {
                        let stateClass = "border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";
                        if (isAnswered) {
                            if (i === q.correct) stateClass = "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400";
                            else if (i === selectedOption) stateClass = "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                            else stateClass = "opacity-50 grayscale";
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                disabled={isAnswered}
                                className={`w-full text-right p-4 rounded-lg border-2 transition-all font-medium flex justify-between items-center ${stateClass}`}
                            >
                                <span>{opt}</span>
                                {isAnswered && i === q.correct && <CheckCircle className="w-5 h-5" />}
                                {isAnswered && i === selectedOption && i !== q.correct && <XCircle className="w-5 h-5" />}
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg mb-6 text-sm text-slate-700 dark:text-slate-300">
                            <strong>הסבר:</strong> {q.explanation}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={nextQuestion}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/30"
                            >
                                {currentQuestion < questions.length - 1 ? 'לשאלה הבאה' : 'סיום מבחן'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layer3Quiz;
