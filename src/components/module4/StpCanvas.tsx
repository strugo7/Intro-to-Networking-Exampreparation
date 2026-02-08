import React, { useRef, useEffect, useState } from 'react';
import { Shield, AlertTriangle, Play } from 'lucide-react';

const StpCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stpEnabled, setStpEnabled] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        let animationFrameId: number;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            const w = Math.min(rect.width, 600);
            const h = 300;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            return w;
        };

        const w = resize();
        const h = 300;

        // Network Topology (Triangle)
        // Switch A (Root) - Top
        // Switch B - Bottom Left
        // Switch C - Bottom Right
        const swA = { x: w! * 0.5, y: h * 0.2, label: 'Root Bridge', pri: 4096 };
        const swB = { x: w! * 0.2, y: h * 0.8, label: 'Switch B', pri: 32768 };
        const swC = { x: w! * 0.8, y: h * 0.8, label: 'Switch C', pri: 32768 };

        const links = [
            { id: 'AB', from: swA, to: swB, status: 'fwd' },
            { id: 'AC', from: swA, to: swC, status: 'fwd' },
            { id: 'BC', from: swB, to: swC, status: 'fwd' } // This will be blocked if STP is on
        ];

        let packets: any[] = [];
        let frameCount = 0;

        const spawnPacket = () => {
            // Spawn BPDUs from Root (A)
            if (stpEnabled) {
                // BPDU down to B and C
                packets.push({ from: swA, to: swB, progress: 0, color: '#f97316', type: 'BPDU' });
                packets.push({ from: swA, to: swC, progress: 0, color: '#f97316', type: 'BPDU' });
            } else {
                // Broadcast Storm Simulation
                // Packets loop infinitely
                if (packets.length < 15) {
                    const l = links[Math.floor(Math.random() * 3)];
                    packets.push({
                        from: l.from, to: l.to,
                        progress: 0,
                        color: '#ef4444',
                        type: 'STORM',
                        speed: 0.02 + Math.random() * 0.02
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w!, h);
            frameCount++;

            // Update Link Status based on STP
            links[2].status = stpEnabled ? 'blk' : 'fwd'; // BC is the loop closer

            // Draw Links
            links.forEach(l => {
                ctx.beginPath();
                ctx.moveTo(l.from.x, l.from.y);
                ctx.lineTo(l.to.x, l.to.y);
                ctx.lineWidth = 3;

                if (l.status === 'blk') {
                    ctx.strokeStyle = '#ef4444'; // Red for blocked
                    ctx.setLineDash([5, 5]);
                } else if (l.status === 'fwd' && stpEnabled) {
                    ctx.strokeStyle = '#22c55e'; // Green for forwarding
                    ctx.setLineDash([]);
                } else {
                    ctx.strokeStyle = '#3b82f6'; // Blue for normal/storm
                    ctx.setLineDash([]);
                }
                ctx.stroke();
                ctx.setLineDash([]);

                // Port Roles (Simplified)
                if (stpEnabled) {
                    // Start/End circles
                    const drawPort = (x: number, y: number, color: string) => {
                        ctx.beginPath();
                        ctx.arc(x, y, 6, 0, Math.PI * 2);
                        ctx.fillStyle = color;
                        ctx.fill();
                    };

                    // Interpolate positions close to switches
                    const lerp = (p1: any, p2: any, t: number) => ({ x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t });

                    const p1 = lerp(l.from, l.to, 0.15);
                    const p2 = lerp(l.from, l.to, 0.85);

                    drawPort(p1.x, p1.y, '#22c55e'); // All forwarding except..
                    drawPort(p2.x, p2.y, l.status === 'blk' ? '#ef4444' : '#22c55e');

                    if (l.status === 'blk') {
                        ctx.font = '16px serif';
                        ctx.fillStyle = '#ef4444';
                        ctx.fillText('❌', (l.from.x + l.to.x) / 2, (l.from.y + l.to.y) / 2 - 10);

                        ctx.font = '700 10px "Heebo", sans-serif';
                        ctx.fillText('BLK', (l.from.x + l.to.x) / 2, (l.from.y + l.to.y) / 2 + 15);
                    }
                }
            });

            // Draw Switches
            [swA, swB, swC].forEach(sw => {
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, 30, 0, Math.PI * 2);
                ctx.fillStyle = '#1e293b';
                ctx.fill();
                ctx.strokeStyle = sw === swA && stpEnabled ? '#f59e0b' : '#64748b'; // Gold for root
                ctx.lineWidth = 3;
                ctx.stroke();

                // Icon
                ctx.font = '24px serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.fillText(sw === swA && stpEnabled ? '👑' : '🔀', sw.x, sw.y + 8);

                // Label
                ctx.font = '700 12px "Heebo", sans-serif';
                ctx.fillStyle = '#e2e8f0';
                ctx.fillText(sw.label, sw.x, sw.y - 40);

                // Priority
                ctx.font = '500 10px "IBM Plex Mono", monospace';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText('Pri: ' + sw.pri, sw.x, sw.y + 45);
            });

            // Packets
            if (frameCount % 60 === 0) spawnPacket();

            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += (p.speed || 0.015);

                if (p.progress >= 1) {
                    if (!stpEnabled) {
                        // In storm mode, packets recirculate
                        // If it arrived at B from A, send to C (loop)
                        const nextMap: any = {
                            'AB': swC, // Arrived at B from A -> go to C
                            'BC': swA, // Arrived at C from B -> go to A
                            'AC': swB  // Arrived at C from A -> go to B (or reverse)
                        };
                        // Simplified storm logic: just pick a random next neighbor
                        p.progress = 0;
                        const oldTo = p.to;
                        p.from = oldTo;
                        p.to = [swA, swB, swC].filter(s => s !== oldTo)[Math.floor(Math.random() * 2)];
                    } else {
                        packets.splice(i, 1);
                        continue;
                    }
                }

                // If link appears blocked, kill packet (STP logic)
                // Check if p.from -> p.to corresponds to blocked link
                const isBlocked = (p.from === swB && p.to === swC) || (p.from === swC && p.to === swB);
                if (stpEnabled && isBlocked) {
                    // Packet hits block and dies
                    if (p.progress > 0.1 && p.progress < 0.9) {
                        ctx.font = '16px serif';
                        ctx.fillText('💥', p.x, p.y);
                        packets.splice(i, 1);
                        continue;
                    }
                }

                const x = p.from.x + (p.to.x - p.from.x) * p.progress;
                const y = p.from.y + (p.to.y - p.from.y) * p.progress;
                p.x = x; p.y = y;

                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [stpEnabled]);

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Shield className={stpEnabled ? 'text-green-400' : 'text-slate-500'} />
                    STP Loop Prevention
                </h2>
                <div className="text-sm">
                    {stpEnabled ? (
                        <span className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                            <Shield size={14} /> Safe (Loop Free)
                        </span>
                    ) : (
                        <span className="flex items-center gap-2 text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 animate-pulse">
                            <AlertTriangle size={14} /> Loop Detected!
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 relative">
                <canvas ref={canvasRef} className="w-full h-[300px] block" />

                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button
                        onClick={() => setStpEnabled(!stpEnabled)}
                        className={`px-6 py-2 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 ${stpEnabled
                                ? 'bg-red-500 hover:bg-red-600 text-white hover:shadow-red-500/25'
                                : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-green-500/25'
                            }`}
                    >
                        {stpEnabled ? 'בטל STP (צור לולאה)' : 'הפעל STP (חסום לולאה)'}
                    </button>
                </div>
            </div>

            <p className="mt-4 text-slate-400 text-sm p-4 bg-slate-900/30 rounded-lg">
                {stpEnabled
                    ? '✅ STP זיהה מעגל וחסם את החיבור בין B ל-C. התעבורה זורמת רק דרך ה-Root (A).'
                    : '⚠️ ללא STP, חבילות ה-Broadcast מסתובבות במעגל אינסופי (Loop) וגורמות לקריסת הרשת!'}
            </p>
        </div>
    );
};

export default StpCanvas;
