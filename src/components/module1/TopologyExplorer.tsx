import React, { useState } from 'react';

const TopologyExplorer: React.FC = () => {
    const [topo, setTopo] = useState<'star' | 'bus' | 'ring'>('star');

    const renderTopology = () => {
        switch (topo) {
            case 'star':
                return (
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 400 300">
                        {/* Central Hub */}
                        <rect x="180" y="130" width="40" height="40" rx="4" fill="#3b82f6" />
                        {/* Nodes */}
                        {[0, 72, 144, 216, 288].map((angle, i) => {
                            const rad = angle * (Math.PI / 180);
                            const x = 200 + Math.cos(rad) * 100;
                            const y = 150 + Math.sin(rad) * 100;
                            return (
                                <g key={i}>
                                    <line x1="200" y1="150" x2={x} y2={y} stroke="#475569" strokeWidth="2" />
                                    <circle cx={x} cy={y} r="15" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                                    <circle r="3" fill="#60a5fa">
                                        <animateMotion dur="2s" repeatCount="indefinite" path={`M200,150 L${x},${y} L200,150`} />
                                    </circle>
                                </g>
                            );
                        })}
                    </svg>
                );
            case 'bus':
                return (
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                        {/* Backbone */}
                        <line x1="20" y1="150" x2="380" y2="150" stroke="#3b82f6" strokeWidth="6" />
                        {/* Nodes */}
                        {[60, 130, 200, 270, 340].map((x, i) => (
                            <g key={i}>
                                <line x1={x} y1="150" x2={x} y2={i % 2 === 0 ? 80 : 220} stroke="#475569" strokeWidth="2" />
                                <circle cx={x} cy={i % 2 === 0 ? 80 : 220} r="15" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                            </g>
                        ))}
                    </svg>
                );
            case 'ring':
                return (
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                        <circle cx="200" cy="150" r="100" fill="none" stroke="#3b82f6" strokeWidth="4" />
                        {[0, 72, 144, 216, 288].map((angle, i) => {
                            const rad = angle * (Math.PI / 180);
                            const x = 200 + Math.cos(rad) * 100;
                            const y = 150 + Math.sin(rad) * 100;
                            return (
                                <circle key={i} cx={x} cy={y} r="15" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                            );
                        })}
                        <circle r="5" fill="#ef4444">
                            <animateMotion dur="4s" repeatCount="indefinite" path="M300,150 A100,100 0 1,1 299,149" />
                        </circle>
                    </svg>
                );
            default: return null;
        }
    };

    const topoInfo = {
        star: { title: 'כוכב (Star)', desc: 'כל המחשבים מחוברים לרכיב מרכזי (Switch). זו הטופולוגיה הנפוצה ביותר כיום (Ethernet LAN). יתרון: ניתוק כבל אחד לא מפיל את הרשת. חיסרון: אם המרכז נופל, הכל נופל.' },
        bus: { title: 'אפיק (Bus)', desc: 'כבל מרכזי אחד שאליו כולם מתחברים. טופולוגיה מיושנת. חיסרון עצום: אם הכבל הראשי נקרע, כל הרשת מושבתת.' },
        ring: { title: 'טבעת (Ring)', desc: 'המחשבים מחוברים במעגל. המידע (Token) עובר בכיוון אחד. פחות נפוץ כיום ברשתות LAN.' }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-xl shadow-xl">
            <div className="flex gap-2 mb-6 justify-center">
                {(['star', 'bus', 'ring'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTopo(t)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${topo === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'}`}
                    >
                        {t.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="h-64 bg-slate-900/50 rounded-xl mb-6 flex items-center justify-center border border-slate-800">
                {renderTopology()}
            </div>
            <div className="text-center bg-slate-800/30 p-4 rounded-lg border border-slate-700/30">
                <h3 className="text-xl font-bold text-white mb-2">{topoInfo[topo].title}</h3>
                <p className="text-slate-400">{topoInfo[topo].desc}</p>
            </div>
        </div>
    );
};

export default TopologyExplorer;
