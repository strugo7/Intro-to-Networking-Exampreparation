import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play, Server, Laptop, Share2, Layers, Shield, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Layer3Intro: React.FC = () => {
    const heroCanvasRef = useRef<HTMLCanvasElement>(null);
    const packetCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Hero Animation
    useEffect(() => {
        const canvas = heroCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const nodes: any[] = [];
        for (let i = 0; i < 30; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                r: 3 + Math.random() * 4
            });
        }

        const packets: any[] = [];
        let frame = 0;

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            if (frame % 30 === 0 && packets.length < 15) {
                const a = nodes[Math.floor(Math.random() * nodes.length)];
                const b = nodes[Math.floor(Math.random() * nodes.length)];
                if (a !== b) {
                    packets.push({
                        fromX: a.x, fromY: a.y,
                        toX: b.x, toY: b.y,
                        progress: 0,
                        speed: 0.005 + Math.random() * 0.01,
                        color: ['#3b82f6', '#8b5cf6', '#22c55e'][Math.floor(Math.random() * 3)]
                    });
                }
            }

            // Draw connections
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw Nodes
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
                ctx.fill();
            });

            // Draw Packets
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
            }

            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // Packet Journey Animation
    const startJourney = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const canvas = packetCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Setup static routers
        const routers = [
            { x: 50, y: 100, label: 'מקור' },
            { x: 150, y: 100, label: 'R1' },
            { x: 250, y: 100, label: 'R2' },
            { x: 350, y: 100, label: 'R3' },
            { x: 450, y: 100, label: 'יעד' }
        ];

        let hop = 0;
        let progress = 0;

        const drawStatic = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connections
            ctx.beginPath();
            ctx.moveTo(50, 100);
            ctx.lineTo(450, 100);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Routers
            routers.forEach((r, i) => {
                ctx.beginPath();
                ctx.arc(r.x, r.y, 20, 0, Math.PI * 2);
                ctx.fillStyle = i === 0 || i === 4 ? '#22c55e' : '#3b82f6';
                ctx.fill();

                ctx.fillStyle = 'white';
                ctx.font = '12px var(--font-assistant)';
                ctx.textAlign = 'center';
                ctx.fillText(i === 0 || i === 4 ? '💻' : '🔀', r.x, r.y + 4);

                ctx.fillStyle = '#64748b';
                ctx.fillText(r.label, r.x, r.y + 35);
            });
        };

        const animatePacket = () => {
            if (hop >= routers.length - 1) {
                setIsAnimating(false);
                drawStatic();
                return;
            }

            drawStatic();
            progress += 0.02;

            const from = routers[hop];
            const to = routers[hop + 1];
            const x = from.x + (to.x - from.x) * progress;
            const y = from.y;

            // Draw Packet
            ctx.beginPath();
            ctx.rect(x - 10, y - 8, 20, 16);
            ctx.fillStyle = '#f59e0b';
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.font = '10px monospace';
            ctx.fillText('IP', x, y + 4);

            if (progress >= 1) {
                progress = 0;
                hop++;
            }
            requestAnimationFrame(animatePacket);
        };

        animatePacket();
    };

    // Initial draw of static packet journey
    useEffect(() => {
        const canvas = packetCanvasRef.current;
        if (canvas) {
            canvas.width = canvas.parentElement?.clientWidth || 500;
            canvas.height = 200;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Static draw code duplicated for init... simplified
                const routers = [
                    { x: 50, y: 100, label: 'מקור' },
                    { x: 150, y: 100, label: 'R1' },
                    { x: 250, y: 100, label: 'R2' },
                    { x: 350, y: 100, label: 'R3' },
                    { x: 450, y: 100, label: 'יעד' }
                ];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.moveTo(50, 100);
                ctx.lineTo(450, 100);
                ctx.strokeStyle = '#e2e8f0';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.stroke();
                ctx.setLineDash([]);
                routers.forEach((r, i) => {
                    ctx.beginPath();
                    ctx.arc(r.x, r.y, 20, 0, Math.PI * 2);
                    ctx.fillStyle = i === 0 || i === 4 ? '#22c55e' : '#3b82f6';
                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(i === 0 || i === 4 ? '💻' : '🔀', r.x, r.y + 4);
                });
            }
        }
    }, []);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden text-white flex items-center justify-center text-center p-6 shadow-xl">
                <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full opacity-30" />
                <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold mb-3">שכבה 3 מתוך 7</div>
                    <h1 className="text-4xl font-black mb-2">שכבת הרשת <span className="text-blue-400 block text-2xl mt-1">Network Layer</span></h1>
                    <p className="text-slate-300 max-w-lg mx-auto">המוח של הרשת — כאן מתקבלות ההחלטות לאן כל חבילת מידע צריכה ללכת</p>
                </div>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">מה זה?</h3>
                    <p className="text-slate-600 dark:text-slate-300">שכבת הרשת אחראית על ניתוב חבילות מידע (Packets) בין רשתות שונות באמצעות כתובות לוגיות (IP).</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">תפקידים</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                        <li className="flex items-center gap-2"><ArrowLeft className="w-4 h-4 text-purple-500" /> כתובות לוגיות (IP)</li>
                        <li className="flex items-center gap-2"><ArrowLeft className="w-4 h-4 text-purple-500" /> ניתוב (Routing)</li>
                        <li className="flex items-center gap-2"><ArrowLeft className="w-4 h-4 text-purple-500" /> פרגמנטציה (Fragmentation)</li>
                    </ul>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600">
                        <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">פרוטוקולים</h3>
                    <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">IPv4</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">IPv6</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">ICMP</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">OSPF</span>
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">BGP</span>
                    </div>
                </motion.div>
            </div>

            {/* Packet Journey Demo */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Play className="w-5 h-5 text-blue-500" /> מסע החבילה
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">לחצו על הכפתור כדי לראות איך חבילה עוברת דרך נתבים ברשת.</p>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-inner p-4 mb-4 overflow-hidden">
                    <canvas ref={packetCanvasRef} className="w-full h-[200px]" />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={startJourney}
                        disabled={isAnimating}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnimating ? 'שולח...' : 'שלח חבילה'}
                        <Play className="w-4 h-4 fill-current" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Layer3Intro;
