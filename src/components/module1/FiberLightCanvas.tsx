import React, { useEffect, useRef } from 'react';

interface FiberLightCanvasProps {
    mode: 'single' | 'multi';
}

const FiberLightCanvas: React.FC<FiberLightCanvasProps> = ({ mode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let frame = 0;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            // Double resolution for crisp text/lines
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = 300 * dpr;

            ctx.scale(dpr, dpr);

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `300px`;
        };

        const animate = () => {
            const rect = container.getBoundingClientRect();
            const w = rect.width;
            const h = 300;

            ctx.clearRect(0, 0, w, h);

            // Draw fiber cable
            const cableTop = h * 0.25;
            const cableBottom = h * 0.75;
            const cableHeight = cableBottom - cableTop;

            // Cladding
            ctx.fillStyle = 'rgba(52, 152, 219, 0.15)';
            ctx.beginPath();
            ctx.roundRect(30, cableTop - 20, w - 60, cableHeight + 40, 20);
            ctx.fill();
            ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Core
            ctx.fillStyle = 'rgba(26, 188, 156, 0.1)';
            ctx.beginPath();
            ctx.roundRect(30, cableTop, w - 60, cableHeight, 15);
            ctx.fill();
            ctx.strokeStyle = 'rgba(26, 188, 156, 0.3)';
            ctx.stroke();

            // Labels
            ctx.fillStyle = '#3498db';
            ctx.font = '12px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('Cladding (שכבת מעטפת)', w / 2, cableTop - 28);
            ctx.fillStyle = '#1abc9c';
            ctx.fillText('Core (ליבה)', w / 2, cableTop + 16);

            // Light source
            ctx.beginPath();
            ctx.arc(50, h / 2, 12, 0, Math.PI * 2);
            ctx.fillStyle = '#f39c12';
            ctx.shadowColor = '#f39c12';
            ctx.shadowBlur = 20;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px IBM Plex Mono';
            ctx.textAlign = 'center';
            ctx.fillText('LED', 50, h / 2 + 3);

            // Detector
            ctx.beginPath();
            ctx.arc(w - 50, h / 2, 12, 0, Math.PI * 2);
            ctx.fillStyle = '#2ecc71';
            ctx.shadowColor = '#2ecc71';
            ctx.shadowBlur = 20;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.fillText('PD', w - 50, h / 2 + 3);

            // Draw light rays
            if (mode === 'single') {
                // Single mode - straight line
                ctx.beginPath();
                ctx.moveTo(62, h / 2);
                ctx.lineTo(w - 62, h / 2);
                ctx.strokeStyle = '#f39c12';
                ctx.lineWidth = 3;
                ctx.shadowColor = '#f39c12';
                ctx.shadowBlur = 15;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Moving photon
                const photonX = 62 + ((frame * 4) % (w - 124));
                ctx.beginPath();
                ctx.arc(photonX, h / 2, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#f39c12';
                ctx.shadowBlur = 25;
                ctx.fill();
                ctx.shadowBlur = 0;

                ctx.fillStyle = '#f39c12';
                ctx.font = '14px Heebo';
                ctx.textAlign = 'center';
                ctx.fillText('Single Mode — קרן אחת ישרה', w / 2, h - 20);
            } else {
                // Multi mode - bouncing rays
                const rays = [
                    { amp: cableHeight * 0.35, freq: 0.03, color: '#f39c12', phase: 0 },
                    { amp: cableHeight * 0.25, freq: 0.04, color: '#e74c3c', phase: 1 },
                    { amp: cableHeight * 0.4, freq: 0.025, color: '#f1c40f', phase: 2 }
                ];

                rays.forEach(ray => {
                    ctx.beginPath();
                    ctx.strokeStyle = ray.color;
                    ctx.lineWidth = 2;
                    ctx.globalAlpha = 0.7;
                    for (let x = 62; x < w - 62; x++) {
                        const y = h / 2 + Math.sin((x + frame * 3 + ray.phase * 100) * ray.freq) * ray.amp;
                        if (x === 62) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.shadowColor = ray.color;
                    ctx.shadowBlur = 8;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;
                });

                // Moving photons
                rays.forEach((ray, i) => {
                    const px = 62 + ((frame * 3 + i * 80) % (w - 124));
                    const py = h / 2 + Math.sin((px + frame * 3 + ray.phase * 100) * ray.freq) * ray.amp;
                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#fff';
                    ctx.shadowColor = ray.color;
                    ctx.shadowBlur = 15;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });

                ctx.fillStyle = '#e74c3c';
                ctx.font = '14px Heebo';
                ctx.textAlign = 'center';
                ctx.fillText('Multi Mode — מספר קרניים בזוויות שונות', w / 2, h - 20);
            }

            frame++;
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mode]);

    return (
        <div ref={containerRef} className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
            <canvas ref={canvasRef} className="block w-full h-[300px]" />
        </div>
    );
};

export default FiberLightCanvas;
