import React, { useState } from 'react';
import { ScissorsIcon } from './Module5Icons';

const FragmentationDemo: React.FC = () => {
    const [packetSize, setPacketSize] = useState(4000);
    const mtu = 1500;
    const headerSize = 20;
    const maxPayload = mtu - headerSize; // 1480

    const fragments = [];
    let remaining = packetSize;
    let offset = 0;

    while (remaining > 0) {
        const payload = Math.min(remaining, maxPayload);
        fragments.push({
            size: payload + headerSize,
            payload: payload,
            offset: offset / 8, // Offset is in 8-byte blocks
            moreFragments: remaining > maxPayload
        });
        remaining -= payload;
        offset += payload;
    }

    return (
        <div className="bg-slate-900/50 border border-slate-700 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ScissorsIcon className="text-yellow-400" size={32} />
                פרגמנטציה (Fragmentation)
            </h3>

            <div className="mb-8">
                <p className="text-slate-300 mb-4">
                    כאשר חבילה גדולה מדי עבור ה-MTU (Maximum Transmission Unit) של הרשת (בדרך כלל 1500 בייטים),
                    הראוטר נאלץ לחתוך אותה לחתיכות קטנות.
                </p>
                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <label className="text-sm font-bold text-slate-400">גודל החבילה המקורית:</label>
                    <input
                        type="range" min="1500" max="6000" step="100"
                        value={packetSize}
                        onChange={(e) => setPacketSize(Number(e.target.value))}
                        className="w-48 accent-emerald-500"
                    />
                    <span className="font-mono text-emerald-400">{packetSize} Bytes</span>
                </div>
            </div>

            <div className="relative">
                {/* Original Packet */}
                <div className="mb-8">
                    <div className="text-xs text-slate-500 mb-1">ORIGINAL PACKET</div>
                    <div className="h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-lg transition-all" style={{ width: '100%', maxWidth: '100%' }}>
                        IP Packet ({packetSize} bytes)
                    </div>
                </div>

                <div className="flex justify-center my-4">
                    <div className="bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded text-xs border border-yellow-500/50">
                        Router Constraints: MTU = 1500 Bytes
                    </div>
                </div>

                {/* Fragments */}
                <div className="space-y-2">
                    <div className="text-xs text-slate-500 mb-1">FRAGMENTS ON WIRE</div>
                    <div className="flex flex-wrap gap-2">
                        {fragments.map((frag, i) => (
                            <div key={i} className="flex flex-col items-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="h-16 w-32 bg-emerald-700 border border-emerald-500 rounded flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                                    <div className="absolute top-0 w-full h-4 bg-emerald-900 text-[9px] text-center text-emerald-200">Header ({headerSize})</div>
                                    <span className="text-white font-bold text-sm mt-3">{frag.size}B</span>
                                    <div className="text-[9px] text-emerald-200 font-mono">Off: {frag.offset} | MF: {frag.moreFragments ? 1 : 0}</div>
                                </div>
                                <div className="h-4 w-0.5 bg-slate-600"></div>
                                <span className="text-[10px] text-slate-500">Frag #{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FragmentationDemo;
