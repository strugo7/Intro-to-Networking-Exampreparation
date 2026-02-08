import React, { useState, useEffect, useRef } from 'react';
import { Plug, Zap, CheckCircle, XCircle } from 'lucide-react';
import CopperSignalCanvas from './CopperSignalCanvas';
import CopperCableCanvas from './CopperCableCanvas';

const CopperDemo: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'utp' | 'stp' | 'coaxial'>('utp');

    // Signal Animation removed - using CopperSignalCanvas
    // useEffect removed

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

                <CopperSignalCanvas />
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

                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 border border-slate-200 dark:border-slate-800 min-h-[350px]">
                    <div className="flex-1 w-full max-w-md">
                        <CopperCableCanvas type={activeTab} />
                    </div>
                    <div className="flex-1">
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
