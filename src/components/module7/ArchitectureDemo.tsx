import React, { useState } from 'react';

const ArchitectureDemo: React.FC = () => {
    const [model, setModel] = useState<'client-server' | 'p2p'>('client-server');

    return (
        <div className="bg-slate-800/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">ארכיטקטורות רשת</h3>
                    <p className="text-slate-300 mb-6">
                        איך מחשבים מדברים זה עם זה בשכבת האפליקציה? ישנן שתי גישות מרכזיות שצריך להכיר למבחן.
                    </p>
                    <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg inline-flex">
                        <button
                            onClick={() => setModel('client-server')}
                            className={`px-6 py-2 rounded-md font-bold transition-all ${model === 'client-server' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Client-Server
                        </button>
                        <button
                            onClick={() => setModel('p2p')}
                            className={`px-6 py-2 rounded-md font-bold transition-all ${model === 'p2p' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Peer-to-Peer (P2P)
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <h4 className="font-bold text-purple-300 mb-2">
                        {model === 'client-server' ? 'Client-Server (שרת-לקוח)' : 'Peer-to-Peer (עמית-לעמית)'}
                    </h4>
                    <p className="text-sm text-slate-300">
                        {model === 'client-server'
                            ? "המודל הנפוץ באינטרנט (Web, Email). יש שרת מרכזי שתמיד מחובר (Always-on) ובעל כתובת IP קבועה. הלקוחות פונים אליו לקבלת שירות. אם השרת נופל - אין שירות."
                            : "מודל מבוזר (כמו BitTorrent). אין שרת מרכזי. כל מחשב הוא גם שרת וגם לקוח. המחשבים מתחברים ומתנתקים באופן דינאמי. יתרון: עמידות גבוהה (Scalability)."}
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl h-64 relative overflow-hidden border border-slate-700 flex items-center justify-center">
                {model === 'client-server' ? (
                    <svg className="w-full h-full" viewBox="0 0 600 260">
                        {/* Server */}
                        <g transform="translate(300, 130)">
                            <rect x="-30" y="-30" width="60" height="60" rx="4" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">SERVER</text>
                            <circle r="40" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3">
                                <animate attributeName="r" from="40" to="50" dur="1.5s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                        </g>
                        {/* Clients */}
                        {[0, 72, 144, 216, 288].map((deg, i) => {
                            const rad = deg * (Math.PI / 180);
                            const x = 300 + Math.cos(rad) * 120;
                            const y = 130 + Math.sin(rad) * 80;
                            return (
                                <g key={i}>
                                    <line x1="300" y1="130" x2={x} y2={y} stroke="#475569" strokeWidth="1" strokeDasharray="4" />
                                    <circle cx={x} cy={y} r="15" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                                    <text x={x} y={y + 4} textAnchor="middle" fill="#94a3b8" fontSize="8">Client</text>
                                    <circle r="3" fill="#38bdf8">
                                        <animateMotion dur="2s" repeatCount="indefinite" path={`M${x},${y} L300,130 L${x},${y}`} />
                                    </circle>
                                </g>
                            )
                        })}
                    </svg>
                ) : (
                    <svg className="w-full h-full" viewBox="0 0 600 260">
                        {/* Peers Mesh */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                            const rad = deg * (Math.PI / 180);
                            const x = 300 + Math.cos(rad) * 100;
                            const y = 130 + Math.sin(rad) * 80;
                            const connection1Idx = (i + 1) % 6;
                            const connection2Idx = (i + 2) % 6;

                            const x2_1 = 300 + Math.cos((deg + 60) * (Math.PI / 180)) * 100;
                            const y2_1 = 130 + Math.sin((deg + 60) * (Math.PI / 180)) * 80;

                            const x2_2 = 300 + Math.cos((deg + 120) * (Math.PI / 180)) * 100;
                            const y2_2 = 130 + Math.sin((deg + 120) * (Math.PI / 180)) * 80;

                            return (
                                <g key={i}>
                                    {/* Connections to other peers */}
                                    <line x1={x} y1={y} x2={x2_1} y2={y2_1} stroke="#475569" strokeWidth="1" />
                                    <line x1={x} y1={y} x2={x2_2} y2={y2_2} stroke="#475569" strokeWidth="1" opacity="0.5" />

                                    <circle cx={x} cy={y} r="18" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
                                    <text x={x} y={y + 4} textAnchor="middle" fill="#86efac" fontSize="9">Peer</text>

                                    {/* Packet moving */}
                                    <circle r="3" fill="#22c55e">
                                        <animateMotion dur="3s" repeatCount="indefinite"
                                            path={`M${x},${y} L${x2_1},${y2_1}`}
                                        />
                                    </circle>
                                </g>
                            )
                        })}
                    </svg>
                )}
            </div>
        </div>
    );
};

export default ArchitectureDemo;
