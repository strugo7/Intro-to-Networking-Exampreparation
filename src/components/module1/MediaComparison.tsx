import React, { useState, useEffect } from 'react';
import { Zap, Plug, Wifi, Trophy, ChevronDown, ChevronUp } from 'lucide-react';

const MediaComparison: React.FC = () => {
    const [racing, setRacing] = useState(false);
    const [progress, setProgress] = useState({ fiber: 0, copper: 0, wifi: 0 });

    const startRace = () => {
        if (racing) return;
        setRacing(true);
        setProgress({ fiber: 0, copper: 0, wifi: 0 });

        // Fiber: ~2s
        const fiberInterval = setInterval(() => {
            setProgress(p => {
                if (p.fiber >= 100) { clearInterval(fiberInterval); return p; }
                return { ...p, fiber: p.fiber + 5 };
            });
        }, 50);

        // Copper: ~4s
        const copperInterval = setInterval(() => {
            setProgress(p => {
                if (p.copper >= 100) { clearInterval(copperInterval); return p; }
                return { ...p, copper: p.copper + 2.5 };
            });
        }, 50);

        // WiFi: ~6s
        const wifiInterval = setInterval(() => {
            setProgress(p => {
                if (p.wifi >= 100) { clearInterval(wifiInterval); return p; }
                return { ...p, wifi: p.wifi + 1.5 };
            });
        }, 50);

        setTimeout(() => {
            setRacing(false);
        }, 7000); // Reset button enable after longest race
    };

    return (
        <div className="space-y-12 my-12">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">השוואה מקיפה (Side by Side)</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">איך לבחור את הטכנולוגיה הנכונה?</p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <table className="w-full text-right bg-white dark:bg-slate-900 border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-950">
                        <tr>
                            <th className="p-4 border-b dark:border-slate-800">מאפיין</th>
                            <th className="p-4 border-b dark:border-slate-800 text-blue-600"><Zap size={16} className="inline ml-1" /> סיבים</th>
                            <th className="p-4 border-b dark:border-slate-800 text-amber-600"><Plug size={16} className="inline ml-1" /> נחושת</th>
                            <th className="p-4 border-b dark:border-slate-800 text-purple-600"><Wifi size={16} className="inline ml-1" /> WiFi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-700 dark:text-slate-300">סוג אות</td>
                            <td className="p-4">אור 💡</td>
                            <td className="p-4">חשמל ⚡</td>
                            <td className="p-4">גלי רדיו 📡</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-700 dark:text-slate-300">מהירות</td>
                            <td className="p-4 text-green-600 font-bold">Tbps 🏆</td>
                            <td className="p-4">40 Gbps</td>
                            <td className="p-4">~9.6 Gbps</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-700 dark:text-slate-300">מרחק</td>
                            <td className="p-4 text-green-600 font-bold">100+ ק"מ 🏆</td>
                            <td className="p-4">100 מטר</td>
                            <td className="p-4">~50 מטר</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-700 dark:text-slate-300">חסינות EMI</td>
                            <td className="p-4 text-green-600 font-bold">מלאה 🏆</td>
                            <td className="p-4 text-red-500">רגיש</td>
                            <td className="p-4 text-red-500">רגיש מאוד</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-700 dark:text-slate-300">עלות</td>
                            <td className="p-4 text-red-500">גבוהה</td>
                            <td className="p-4 text-green-600 font-bold">נמוכה 🏆</td>
                            <td className="p-4">בינונית</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 font-bold text-slate-700 dark:text-slate-300">ניידות</td>
                            <td className="p-4 text-red-500">אין</td>
                            <td className="p-4 text-orange-500">מוגבלת</td>
                            <td className="p-4 text-green-600 font-bold">מלאה 🏆</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Speed Race */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="text-yellow-400" /> מרוץ מהירות: הורדת קובץ 10GB
                </h3>

                <div className="space-y-6">
                    {/* Lane Fiber */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>סיב אופטי (10Gbps)</span>
                            <span>{progress.fiber >= 100 ? '0:08 שניות' : '...'}</span>
                        </div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress.fiber}%` }}></div>
                        </div>
                    </div>

                    {/* Lane Copper */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>נחושת Cat6 (1Gbps)</span>
                            <span>{progress.copper >= 100 ? '1:20 דקות' : '...'}</span>
                        </div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 transition-all duration-100" style={{ width: `${progress.copper}%` }}></div>
                        </div>
                    </div>

                    {/* Lane WiFi */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>WiFi 6 (~500Mbps)</span>
                            <span>{progress.wifi >= 100 ? '2:40 דקות' : '...'}</span>
                        </div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 transition-all duration-100" style={{ width: `${progress.wifi}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={startRace}
                        disabled={racing}
                        className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-black rounded-full shadow-lg transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {racing ? 'המרוץ בעיצומו...' : '🏁 התחל מרוץ!'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MediaComparison;
