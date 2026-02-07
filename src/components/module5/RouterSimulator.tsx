import React, { useState } from 'react';
import { RouterIcon } from './Module5Icons';

interface Route {
    network: string;
    mask: string;
    interface: string;
    color: string;
}

interface Packet {
    ip: string;
    status: 'input' | 'processing' | 'routed' | 'dropped';
    route?: Route;
}

const RouterSimulator: React.FC = () => {
    const [packet, setPacket] = useState<Packet | null>(null);
    const [selectedIP, setSelectedIP] = useState('192.168.1.50');

    const routes: Route[] = [
        { network: '192.168.1.0', mask: '/24', interface: 'Eth0 (LAN)', color: 'border-blue-500 bg-blue-500/10' },
        { network: '10.0.0.0', mask: '/8', interface: 'Eth1 (Corp)', color: 'border-purple-500 bg-purple-500/10' },
        { network: '0.0.0.0', mask: '/0', interface: 'Serial0 (ISP)', color: 'border-orange-500 bg-orange-500/10' } // Default Route
    ];

    const predefinedIPs = [
        '192.168.1.50', '192.168.1.200',
        '10.5.5.5', '10.200.1.1',
        '8.8.8.8', '142.250.1.1'
    ];

    const handleRoute = () => {
        setPacket({ ip: selectedIP, status: 'processing' });

        setTimeout(() => {
            // Simple Logic for demo purposes
            let matchedRoute = routes[2]; // Default
            if (selectedIP.startsWith('192.168.1')) matchedRoute = routes[0];
            else if (selectedIP.startsWith('10.')) matchedRoute = routes[1];

            setPacket(prev => prev ? ({ ...prev, status: 'routed', route: matchedRoute }) : null);

            setTimeout(() => {
                setPacket(null); // Reset
            }, 3000);
        }, 1500);
    };

    return (
        <div className="bg-slate-900/50 border border-slate-700 p-8 rounded-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between gap-12">

                {/* INPUT SIDE */}
                <div className="w-full md:w-1/3 space-y-6 z-10">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2 font-bold">1. בחר כתובת IP ליעד:</label>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {predefinedIPs.map(ip => (
                                <button
                                    key={ip}
                                    onClick={() => setSelectedIP(ip)}
                                    className={`px-3 py-2 rounded text-sm font-mono transition-colors ${selectedIP === ip ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                >
                                    {ip}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleRoute}
                            disabled={packet !== null}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {packet ? 'מעבד...' : 'שלח חבילה (Route Packet)'}
                        </button>
                    </div>

                    {/* ROUTING TABLE */}
                    <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                        <div className="bg-slate-800 px-4 py-2 text-xs font-bold text-slate-400 border-b border-slate-700 flex justify-between">
                            <span>ROUTING TABLE</span>
                            <span>R1</span>
                        </div>
                        <div className="p-2">
                            <div className="grid grid-cols-3 text-[10px] text-slate-500 font-mono mb-2 px-2">
                                <span>Network</span>
                                <span>Mask</span>
                                <span>Interface</span>
                            </div>
                            {routes.map((r, i) => (
                                <div key={i} className={`grid grid-cols-3 text-xs font-mono p-2 rounded transition-colors ${packet?.route === r ? 'bg-emerald-500/20 text-white' : 'text-slate-300'}`}>
                                    <span>{r.network}</span>
                                    <span>{r.mask}</span>
                                    <span className="text-yellow-500">{r.interface}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* VISUALIZATION SIDE */}
                <div className="flex-1 relative bg-slate-900/50 rounded-xl border border-slate-700 min-h-[300px] flex items-center justify-center" dir="ltr">

                    {/* Router Center */}
                    <div className="relative z-20 bg-slate-800 p-4 rounded-full border-4 border-slate-600 shadow-2xl">
                        <RouterIcon size={48} className={packet?.status === 'processing' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'} />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">ROUTER</div>
                    </div>

                    {/* Interfaces */}
                    {/* Eth0 - Right */}
                    <div className="absolute top-1/2 right-10 -translate-y-1/2 flex items-center gap-2">
                        <div className="text-right">
                            <div className="text-xs text-blue-400 font-bold">LAN (Eth0)</div>
                            <div className="text-[10px] text-slate-500">192.168.1.0/24</div>
                        </div>
                        <div className="w-24 h-1 bg-blue-900"></div>
                    </div>

                    {/* Eth1 - Bottom */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <div className="w-1 h-24 bg-purple-900"></div>
                        <div className="text-center">
                            <div className="text-xs text-purple-400 font-bold">Corp (Eth1)</div>
                            <div className="text-[10px] text-slate-500">10.0.0.0/8</div>
                        </div>
                    </div>

                    {/* Serial0 - Left Top */}
                    <div className="absolute top-10 left-10 flex items-center gap-2">
                        <div className="text-center">
                            <div className="text-xs text-orange-400 font-bold">Internet (ISP)</div>
                            <div className="text-[10px] text-slate-500">0.0.0.0/0</div>
                        </div>
                        <div className="w-32 h-1 bg-orange-900 rotate-45 origin-left transform translate-y-2"></div>
                    </div>

                    {/* Packet Animation */}
                    {packet && (
                        <div
                            className="absolute z-30 transition-all duration-1000 ease-in-out"
                            style={{
                                top: packet.status === 'processing' ? '50%' : (packet.route?.interface.includes('ISP') ? '15%' : (packet.route?.interface.includes('Corp') ? '85%' : '50%')),
                                left: packet.status === 'processing' ? '50%' : (packet.route?.interface.includes('ISP') ? '15%' : (packet.route?.interface.includes('Corp') ? '50%' : '85%')),
                                transform: 'translate(-50%, -50%)',
                                opacity: packet.status === 'processing' || packet.status === 'routed' ? 1 : 0
                            }}
                        >
                            <div className="bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg glow">
                                PKT: {packet.ip}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RouterSimulator;
