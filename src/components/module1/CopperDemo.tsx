import React, { useState, useEffect, useRef } from 'react';
import { Plug, Zap, CheckCircle, XCircle } from 'lucide-react';

const CopperDemo: React.FC = () => {
    const [voltage, setVoltage] = useState(5);
    const [frequency, setFrequency] = useState(3);
    const [activeTab, setActiveTab] = useState<'utp' | 'stp' | 'coaxial'>('utp');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Signal Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Grid lines
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();

            // Signal
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#f59e0b'; // amber-500

            for (let x = 0; x < canvas.width; x++) {
                // Square wave approx
                const freqVal = frequency * 0.05;
                const ampVal = (voltage / 10) * (canvas.height / 3);

                // Let's draw a square-ish wave mixed with sine to look like an electric signal
                const y = canvas.height / 2 + Math.sin((x + time) * freqVal) * ampVal;

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            time += 2;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [voltage, frequency]);

    const cableTypes = {
        utp: { name: 'UTP', full: 'Unshielded Twisted Pair', desc: 'הכבל הנפוץ ביותר. זוגות שזורים ללא סיכוך נוסף.', icon: '🔌' },
        stp: { name: 'STP', full: 'Shielded Twisted Pair', desc: 'כולל שכבת סיכוך (Foil) להגנה מהפרעות חיצוניות.', icon: '🛡️' },
        coaxial: { name: 'Coaxial', full: 'Coaxial Cable', desc: 'כבל עם ליבה אחת וסיכוך עבה. משמש בעיקר לטלוויזיה ותשתיות ישנות.', icon: '📺' }
    };

    return (
        <div className="space-y-8 my-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-amber-900/50 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                    <Plug size={20} />
                    <span>טכנולוגיה #2</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-2">כבלי נחושת (Copper Cables)</h2>
                <p className="text-slate-400 text-lg">הוותיקים והנפוצים ביותר — חשמל שמעביר מידע</p>
            </div>

            {/* Signal Simulator */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                    <Zap size={20} className="text-amber-500" /> סימולטור אות חשמלי
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <canvas ref={canvasRef} width={500} height={250} className="w-full h-[250px]" />
                    </div>

                    <div className="space-y-6 flex flex-col justify-center">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                מתח (Voltage): {voltage}V
                            </label>
                            <input
                                type="range"
                                min="1" max="10"
                                value={voltage}
                                onChange={(e) => setVoltage(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                תדירות: {frequency}Hz
                            </label>
                            <input
                                type="range"
                                min="1" max="10"
                                value={frequency}
                                onChange={(e) => setFrequency(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg text-sm text-amber-800 dark:text-amber-200">
                            <strong>איך זה עובד?</strong><br />
                            המידע עובר כשינויי מתח. מתח גבוה מייצג 1, מתח נמוך 0. התדירות קובעת כמה ביטים עוברים בשנייה.
                        </div>
                    </div>
                </div>
            </div>

            {/* Cable Types */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-6 dark:text-white">סוגי כבלים</h3>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {(Object.keys(cableTypes) as Array<keyof typeof cableTypes>).map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeTab === type
                                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            {cableTypes[type].name}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 border border-slate-200 dark:border-slate-800 min-h-[200px]">
                    <div className="text-6xl animate-bounce-slow">
                        {cableTypes[activeTab].icon}
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{cableTypes[activeTab].full}</h4>
                        <p className="text-lg text-slate-600 dark:text-slate-400">{cableTypes[activeTab].desc}</p>
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm text-right bg-white dark:bg-slate-900">
                    <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-bold uppercase">
                        <tr>
                            <th className="p-4">קטגוריה</th>
                            <th className="p-4">מהירות</th>
                            <th className="p-4">תדר</th>
                            <th className="p-4">שימוש</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-900 dark:text-white">Cat 5e</td>
                            <td className="p-4">1 Gbps</td>
                            <td className="p-4">100 MHz</td>
                            <td className="p-4">ביתי</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                            <td className="p-4 font-bold text-slate-900 dark:text-white">Cat 6</td>
                            <td className="p-4">10 Gbps</td>
                            <td className="p-4">250 MHz</td>
                            <td className="p-4">עסקי/גיימינג</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-900 dark:text-white">Cat 6a</td>
                            <td className="p-4">10 Gbps</td>
                            <td className="p-4">500 MHz</td>
                            <td className="p-4">Data Centers</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                            <td className="p-4 font-bold text-slate-900 dark:text-white">Cat 8</td>
                            <td className="p-4">40 Gbps</td>
                            <td className="p-4">2000 MHz</td>
                            <td className="p-4">שרתים</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pros/Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} /> יתרונות
                    </h3>
                    <ul className="space-y-2 text-green-700 dark:text-green-300">
                        <li>• עלות נמוכה והתקנה פשוטה</li>
                        <li>• נפוץ ונגיש מאוד (RJ-45)</li>
                        <li>• תומך ב-PoE (חשמל דרך הכבל)</li>
                    </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                        <XCircle size={20} /> חסרונות
                    </h3>
                    <ul className="space-y-2 text-red-700 dark:text-red-300">
                        <li>• טווח מוגבל (100 מטר)</li>
                        <li>• רגיש להפרעות חשמליות (EMI)</li>
                        <li>• קצב תעבורה נמוך מסיבים</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CopperDemo;
