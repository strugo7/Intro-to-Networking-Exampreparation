import React, { useState } from 'react';
import { Wifi, Signal, Globe, CheckCircle, XCircle } from 'lucide-react';
import WiFiSignalCanvas from './WiFiSignalCanvas';

const WiFiDemo: React.FC = () => {
    // Old implementation state removed - managed internally by WiFiSignalCanvas


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

                <WiFiSignalCanvas />
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
