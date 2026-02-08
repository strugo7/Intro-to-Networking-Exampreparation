import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export const PacketJourneyCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let progress = 0;
        let currentHop = 0;
        let running = false;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            // Double for high res
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = 250 * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `250px`;
        };

        const routers: { x: number, y: number }[] = [];
        const labels = ['מקור', 'Router A', 'Router B', 'Router C', 'יעד'];

        const initRouters = () => {
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = 250;
            routers.length = 0;
            const spacing = w / (labels.length + 1);
            for (let i = 0; i < labels.length; i++) {
                routers.push({ x: spacing * (i + 1), y: h / 2 });
            }
        };

        const draw = () => {
            if (!ctx) return;
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = 250;
            ctx.clearRect(0, 0, w, h);

            // Connections
            for (let i = 0; i < routers.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(routers[i].x, routers[i].y);
                ctx.lineTo(routers[i + 1].x, routers[i + 1].y);
                ctx.strokeStyle = 'rgba(59,130,246,0.3)';
                ctx.lineWidth = 2;
                ctx.setLineDash([6, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Routers
            routers.forEach((r, i) => {
                const isEndpoint = i === 0 || i === routers.length - 1;
                const color = isEndpoint ? '#22c55e' : '#3b82f6';
                const icon = isEndpoint ? '💻' : '🔀';
                const isVisited = i <= currentHop && running; // Logic for highlight

                ctx.beginPath();
                ctx.arc(r.x, r.y, 24, 0, Math.PI * 2);
                ctx.fillStyle = isVisited ? `${color}44` : `${color}11`;
                ctx.fill();
                ctx.strokeStyle = color;
                ctx.lineWidth = isVisited ? 3 : 2;
                ctx.stroke();

                ctx.fillStyle = color;
                ctx.font = '20px serif'; // Emoji font
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(icon, r.x, r.y + 2); // Optical adjustment

                ctx.font = '600 13px Heebo, sans-serif';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(labels[i], r.x, r.y + 45);
            });

            // Packet Animation
            if (running) {
                if (currentHop < routers.length - 1) {
                    progress += 0.015;
                    const from = routers[currentHop];
                    const to = routers[currentHop + 1];
                    const x = from.x + (to.x - from.x) * progress;
                    const y = from.y + (to.y - from.y) * progress;

                    // Packet Body
                    ctx.save();
                    ctx.shadowColor = '#f59e0b';
                    ctx.shadowBlur = 15;
                    ctx.beginPath();
                    ctx.roundRect(x - 18, y - 12, 36, 24, 6);
                    ctx.fillStyle = '#f59e0b';
                    ctx.fill();
                    ctx.restore();

                    // Text
                    ctx.font = '700 10px IBM Plex Mono, monospace';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#000';
                    ctx.fillText('PKT', x, y + 4);

                    // Hop Indicator
                    ctx.font = '600 12px Heebo, sans-serif';
                    ctx.fillStyle = '#f59e0b';
                    ctx.fillText(`Hop ${currentHop + 1}`, x, y - 24);

                    if (progress >= 1) {
                        progress = 0;
                        currentHop++;
                    }
                } else {
                    running = false;
                    setIsAnimating(false);
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        const start = () => {
            if (running) return;
            running = true;
            currentHop = 0;
            progress = 0;
            setIsAnimating(true);
        };

        // Expose start function to parent via custom event or similar? 
        // Better: Listen to prop changes or simply expose a ref method?
        // For now, let's keep button INSIDE component or use prop. 
        // Actually, converting to internal button for self-containment is easier for now.

        // Initial setup
        resize();
        initRouters();
        draw();

        window.addEventListener('resize', () => {
            resize();
            initRouters();
        });

        // Attach start method to canvas element for external access if needed, 
        // but cleaner to just have the button here.
        if (canvas) {
            (canvas as any).startAnimation = start;
        }

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const handleStart = () => {
        const canvas = canvasRef.current;
        if (canvas && (canvas as any).startAnimation) {
            (canvas as any).startAnimation();
            setIsAnimating(true);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div ref={containerRef} className="w-full bg-slate-900 rounded-xl overflow-hidden relative shadow-inner border border-slate-800 mb-6">
                <canvas ref={canvasRef} className="block w-full h-[250px]" />
                <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-400 border border-slate-700">
                    Network Layer Simulation
                </div>
            </div>

            <button
                onClick={handleStart}
                disabled={isAnimating}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${isAnimating
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 shadow-blue-500/30'
                    }`}
            >
                {isAnimating ? (
                    <>
                        <span className="animate-spin">⏳</span> מעביר חבילה...
                    </>
                ) : (
                    <>
                        <Play size={20} fill="currentColor" /> שלח חבילה (Send Packet)
                    </>
                )}
            </button>
        </div>
    );
};
