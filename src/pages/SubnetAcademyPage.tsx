import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubnetGlossary from '../components/module5/SubnetGlossary';

// --- ICONS ---
const IconBase = ({ children, size = 24, className = "" }: { children: React.ReactNode, size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);
const MagicIcon = (props: any) => <IconBase {...props}><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" /><path d="m14 7 3 3" /><path d="M5 6v4" /><path d="M19 14v4" /><path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" /></IconBase>;
const TargetIcon = (props: any) => <IconBase {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></IconBase>;
const CheckIcon = (props: any) => <IconBase {...props}><polyline points="20 6 9 17 4 12" /></IconBase>;
const XIcon = (props: any) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></IconBase>;

// --- COMPONENTS ---

// 1. The Method Explainer (Stepper)
const MethodExplainer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "שלב 1: מצא את האוקטטה המעניינת",
            desc: "הביטו על ה-Subnet Mask. האוקטטה המעניינת היא זו שאינה 255 ואינה 0.",
            visual: (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-xl text-slate-400">דוגמה: 255.255.<span className="text-white font-bold text-2xl">224</span>.0</div>
                    <div className="flex gap-2" dir="ltr">
                        <div className="bg-slate-800 p-3 rounded opacity-50">255</div>
                        <div className="bg-slate-800 p-3 rounded opacity-50">. 255</div>
                        <div className="bg-purple-600 p-3 rounded font-bold shadow-lg scale-110 animate-pulse">. 224</div>
                        <div className="bg-slate-800 p-3 rounded opacity-50">. 0</div>
                    </div>
                    <p className="text-sm text-purple-300">כאן, השינוי קורה באוקטטה השלישית!</p>
                </div>
            )
        },
        {
            title: "שלב 2: חשב את מספר הקסם (Magic Number)",
            desc: "הנוסחה פשוטה: 256 פחות הערך של האוקטטה המעניינת.",
            visual: (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-4xl font-mono font-bold text-white bg-slate-800 p-4 rounded-xl border border-slate-600">
                        256 - <span className="text-purple-400">224</span> = <span className="text-green-400">32</span>
                    </div>
                    <p className="text-green-300 font-bold">32 הוא מספר הקסם (גודל הבלוק).</p>
                    <div className="text-sm text-slate-400">זה אומר שהרשתות שלנו "קופצות" ב-32.</div>
                </div>
            )
        },
        {
            title: "שלב 3: מצא את הכפולות (Multiples)",
            desc: "התחל מ-0 והוסף את מספר הקסם עד שתגיע קרוב (אך לא מעבר) לכתובת ה-IP שלך.",
            visual: (
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="text-slate-300">נניח שה-IP הוא: 192.168.10.<span className="text-yellow-400 font-bold">75</span></div>
                    <div className="flex gap-1 w-full max-w-md h-12 bg-slate-800 rounded overflow-hidden relative">
                        {[0, 32, 64, 96, 128].map((val, i) => (
                            <div key={i} className={`flex-1 border-r border-slate-600 flex items-center justify-center text-xs ${val === 64 ? 'bg-green-500/30 text-green-300 font-bold' : 'text-slate-500'}`}>
                                {val}
                            </div>
                        ))}
                        <div className="absolute top-8 left-[65%] -translate-x-1/2 text-yellow-400 text-lg font-bold">⬆</div>
                    </div>
                    <p className="text-sm text-slate-300">
                        75 נמצא בין 64 ל-96. לכן, רשת הבסיס היא <span className="text-green-400 font-bold">.64</span>.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="backdrop-blur-xl bg-slate-800/50 p-8 rounded-2xl mb-12 border-t-4 border-purple-500 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MagicIcon className="text-purple-400" />
                השיטה ב-3 שלבים (The Predictability Approach)
            </h2>

            <div className="min-h-[250px] bg-slate-900/50 rounded-xl p-6 border border-slate-700 flex flex-col justify-center items-center transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-2">{steps[step].title}</h3>
                <p className="text-slate-400 mb-8 text-center max-w-lg">{steps[step].desc}</p>
                {steps[step].visual}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="px-6 py-2 rounded-full bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-colors"
                >
                    הקודם
                </button>
                <div className="flex gap-2 items-center">
                    {steps.map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === step ? 'bg-purple-500 scale-125' : 'bg-slate-700'}`}></div>
                    ))}
                </div>
                <button
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={step === steps.length - 1}
                    className="px-6 py-2 rounded-full bg-purple-600 text-white disabled:opacity-30 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50"
                >
                    הבא
                </button>
            </div>
        </div>
    );
};

// 2. The Magic Calculator (Visual Tool)
const MagicCalculator = () => {
    const [cidr, setCidr] = useState(26);
    const [targetIP, setTargetIP] = useState("192.168.10.150");

    // Calculation Logic (Derived state)
    let magicNumber = 0;
    let interestingOctet = 4;
    let maskStr = "";
    let subnet = "";
    let broadcast = "";
    let firstHost = "";
    let lastHost = "";
    let multiples: number[] = [];

    // Helper to run logic immediately
    const runCalculation = () => {
        let m1 = 255, m2 = 255, m3 = 255, m4 = 255;
        let bits = 0;

        if (cidr >= 24) {
            interestingOctet = 4;
            bits = cidr - 24;
            const val = [0, 128, 192, 224, 240, 248, 252, 254, 255][bits];
            m4 = val;
            magicNumber = 256 - val;
        } else if (cidr >= 16) {
            interestingOctet = 3;
            bits = cidr - 16;
            const val = [0, 128, 192, 224, 240, 248, 252, 254, 255][bits];
            m3 = val;
            m4 = 0;
            magicNumber = 256 - val;
        } else {
            interestingOctet = 2; // Simplified for Class A/B/C context
            bits = cidr - 8;
            const val = [0, 128, 192, 224, 240, 248, 252, 254, 255][bits];
            m2 = val;
            m3 = 0;
            m4 = 0;
            magicNumber = 256 - val;
        }

        maskStr = `${m1}.${m2}.${m3}.${m4}`;

        // Parse IP
        const parts = targetIP.split('.').map(Number);
        if (parts.length !== 4 || parts.some(isNaN)) return;

        const interestVal = parts[interestingOctet - 1];
        const multiplier = Math.floor(interestVal / magicNumber);
        const subnetVal = multiplier * magicNumber;
        const nextSubnetVal = (multiplier + 1) * magicNumber;

        // Generate multiples for visualizer
        multiples = [];
        for (let i = 0; i < 6; i++) {
            multiples.push(i * magicNumber);
        }

        // Construct Result Addresses
        if (interestingOctet === 4) {
            subnet = `${parts[0]}.${parts[1]}.${parts[2]}.${subnetVal}`;
            broadcast = `${parts[0]}.${parts[1]}.${parts[2]}.${nextSubnetVal - 1}`;
            firstHost = `${parts[0]}.${parts[1]}.${parts[2]}.${subnetVal + 1}`;
            lastHost = `${parts[0]}.${parts[1]}.${parts[2]}.${nextSubnetVal - 2}`;
        } else if (interestingOctet === 3) {
            subnet = `${parts[0]}.${parts[1]}.${subnetVal}.0`;
            broadcast = `${parts[0]}.${parts[1]}.${nextSubnetVal - 1}.255`;
            firstHost = `${parts[0]}.${parts[1]}.${subnetVal}.1`;
            lastHost = `${parts[0]}.${parts[1]}.${nextSubnetVal - 1}.254`;
        }
    };

    runCalculation();

    return (
        <div className="backdrop-blur-xl bg-slate-800/50 p-8 rounded-2xl mb-12 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TargetIcon className="text-blue-400" />
                מחשבון הקסם הויזואלי (The Magic Lens)
            </h2>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <div>
                    <label className="block text-slate-400 text-sm mb-2 font-bold">1. גודל רשת (CIDR): <span className="text-blue-400">/{cidr}</span></label>
                    <input
                        type="range" min="16" max="30" step="1"
                        value={cidr}
                        onChange={(e) => setCidr(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                        <span>/16 (Class B)</span>
                        <span>/24 (Class C)</span>
                        <span>/30</span>
                    </div>
                </div>
                <div>
                    <label className="block text-slate-400 text-sm mb-2 font-bold">2. כתובת יעד (Host IP):</label>
                    <input
                        type="text"
                        value={targetIP}
                        onChange={(e) => setTargetIP(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-600 text-white p-3 rounded-lg font-mono ltr-text"
                        style={{ direction: 'ltr' }}
                    />
                </div>
            </div>

            {/* Magic Visualization */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-yellow-500">
                    <div className="text-xs text-slate-400 uppercase">האוקטטה המעניינת</div>
                    <div className="text-2xl font-bold text-white">#{interestingOctet}</div>
                    <div className="text-xs text-slate-500">המיקום שבו המסכה "חותכת"</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-purple-500">
                    <div className="text-xs text-slate-400 uppercase">מסכת הרשת (Decimal)</div>
                    <div className="text-lg font-mono text-white" style={{ direction: 'ltr' }}>{maskStr}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    <div className="text-xs text-slate-400 uppercase font-bold">מספר הקסם (Block Size)</div>
                    <div className="text-3xl font-black text-green-400">{magicNumber}</div>
                    <div className="text-xs text-green-200/50">256 פחות המסכה</div>
                </div>
            </div>

            {/* The Ruler Visualization */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8 relative overflow-hidden">
                <h4 className="text-slate-400 text-sm mb-4 text-center">ה"קפיצות" של הרשת (Multiples of {magicNumber})</h4>
                <div className="relative h-12 w-full flex items-end">
                    {multiples.map((val, i) => (
                        <div key={i} className="flex-1 border-r border-slate-700 relative h-8">
                            <div className="absolute -top-6 -right-2 text-xs font-mono text-slate-500">{val}</div>
                            <div className="absolute bottom-0 w-full bg-slate-800 h-2"></div>
                        </div>
                    ))}
                    {/* Highlight Zone */}
                    <div className="absolute bottom-0 h-4 bg-green-500/30 border-t-2 border-green-500 w-full text-center text-xs text-green-300 font-bold pt-1">
                        הרשתות הן כפולות של {magicNumber}: 0, {magicNumber}, {magicNumber * 2}...
                    </div>
                </div>
            </div>

            {/* Final Results Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" style={{ direction: 'ltr' }}>
                    <thead>
                        <tr className="bg-slate-900 text-slate-400 text-xs uppercase">
                            <th className="p-3 rounded-tl-lg">Network ID</th>
                            <th className="p-3">First Host</th>
                            <th className="p-3">Last Host</th>
                            <th className="p-3 rounded-tr-lg">Broadcast</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-sm text-white">
                        <tr className="bg-slate-800 border-b border-slate-700">
                            <td className="p-3 text-green-400 font-bold">{subnet}</td>
                            <td className="p-3">{firstHost}</td>
                            <td className="p-3">{lastHost}</td>
                            <td className="p-3 text-orange-400 font-bold">{broadcast}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 3. Practice Gym (Gamified)
const PracticeGym = () => {
    const [level, setLevel] = useState(1); // 1=Class C, 2=Class B
    const [question, setQuestion] = useState<any>(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [streak, setStreak] = useState(0);

    const generateQuestion = () => {
        setUserAnswer("");
        setFeedback(null);

        if (level === 1) {
            // Class C (/25 - /30)
            const cidr = Math.floor(Math.random() * 6) + 25;
            const magic = 256 - [0, 128, 192, 224, 240, 248, 252, 254, 255][cidr - 24];
            const multiplier = Math.floor(Math.random() * (256 / magic));
            const network = multiplier * magic;
            const host = network + Math.floor(Math.random() * (magic - 2)) + 1;
            const ip = `192.168.50.${host}`;

            setQuestion({
                ip, cidr, magic,
                answer: `192.168.50.${network}`,
                hint: `מספר הקסם הוא ${magic}. מצא את הכפולה הכי קרובה ל-${host} מלמטה.`
            });
        } else {
            // Class B (/17 - /23)
            const cidr = Math.floor(Math.random() * 7) + 17;
            const magic = 256 - [0, 128, 192, 224, 240, 248, 252, 254, 255][cidr - 16];
            const multiplier = Math.floor(Math.random() * (256 / magic));
            const network3rd = multiplier * magic;
            const host3rd = network3rd + Math.floor(Math.random() * (magic - 1));
            const ip = `172.16.${host3rd}.55`;

            setQuestion({
                ip, cidr, magic,
                answer: `172.16.${network3rd}.0`,
                hint: `השינוי באוקטטה ה-3. מספר הקסם ${magic}. חפש כפולות של ${magic} שקרובות ל-${host3rd}.`
            });
        }
    };

    useEffect(() => {
        generateQuestion();
    }, [level]);

    const checkAnswer = () => {
        if (question && userAnswer.trim() === question.answer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            setTimeout(generateQuestion, 2000);
        } else {
            setFeedback('wrong');
            setStreak(0);
        }
    };

    if (!question) return null;

    return (
        <div className="backdrop-blur-xl bg-slate-800/50 p-8 rounded-2xl border-t-4 border-green-500 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">חדר כושר למוח</h2>
                    <p className="text-slate-400 text-sm">תרגל עד שזה יהיה טבע שני.</p>
                </div>
                <div className="flex bg-slate-900 p-1 rounded-lg">
                    <button onClick={() => setLevel(1)} className={`px-4 py-1 rounded text-sm ${level === 1 ? 'bg-green-600 text-white' : 'text-slate-400'}`}>Class C</button>
                    <button onClick={() => setLevel(2)} className={`px-4 py-1 rounded text-sm ${level === 2 ? 'bg-green-600 text-white' : 'text-slate-400'}`}>Class B</button>
                </div>
            </div>

            <div className="text-center mb-8">
                <div className="text-slate-400 mb-2">מצא את כתובת הרשת (Network ID) של:</div>
                <div className="text-4xl md:text-5xl font-mono font-black text-white" style={{ direction: 'ltr' }}>
                    {question.ip} <span className="text-green-400">/{question.cidr}</span>
                </div>
            </div>

            <div className="max-w-md mx-auto relative">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={level === 1 ? "192.168.50.x" : "172.16.x.0"}
                    className="w-full bg-slate-900 border border-slate-600 p-4 rounded-xl text-center text-xl font-mono text-white focus:border-green-500 outline-none"
                    style={{ direction: 'ltr' }}
                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <button
                    onClick={checkAnswer}
                    className="absolute right-2 top-2 bottom-2 bg-green-600 hover:bg-green-500 text-white px-6 rounded-lg font-bold transition-colors"
                >
                    בדוק
                </button>
            </div>

            {feedback && (
                <div className={`mt-6 p-4 rounded-xl flex items-center justify-center gap-2 font-bold animate-pulse ${feedback === 'correct' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {feedback === 'correct' ? <CheckIcon /> : <XIcon />}
                    {feedback === 'correct' ? "נכון מאוד! ממשיכים..." : <span>טעות. {question.hint}</span>}
                </div>
            )}

            <div className="mt-4 text-center text-slate-500 text-xs">
                רצף תשובות נכונות: <span className="text-white font-bold">{streak}</span>
            </div>
        </div>
    );
};

// --- MAIN APP ---

const SubnetAcademyPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 pb-20 font-heebo" dir="rtl">
            {/* Header Area */}
            <div className="bg-gradient-to-br from-purple-900/20 via-slate-950 to-slate-950 pt-10 pb-12 px-6 border-b border-white/5 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <Link to="/binary-practice" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowRight size={20} className="ml-2" />
                        חזרה לתרגול בינארי
                    </Link>

                    <div className="flex justify-center mb-4">
                        <div className="inline-block p-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold">
                            Network Academy Style
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        אומנות ה-Subnetting
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        המדריך המלא לשיטת "מספר הקסם". בלי בינארי, בלי כאב ראש.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 space-y-16">

                <MethodExplainer />

                <MagicCalculator />

                <PracticeGym />

                <SubnetGlossary />

            </div>

            {/* Footer Navigation */}
            <div className="max-w-4xl mx-auto px-6 mt-12 flex justify-between items-center">
                <Link to="/binary-practice" className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowRight className="ml-2" />
                    השיעור הקודם: בינארי
                </Link>
                {/* Placeholder for next lesson if any */}
            </div>

            <footer className="text-center text-slate-600 py-12 mt-12 text-sm border-t border-slate-900/50 bg-slate-950">
                <p>© 2026 Intro to Networking | Built for Students</p>
            </footer>
        </div>
    );
};

export default SubnetAcademyPage;
