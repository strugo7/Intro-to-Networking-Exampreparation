import { useState } from 'react';
import { SwitchIcon, PCIcon } from './Module4Icons';

// 2. Switching Logic Simulator
const SwitchSimulator = () => {
    // Define types for state
    type Host = { id: string; mac: string; port: number };
    type AnimState = { src: Host; dst: Host; type: 'flood' | 'direct' } | null;

    const [macTable, setMacTable] = useState<Record<string, number>>({}); // { MAC: Port }
    const [logs, setLogs] = useState<string[]>([]);
    const [animState, setAnimState] = useState<AnimState>(null);

    const hosts: Host[] = [
        { id: 'A', mac: 'AA:AA', port: 1 },
        { id: 'B', mac: 'BB:BB', port: 2 },
        { id: 'C', mac: 'CC:CC', port: 3 },
        { id: 'D', mac: 'DD:DD', port: 4 }
    ];

    const sendFrame = (srcHost: Host, dstHost: Host) => {
        if (animState) return; // Busy

        const newLogs: string[] = [];
        let type: 'flood' | 'direct' = 'direct';

        // 1. Learning Process
        newLogs.push(`1. המתג קיבל מסגרת מ-${srcHost.id} בפורט ${srcHost.port}.`);
        if (!macTable[srcHost.mac]) {
            setMacTable(prev => ({ ...prev, [srcHost.mac]: srcHost.port }));
            newLogs.push(`2. לימוד: הוספת כתובת ${srcHost.mac} בפורט ${srcHost.port} לטבלה.`);
        } else {
            newLogs.push(`2. רענון: כתובת ${srcHost.mac} כבר בטבלה בפורט הנכון.`);
        }

        // 2. Forwarding Decision
        if (macTable[dstHost.mac]) {
            newLogs.push(`3. ידוע: היעד ${dstHost.mac} נמצא בפורט ${macTable[dstHost.mac]}.`);
            newLogs.push(`4. Forwarding: שליחה ישירה לפורט ${macTable[dstHost.mac]} בלבד.`);
            type = 'direct';
        } else {
            newLogs.push(`3. לא ידוע: היעד ${dstHost.mac} לא בטבלה.`);
            newLogs.push(`4. Flooding: הצפת המסגרת לכל הפורטים (חוץ מפורט ${srcHost.port}).`);
            type = 'flood';
        }

        setLogs(newLogs);
        setAnimState({ src: srcHost, dst: dstHost, type });

        // Reset Animation
        setTimeout(() => setAnimState(null), 3000);
    };

    const clearTable = () => {
        setMacTable({});
        setLogs(['הטבלה נוקתה. המתג שכח את כולם.']);
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl mb-12 relative overflow-hidden font-heebo" dir="rtl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <SwitchIcon className="text-sky-400" />
                סימולטור מתגים (Switching Logic)
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Simulation Area */}
                <div className="flex-1 relative min-h-[400px] bg-slate-900/50 rounded-xl border border-slate-700">

                    {/* Static Wires Background */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                        <line x1="15%" y1="20%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" />
                        <line x1="85%" y1="20%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" />
                        <line x1="15%" y1="80%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" />
                        <line x1="85%" y1="80%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" />
                    </svg>

                    {/* Switch Center */}
                    <div
                        className="absolute bg-slate-800 rounded-lg border-2 border-sky-600 flex flex-col items-center justify-center z-10 shadow-2xl w-32 h-20"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        <SwitchIcon className={`text-white ${animState ? 'animate-pulse' : ''}`} size={32} />
                        <span className="text-xs text-sky-200 mt-1 font-bold">SWITCH</span>
                    </div>

                    {/* Hosts */}
                    {hosts.map((host, i) => {
                        // Explicit absolute positions matching wire endpoints
                        const positions = [
                            { top: '20%', left: '15%' }, // A
                            { top: '20%', left: '85%' }, // B
                            { top: '80%', left: '15%' }, // C
                            { top: '80%', left: '85%' }  // D
                        ];

                        return (
                            <div
                                key={host.id}
                                className="absolute flex flex-col items-center gap-2 z-10"
                                style={{
                                    top: positions[i].top,
                                    left: positions[i].left,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className="relative">
                                    <div
                                        className={`bg-slate-800 p-3 rounded-full border-2 ${animState?.dst.id === host.id && animState?.type === 'direct' ? 'border-green-500 shadow-[0_0_20px_lime]' : 'border-slate-600'}`}
                                    >
                                        <PCIcon className="text-slate-300" />
                                    </div>
                                    {/* Port Label */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono whitespace-nowrap">Port {host.port}</div>
                                </div>
                                <div className="text-center mt-4">
                                    <div className="text-white font-bold">{host.id}</div>
                                    <div className="text-[10px] text-slate-500 font-mono">{host.mac}</div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Animation Particles */}
                    {animState && (
                        <>
                            {/* Sender to Switch */}
                            <div className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_yellow] transition-all z-20"
                                style={{
                                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    animation: `moveFrom${animState.src.id} 1s forwards`
                                }}
                            ></div>

                            {/* Switch to Dest (Direct) */}
                            {animState.type === 'direct' && (
                                <div className="absolute w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_lime] transition-all z-20"
                                    style={{
                                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        animation: `moveTo${animState.dst.id} 1s 1s forwards`,
                                        opacity: 0
                                    }}
                                ></div>
                            )}

                            {/* Flood */}
                            {animState.type === 'flood' && hosts.filter(h => h.id !== animState.src.id).map(h => (
                                <div key={h.id} className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_red] transition-all z-20"
                                    style={{
                                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        animation: `moveTo${h.id} 1s 1s forwards`,
                                        opacity: 0
                                    }}
                                ></div>
                            ))}

                            {/* CSS for specific moves matching exact coordinates */}
                            <style>{`
                                @keyframes moveFromA { 0% { top: 20%; left: 15%; opacity:1; } 100% { top: 50%; left: 50%; opacity:0; } }
                                @keyframes moveToA { 0% { top: 50%; left: 50%; opacity:1; } 100% { top: 20%; left: 15%; opacity:0; } }
                                @keyframes moveFromB { 0% { top: 20%; left: 85%; opacity:1; } 100% { top: 50%; left: 50%; opacity:0; } }
                                @keyframes moveToB { 0% { top: 50%; left: 50%; opacity:1; } 100% { top: 20%; left: 85%; opacity:0; } }
                                @keyframes moveFromC { 0% { top: 80%; left: 15%; opacity:1; } 100% { top: 50%; left: 50%; opacity:0; } }
                                @keyframes moveToC { 0% { top: 50%; left: 50%; opacity:1; } 100% { top: 80%; left: 15%; opacity:0; } }
                                @keyframes moveFromD { 0% { top: 80%; left: 85%; opacity:1; } 100% { top: 50%; left: 50%; opacity:0; } }
                                @keyframes moveToD { 0% { top: 50%; left: 50%; opacity:1; } 100% { top: 80%; left: 85%; opacity:0; } }
                            `}</style>
                        </>
                    )}
                </div>

                {/* Controls & Table */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6" dir="rtl">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <h3 className="text-white font-bold mb-4 border-b border-slate-700 pb-2">פעולות</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <button onClick={() => sendFrame(hosts[0], hosts[1])} disabled={!!animState} className="bg-slate-800 hover:bg-slate-700 text-xs p-2 rounded text-slate-300">A &rarr; B</button>
                            <button onClick={() => sendFrame(hosts[0], hosts[2])} disabled={!!animState} className="bg-slate-800 hover:bg-slate-700 text-xs p-2 rounded text-slate-300">A &rarr; C</button>
                            <button onClick={() => sendFrame(hosts[1], hosts[0])} disabled={!!animState} className="bg-slate-800 hover:bg-slate-700 text-xs p-2 rounded text-slate-300">B &rarr; A</button>
                            <button onClick={() => sendFrame(hosts[3], hosts[2])} disabled={!!animState} className="bg-slate-800 hover:bg-slate-700 text-xs p-2 rounded text-slate-300">D &rarr; C</button>
                        </div>
                        <button onClick={clearTable} className="w-full bg-red-900/50 hover:bg-red-900 text-red-200 text-xs py-2 rounded border border-red-800">ניקוי טבלה (Restart)</button>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex-1">
                        <h3 className="text-white font-bold mb-2 flex justify-between items-center">
                            <span>MAC Address Table</span>
                            <span className="text-[10px] bg-sky-900 text-sky-200 px-2 rounded">CAM</span>
                        </h3>
                        <div className="w-full text-xs text-slate-400 mb-2 grid grid-cols-2 font-mono border-b border-slate-700 pb-1">
                            <span>MAC Address</span>
                            <span className="text-right">Port</span>
                        </div>
                        <div className="space-y-1">
                            {Object.keys(macTable).length === 0 ? (
                                <div className="text-center text-slate-600 py-4 italic">הטבלה ריקה (Empty)</div>
                            ) : (
                                Object.entries(macTable).map(([mac, port]) => (
                                    <div key={mac} className="grid grid-cols-2 text-sm font-mono text-green-400 animate-slide-up">
                                        <span>{mac}</span>
                                        <span className="text-right text-white">{port}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-black/30 p-2 rounded h-32 overflow-y-auto text-[10px] font-mono text-slate-400">
                        {logs.map((log, i) => <div key={i} className="mb-1">{log}</div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwitchSimulator;
