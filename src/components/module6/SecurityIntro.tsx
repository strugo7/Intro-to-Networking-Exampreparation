import React, { useState } from 'react';
import { Shield, Lock, Eye, Server, AlertTriangle, CheckCircle, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const SecurityIntro: React.FC = () => {
    const [activePillar, setActivePillar] = useState<string | null>(null);

    const pillars = [
        {
            id: 'confidentiality',
            title: 'Confidentiality (סודיות)',
            icon: <Lock className="w-12 h-12 text-blue-400" />,
            description: 'הבטחה שמידע רגיש נגיש רק למי שמורשה לכך.',
            example: 'כמו בנק: רק אתה והפקיד יכולים לראות את היתרה שלך. השכן לא.',
            attack: 'Sniffing, Phishing, Keylogging',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'integrity',
            title: 'Integrity (שלמות)',
            icon: <Shield className="w-12 h-12 text-green-400" />,
            description: 'הבטחה שהמידע מדויק ולא שונה בזדון או בטעות.',
            example: 'כמו בחירות: חייבים לוודא שאף אחד לא שינה את הפתק ששמת בקלפי.',
            attack: 'MITM, Data Tampering, SQL Injection',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'availability',
            title: 'Availability (זמינות)',
            icon: <Server className="w-12 h-12 text-orange-400" />,
            description: 'הבטחה שהמערכות והמידע זמינים כאשר זקוקים להם.',
            example: 'כמו נטפליקס: אם השרת נופל באמצע הסרט, הזמינות נפגעה.',
            attack: 'DDoS, Ransomware, Power Outage',
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full bg-slate-950 overflow-hidden rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center p-6">
                {/* Abstract Cyber Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1),transparent_70%)]" />
                    <div className="grid grid-cols-12 gap-2 h-full w-full animate-pulse-slow">
                        {[...Array(48)].map((_, i) => (
                            <div key={i} className="bg-emerald-500/10 h-full w-full rounded-sm" style={{ animationDelay: `${Math.random() * 2}s` }} />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 mb-6 animate-fade-in">
                        <Shield size={16} />
                        <span className="text-sm font-code">CYBER SECURITY MODULE</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400">
                            Information Security
                        </span>
                    </h1>
                    <p className="text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                        העולם הדיגיטלי הוא שדה קרב. איך מגנים על המידע שלנו מפני תוקפים?
                        הכירו את יסודות הסייבר ומודל ה-CIA.
                    </p>
                </div>
            </div>

            {/* CIA Triad Section */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">מודל ה-CIA: השילוש הקדוש של האבטחה</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        כל מערכת אבטחת מידע נועדה להגן על לפחות אחד משלושת העקרונות הללו.
                        פגיעה באחד מהם = פריצה.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <motion.div
                            key={pillar.id}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`relative bg-slate-900/50 border border-slate-700 rounded-2xl p-8 cursor-pointer overflow-hidden group transition-all duration-300
                                ${activePillar === pillar.id ? 'ring-2 ring-offset-2 ring-offset-slate-900 ' + pillar.color.split(' ')[1].replace('to-', 'ring-') : ''}
                            `}
                            onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-6 p-4 bg-slate-800 rounded-2xl shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    {pillar.description}
                                </p>

                                {/* Expanded Content */}
                                <motion.div
                                    initial={false}
                                    animate={{ height: activePillar === pillar.id ? 'auto' : 0, opacity: activePillar === pillar.id ? 1 : 0 }}
                                    className="overflow-hidden w-full"
                                >
                                    <div className="pt-6 border-t border-slate-700/50 space-y-4 text-left bg-slate-800/30 p-4 rounded-xl">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-1">
                                                <CheckCircle size={14} /> דוגמה מהחיים:
                                            </h4>
                                            <p className="text-sm text-slate-300">{pillar.example}</p>
                                        </div>
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-red-400 mb-1">
                                                <AlertTriangle size={14} /> מתקפות רלוונטיות:
                                            </h4>
                                            <p className="text-sm text-slate-300 font-mono">{pillar.attack}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {activePillar !== pillar.id && (
                                    <span className="text-xs text-slate-500 mt-2 group-hover:text-emerald-400 transition-colors">
                                        לחץ להרחבה +
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecurityIntro;
