import React from 'react';
import HeroCanvas from './HeroCanvas';
import { Layers, ArrowDown, ArrowRight } from 'lucide-react';

const Layer2Intro: React.FC = () => {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 flex flex-col items-center justify-center">
                <div className="absolute inset-0 z-0 opacity-60">
                    <HeroCanvas />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md animate-fade-in-up">
                        <Layers size={18} />
                        <span className="font-bold tracking-wider text-sm">MODULE 2: DATA LINK LAYER</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            החיבור המקומי
                        </span>
                        <br />
                        (Data Link Layer)
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
                        איך מידע עובר בתוך החדר? מה זה MAC Address? ולמה Switches הם הרכיבים הכי חכמים ברשת המקומית?
                    </p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
                    <ArrowDown size={32} />
                </div>
            </div>

            {/* OSI Context */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-blue-500">#2</span>
                            המיקום במודל OSI
                        </h2>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            שכבה 2 (Data Link) היא הגשר בין החומרה (כבלים, חשמל) לבין התוכנה (כתובות IP, אפליקציות).
                            היא אחראית על העברת נתונים אמינה בין שני מכשירים שמחוברים **ישירות** לאותו כבל או לאותו Switch.
                        </p>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-bold text-white mb-4">תפקידים מרכזיים:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400 mt-1">
                                        <Layers size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-cyan-400 block mb-1">מסגור (Framing)</strong>
                                        <span className="text-slate-400 text-sm">אריזת הביטים משכבה 1 לתוך "חבילות" מסודרות שנקראות Frames.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 mt-1">
                                        <Layers size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-purple-400 block mb-1">כתובות פיזיות (Addressing)</strong>
                                        <span className="text-slate-400 text-sm">זיהוי חד-ערכי של המקור והיעד באמצעות כתובות MAC.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-green-500/20 p-2 rounded-lg text-green-400 mt-1">
                                        <Layers size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-green-400 block mb-1">בקרת גישה (Media Access)</strong>
                                        <span className="text-slate-400 text-sm">החלטה מתי מותר לשדר כדי למנוע התנגשויות (כמו זכות קדימה בכביש).</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* OSI Tower Visual */}
                    <div className="relative h-[500px] w-full bg-slate-900/50 rounded-3xl border border-slate-800 p-8 flex flex-col justify-end items-center shadow-2xl overflow-hidden group hover:border-slate-700 transition-all">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                        {/* Layers Stack */}
                        <div className="w-64 space-y-2 relative z-10">
                            {/* Upper Layers (Ghosted) */}
                            {[7, 6, 5, 4, 3].map((l) => (
                                <div key={l} className="h-12 w-full rounded-lg bg-slate-800/30 border border-slate-700/30 flex items-center justify-center text-slate-600 font-mono text-sm">
                                    Layer {l}
                                </div>
                            ))}

                            {/* Layer 2 (Highlighted) */}
                            <div className="h-24 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-110 transform transition-transform z-20 relative">
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-cyan-400 animate-pulse">
                                    <ArrowRight size={32} />
                                </div>
                                Layer 2: Data Link
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full bg-slate-800 text-cyan-400 px-3 py-1 rounded text-xs font-mono border border-cyan-500/30">
                                    PDU: Frame
                                </div>
                            </div>

                            {/* Layer 1 */}
                            <div className="h-12 w-full rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 font-mono text-sm">
                                Layer 1: Physical
                            </div>
                        </div>

                        {/* Connection Lines animation */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Abstract lines connecting L2 to devices */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layer2Intro;
