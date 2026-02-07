import { useState, useEffect } from 'react';
import { Calculator, CheckCircle, XCircle, Info, ArrowRight, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// --- COMPONENTS ---

// 1. IP Foundations (Interactive Explainer)
const IPFoundations = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "האטום של המחשב: הביט (Bit)",
            content: (
                <div className="text-center">
                    <p className="text-lg text-slate-300 mb-6">
                        מחשבים לא מבינים מספרים כמו 192 או 168. הם מבינים רק שני מצבים:<br />
                        <span className="text-green-400 font-bold">יש חשמל (1)</span> או <span className="text-slate-500 font-bold">אין חשמל (0)</span>.
                        <br />דבר זה נקרא <strong>Bit</strong> (Binary Digit).
                    </p>
                    <div className="flex justify-center gap-8 items-center bg-slate-900/50 p-8 rounded-xl border border-slate-700 max-w-md mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-600 flex items-center justify-center text-2xl font-mono text-slate-500 mb-2 shadow-inner">0</div>
                            <span className="text-sm text-slate-500">OFF</span>
                        </div>
                        <div className="text-2xl text-slate-500">vs</div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500 border-4 border-green-300 flex items-center justify-center text-2xl font-mono text-white mb-2 shadow-[0_0_20px_rgba(34,197,94,0.6)]">1</div>
                            <span className="text-sm text-green-400">ON</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "האוקטטה (Octet)",
            content: (
                <div className="text-center">
                    <p className="text-lg text-slate-300 mb-6">
                        ביט אחד לא מספיק כדי לייצג הרבה מידע. לכן, אנחנו מקבצים אותם.<br />
                        בתקשורת, אנחנו משתמשים בקבוצה של <strong>8 ביטים</strong> שנקראת <strong>אוקטטה</strong> (או Byte).
                    </p>
                    {/* Force LTR for binary representation */}
                    <div className="flex justify-center gap-2 mb-4" dir="ltr">
                        {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                            <div key={i} className="w-10 h-12 bg-slate-800 border border-slate-600 rounded flex items-center justify-center font-mono text-slate-400">
                                ?
                            </div>
                        ))}
                    </div>
                    <p className="text-yellow-300 text-sm bg-yellow-900/20 p-2 rounded inline-block">
                        אוקטטה אחת יכולה להכיל ערך שבין 0 ל-255.
                    </p>
                </div>
            )
        },
        {
            title: "כתובת IP שלמה",
            content: (
                <div className="text-center">
                    <p className="text-lg text-slate-300 mb-6">
                        כתובת IPv4 מורכבת מ-<strong>4 אוקטטות</strong> המופרדות בנקודה.<br />
                        סה"כ: 32 ביטים (4 כפול 8).
                    </p>

                    {/* LTR Wrapper for IP visualization */}
                    <div className="inline-block" dir="ltr">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-slate-900 p-6 rounded-xl border border-slate-700">
                            <div className="flex gap-1 items-center">
                                <div className="bg-blue-600 px-3 py-2 rounded text-white font-mono">192</div>
                                <div className="text-white font-bold">.</div>
                                <div className="bg-blue-600 px-3 py-2 rounded text-white font-mono">168</div>
                                <div className="text-white font-bold">.</div>
                                <div className="bg-blue-600 px-3 py-2 rounded text-white font-mono">1</div>
                                <div className="text-white font-bold">.</div>
                                <div className="bg-blue-600 px-3 py-2 rounded text-white font-mono">10</div>
                            </div>
                            <div className="text-slate-500 text-2xl hidden md:block">=</div>
                            <div className="text-xs md:text-sm font-mono text-emerald-400 tracking-widest break-all">
                                11000000.10101000.00000001.00001010
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-slate-500 max-w-md mx-auto">
                            <div>Octet 1</div>
                            <div>Octet 2</div>
                            <div>Octet 3</div>
                            <div>Octet 4</div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl mb-12 border-t-4 border-blue-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400">
                    <Info size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">איך כתובת נולדת? (יסודות)</h2>
            </div>

            <div className="min-h-[250px] flex items-center justify-center animate-fade-in key={step}">
                {steps[step].content}
            </div>

            <div className="flex justify-between mt-8 border-t border-slate-700 pt-4 relative">
                {/* Title positioned absolutely to center it relative to container, handling RTL */}
                <div className="text-xl font-bold text-white mb-2 absolute top-4 left-1/2 -translate-x-1/2 hidden md:block">
                    {steps[step].title}
                </div>

                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="flex items-center px-4 py-2 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                >
                    <ChevronRight className="ml-2" /> הקודם
                </button>

                <div className="flex gap-2 items-center md:hidden">
                    {steps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
                    ))}
                </div>

                <button
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={step === steps.length - 1}
                    className="flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 disabled:bg-slate-700"
                >
                    הבא <ChevronLeft className="mr-2" />
                </button>
            </div>
        </div>
    );
};

// 2. The Binary Lab (Updated LTR)
const BinaryLab = () => {
    const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // 8 bits

    const toggleBit = (index: number) => {
        const newBits = [...bits];
        newBits[index] = newBits[index] === 0 ? 1 : 0;
        setBits(newBits);
    };

    const calculateDecimal = () => {
        return bits.reduce((acc, bit, index) => {
            const power = 7 - index;
            return acc + (bit * Math.pow(2, power));
        }, 0);
    };

    const powers = [128, 64, 32, 16, 8, 4, 2, 1];

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl mb-12">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400">
                    <Calculator size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">המעבדה הבינארית</h2>
                    <p className="text-slate-400">הדליקו מתגים כדי לראות איך המספר משתנה. שימו לב: 128 תמיד משמאל.</p>
                </div>
            </div>

            {/* The Switches - FORCED LTR */}
            <div className="grid grid-cols-8 gap-2 md:gap-4 mb-8" dir="ltr">
                {bits.map((bit, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                        <span className={`text-xs md:text-sm font-bold font-mono ${bit ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {powers[index]}
                        </span>
                        <button
                            onClick={() => toggleBit(index)}
                            className={`
                                w-8 h-12 md:w-12 md:h-16 rounded-lg border-2 flex items-center justify-center text-xl font-bold font-mono transition-all duration-200
                                ${bit ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] -translate-y-0.5 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}
                            `}
                        >
                            {bit}
                        </button>
                        <span className="text-[10px] text-slate-500 hidden md:block">2^{7 - index}</span>
                    </div>
                ))}
            </div>

            {/* The Result */}
            <div className="bg-slate-900 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-slate-700">
                <div className="text-slate-400 mb-4 md:mb-0 text-right md:text-left w-full md:w-auto" dir="ltr">
                    <span className="block text-sm mb-1 text-right md:text-left rtl:text-right">החישוב המתמטי:</span>
                    <div className="font-mono text-xs md:text-sm text-blue-300">
                        {bits.map((bit, i) => bit ? powers[i] : null).filter(n => n !== null).join(' + ') || '0'} =
                    </div>
                </div>
                <div className="text-center border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
                    <span className="block text-xs text-slate-500 uppercase tracking-widest mb-1">Decimal Value</span>
                    <span className="text-5xl font-black text-white font-mono">{calculateDecimal()}</span>
                </div>
            </div>
        </div>
    );
};

// 3. Practice Arena (Updated LTR)
const PracticeArena = () => {
    const [mode, setMode] = useState<'dec2bin' | 'bin2dec'>('dec2bin'); // 'dec2bin' or 'bin2dec'
    const [target, setTarget] = useState(0);
    const [userBits, setUserBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [userDecInput, setUserDecInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null); // 'correct', 'wrong', null
    const [streak, setStreak] = useState(0);

    const generateQuestion = () => {
        const newNum = Math.floor(Math.random() * 256);
        setTarget(newNum);
        setUserBits([0, 0, 0, 0, 0, 0, 0, 0]);
        setUserDecInput('');
        setFeedback(null);
    };

    useEffect(() => {
        generateQuestion();
    }, []);

    const checkDec2Bin = () => {
        const currentVal = userBits.reduce((acc, bit, i) => acc + (bit * Math.pow(2, 7 - i)), 0);
        if (currentVal === target) {
            setFeedback('correct');
            setStreak(s => s + 1);
            setTimeout(generateQuestion, 1500);
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    const checkBin2Dec = () => {
        if (parseInt(userDecInput) === target) {
            setFeedback('correct');
            setStreak(s => s + 1);
            setTimeout(generateQuestion, 1500);
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    const toggleUserBit = (index: number) => {
        const newBits = [...userBits];
        newBits[index] = newBits[index] === 0 ? 1 : 0;
        setUserBits(newBits);
    };

    const targetBinaryString = target.toString(2).padStart(8, '0');

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">זירת התרגול</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setMode('dec2bin'); generateQuestion(); }}
                            className={`px-3 py-1 rounded text-sm font-bold transition-colors ${mode === 'dec2bin' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                            עשרוני לבינארי
                        </button>
                        <button
                            onClick={() => { setMode('bin2dec'); generateQuestion(); }}
                            className={`px-3 py-1 rounded text-sm font-bold transition-colors ${mode === 'bin2dec' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                            בינארי לעשרוני
                        </button>
                    </div>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-lg text-center border border-slate-700">
                    <span className="text-xs text-slate-500 block">רצף הצלחות</span>
                    <span className="text-xl font-bold text-yellow-400">{streak} 🔥</span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[200px]">

                {/* Question Display */}
                <div className="mb-8 text-center">
                    <span className="text-slate-400 text-sm mb-2 block">המשימה שלך: המר את המספר</span>
                    <div className="text-5xl font-black text-white font-mono bg-slate-800/50 px-8 py-4 rounded-xl border border-slate-700" dir="ltr">
                        {mode === 'dec2bin' ? target : targetBinaryString}
                    </div>
                </div>

                {/* Interaction Area */}
                {mode === 'dec2bin' ? (
                    <div className="w-full">
                        <div className="grid grid-cols-8 gap-2 mb-6 max-w-2xl mx-auto" dir="ltr">
                            {userBits.map((bit, index) => (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-slate-500">{Math.pow(2, 7 - index)}</span>
                                    <button
                                        onClick={() => toggleUserBit(index)}
                                        className={`w-full aspect-square rounded border-2 font-mono font-bold text-lg transition-all ${bit ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-500'}`}
                                    >
                                        {bit}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-center font-mono text-purple-300 mb-4">
                            ערך נוכחי: {userBits.reduce((acc, bit, i) => acc + (bit * Math.pow(2, 7 - i)), 0)}
                        </div>
                        <button onClick={checkDec2Bin} className="w-full max-w-xs mx-auto block bg-white text-purple-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition-colors">
                            בדיקה
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-md">
                        <input
                            type="number"
                            value={userDecInput}
                            onChange={(e) => setUserDecInput(e.target.value)}
                            placeholder="הכנס ערך עשרוני..."
                            className="w-full bg-slate-900 border border-slate-600 text-white p-4 rounded-lg text-center text-xl font-mono focus:outline-none focus:border-purple-500 mb-4"
                            onKeyDown={(e) => e.key === 'Enter' && checkBin2Dec()}
                        />
                        <button onClick={checkBin2Dec} className="w-full bg-white text-purple-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition-colors">
                            בדיקה
                        </button>
                    </div>
                )}

                {/* Feedback */}
                {feedback && (
                    <div className={`mt-6 flex items-center gap-2 text-lg font-bold ${feedback === 'correct' ? 'text-emerald-400' : 'text-red-400'} animate-bounce`}>
                        {feedback === 'correct' ? <CheckCircle /> : <XCircle />}
                        {feedback === 'correct' ? 'כל הכבוד! תשובה נכונה' : 'לא בדיוק... נסה שוב!'}
                    </div>
                )}
            </div>
        </div>
    );
};

const IPv4Structure = () => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">מבנה כתובת IPv4</h3>
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            <div className="text-center">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-widest">Human Friendly</div>
                {/* LTR for IP address */}
                <div className="bg-slate-800 px-6 py-3 rounded-lg text-2xl font-mono text-white border-2 border-blue-500/30" dir="ltr">
                    192.168.1.10
                </div>
            </div>
            <div className="text-2xl text-slate-600 hidden md:block">➜</div>
            <div className="text-center">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-widest">Machine Reality (32 Bits)</div>
                {/* LTR for binary representation */}
                <div className="bg-slate-800 px-6 py-3 rounded-lg text-sm md:text-lg font-mono text-emerald-400 border-2 border-emerald-500/30" dir="ltr">
                    <span className="text-emerald-200">11000000</span>.
                    <span className="text-emerald-400">10101000</span>.
                    <span className="text-emerald-200">00000001</span>.
                    <span className="text-emerald-400">00001010</span>
                </div>
            </div>
        </div>
        <p className="text-center text-slate-400 text-sm mt-4 max-w-2xl mx-auto">
            כל חלק בכתובת (בין הנקודות) נקרא <strong>אוקטטה</strong> (Octet) כי הוא מכיל בדיוק 8 ביטים.
            לכן הערך המקסימלי הוא 255 (כאשר כל ה-8 ביטים דולקים).
        </p>
    </div>
);

const IPv6Brief = () => (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
            <h3 className="text-xl font-bold text-white mb-2">ומה לגבי IPv6?</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                העולם נגמר מכתובות IPv4 (רק 4.3 מיליארד). IPv6 הוא הדור הבא.
                במקום 32 ביטים, יש לו <strong>128 ביטים</strong>!
                בגלל שזה מספר ענק, אנחנו לא משתמשים בעשרוני אלא בבסיס <strong>הקסדצימלי</strong> (0-9 ו-A-F).
            </p>
        </div>
        <div className="bg-black/30 p-4 rounded-lg font-mono text-xs text-yellow-200/80 border border-yellow-500/20 whitespace-nowrap" dir="ltr">
            2001:0db8:85a3:0000:0000:8a2e:0370:7334
        </div>
    </div>
);

export const BinaryPracticePage = () => {
    // Force dark mode for this page for "matrix/cyber" feel or keep app theme?
    // User's design was very dark/hacker style. I will try to respect that style while keeping layout.
    // I made the backgrounds slate-900/800 so it should look dark regardless, but better if we force dark or use neutral colors.

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 pb-20 text-slate-200 font-sans" dir="rtl">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-900/20 to-slate-950 pt-10 pb-12 px-6 border-b border-white/5 mb-12">
                <div className="max-w-4xl mx-auto text-center relative">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-0 right-0 p-2 bg-slate-800/50 rounded-full hover:bg-slate-700 transition"
                    >
                        <ChevronRight className="text-slate-400" />
                    </button>

                    <div className="inline-block p-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-4">
                        כלי עזר לסטודנטים
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        אומנות הבינארית ו-IP
                    </h1>
                    <p className="text-xl text-slate-400">
                        הבסיס לכל תקשורת מחשבים: איך מחשבים מדברים במספרים.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 space-y-12">

                {/* New Foundations Section */}
                <IPFoundations />

                <IPv4Structure />

                {/* Interactive Lab */}
                <BinaryLab />

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="bg-emerald-500 w-2 h-8 rounded-full"></span>
                            למה 128, 64, 32?
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            מחשבים עובדים בבסיס 2 (חשמל: יש זרם / אין זרם).
                            כל ספרה זזה שמאלה מכפילה את הערך פי 2.
                            <br />
                            זה בדיוק כמו בבסיס 10 שלנו (1, 10, 100), רק שבמחשב זה (1, 2, 4, 8...).
                        </p>
                        <ul className="text-slate-400 text-sm space-y-2 font-mono bg-slate-900 p-4 rounded-lg border border-slate-800" dir="ltr">
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^0</span> <span>1</span></li>
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^1</span> <span>2</span></li>
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^2</span> <span>4</span></li>
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^3</span> <span>8</span></li>
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^4</span> <span>16</span></li>
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^5</span> <span>32</span></li>
                            <li className="flex justify-between border-b border-slate-800 pb-1"><span>2^6</span> <span>64</span></li>
                            <li className="flex justify-between"><span>2^7</span> <span>128</span></li>
                        </ul>
                    </div>
                    <PracticeArena />
                </div>

                <IPv6Brief />

                {/* Navigation to Next Lesson */}
                <div className="flex justify-end mt-12">
                    <button
                        onClick={() => navigate('/practice/subnet-academy')}
                        className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02]"
                    >
                        <div className="text-right">
                            <div className="text-xs text-purple-200 uppercase tracking-wider mb-1">השיעור הבא</div>
                            <div className="flex items-center gap-2">
                                אומנות ה-Subnetting <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <footer className="text-center text-slate-600 py-12 mt-12 text-sm border-t border-slate-900/50 bg-slate-950">
                <p>© 2026 Intro to Networking | Binary Mastery Module</p>
            </footer>
        </div>
    );
};

