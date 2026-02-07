import React, { useState, useRef } from 'react';
import { Laptop, Server, Globe, Chrome, Game, Mail } from './Module6Icons';

const MultiplexingSimulator: React.FC = () => {
    const [packets, setPackets] = useState<any[]>([]);
    const [burstSize, setBurstSize] = useState(1);
    const [flashApp, setFlashApp] = useState<string | null>(null); // Which app is receiving data
    const packetIdCounter = useRef(0);

    const apps: { [key: string]: any } = {
        browser: { id: 'browser', name: 'Chrome', port: 51337, serverPort: 80, color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500', icon: Chrome },
        game: { id: 'game', name: 'Fortnite', port: 49201, serverPort: 8080, color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500', icon: Game },
        mail: { id: 'mail', name: 'Outlook', port: 52119, serverPort: 25, color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-500', icon: Mail },
    };

    const sendBurst = (appKey: string) => {
        const newPackets = [];
        for (let i = 0; i < burstSize; i++) {
            packetIdCounter.current += 1;
            newPackets.push({
                id: packetIdCounter.current,
                appKey: appKey,
                stage: 'request', // request -> processing -> response -> delivered
                delay: i * 0.4 // Stagger the packets
            });
        }
        setPackets(prev => [...prev, ...newPackets]);
    };

    // Handle Packet Lifecycle
    const updatePacketStage = (packetId: number, newStage: string) => {
        setPackets(prev => prev.map(p =>
            p.id === packetId ? { ...p, stage: newStage } : p
        ));

        // If delivered, trigger Demux effect
        if (newStage === 'delivered') {
            const packet = packets.find(p => p.id === packetId);
            if (packet) {
                setFlashApp(packet.appKey);
                setTimeout(() => setFlashApp(null), 500); // Reset flash
                // Remove packet after delivery
                setTimeout(() => {
                    setPackets(prev => prev.filter(p => p.id !== packetId));
                }, 100);
            }
        }
    };

    return (
        <div className="bg-slate-950 p-6 rounded-3xl text-slate-200 overflow-hidden relative">
            <style>
                {`
                @keyframes flyToServer {
                    0% { right: 0%; opacity: 0; transform: scale(0.5); }
                    10% { opacity: 1; transform: scale(1); }
                    90% { opacity: 1; transform: scale(1); }
                    100% { right: 100%; opacity: 0; transform: scale(0.5); }
                }
                @keyframes flyToClient {
                    0% { right: 100%; opacity: 0; transform: scale(0.5); }
                    10% { opacity: 1; transform: scale(1); }
                    90% { opacity: 1; transform: scale(1); }
                    100% { right: 0%; opacity: 0; transform: scale(0.5); }
                }
                .animate-req { animation: flyToServer 2.5s linear forwards; }
                .animate-res { animation: flyToClient 2.5s linear forwards; }
                .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
                .neon-text { text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
                `}
            </style>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 neon-text text-center z-10">
                Multiplexing & Demultiplexing
            </h1>
            <p className="text-slate-400 mb-8 z-10 text-center max-w-2xl mx-auto">
                שלח מספר סגמנטים מאפליקציות שונות וראה כיצד השרת מחזיר אותם ליעד המדויק באמצעות הפורטים.
            </p>

            {/* Controls */}
            <div className="glass px-6 py-3 rounded-full flex items-center justify-center gap-4 mb-8 z-20 max-w-md mx-auto">
                <span className="text-sm font-bold text-slate-300">כמות סגמנטים לשליחה:</span>
                <input
                    type="range" min="1" max="5" step="1"
                    value={burstSize}
                    onChange={(e) => setBurstSize(parseInt(e.target.value))}
                    className="w-32 accent-blue-600 cursor-pointer"
                />
                <span className="bg-blue-600 px-3 py-1 rounded-full text-white font-mono font-bold">{burstSize}</span>
            </div>

            {/* Main Network Stage */}
            <div className="w-full glass rounded-3xl p-4 md:p-8 relative flex justify-between items-stretch min-h-[500px]">

                {/* --- CLIENT SIDE (RIGHT) --- */}
                <div className="w-1/4 flex flex-col relative z-10 border-l border-slate-700/50 pl-4">
                    <div className="text-center mb-6">
                        <Laptop size={48} className="mx-auto text-slate-300 mb-2" />
                        <h2 className="text-xl font-bold text-white">המחשב שלי (Client)</h2>
                        <p className="text-xs text-slate-500 font-mono">IP: 192.168.1.15</p>
                    </div>

                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                        {Object.entries(apps).map(([key, app]) => (
                            <button
                                key={key}
                                onClick={() => sendBurst(key)}
                                className={`
                                    group relative p-4 rounded-xl border transition-all duration-200 text-right w-full
                                    ${flashApp === key ? 'bg-green-500/20 border-green-400 scale-105 shadow-[0_0_20px_rgba(74,222,128,0.5)]' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500'}
                                `}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-lg ${app.bg} text-white`}>
                                        <app.icon size={20} />
                                    </div>
                                    <span className="font-bold text-white group-hover:text-blue-200">{app.name}</span>
                                </div>
                                <div className="text-xs font-mono text-slate-400">
                                    Source Port: <span className="text-yellow-400 font-bold">{app.port}</span>
                                </div>
                                {/* Socket Connector */}
                                <div className="absolute top-1/2 -left-4 w-4 h-0.5 bg-slate-600"></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- THE WIRE (MIDDLE) --- */}
                <div className="flex-1 relative mx-2 flex items-center justify-center overflow-hidden">
                    {/* Physical Wire */}
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-800 rounded-full -translate-y-1/2 border-y border-slate-700 overflow-hidden">
                        <div className="w-full h-full opacity-20 bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%,transparent_50%,#1e293b_50%,#1e293b_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
                    </div>

                    {/* Packets Container */}
                    <div className="absolute inset-0 pointer-events-none w-full h-full">
                        {packets.map(p => {
                            const app = apps[p.appKey];
                            if (p.stage === 'request') {
                                return (
                                    <div
                                        key={p.id}
                                        onAnimationEnd={() => updatePacketStage(p.id, 'processing')}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 animate-req right-0"
                                        style={{ animationDelay: `${p.delay}s` }}
                                    >
                                        <div className={`bg-slate-900 border ${app.border} p-2 rounded shadow-lg w-32`}>
                                            <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 flex justify-between">
                                                <span>REQ</span> <span>#{p.id}</span>
                                            </div>
                                            <div className="flex justify-between text-xs font-mono">
                                                <span className="text-green-400">S:{app.port}</span>
                                                <span className="text-slate-500">&rarr;</span>
                                                <span className="text-red-400">D:{app.serverPort}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (p.stage === 'processing') {
                                // Wait at server then return
                                setTimeout(() => updatePacketStage(p.id, 'response'), 1500);
                                return null;
                            } else if (p.stage === 'response') {
                                return (
                                    <div
                                        key={p.id}
                                        onAnimationEnd={() => updatePacketStage(p.id, 'delivered')}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 animate-res right-full"
                                    >
                                        <div className="bg-slate-900 border border-white p-2 rounded shadow-lg w-32 ring-2 ring-white/20">
                                            <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 flex justify-between">
                                                <span>RES</span> <span>#{p.id}</span>
                                            </div>
                                            <div className="flex justify-between text-xs font-mono">
                                                <span className="text-red-400">S:{app.serverPort}</span>
                                                <span className="text-slate-500">&rarr;</span>
                                                <span className="text-green-400">D:{app.port}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Center Router/Cloud */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800 opacity-30">
                        <Globe size={180} />
                    </div>
                </div>

                {/* --- SERVER SIDE (LEFT) --- */}
                <div className="w-1/4 flex flex-col relative z-10 border-r border-slate-700/50 pr-4">
                    <div className="text-center mb-6">
                        <Server size={48} className="mx-auto text-slate-300 mb-2" />
                        <h2 className="text-xl font-bold text-white">השרת (Server)</h2>
                        <p className="text-xs text-slate-500 font-mono">IP: 8.8.8.8</p>
                    </div>

                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                        {/* Server Services */}
                        {Object.entries(apps).map(([key, app]) => {
                            // Check if this service is currently processing a packet
                            const isProcessing = packets.some(p => p.appKey === key && p.stage === 'processing');

                            return (
                                <div key={key} className={`p-4 rounded-xl border transition-all duration-300 ${isProcessing ? 'bg-slate-700 border-white shadow-lg' : 'bg-slate-800/30 border-slate-700'}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-slate-300">{app.name} Srv</span>
                                        <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-xs font-mono">:{app.serverPort}</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full bg-white transition-all duration-[1500ms] ease-out ${isProcessing ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Explainer Footer */}
            <div className="mt-8 text-center max-w-3xl mx-auto text-sm text-slate-400 glass p-4 rounded-xl leading-relaxed">
                <span className="font-bold text-blue-400 block mb-1">הסבר טכני:</span>
                שימו לב לפורטים בתוך הריבועים שרצים על הקו.
                בדרך הלוך (Request) פורט המקור הוא של האפליקציה (למשל 51337).
                בדרך חזור (Response) השרת <strong>הופך</strong> את הפורטים - פורט היעד הופך להיות 51337, וכך מערכת ההפעלה יודעת להחזיר את המידע לכרום ולא למשחק.
            </div>
        </div>
    );
};

export default MultiplexingSimulator;
