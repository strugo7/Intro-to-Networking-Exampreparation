import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const VlanSimCanvas: React.FC = () => {
    // State for ports config
    // 4 Ports. User can toggle VLAN 10 (Sales) or VLAN 20 (HR)
    const [ports, setPorts] = useState([10, 10, 20, 20]); // Default: 2 Sales, 2 HR
    const [testResult, setTestResult] = useState<{ from: number, to: number, success: boolean } | null>(null);

    const toggleVlan = (idx: number) => {
        const newPorts = [...ports];
        newPorts[idx] = newPorts[idx] === 10 ? 20 : 10;
        setPorts(newPorts);
        setTestResult(null); // Reset test
    };

    const runPing = (fromIdx: number, toIdx: number) => {
        if (fromIdx === toIdx) return;
        const success = ports[fromIdx] === ports[toIdx];
        setTestResult({ from: fromIdx, to: toIdx, success });
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-2">מעבדת VLANs אינטראקטיבית</h2>
            <p className="text-slate-400 mb-6">הגדירו לאיזה מחלקה שייך כל מחשב (VLAN) ובדקו האם הם יכולים לתקשר.</p>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 relative">

                {/* Switch Visual */}
                <div className="bg-slate-900 h-16 rounded-lg border border-slate-700 flex items-center justify-around px-8 mb-12 shadow-xl relative z-10">
                    <span className="absolute -top-3 left-4 text-[10px] bg-slate-800 px-2 rounded text-slate-400">Cisco 2960 Switch</span>
                    {ports.map((vlan, i) => (
                        <div key={i} className="flex flex-col items-center relative group">
                            <div className={`w-3 h-3 rounded-full mb-1 ${vlan === 10 ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-pink-500 shadow-[0_0_10px_#ec4899]'}`} />
                            <div className="w-8 h-4 bg-slate-700 rounded-sm border border-slate-600"></div>
                            {/* Cable */}
                            <div className={`mt-0 w-1 h-12 ${vlan === 10 ? 'bg-blue-500/50' : 'bg-pink-500/50'}`}></div>
                        </div>
                    ))}
                </div>

                {/* Computers Grid */}
                <div className="grid grid-cols-4 gap-4">
                    {ports.map((vlan, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div
                                onClick={() => toggleVlan(i)}
                                className={`
                                    w-24 h-20 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden group
                                    ${vlan === 10
                                        ? 'bg-blue-900/20 border-blue-500 hover:bg-blue-900/40'
                                        : 'bg-pink-900/20 border-pink-500 hover:bg-pink-900/40'
                                    }
                                `}
                            >
                                <div className="absolute inset-x-0 bottom-0 py-1 text-center text-xs font-bold text-white bg-black/40 backdrop-blur-sm">
                                    PC {i + 1}
                                </div>
                                <div className="flex items-center justify-center h-full text-4xl pb-4">
                                    💻
                                </div>

                                {/* Hover Hint */}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold text-white">החלף VLAN</span>
                                </div>
                            </div>

                            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${vlan === 10 ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'
                                }`}>
                                {vlan === 10 ? 'Sales (10)' : 'HR (20)'}
                            </div>

                            {/* Ping Actions */}
                            <div className="mt-4 flex flex-col gap-2 w-full px-2">
                                {[0, 1, 2, 3].map(target => (
                                    target !== i && (
                                        <button
                                            key={target}
                                            onClick={() => runPing(i, target)}
                                            className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-300 py-1 rounded border border-slate-600 transition-colors flex items-center justify-center gap-1"
                                        >
                                            Ping to PC {target + 1}
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Test Result Overlay */}
                {testResult && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-600 p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-200 z-50">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${testResult.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                            {testResult.success ? <CheckCircle size={32} /> : <XCircle size={32} />}
                        </div>

                        <h3 className={`text-xl font-bold mb-2 ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
                            {testResult.success ? 'Ping הצליח!' : 'Ping נכשל!'}
                        </h3>

                        <div className="flex items-center gap-3 text-sm text-slate-300 mb-4 bg-slate-800 px-4 py-2 rounded-lg">
                            <span>PC {testResult.from + 1} (VLAN {ports[testResult.from]})</span>
                            <ArrowRight size={14} />
                            <span>PC {testResult.to + 1} (VLAN {ports[testResult.to]})</span>
                        </div>

                        <p className="text-center text-slate-400 text-sm max-w-[240px]">
                            {testResult.success
                                ? 'מצויין! שני המחשבים נמצאים באותו VLAN ולכן יכולים לתקשר.'
                                : 'חסימה! המחשבים נמצאים ברשתות לוגיות נפרדות (VLANs שונים) והמתג לא יעביר ביניהם מידע.'
                            }
                        </p>

                        <button
                            onClick={() => setTestResult(null)}
                            className="mt-6 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors"
                        >
                            סגור
                        </button>
                    </div>
                )}

                {/* Connection Lines (Visual/Canvas-like layer) */}
                {testResult && (
                    <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 20 }}>
                        {/* We could draw a line here between PCs if we had refs, but simple overlay is clearer for now */}
                    </svg>
                )}
            </div>
        </div>
    );
};

export default VlanSimCanvas;
