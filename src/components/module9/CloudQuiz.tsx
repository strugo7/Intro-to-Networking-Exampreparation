import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, Lightbulb, Cloud, Server, Shield, DollarSign } from 'lucide-react';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

const questions: Question[] = [
    {
        id: 'q1',
        text: 'מהו ההבדל העיקרי בין Cloud Computing ל-On-Premises?',
        options: [
            'ב-Cloud יש יותר אבטחה',
            'ב-Cloud המשאבים מסופקים דרך האינטרנט ע״י ספק צד שלישי',
            'ב-On-Premises אין צורך בתחזוקה',
            'ב-Cloud אין עלויות'
        ],
        correctIndex: 1,
        explanation: 'Cloud Computing הוא מודל שבו משאבי IT מסופקים דרך האינטרנט על ידי ספק צד שלישי, בניגוד ל-On-Premises שבו כל התשתית בבעלות וניהול הארגון.'
    },
    {
        id: 'q2',
        text: 'באיזה מודל שירות (Service Model) הספק מנהל הכל והלקוח רק משתמש בתוכנה?',
        options: [
            'IaaS',
            'PaaS',
            'SaaS',
            'On-Premises'
        ],
        correctIndex: 2,
        explanation: 'ב-SaaS (Software as a Service) הספק מנהל את כל התשתית, הפלטפורמה והאפליקציה. הלקוח רק משתמש בתוכנה (כמו Gmail או Office 365).'
    },
    {
        id: 'q3',
        text: 'מהו Shared Responsibility Model?',
        options: [
            'מודל שבו הלקוח אחראי על הכל',
            'מודל שבו הספק אחראי על הכל',
            'מודל שבו האחריות מתחלקת בין הספק ללקוח',
            'מודל לחלוקת עלויות'
        ],
        correctIndex: 2,
        explanation: 'Shared Responsibility Model מגדיר את חלוקת האחריות בין הספק ללקוח. ככל שעולים במודל (IaaS→PaaS→SaaS), הספק לוקח יותר אחריות.'
    },
    {
        id: 'q4',
        text: 'איזה סוג ענן מתאים לארגון עם דרישות Compliance מחמירות ומידע רגיש מאוד?',
        options: [
            'Public Cloud',
            'Private Cloud',
            'Community Cloud',
            'אף אחד - לא צריך ענן'
        ],
        correctIndex: 1,
        explanation: 'Private Cloud מספק שליטה מלאה על התשתית והנתונים, מה שמאפשר עמידה ברגולציות מחמירות ואבטחה מירבית למידע רגיש.'
    },
    {
        id: 'q5',
        text: 'מהי Multi-tenancy ולמה היא מהווה חשש אבטחתי?',
        options: [
            'שימוש במספר ספקי ענן',
            'מספר לקוחות חולקים את אותה חומרה פיזית',
            'גישה מרובה לשרתים',
            'ניהול מספר משתמשים'
        ],
        correctIndex: 1,
        explanation: 'Multi-tenancy פירושו שמספר לקוחות חולקים את אותה חומרה פיזית. זה מהווה חשש כי תוקף יכול להיות באותה מכונה כמו הקורבן ולנסות לבצע התקפות.'
    },
    {
        id: 'q6',
        text: 'מהו היתרון העיקרי של מודל Pay-as-you-go בענן?',
        options: [
            'עלויות גבוהות יותר אבל ביצועים טובים יותר',
            'אין השקעה הונית מראש ומשלמים רק על מה שצורכים',
            'תשלום חודשי קבוע ללא תלות בשימוש',
            'אין צורך בחיבור לאינטרנט'
        ],
        correctIndex: 1,
        explanation: 'Pay-as-you-go מאפשר לארגון להימנע מהשקעה הונית גדולה מראש (CAPEX) ולשלם רק על המשאבים שבאמת צורכים (OPEX).'
    },
    {
        id: 'q7',
        text: 'מהו Hybrid Cloud?',
        options: [
            'ענן שמשלב מספר ספקים ציבוריים',
            'ענן שמשלב תשתית ציבורית ופרטית',
            'ענן לארגונים היברידיים בלבד',
            'שם אחר ל-Community Cloud'
        ],
        correctIndex: 1,
        explanation: 'Hybrid Cloud משלב בין ענן ציבורי (Public) לפרטי (Private). זה מאפשר לשמור מידע רגיש בפרטי ולהשתמש בציבורי לעומסים גמישים.'
    },
];

const CloudQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const question = questions[currentQuestion];

    const handleSelectAnswer = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === question.correctIndex;
        if (isCorrect) {
            setScore(score + 1);
        }
        setAnswers([...answers, isCorrect]);
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswers([]);
        setQuizCompleted(false);
    };

    const getScoreMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage >= 90) return { text: 'מעולה! אתה מומחה ענן! ☁️', color: 'emerald' };
        if (percentage >= 70) return { text: 'כל הכבוד! הבנה טובה של הענן', color: 'blue' };
        if (percentage >= 50) return { text: 'לא רע, אבל יש מקום לשיפור', color: 'amber' };
        return { text: 'כדאי לחזור על החומר', color: 'red' };
    };

    if (quizCompleted) {
        const scoreMessage = getScoreMessage();
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Trophy size={48} className="text-white" />
                    </div>

                    <h2 className="text-3xl font-black text-white mb-4">המבחן הסתיים!</h2>

                    <div className={`text-6xl font-black mb-4 bg-gradient-to-r from-${scoreMessage.color}-400 to-${scoreMessage.color}-600 bg-clip-text text-transparent`}>
                        {score} / {questions.length}
                    </div>

                    <p className={`text-xl text-${scoreMessage.color}-400 mb-8`}>{scoreMessage.text}</p>

                    {/* Answer breakdown */}
                    <div className="flex justify-center gap-2 mb-8">
                        {answers.map((correct, i) => (
                            <div
                                key={i}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${correct ? 'bg-emerald-500' : 'bg-red-500'
                                    }`}
                            >
                                {correct ? <CheckCircle size={16} className="text-white" /> : <XCircle size={16} className="text-white" />}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleRestart}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform"
                    >
                        <RotateCcw size={20} />
                        נסה שוב
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-2">מבחן מסכם: מחשוב ענן ☁️</h2>
                <p className="text-slate-400">בדוק את הידע שלך!</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
                <span className="text-slate-400 font-medium">{currentQuestion + 1} / {questions.length}</span>
            </div>

            {/* Question Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 overflow-hidden">
                {/* Question */}
                <div className="p-8 border-b border-slate-700/50">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                            <span className="text-white font-bold">{currentQuestion + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-relaxed">{question.text}</h3>
                    </div>
                </div>

                {/* Options */}
                <div className="p-8 space-y-4">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === question.correctIndex;
                        const showCorrectness = showResult;

                        let bgClass = 'bg-slate-800/50 border-slate-700 hover:border-slate-600';
                        if (showCorrectness) {
                            if (isCorrect) {
                                bgClass = 'bg-emerald-500/20 border-emerald-500';
                            } else if (isSelected && !isCorrect) {
                                bgClass = 'bg-red-500/20 border-red-500';
                            }
                        } else if (isSelected) {
                            bgClass = 'bg-blue-500/20 border-blue-500';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(index)}
                                disabled={showResult}
                                className={`w-full p-4 rounded-xl border-2 text-right transition-all ${bgClass} ${!showResult ? 'cursor-pointer' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${showCorrectness && isCorrect ? 'border-emerald-500 bg-emerald-500' :
                                            showCorrectness && isSelected && !isCorrect ? 'border-red-500 bg-red-500' :
                                                isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-600'
                                        }`}>
                                        {showCorrectness && isCorrect && <CheckCircle size={16} className="text-white" />}
                                        {showCorrectness && isSelected && !isCorrect && <XCircle size={16} className="text-white" />}
                                        {!showCorrectness && isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
                                    </div>
                                    <span className={`flex-1 ${isSelected || (showCorrectness && isCorrect) ? 'text-white' : 'text-slate-300'}`}>
                                        {option}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {showResult && (
                    <div className="px-8 pb-8">
                        <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <Lightbulb className="text-blue-400 shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-blue-300 mb-2">הסבר</h4>
                                    <p className="text-slate-300">{question.explanation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="px-8 pb-8">
                    {!showResult ? (
                        <button
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${selectedAnswer !== null
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-[1.02]'
                                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            בדוק תשובה
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            {currentQuestion < questions.length - 1 ? (
                                <>
                                    שאלה הבאה
                                    <ArrowRight size={20} className="rotate-180" />
                                </>
                            ) : (
                                <>
                                    סיום המבחן
                                    <Trophy size={20} />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Score indicator */}
            <div className="flex justify-center gap-2">
                {answers.map((correct, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${correct ? 'bg-emerald-500' : 'bg-red-500'}`}
                    />
                ))}
                {Array(questions.length - answers.length).fill(0).map((_, i) => (
                    <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-slate-700" />
                ))}
            </div>
        </div>
    );
};

export default CloudQuiz;
