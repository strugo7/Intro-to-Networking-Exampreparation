import React from 'react';
import MacTableCanvas from './MacTableCanvas';
import { ArrowRightLeft, GitBranch, Zap, Shield, Database, GraduationCap, Network } from 'lucide-react';

const SwitchingLesson: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                    Switching (מיתוג)
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    המוח של הרשת המקומית. איך המתג לומד, מחליט ומעביר מידע במהירות האור.
                </p>
            </div>

            {/* Hub vs Switch */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <ArrowRightLeft className="text-yellow-400" /> Hub לעומת Switch
                </h2>

                <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Hub Card */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Network size={64} />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">🔌</span>
                            <h3 className="text-xl font-bold text-slate-200">Hub (רכזת)</h3>
                        </div>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                            רכיב "טיפש" (שכבה 1). כשמידע נכנס לפורט אחד, הוא משוכפל ונשלח <strong>לכל הפורטים האחרים</strong>.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-300 text-sm font-mono">
                            📤 נכנס מ-1 -&gt; 📥 נשלח ל-2,3,4...
                        </div>
                        <div className="mt-4 flex gap-2">
                            <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded">Collisions</span>
                            <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded">Slow</span>
                            <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded">Insecure</span>
                        </div>
                    </div>

                    {/* VS Badge */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-slate-700 border-4 border-slate-900 rounded-full w-12 h-12 flex items-center justify-center font-black text-white text-sm shadow-xl hidden md:flex">
                        VS
                    </div>

                    {/* Switch Card */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-slate-800 p-6 rounded-xl border border-blue-500/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <GitBranch size={64} />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">🔀</span>
                            <h3 className="text-xl font-bold text-white">Switch (מתג)</h3>
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed">
                            רכיב "חכם" (שכבה 2). לומד כתובות MAC ושולח מידע <strong>רק לפורט היעד</strong>.
                        </p>
                        <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-300 text-sm font-mono">
                            📤 נכנס מ-1 -&gt; 📥 נשלח ל-3 בלבד
                        </div>
                        <div className="mt-4 flex gap-2">
                            <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">No Collisions</span>
                            <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">Fast</span>
                            <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">Secure</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Process */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <GraduationCap className="text-blue-400" /> איך Switch לומד?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-blue-500">
                        <div className="text-blue-400 font-bold mb-2">1. קבלה</div>
                        <p className="text-sm text-slate-400">מסגרת מגיעה לפורט. המתג קורא את ה-Source MAC.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-green-500">
                        <div className="text-green-400 font-bold mb-2">2. למידה (Learning)</div>
                        <p className="text-sm text-slate-400">המתג רושם בטבלה: "כתובת X נמצאת בפורט Y".</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-purple-500">
                        <div className="text-purple-400 font-bold mb-2">3. חיפוש (Look up)</div>
                        <p className="text-sm text-slate-400">בודק בטבלה איפה נמצא ה-Destination MAC.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-orange-500">
                        <div className="text-orange-400 font-bold mb-2">4. העברה/הצפה</div>
                        <p className="text-sm text-slate-400">מכיר? שולח ליעד (Forward). לא מכיר? מציף לכולם (Flood).</p>
                    </div>
                </div>
            </div>

            {/* Simulator */}
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Database className="text-cyan-400" /> מעבדה: סימולטור MAC Table
                </h2>
                <MacTableCanvas />
            </div>

            {/* Fun Fact */}
            <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl flex gap-4 items-start">
                <div className="bg-blue-500 p-2 rounded-lg text-white mt-1">
                    <Zap size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-blue-300 mb-1">הידעת?</h4>
                    <p className="text-sm text-slate-400">
                        לכל רשומה בטבלת ה-MAC יש "זמן חיים" (Aging Timer), בדרך כלל 300 שניות (5 דקות).
                        אם המכשיר לא שולח כלום במשך הזמן הזה – המתג מוחק אותו מהטבלה כדי לחסוך מקום.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SwitchingLesson;
