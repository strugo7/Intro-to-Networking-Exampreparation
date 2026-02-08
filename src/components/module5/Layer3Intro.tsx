import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play, Globe, Cpu, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import { LpmCanvas } from './LpmCanvas';
import { PacketJourneyCanvas } from './PacketJourneyCanvas';
import './Layer3Styles.css';

const Layer3Intro: React.FC = () => {

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full layer3-canvas-container flex items-center justify-center text-center overflow-hidden mb-12">
                <HeroCanvas />
                <div className="relative z-10 p-6 pointer-events-none">
                    <div className="layer3-badge mb-4">שכבה 3 מתוך 7</div>
                    <h1 className="text-5xl font-black mb-4 text-white drop-shadow-lg">
                        שכבת הרשת <br />
                        <span className="layer3-gradient-text text-4xl mt-2 block">Network Layer</span>
                    </h1>
                    <p className="text-slate-300 max-w-xl mx-auto text-lg drop-shadow-md">
                        המוח של הרשת — כאן מתקבלות ההחלטות לאן כל חבילת מידע צריכה ללכת
                    </p>
                </div>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -5 }} className="layer3-card glow-blue">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">מה זה?</h3>
                    <p className="text-slate-600 dark:text-slate-300">שכבת הרשת אחראית על ניתוב חבילות מידע (Packets) בין רשתות שונות באמצעות כתובות לוגיות (IP).</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="layer3-card glow-purple">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">תפקידים</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                        <li className="flex items-center gap-2"><ArrowLeft className="w-4 h-4 text-purple-500" /> כתובות לוגיות (IP)</li>
                        <li className="flex items-center gap-2"><ArrowLeft className="w-4 h-4 text-purple-500" /> ניתוב (Routing)</li>
                        <li className="flex items-center gap-2"><ArrowLeft className="w-4 h-4 text-purple-500" /> פרגמנטציה (Fragmentation)</li>
                    </ul>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="layer3-card glow-green">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600">
                        <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">פרוטוקולים</h3>
                    <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">IPv4</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">IPv6</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">ICMP</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">OSPF</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">BGP</span>
                    </div>
                </motion.div>
            </div>

            {/* Packet Journey Demo */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Play className="w-5 h-5 text-blue-500" /> מסע החבילה
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">לחצו על הכפתור כדי לראות איך חבילה עוברת דרך נתבים ברשת.</p>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-inner p-4 mb-4 overflow-hidden flex justify-center">
                    <div className="w-full max-w-2xl">
                        <PacketJourneyCanvas />
                    </div>
                </div>
            </div>

            {/* Deep Dive: LPM Logic */}
            <LpmCanvas />
        </div>
    );
};

export default Layer3Intro;
