import React, { useState } from 'react';
import { Server, Laptop } from './Module1Icons';

const TransmissionVisualizer: React.FC = () => {
    const [mode, setMode] = useState<'unicast' | 'broadcast' | 'multicast'>('unicast');

    const nodes = [
        { id: 'S', x: 50, y: 150, label: 'שולח', type: 'sender' as const },
        { id: 'A', x: 250, y: 50, label: 'מקבל A', type: 'receiver' as const, group: 'group1' },
        { id: 'B', x: 250, y: 120, label: 'מקבל B', type: 'receiver' as const, group: 'group2' },
        { id: 'C', x: 250, y: 190, label: 'מקבל C', type: 'receiver' as const, group: 'group1' },
        { id: 'D', x: 250, y: 260, label: 'מקבל D', type: 'receiver' as const, group: 'group2' }
    ];

    const isActive = (targetNode: any) => {
        if (mode === 'unicast' && targetNode.id === 'B') return true;
        if (mode === 'broadcast') return true;
        if (mode === 'multicast' && targetNode.group === 'group1') return true;
        return false;
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-xl shadow-xl">
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => setMode('unicast')} className={`px-4 py-2 rounded-lg transition-all font-medium ${mode === 'unicast' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>Unicast</button>
                <button onClick={() => setMode('broadcast')} className={`px-4 py-2 rounded-lg transition-all font-medium ${mode === 'broadcast' ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>Broadcast</button>
                <button onClick={() => setMode('multicast')} className={`px-4 py-2 rounded-lg transition-all font-medium ${mode === 'multicast' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>Multicast</button>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 h-64 relative border border-slate-700 overflow-hidden shadow-inner w-full flex justify-center">
                <div style={{ width: '350px', height: '100%', position: 'relative' }}>
                    <svg className="w-full h-full absolute inset-0">
                        {/* Connections */}
                        {nodes.filter(n => n.type === 'receiver').map((node) => (
                            <line
                                key={node.id}
                                x1={nodes[0].x + 40} y1={nodes[0].y + 20}
                                x2={node.x} y2={node.y + 20}
                                stroke={isActive(node) ? (mode === 'unicast' ? '#3b82f6' : mode === 'broadcast' ? '#22c55e' : '#a855f7') : '#334155'}
                                strokeWidth={isActive(node) ? 2 : 1}
                                strokeDasharray={isActive(node) ? "0" : "5,5"}
                                className="transition-all duration-500"
                            />
                        ))}

                        {/* Packets Animation */}
                        {nodes.filter(n => n.type === 'receiver' && isActive(n)).map((node) => (
                            <circle key={`p-${node.id}`} r="4" fill="white">
                                <animateMotion
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    path={`M${nodes[0].x + 40},${nodes[0].y + 20} L${node.x},${node.y + 20}`}
                                />
                            </circle>
                        ))}
                    </svg>

                    {/* Node Elements */}
                    {nodes.map(node => (
                        <div
                            key={node.id}
                            className={`absolute w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-500 z-10`}
                            style={{
                                left: node.x,
                                top: node.y,
                                borderColor: node.type === 'sender' ? '#3b82f6' : (isActive(node) ? 'white' : '#475569'),
                                backgroundColor: node.type === 'sender' ? '#1e40af' : (isActive(node) ? (mode === 'unicast' ? '#2563eb' : mode === 'broadcast' ? '#16a34a' : '#9333ea') : '#1e293b')
                            }}
                        >
                            {node.type === 'sender' ? <Server size={20} /> : <Laptop size={20} className={isActive(node) ? 'text-white' : 'text-slate-500'} />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <p className="text-lg font-bold text-white mb-2">
                    {mode === 'unicast' && "Unicast: אחד לאחד"}
                    {mode === 'broadcast' && "Broadcast: אחד לכולם"}
                    {mode === 'multicast' && "Multicast: אחד לקבוצה"}
                </p>
                <p className="text-slate-400">
                    {mode === 'unicast' && "כמו שיחת טלפון פרטית או הודעה ישירה."}
                    {mode === 'broadcast' && "כמו מורה שמדבר אל כל הכיתה. משמש לגילוי שירותים ברשת (כמו ARP)."}
                    {mode === 'multicast' && "כמו שיחת זום או קבוצת וואטסאפ. רק מי שרשום לקבוצה מקבל את המידע."}
                </p>
            </div>
        </div>
    );
};

export default TransmissionVisualizer;
