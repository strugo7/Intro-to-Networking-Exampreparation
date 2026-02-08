import React, { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const FrameJourneyCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const dpr = window.devicePixelRatio || 1;

        // Canvas setup logic
        const initCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            const w = Math.min(rect.width, 800);
            canvas.width = w * dpr;
            canvas.height = 200 * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = '200px';
            return w;
        };

        const w = initCanvas();

        const drawStatic = (W: number, H: number) => {
            ctx.clearRect(0, 0, W, H);
            const nodes = [
                { x: W * 0.08, y: H * 0.5, label: '💻 PC A', sub: 'AA:11:22:33:44:55' },
                { x: W * 0.35, y: H * 0.5, label: '🔀 Switch', sub: 'Learning...' },
                { x: W * 0.65, y: H * 0.5, label: '🔀 Switch', sub: 'Forwarding...' },
                { x: W * 0.92, y: H * 0.5, label: '💻 PC B', sub: 'BB:66:77:88:99:00' }
            ];

            // Links
            for (let i = 0; i < nodes.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x + 30, nodes[i].y);
                ctx.lineTo(nodes[i + 1].x - 30, nodes[i + 1].y);
                ctx.strokeStyle = 'rgba(6,182,212,0.3)';
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Draw Nodes
            nodes.forEach(n => {
                // Emoji
                ctx.font = '24px serif';
                ctx.textAlign = 'center';
                ctx.fillText(n.label.split(' ')[0], n.x, n.y + 8);

                // Label
                ctx.font = '600 12px "Heebo", sans-serif';
                ctx.fillStyle = '#e2e8f0';
                ctx.fillText(n.label.split(' ')[1] || '', n.x, n.y - 28);

                // Sub-label (MAC)
                ctx.font = '500 10px "IBM Plex Mono", monospace';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(n.sub, n.x, n.y + 35);
            });
            return nodes;
        };

        if (w) drawStatic(w, 200);

        // Animation Logic
        if (isRunning && w) {
            const W = w;
            const H = 200;
            const nodes = [
                { x: W * 0.08, y: H * 0.5 },
                { x: W * 0.35, y: H * 0.5 },
                { x: W * 0.65, y: H * 0.5 },
                { x: W * 0.92, y: H * 0.5 }
            ];

            let seg = 0;
            let progress = 0;

            const animate = () => {
                drawStatic(W, H);
                progress += 0.015; // Speed

                if (progress >= 1) {
                    seg++;
                    progress = 0;
                }

                if (seg >= nodes.length - 1) {
                    drawStatic(W, H);
                    ctx.font = '700 16px "Heebo", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#22c55e';
                    ctx.fillText('✅ Frame נמסר בהצלחה ל-PC B!', W / 2, 30);
                    setIsRunning(false); // Stop animation
                    return;
                }

                const from = nodes[seg];
                const to = nodes[seg + 1];
                const x = from.x + (to.x - from.x) * progress;
                const y = from.y + (to.y - from.y) * progress;

                // Draw Packet
                ctx.save();
                ctx.shadowColor = '#06b6d4';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.roundRect(x - 20, y - 12, 40, 24, 6);
                ctx.fillStyle = '#06b6d4';
                ctx.fill();
                ctx.restore();

                ctx.font = '700 10px "IBM Plex Mono", monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.fillText('FRAME', x, y + 4);

                // Status Text
                const labels = ['PC A → Switch 1', 'Switch 1 → Switch 2', 'Switch 2 → PC B'];
                ctx.font = '600 14px "Heebo", sans-serif';
                ctx.fillStyle = '#f59e0b';
                ctx.fillText('📦 ' + labels[seg], W / 2, 30);

                animationFrameId = requestAnimationFrame(animate);
            };
            animate();
        }

        const handleResize = () => {
            const newW = initCanvas();
            if (newW && !isRunning) drawStatic(newW, 200);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isRunning]);

    return (
        <div className="w-full relative bg-slate-900/50 rounded-xl border border-slate-700/50 p-4 flex flex-col items-center">
            <canvas ref={canvasRef} className="w-full cursor-pointer h-[200px]" />
            <div className="mt-4">
                <button
                    onClick={() => !isRunning && setIsRunning(true)}
                    disabled={isRunning}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${isRunning
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 active:scale-95'
                        }`}
                >
                    <Play size={18} fill={isRunning ? 'currentColor' : 'white'} />
                    {isRunning ? 'Sending...' : 'שלח Frame'}
                </button>
            </div>
        </div>
    );
};

export default FrameJourneyCanvas;
