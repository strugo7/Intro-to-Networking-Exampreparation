import React from 'react';
import StpCanvas from './StpCanvas';
import { Shield, AlertTriangle, GitMerge, Clock, Zap, CheckCircle, XCircle, Anchor } from 'lucide-react';

const StpLesson: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                    Spanning Tree Protocol (STP)
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    הגיבור השקט של הרשת. איך מונעים לולאות הרסניות ושומרים על יציבות.
                </p>
            </div>

            {/* The Problem: Loops */}
            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle /> הבעיה: לולאות (Loops)
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            כדי ליצור גיבוי (Redundancy), אנחנו מחברים כבלים כפולים בין מתגים.
                            אבל אם מחברים מעגל סגור ללא בקרה, נוצרת <strong>לולאה אינסופית</strong>.
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex gap-2">
                                <span className="text-red-400">❌</span>
                                <strong>Broadcast Storm:</strong> הודעות משוכפלות לנצח עד שהרשת קורסת.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-red-400">❌</span>
                                <strong>Duplicate Frames:</strong> המחשב מקבל את אותו מידע שוב ושוב.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-red-400">❌</span>
                                <strong>MAC Instability:</strong> המתג מתבלבל כי אותה כתובת מגיעה מפורטים שונים.
                            </li>
                        </ul>
                    </div>
                    {/* Visual Representation of a Loop */}
                    <div className="relative h-40 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                        <div className="flex gap-8 items-center">
                            <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold">SW1</div>
                            <div className="w-20 h-1 bg-red-400/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-red-400 w-1/2 animate-[shimmer_1s_infinite]"></div>
                            </div>
                            <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold">SW2</div>
                        </div>
                        {/* Curved line for the second link to show loop */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path d="M 160 50 Q 200 100, 240 50" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="4" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* The Solution: STP Algorithm */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="text-green-400" /> הפתרון: אלגוריתם STP
                </h2>
                <p className="text-slate-300 mb-6">
                    הפרוטוקול מזהה מעגלים ו"מנתק" לוגית את אחד הפורטים כדי לשבור את הלולאה.
                    התוצאה: מבנה של <strong>עץ (Tree)</strong>. אם כבל נקרע, ה-STP מפעיל מחדש את הפורט החסום לגיבוי.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-800 p-4 rounded-xl border-t-4 border-yellow-500">
                        <div className="flex items-center gap-2 text-yellow-500 font-bold mb-2">
                            <span className="text-xl">1</span> Root Bridge
                        </div>
                        <p className="text-sm text-slate-400">נבחר מנהל ראשי לרשת (זה עם ה-ID הכי נמוך).</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border-t-4 border-blue-500">
                        <div className="flex items-center gap-2 text-blue-500 font-bold mb-2">
                            <span className="text-xl">2</span> Root Ports
                        </div>
                        <p className="text-sm text-slate-400">כל מתג בוחר את הדרך הכי מהירה להגיע ל-Root.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border-t-4 border-green-500">
                        <div className="flex items-center gap-2 text-green-500 font-bold mb-2">
                            <span className="text-xl">3</span> Designated
                        </div>
                        <p className="text-sm text-slate-400">נבחר פורט אחראי בכל מקטע רשת.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border-t-4 border-red-500">
                        <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                            <span className="text-xl">4</span> Blocking
                        </div>
                        <p className="text-sm text-slate-400">כל שאר הפורטים נחסמים כדי למנוע מעגלים.</p>
                    </div>
                </div>
            </div>

            {/* Port States */}
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Clock size={16} /> מצבי פורט (STP States)
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30 w-full md:w-auto">
                        <XCircle className="mx-auto text-red-400 mb-1" />
                        <div className="font-bold text-red-400">Blocking</div>
                        <div className="text-xs text-slate-500">מנותק לוגית</div>
                    </div>
                    <div className="text-slate-600">→</div>
                    <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-500/30 w-full md:w-auto">
                        <div className="font-bold text-orange-400">Listening</div>
                        <div className="text-xs text-slate-500">מאזין (15 ש')</div>
                    </div>
                    <div className="text-slate-600">→</div>
                    <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-500/30 w-full md:w-auto">
                        <div className="font-bold text-yellow-400">Learning</div>
                        <div className="text-xs text-slate-500">לומד MAC (15 ש')</div>
                    </div>
                    <div className="text-slate-600">→</div>
                    <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30 w-full md:w-auto">
                        <CheckCircle className="mx-auto text-green-400 mb-1" />
                        <div className="font-bold text-green-400">Forwarding</div>
                        <div className="text-xs text-slate-500">עובד רגיל</div>
                    </div>
                </div>
                <div className="mt-4 text-center text-xs text-slate-400 bg-slate-800 p-2 rounded">
                    סה"כ זמן עד שהפורט עולה: <strong>30-50 שניות</strong> (ב-RSTP זה לוקח שנייה!)
                </div>
            </div>

            {/* Interactive Simulator */}
            <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Anchor className="text-cyan-400" /> סימולטור STP חי
                </h2>
                <StpCanvas />
            </div>

            {/* RSTP Note */}
            <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl flex gap-4 items-start">
                <div className="bg-blue-500 p-2 rounded-lg text-white mt-1">
                    <Zap size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-blue-300 mb-1">העתיד הוא מהיר: RSTP</h4>
                    <p className="text-sm text-slate-400">
                        היום משתמשים ב-<strong>Rapid STP (802.1w)</strong>. הוא מדלג על שלבי ה-Listening וה-Blocking הארוכים
                        ומתכנס תוך פחות מ-2 שניות. אך העקרון נשאר זהה: תמיד שומרים על עץ ללא לולאות.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StpLesson;
