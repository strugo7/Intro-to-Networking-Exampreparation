import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correct: number;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 1,
        text: "מהו התפקיד העיקרי של שכבה 2 (Data Link Layer)?",
        options: [
            "ניתוב (Routing) בין רשתות שונות בעולם",
            "העברת נתונים אמינה בין שני רכיבים מחוברים ישירות",
            "הצפנת נתונים לאבטחת מידע",
            "ניהול שיחות (Sessions) בין אפליקציות"
        ],
        correct: 1,
        explanation: "שכבה 2 אחראית על העברת Frames בין שני מכשירים שנמצאים באותה רשת מקומית (LAN) או מחוברים ישירות."
    },
    {
        id: 2,
        text: "מהי כתובת MAC?",
        options: [
            "כתובת לוגית שניתן לשנות בכל רגע",
            "כתובת פיזית ייחודית צרובה בחומרה (48 ביט)",
            "כתובת שנוצרת באופן דינמי על ידי ה-DHCP",
            "כתובת המשמשת לניתוב באינטרנט"
        ],
        correct: 1,
        explanation: "כתובת MAC היא מזהה ייחודי של כרטיס הרשת, מורכבת מ-48 ביטים ונצרבת במפעל."
    },
    {
        id: 3,
        text: "מה ההבדל העיקרי בין Hub ל-Switch?",
        options: [
            "Hub מהיר יותר מ-Switch",
            "Hub שולח לכולם (Broadcast), ו-Switch שולח רק ליעד (Unicast)",
            "Hub עובד בשכבה 2 ו-Switch בשכבה 1",
            "אין הבדל, זה רק שם שיווקי שונה"
        ],
        correct: 1,
        explanation: "Hub הוא רכיב טיפש שמציף את כל הפורטים. Switch לומד כתובות ושולח הודעות רק לפורט הרלוונטי."
    },
    {
        id: 4,
        text: "כיצד ה-Switch לומד (Learning) כתובות MAC?",
        options: [
            "הוא שואל את ה-Router",
            "הוא מסתכל על כתובת המקור (Source MAC) של מסגרות נכנסות",
            "הוא מסתכל על כתובת היעד (Destination MAC) של מסגרות נכנסות",
            "מנהל הרשת חייב להגדיר ידנית את כל הכתובות"
        ],
        correct: 1,
        explanation: "המתג מסתכל מאיזה פורט הגיעה הודעה ומה ה-Source MAC שלה, וכך לומד איפה נמצא כל מכשיר."
    },
    {
        id: 5,
        text: "מה קורה כאשר ה-Switch לא מכיר את כתובת היעד בטבלה שלו?",
        options: [
            "הוא מוחק את ההודעה (Drop)",
            "הוא מחזיר הודעת שגיאה לשולח",
            "הוא מציף את ההודעה לכל הפורטים (Flood) מלבד פורט המקור",
            "הוא שולח את ההודעה ל-Router לטיפול"
        ],
        correct: 2,
        explanation: "במצב של Unknown Unicast, המתג מתנהג לרגע כמו Hub ומציף לכולם כדי למצוא את היעד."
    },
    {
        id: 6,
        text: "מה תפקידו של פרוטוקול ARP?",
        options: [
            "למצוא כתובת MAC כאשר יודעים את כתובת ה-IP",
            "למצוא כתובת IP כאשר יודעים את כתובת ה-MAC",
            "להקצות כתובות IP באופן אוטומטי",
            "למנוע לולאות ברשת"
        ],
        correct: 0,
        explanation: "ARP (Address Resolution Protocol) מתרגם כתובת IP (לוגית) לכתובת MAC (פיזית)."
    },
    {
        id: 7,
        text: "איזה סוג הודעה שולח ARP Request?",
        options: [
            "Unicast (רק לשרת)",
            "Multicast (לקבוצה)",
            "Broadcast (לכולם)",
            "Anycast (לקרוב ביותר)"
        ],
        correct: 2,
        explanation: "הבקשה 'למי יש את ה-IP הזה?' נשלחת לכולם (Broadcast) כי השולח לא יודע איפה היעד."
    },
    {
        id: 8,
        text: "מדוע צריך את פרוטוקול STP (Spanning Tree)?",
        options: [
            "כדי למנוע לולאות (Loops) ברשת שכבה 2",
            "כדי להאיץ את מהירות האינטרנט",
            "כדי לאבטח את הסיסמאות ברשת",
            "כדי לחבר בין רשתות VLAN שונות"
        ],
        correct: 0,
        explanation: "לולאות ברשת גורמות לקריסה (Broadcast Storm). פרוטוקול STP מזהה וחוסם לוגית נתיבים כפולים."
    },
    {
        id: 9,
        text: "מהו Root Bridge ב-STP?",
        options: [
            "המתג החדש ביותר ברשת",
            "המתג המרכזי שכל התעבורה מנותבת ביחס אליו (הבוס)",
            "המתג שיש לו הכי הרבה פורטים",
            "הנתב (Router) הראשי"
        ],
        correct: 1,
        explanation: "Root Bridge הוא נקודת הייחוס של העץ. כל שאר המתגים מחשבים את המסלול הקצר ביותר אליו."
    },
    {
        id: 10,
        text: "מה זה VLAN (Virtual LAN)?",
        options: [
            "רשת אלחוטית וירטואלית",
            "חלוקה לוגית של רשת פיזית למספר רשתות נפרדות",
            "חיבור VPN מאובטח",
            "מערכת הפעלה למתגים"
        ],
        correct: 1,
        explanation: "VLAN מאפשר להפריד קבוצות משתמשים (למשל כספים, הנהלה) על גבי אותו ציוד פיזי."
    },
    {
        id: 11,
        text: "מה ההבדל בין Access Port ל-Trunk Port?",
        options: [
            "Access מעביר תעבורה מהר יותר",
            "Access שייך ל-VLAN אחד, Trunk מעביר מספר VLANs",
            "Trunk מיועד רק למדפסות",
            "Access משתמש בקלאסיפיקציה, Trunk משתמש ב-QoS"
        ],
        correct: 1,
        explanation: "Access מחבר מחשב קצה (Untagged). Trunk מחבר בין מתגים ומעביר מידע מתויג מכל ה-VLANs."
    },
    {
        id: 12,
        text: "מהו תקן 802.1Q?",
        options: [
            "תקן ל-Wi-Fi מהיר",
            "הפרוטוקול שמוסיף תווית (Tag) ל-Frame לזיהוי VLAN",
            "התקן שמגדיר איך עובד כבל רשת",
            "פרוטוקול אבטחה לסיסמאות"
        ],
        correct: 1,
        explanation: "802.1Q הוא הסטנדרט לתיוג (Tagging) של מסגרות ב-VLAN Trunking."
    },
    {
        id: 13,
        text: "מהו גודל ה-Header של Ethernet Frame (ללא הנתונים)?",
        options: [
            "14 בתים (6+6+2)",
            "20 בתים",
            "64 בתים",
            "1500 בתים"
        ],
        correct: 0,
        explanation: "ה-Header כולל: Dest MAC (6) + Src MAC (6) + Type (2) = 14 Bytes. (לא כולל Preamble/FCS)."
    },
    {
        id: 14,
        text: "מהי כתובת ה-Broadcast בשכבה 2?",
        options: [
            "255.255.255.255",
            "FF:FF:FF:FF:FF:FF",
            "00:00:00:00:00:00",
            "127.0.0.1"
        ],
        correct: 1,
        explanation: "FF:FF:FF:FF:FF:FF היא הכתובת המיוחדת שאומרת: 'זה מיועד לכולם'."
    },
    {
        id: 15,
        text: "איזה שדה ב-Ethernet Frame משמש לגילוי שגיאות?",
        options: [
            "TTL (Time to Live)",
            "Sequence Number",
            "FCS (Frame Check Sequence)",
            "VLAN Tag"
        ],
        correct: 2,
        explanation: "ה-FCS נמצא בסוף המסגרת ומכיל חישוב מתמטי (CRC) שמאבטח את שלמות המידע."
    }
];

const Layer2Quiz: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (qIndex: number, optionIndex: number) => {
        if (showResults) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        let correctCount = 0;
        answers.forEach((ans, idx) => {
            if (ans === questions[idx].correct) correctCount++;
        });
        return Math.round((correctCount / questions.length) * 100);
    };

    const resetQuiz = () => {
        setAnswers(new Array(questions.length).fill(-1));
        setShowResults(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isAllAnswered = answers.every(a => a !== -1);
    const score = calculateScore();

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                    <Award size={18} />
                    <span className="font-bold">Layer 2 Expert</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">מבחן מסכם - שכבת הערוץ</h1>
                <p className="text-slate-400">
                    הוכיחו שאתם שולטים ב-Switching, VLANs, MAC ו-STP. ענו על כל 15 השאלות.
                </p>
            </div>

            <div className="space-y-6">
                {questions.map((q, qIdx) => {
                    const isCorrect = answers[qIdx] === q.correct;
                    const showFeedback = showResults;

                    return (
                        <div key={q.id} className={`bg-slate-800/50 p-6 rounded-2xl border ${showFeedback ? (isCorrect ? 'border-green-500/50' : 'border-red-500/50') : 'border-slate-700'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-white flex gap-3">
                                    <span className="text-blue-500">#{q.id}</span>
                                    {q.text}
                                </h3>
                                {showFeedback && (
                                    isCorrect
                                        ? <CheckCircle className="text-green-400 shrink-0" />
                                        : <XCircle className="text-red-400 shrink-0" />
                                )}
                            </div>

                            <div className="space-y-3">
                                {q.options.map((opt, optIdx) => (
                                    <button
                                        key={optIdx}
                                        onClick={() => handleOptionSelect(qIdx, optIdx)}
                                        disabled={showResults}
                                        className={`w-full text-right p-4 rounded-xl transition-all flex items-center justify-between group
                                            ${answers[qIdx] === optIdx
                                                ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                                                : 'bg-slate-900/50 border-transparent hover:bg-slate-700/50 text-slate-300'}
                                            ${showResults && optIdx === q.correct ? '!bg-green-500/20 !border-green-500 !text-green-300' : ''}
                                            ${showResults && answers[qIdx] === optIdx && answers[qIdx] !== q.correct ? '!bg-red-500/20 !border-red-500 !text-red-300' : ''}
                                            border border-opacity-50
                                        `}
                                    >
                                        <span>{opt}</span>
                                        {answers[qIdx] === optIdx && !showResults && <div className="w-3 h-3 rounded-full bg-blue-400" />}
                                    </button>
                                ))}
                            </div>

                            {showFeedback && (
                                <div className={`mt-4 p-4 rounded-lg text-sm leading-relaxed ${isCorrect ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'}`}>
                                    <strong>הסבר: </strong> {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Completion */}
            <div className="sticky bottom-6 z-10">
                {!showResults ? (
                    <button
                        onClick={() => setShowResults(true)}
                        disabled={!isAllAnswered}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]
                            ${isAllAnswered
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
                        `}
                    >
                        {isAllAnswered ? 'הגש מבחן וקבל ציון' : `ענית על ${answers.filter(a => a !== -1).length} מתוך ${questions.length} שאלות`}
                    </button>
                ) : (
                    <div className="bg-slate-800 border border-slate-600 p-6 rounded-2xl shadow-2xl animate-fade-in-up text-center">
                        <div className="text-sm text-slate-400 mb-2">הציון שלך</div>
                        <div className={`text-5xl font-black mb-4 ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {score}
                        </div>
                        <p className="text-slate-300 mb-6 font-medium">
                            {score === 100 ? "מושלם! אתה מוכן לנהל את האינטרנט! 🚀" :
                                score >= 80 ? "עבודה מעולה! שליטה טובה בחומר. 👍" :
                                    "כדאי לחזור קצת על השיעורים ולנסות שוב. 💪"}
                        </p>
                        <button
                            onClick={resetQuiz}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                        >
                            <RotateCcw size={18} /> נסה שוב
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Layer2Quiz;
