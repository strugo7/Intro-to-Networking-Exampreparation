import React, { useEffect, useRef } from 'react';

const GlobalHero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        let mouse = { x: -1000, y: -1000 };
        const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f39c12'];

        const resize = () => {
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.scale(dpr, dpr);

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // Re-init particles on resize to maintain density
            init();
        };

        const init = () => {
            const rect = container.getBoundingClientRect();
            // Exact logic from original: count = min(80, floor(area / 8000))
            const count = Math.min(80, Math.floor((rect.width * rect.height) / 8000));

            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * rect.width,
                    y: Math.random() * rect.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        };

        const animate = () => {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            ctx.clearRect(0, 0, width, height);

            // Draw gradient background - EXACTLY as in original
            // "rgba(26, 188, 156, 0.05)" to "rgba(10, 14, 23, 0)"
            const grad = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, width / 2
            );
            grad.addColorStop(0, 'rgba(26, 188, 156, 0.05)');
            grad.addColorStop(1, 'rgba(10, 14, 23, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.vx += dx * 0.001; // Push away
                    p.vy += dy * 0.001;
                }

                // Speed limit (Drag)
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 2) {
                    p.vx = (p.vx / speed) * 2;
                    p.vy = (p.vy / speed) * 2;
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const ddx = p.x - p2.x;
                    const ddy = p.y - p2.y;
                    const ddist = Math.sqrt(ddx * ddx + ddy * ddy);

                    if (ddist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        // Opacity based on distance
                        ctx.globalAlpha = (1 - ddist / 120) * 0.2;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', resize);

        // Bootstrap
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0e17] -z-0">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default GlobalHero;
