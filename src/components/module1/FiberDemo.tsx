import React, { useState, useEffect, useRef } from 'react';
import { Zap, CheckCircle, XCircle, Info, Maximize2, Minimize2 } from 'lucide-react';

const FiberDemo: React.FC = () => {
    const [mode, setMode] = useState<'single' | 'multi'>('single');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Animation for light reflection
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let offset = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Core
            const coreHeight = mode === 'single' ? 20 : 60;
            const coreY = (canvas.height - coreHeight) / 2;

            ctx.fillStyle = '#e2e8f0'; // slate-200
            ctx.fillRect(0, coreY - 10, canvas.width, coreHeight + 20); // Cladding

            ctx.fillStyle = '#3b82f6'; // blue-500 (Core)
            ctx.fillRect(0, coreY, canvas.width, coreHeight);

            // Draw Light Path
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            if (mode === 'single') {
                // Straight line
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.strokeStyle = '#fbbf24'; // amber-400
                ctx.shadowColor = '#fbbf24';
                ctx.shadowBlur = 10;
                ctx.stroke();
                ctx.shadowBlur = 0;
            } else {
                // Bouncing lines (Multi-mode)
                const animateLight = (startOffset: number, color: string) => {
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height / 2);
                    for (let x = 0; x <= canvas.width; x += 10) {
                        const y = canvas.height / 2 + Math.sin((x + offset + startOffset) * 0.05) * (coreHeight / 2 - 2);
                        ctx.lineTo(x, y);
                    }
                    ctx.strokeStyle = color;
                    ctx.stroke();
                };

                animateLight(0, '#fbbf24'); // amber
                animateLight(20, '#f87171'); // red
                animateLight(40, '#34d399'); // green
            }

            offset += 2;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [mode]);

    return (
        <div className="space-y-8 my-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                        <Zap size={20} />
                        <span>טכנולוגיה #1</span>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        סיבים אופטיים (Fiber Optics)
                    </h2>
                    <p className="text-slate-400 text-lg">העברת נתונים במהירות האור — פשוטו כמשמעו</p>
                </div>
                {/* Background effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                        <Info size={20} className="text-blue-500" /> איך זה עובד?
                    </h3>

                    <div className="bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden mb-4 relative">
                        <canvas ref={canvasRef} width={500} height={200} className="w-full h-[200px]" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <button
                                onClick={() => setMode('single')}
                                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${mode === 'single' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                                Single Mode
                            </button>
                            <button
                                onClick={() => setMode('multi')}
                                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${mode === 'multi' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                                Multi Mode
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: '1. המרה חשמלית → אור', desc: 'משדר (LED או לייזר) ממיר את האות החשמלי לפולסי אור' },
                            { title: '2. שידור דרך הליבה', desc: 'האור נע דרך ליבת זכוכית דקיקה (Core) תוך שהוא מוחזר פנימית' },
                            { title: '3. החזרה פנימית מלאה', desc: 'Total Internal Reflection — האור "קופץ" בין דפנות הסיב' },
                            { title: '4. קליטה והמרה חזרה', desc: 'מקלט (Photodiode) ממיר את פולסי אור חזרה לאותות חשמליים' }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{step.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Types */}
                <div className="space-y-6">
                    <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${mode === 'single' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300'}`} onClick={() => setMode('single')}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Single Mode</h3>
                                <span className="text-xs font-medium px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">מצב יחיד</span>
                            </div>
                            <Maximize2 size={20} className="text-blue-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <div>קוטר ליבה: <span className="font-bold text-slate-900 dark:text-white">8-10 μm</span></div>
                            <div>מרחק: <span className="font-bold text-slate-900 dark:text-white">100+ ק"מ</span></div>
                            <div>מקור אור: <span className="font-bold text-slate-900 dark:text-white">לייזר</span></div>
                            <div>עלות: <span className="font-bold text-red-500">גבוהה 💰💰💰</span></div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${mode === 'multi' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300'}`} onClick={() => setMode('multi')}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi Mode</h3>
                                <span className="text-xs font-medium px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">רב מצבי</span>
                            </div>
                            <Minimize2 size={20} className="text-blue-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <div>קוטר ליבה: <span className="font-bold text-slate-900 dark:text-white">50-62.5 μm</span></div>
                            <div>מרחק: <span className="font-bold text-slate-900 dark:text-white">עד 2 ק"מ</span></div>
                            <div>מקור אור: <span className="font-bold text-slate-900 dark:text-white">LED</span></div>
                            <div>עלות: <span className="font-bold text-green-600">בינונית 💰💰</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} /> יתרונות
                    </h3>
                    <ul className="space-y-2">
                        {[
                            'מהירות גבוהה מאוד (עד Tbps)',
                            'חסין להפרעות אלקטרומגנטיות (EMI)',
                            'מרחקים ארוכים ללא הנחתה',
                            'אבטחה גבוהה — קשה להאזין'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-green-700 dark:text-green-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                        <XCircle size={20} /> חסרונות
                    </h3>
                    <ul className="space-y-2">
                        {[
                            'עלות גבוהה (ציוד ושכבות)',
                            'שברירי — רגיש לכיפופים חדים',
                            'התקנה מורכבת (דורש מומחיות)',
                            'קשה לתיקון בשטח'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FiberDemo;
