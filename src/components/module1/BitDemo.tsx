import React, { useState, useEffect, useRef } from 'react';
import { Laptop, Server } from './Module1Icons';
import { ArrowRight } from 'lucide-react';

const BitDemo: React.FC = () => {
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [bits, setBits] = useState<string>("01001000");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);

    // Generate random bits
    const generateBits = () => {
        return Array.from({ length: 8 }, () => Math.round(Math.random())).join('');
    };

    const startTransmission = () => {
        if (isTransmitting) return;
        setIsTransmitting(true);
        setBits(generateBits());

        // Animation logic would go here or triggered via CSS/Canvas
        // For simplicity in React, we can use CSS animations or simple canvas drawing

        setTimeout(() => {
            setIsTransmitting(false);
        }, 2000);
    };

    // Canvas animation for the "stream"
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: { x: number, val: string }[] = [];
        let frame = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw transmission line
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.strokeStyle = '#334155'; // slate-700
            ctx.lineWidth = 2;
            ctx.stroke();

            // Spawn particles if transmitting
            if (isTransmitting && frame % 10 === 0 && particles.length < 8) {
                // Logic to spawn bits based on the 'bits' string state
                // This is a simplified visualizer
                const bitVal = bits[particles.length] || '0';
                particles.push({ x: 10, val: bitVal });
            }

            // Move and draw particles
            particles.forEach((p, i) => {
                p.x += 5;
                ctx.fillStyle = p.val === '1' ? '#3b82f6' : '#94a3b8'; // blue or slate
                ctx.beginPath();
                ctx.arc(p.x, canvas.height / 2, 6, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = 'white';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.val, p.x, canvas.height / 2);
            });

            // Clean up
            particles = particles.filter(p => p.x < canvas.width);

            if (isTransmitting || particles.length > 0) {
                animationRef.current = requestAnimationFrame(animate);
            }
            frame++;
        };

        if (isTransmitting) {
            animate();
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isTransmitting, bits]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-800 my-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-blue-500">▶</span> הדגמה: העברת ביטים
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                לחצו על "שלח" כדי לראות איך ביטים עוברים דרך אמצעי פיזי
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50 dark:bg-slate-950/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                <div className="flex flex-col items-center gap-2">
                    <div className={`p-4 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-all ${isTransmitting ? 'scale-110 shadow-lg shadow-blue-500/20' : ''}`}>
                        <Laptop size={32} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">שולח</span>
                </div>

                <div className="flex-1 w-full h-24 relative flex items-center justify-center bg-slate-200/50 dark:bg-slate-800/50 rounded-lg overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={96}
                        className="w-full h-full"
                    />
                    {!isTransmitting && <div className="absolute text-xs text-slate-400">הערוץ פנוי</div>}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className={`p-4 rounded-full bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-400 transition-all ${isTransmitting ? 'animate-pulse' : ''}`}>
                        <Server size={32} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">מקבל</span>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
                <button
                    onClick={startTransmission}
                    disabled={isTransmitting}
                    className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <span>שלח ביטים</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="font-mono bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 text-xs uppercase mr-2">Binary:</span>
                    <span className="tracking-widest font-bold">{bits}</span>
                </div>
            </div>
        </div>
    );
};

export default BitDemo;
