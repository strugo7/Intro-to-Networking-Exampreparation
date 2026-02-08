import React, { useRef, useEffect } from 'react';

const HeroCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Configuration
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            if (!canvas.parentElement) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };

        // Initial resize
        resize();
        window.addEventListener('resize', resize);

        const w = () => canvas.width / dpr;
        const h = () => canvas.height / dpr;

        // Node setup
        const nodes: any[] = [];
        const nodeCount = 35; // Increased density slightly for better visual

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * w(),
                y: Math.random() * h(),
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: 3 + Math.random() * 3,
                pulse: Math.random() * Math.PI * 2
            });
        }

        const frames: any[] = [];

        const spawnFrame = () => {
            if (frames.length > 10) return;
            const a = nodes[Math.floor(Math.random() * nodes.length)];
            const b = nodes[Math.floor(Math.random() * nodes.length)];
            if (a === b) return;

            frames.push({
                fromX: a.x,
                fromY: a.y,
                toX: b.x,
                toY: b.y,
                progress: 0,
                speed: 0.006 + Math.random() * 0.008,
                color: ['#06b6d4', '#f59e0b', '#22c55e', '#8b5cf6'][Math.floor(Math.random() * 4)]
            });
        };

        let fc = 0;

        const draw = () => {
            const W = w();
            const H = h();
            ctx.clearRect(0, 0, W, H);

            fc++;
            if (fc % 35 === 0) spawnFrame();

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 160) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(6,182,212,${(1 - dist / 160) * 0.12})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;

                // Bounce off walls
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;

                n.pulse += 0.03;
                const pr = n.r + Math.sin(n.pulse) * 1.5;

                ctx.beginPath();
                ctx.arc(n.x, n.y, Math.max(0, pr), 0, Math.PI * 2); // Ensure radius is non-negative
                ctx.fillStyle = 'rgba(6,182,212,0.5)';
                ctx.fill();
            });

            // Draw frames
            for (let i = frames.length - 1; i >= 0; i--) {
                const f = frames[i];
                f.progress += f.speed;

                if (f.progress >= 1) {
                    frames.splice(i, 1);
                    continue;
                }

                const x = f.fromX + (f.toX - f.fromX) * f.progress;
                const y = f.fromY + (f.toY - f.fromY) * f.progress;

                ctx.save();
                ctx.shadowColor = f.color;
                ctx.shadowBlur = 8;

                // Draw rounded rect for frame
                ctx.beginPath();
                ctx.roundRect(x - 10, y - 6, 20, 12, 3);
                ctx.fillStyle = f.color;
                ctx.fill();
                ctx.restore();

                // Text
                ctx.font = '600 6px "IBM Plex Mono", monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.fillText('FRM', x, y + 2);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default HeroCanvas;
