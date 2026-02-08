import React, { useEffect, useRef } from 'react';

const HeroCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Configuration
        const config = {
            nodeCount: 30,
            connectionDistance: 180,
            packetSpawnRate: 30, // Frames
            colors: ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b']
        };

        // State
        const nodes: any[] = [];
        const packets: any[] = [];
        let frame = 0;

        // Resize Helper
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };

        // Init Nodes
        const initNodes = () => {
            nodes.length = 0;
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            for (let i = 0; i < config.nodeCount; i++) {
                nodes.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    r: 3 + Math.random() * 4,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        };

        // Animation Loop
        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            const W = canvas.width / dpr;
            const H = canvas.height / dpr;

            ctx.clearRect(0, 0, W, H);
            frame++;

            // Spawn Packet
            if (frame % config.packetSpawnRate === 0) {
                if (packets.length < 20) {
                    const a = nodes[Math.floor(Math.random() * nodes.length)];
                    const b = nodes[Math.floor(Math.random() * nodes.length)];
                    if (a && b && a !== b) {
                        packets.push({
                            fromX: a.x, fromY: a.y,
                            toX: b.x, toY: b.y,
                            progress: 0,
                            speed: 0.005 + Math.random() * 0.01,
                            color: config.colors[Math.floor(Math.random() * config.colors.length)]
                        });
                    }
                }
            }

            // Update & Draw Nodes
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;

                // Bounce
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;

                n.pulse += 0.03;
                const pr = n.r + Math.sin(n.pulse) * 2;

                // Node Body
                ctx.beginPath();
                ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59,130,246,0.6)';
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(n.x, n.y, pr + 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59,130,246,0.08)';
                ctx.fill();
            });

            // Draw Connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.connectionDistance) {
                        const alpha = 1 - dist / config.connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(59,130,246,${alpha * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Update & Draw Packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += p.speed;

                if (p.progress >= 1) {
                    packets.splice(i, 1);
                    continue;
                }

                const x = p.fromX + (p.toX - p.fromX) * p.progress;
                const y = p.fromY + (p.toY - p.fromY) * p.progress;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Trail
                for (let t = 1; t <= 5; t++) {
                    const tp = p.progress - t * 0.015;
                    if (tp > 0) {
                        const tx = p.fromX + (p.toX - p.fromX) * tp;
                        const ty = p.fromY + (p.toY - p.fromY) * tp;
                        ctx.beginPath();
                        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
                        // Convert hex to rgba for manual alpha
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = 0.3 - t * 0.05;
                        ctx.fill();
                        ctx.globalAlpha = 1.0;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Bootstrap
        resize();
        initNodes();
        draw();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
            <canvas ref={canvasRef} className="block w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />
        </div>
    );
};

export default HeroCanvas;
