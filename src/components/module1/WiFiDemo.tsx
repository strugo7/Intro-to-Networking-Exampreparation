import React, { useState } from 'react';
import { Wifi, Signal, Globe, CheckCircle, XCircle } from 'lucide-react';

const WiFiDemo: React.FC = () => {
    const [distance, setDistance] = useState(5);

    const getSignalStrength = (dist: number) => {
        // Simple mock calc: RSSI drops with distance
        // Max (0m) = -30, Min (50m) = -90
        return Math.max(-90, -30 - dist * 1.2);
    };

    const rssi = getSignalStrength(distance);

    const getSignalQuality = (rssi: number) => {
        if (rssi > -50) return { text: 'מצוין 🚀', color: 'text-green-500', bars: 4 };
        if (rssi > -65) return { text: 'טוב 👍', color: 'text-green-400', bars: 3 };
        if (rssi > -75) return { text: 'בינוני 😐', color: 'text-yellow-500', bars: 2 };
        if (rssi > -85) return { text: 'חלש ⚠️', color: 'text-orange-500', bars: 1 };
        return { text: 'אין קליטה ❌', color: 'text-red-500', bars: 0 };
    };

    const quality = getSignalQuality(rssi);

    return (
        <div className="space-y-8 my-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900/50 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                    <Wifi size={20} />
                    <span>טכנולוגיה #3</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-2">WiFi אלחוטי</h2>
                <p className="text-slate-400 text-lg">חופש ללא כבלים — תקשורת באמצעות גלי רדיו</p>
            </div>

            {/* Signal Simulation */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                    <Signal size={20} className="text-indigo-500" /> סימולטור עוצמת קליטה
                </h3>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-full max-w-sm h-64 bg-slate-100 dark:bg-slate-950 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Router Center */}
                        <div className="absolute w-4 h-4 bg-indigo-500 rounded-full z-10 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>

                        {/* Waves */}
                        <div className="absolute w-full h-full flex items-center justify-center animate-ping-slow opacity-20 bg-indigo-500 rounded-full"></div>
                        <div className="absolute w-3/4 h-3/4 flex items-center justify-center border border-indigo-200 dark:border-indigo-900/30 rounded-full"></div>
                        <div className="absolute w-1/2 h-1/2 flex items-center justify-center border border-indigo-300 dark:border-indigo-900/50 rounded-full"></div>

                        {/* Device Dot - Positioned based on distance */}
                        <div
                            className="absolute w-6 h-6 bg-white border-2 border-slate-800 rounded-full shadow-lg z-20 transition-all duration-300 transform -translate-y-1/2"
                            style={{
                                left: `50%`,
                                transform: `translate(${distance * 4}px, -50%)` // Simply move right
                            }}
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap bg-slate-800 text-white px-2 py-0.5 rounded opacity-80">
                                אתה
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                מרחק מהראוטר: {distance} מטר
                            </label>
                            <input
                                type="range"
                                min="1" max="50"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">RSSI (Signal)</div>
                                <div className="text-2xl font-mono text-slate-900 dark:text-white">{Math.round(rssi)} dBm</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center">
                                <div className="text-xs text-slate-500 uppercase font-bold">איכות</div>
                                <div className={`text-2xl font-bold ${quality.color}`}>{quality.text}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bands */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { name: '2.4 GHz', desc: 'טווח ארוך, מהירות בינונית. חודר קירות מצוין אבל סובל מהפרעות.', color: 'border-blue-500' },
                    { name: '5 GHz', desc: 'מהיר מאוד, טווח בינוני. פחות הפרעות, אבל מתקשה לחדור קירות.', color: 'border-purple-500' },
                    { name: '6 GHz (WiFi 6E)', desc: 'אוטוסטרדה של מידע! מהירות שיא לטווח קצר. כמעט 0 הפרעות.', color: 'border-rose-500' }
                ].map((band, i) => (
                    <div key={i} className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border-t-4 shadow-sm ${band.color}`}>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{band.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{band.desc}</p>
                    </div>
                ))}
            </div>

            {/* Pros/Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} /> יתרונות
                    </h3>
                    <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                        <li>• ניידות מלאה — ללא כבלים</li>
                        <li>• חיבור מכשירים רבים (IoT, טלפונים)</li>
                        <li>• התקנה פשוטה וזולה</li>
                    </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                        <XCircle size={20} /> חסרונות
                    </h3>
                    <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm">
                        <li>• מהירות נמוכה ויציבות פחותה מכבל</li>
                        <li>• רגיש להפרעות וקירות (Signal loss)</li>
                        <li>• בעיות אבטחה פוטנציאליות</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WiFiDemo;
