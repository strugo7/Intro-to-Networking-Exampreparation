import React, { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const ArpCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const dpr = window.devicePixelRatio || 1;

        const initCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return { w: 0, h: 0 };
            const w = Math.min(rect.width, 600);
            const h = 220; // Slight increase for better spacing
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            return { w, h };
        };

        const { w: W, h: H } = initCanvas();

        const drawStatic = (width: number, height: number) => {
            ctx.clearRect(0, 0, width, height);

            const pcs = [
                { x: width * 0.15, y: height * 0.5, label: 'PC A', ip: '.1.10' },
                { x: width * 0.5, y: height * 0.2, label: 'PC B', ip: '.1.20' },
                { x: width * 0.85, y: height * 0.5, label: 'PC C', ip: '.1.30' },
                { x: width * 0.5, y: height * 0.8, label: 'PC D', ip: '.1.40' }
            ];

            const sw = { x: width * 0.5, y: height * 0.5 };

            // Draw Connections
            pcs.forEach(pc => {
                ctx.beginPath();
                ctx.moveTo(sw.x, sw.y);
                ctx.lineTo(pc.x, pc.y);
                ctx.strokeStyle = 'rgba(100,116,139,0.3)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            // Draw Switch (Center)
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d422';
            ctx.fill();
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.font = '20px serif';
            ctx.textAlign = 'center';
            ctx.fillText('🔀', sw.x, sw.y + 7);

            // Draw PCs
            pcs.forEach(pc => {
                ctx.font = '24px serif';
                ctx.textAlign = 'center';
                ctx.fillText('💻', pc.x, pc.y + 5);

                ctx.font = '600 12px "Heebo", sans-serif';
                ctx.fillStyle = '#e2e8f0';
                ctx.fillText(pc.label, pc.x, pc.y - 20);

                ctx.font = '500 10px "IBM Plex Mono", monospace';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(pc.ip, pc.x, pc.y + 26);
            });

            return { pcs, sw };
        };

        const { pcs, sw } = drawStatic(W, H);

        if (isRunning && W > 0) {
            let frame = 0;
            const totalFrames = 300;

            const drawPacket = (x: number, y: number, color: string, label: string) => {
                ctx.save();
                ctx.shadowColor = color;
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.roundRect(x - 14, y - 8, 28, 16, 4);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.restore();

                ctx.font = '700 8px "IBM Plex Mono", monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = color === '#f59e0b' ? '#000' : '#fff';
                ctx.fillText(label, x, y + 3);
            };

            const animate = () => {
                frame++;
                drawStatic(W, H); // Redraw background

                if (frame <= 80) {
                    // Phase 1: Request from A to Switch
                    const p = Math.min(frame / 40, 1);
                    if (p <= 1) {
                        const x = pcs[0].x + (sw.x - pcs[0].x) * p;
                        const y = pcs[0].y + (sw.y - pcs[0].y) * p;
                        drawPacket(x, y, '#f59e0b', 'ARP?');
                    }

                    if (frame > 40) {
                        // Phase 2: Flood from Switch to B, C, D
                        const p2 = Math.min((frame - 40) / 40, 1);
                        [1, 2, 3].forEach(i => {
                            const x = sw.x + (pcs[i].x - sw.x) * p2;
                            const y = sw.y + (pcs[i].y - sw.y) * p2;
                            drawPacket(x, y, '#f59e0b', 'ARP?');
                        });
                    }

                    ctx.font = '600 13px "Heebo", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#f59e0b';
                    ctx.fillText('📢 ARP Request: "מי זה 192.168.1.30?"', W / 2, 20);

                } else if (frame <= 180) {
                    // Phase 3: Reply from C (Unicast)
                    const p = Math.min((frame - 80) / 60, 1);
                    // From C to A (Simplified straight line visual for clarity, technically goes via switch)
                    // Let's go C -> Switch -> A for realism
                    let x, y;

                    if (p < 0.5) {
                        // C -> Switch
                        const subP = p * 2;
                        x = pcs[2].x + (sw.x - pcs[2].x) * subP;
                        y = pcs[2].y + (sw.y - pcs[2].y) * subP;
                    } else {
                        // Switch -> A
                        const subP = (p - 0.5) * 2;
                        x = sw.x + (pcs[0].x - sw.x) * subP;
                        y = sw.y + (pcs[0].y - sw.y) * subP;
                    }

                    drawPacket(x, y, '#22c55e', 'ARP!');

                    ctx.font = '600 13px "Heebo", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#22c55e';
                    ctx.fillText('👤 ARP Reply: "אני .1.30, ה-MAC שלי הוא CC:33..."', W / 2, 20);
                } else {
                    // Done
                    ctx.font = '700 14px "Heebo", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#22c55e';
                    ctx.fillText('✅ PC A שמר: 192.168.1.30 → CC:33:44:55:66:77', W / 2, 20);

                    if (frame > totalFrames) {
                        setIsRunning(false);
                        return;
                    }
                }

                animationFrameId = requestAnimationFrame(animate);
            };
            animate();
        }

        const handleResize = () => {
            const { w, h } = initCanvas();
            if (w && !isRunning) drawStatic(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isRunning]);

    return (
        <div className="w-full relative bg-slate-900/50 rounded-xl border border-slate-700/50 p-4 flex flex-col items-center">
            <canvas ref={canvasRef} className="w-full h-[220px]" />
            <div className="mt-4">
                <button
                    onClick={() => !isRunning && setIsRunning(true)}
                    disabled={isRunning}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${isRunning
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg hover:shadow-amber-500/25 active:scale-95'
                        }`}
                >
                    <Play size={18} fill={isRunning ? 'currentColor' : 'white'} />
                    {isRunning ? 'Broadcasting...' : 'הפעל ARP'}
                </button>
            </div>
        </div>
    );
};

export default ArpCanvas;
