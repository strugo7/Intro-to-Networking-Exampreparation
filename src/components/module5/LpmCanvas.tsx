import React, { useEffect, useRef } from 'react';
import { Network } from 'lucide-react';

export const LpmCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let frame = 0;
        let animPhase = 0;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = 280;
        };
        resize();

        const routes = [
            { net: '10.0.0.0/8', mask: 8, color: '#ef4444', w: 0.8 },
            { net: '10.20.0.0/16', mask: 16, color: '#f59e0b', w: 0.5 },
            { net: '10.20.30.0/24', mask: 24, color: '#22c55e', w: 0.2 }
        ];

        const draw = () => {
            if (!ctx || !canvas) return;
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            frame++;

            // Calculate responsive dimensions
            const barX = W * 0.2; // 20% padded left
            const barW = W * 0.6; // 60% width
            const dest = '10.20.30.40';

            // Title
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText(`Destination IP: ${dest}`, W / 2, 30);

            // Draw bars
            routes.forEach((r, i) => {
                const y = 60 + i * 70;
                const routeW = barW * r.w;
                const show = animPhase > i;
                const isBest = animPhase > 2 && i === 2;

                // Label
                ctx.font = 'bold 12px monospace';
                ctx.textAlign = 'right';
                ctx.fillStyle = show ? r.color : '#475569';
                ctx.fillText(r.net, barX - 10, y + 22);

                // Bar background
                ctx.beginPath();
                ctx.roundRect(barX, y, barW, 36, 6);
                ctx.fillStyle = 'rgba(255,255,255,0.03)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Matched portion
                if (show) {
                    // Animate width or just appear? Original used static width but phases
                    // Let's make it wipe in maybe? Nah stick to original logic
                    ctx.beginPath();
                    ctx.roundRect(barX, y, routeW, 36, 6);
                    ctx.fillStyle = r.color + '33'; // hex + alpha
                    ctx.fill();
                    ctx.strokeStyle = r.color;
                    ctx.lineWidth = isBest ? 3 : 1;
                    ctx.stroke();

                    // Match label
                    ctx.font = 'bold 11px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = r.color;
                    ctx.fillText(`/${r.mask} match`, barX + routeW / 2, y + 22);
                }

                // Best match indicator
                if (isBest) {
                    const glow = Math.sin(frame * 0.05) * 0.3 + 0.7;
                    ctx.save();
                    ctx.shadowColor = r.color;
                    ctx.shadowBlur = 12 * glow;
                    ctx.beginPath();
                    ctx.roundRect(barX, y, routeW, 36, 6);
                    ctx.strokeStyle = r.color;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.restore();

                    ctx.font = 'bold 14px sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillStyle = '#22c55e';
                    ctx.fillText('✓ Best Match! (LPM)', barX + routeW + 16, y + 24);
                }
            });

            if (animPhase <= 3) {
                if (frame % 60 === 0) animPhase++;
            } else if (frame % 300 === 0) {
                // Reset occasionally
                animPhase = 0;
            }

            animationId = requestAnimationFrame(draw);
        };
        draw();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-8 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Network className="text-blue-500" /> איך נתב בוחר לאן לשלוח? (LPM)
            </h3>
            <p className="text-slate-400 mb-6">
                הנתב מחפש את ההתאמה הספציפית ביותר (המסכה הארוכה ביותר) בטבלת הניתוב.
            </p>
            <div ref={containerRef} className="w-full h-[280px] bg-slate-950 rounded-lg overflow-hidden relative border border-slate-800">
                <canvas ref={canvasRef} className="w-full h-full" />
                <div className="absolute bottom-2 right-2 text-xs text-slate-600">
                    Click to reset animation
                </div>
            </div>
        </div>
    );
};
