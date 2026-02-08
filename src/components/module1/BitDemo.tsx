import React, { useState, useEffect, useRef } from 'react';
import { Laptop, Server, Activity, Power } from 'lucide-react';
import { motion } from 'framer-motion';

const BitDemo: React.FC = () => {
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [bits, setBits] = useState<string>("01001000");
    const streamCanvasRef = useRef<HTMLCanvasElement>(null);
    const waveCanvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);

    // Generate random bits
    const generateBits = () => {
        return Array.from({ length: 8 }, () => Math.round(Math.random())).join('');
    };

    const startTransmission = () => {
        if (isTransmitting) return;
        setIsTransmitting(true);
        const newBits = generateBits();
        setBits(newBits);

        // Reset animation logic
        setTimeout(() => {
            setIsTransmitting(false);
        }, 4000); // Longer duration for full wave view
    };

    // Canvas 1: The Particle Stream (Physical Thread)
    useEffect(() => {
        const canvas = streamCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: { x: number, val: string, color: string }[] = [];
        let frame = 0;
        let animationId: number;

        const animate = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            // Draw transmission line (Fiber/Copper style)
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.strokeStyle = '#334155'; // slate-700
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Glow effect for the line
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#3b82f6';
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Spawn particles
            if (isTransmitting && frame % 40 === 0 && particles.length < bits.length) {
                const bitVal = bits[particles.length];
                particles.push({
                    x: 0,
                    val: bitVal,
                    color: bitVal === '1' ? '#3b82f6' : '#ef4444' // Blue for 1, Red for 0
                });
            }

            // Update & Draw Particles
            particles.forEach(p => {
                p.x += 3;

                // Draw Particle Body
                ctx.beginPath();
                ctx.arc(p.x, height / 2, 12, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw Text
                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.val, p.x, height / 2);
            });

            // Cleanup
            particles = particles.filter(p => p.x < width + 20);

            if (isTransmitting || particles.length > 0) {
                animationId = requestAnimationFrame(animate);
            }
            frame++;
        };

        if (isTransmitting) {
            animate();
        } else {
            // Static clear
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        return () => cancelAnimationFrame(animationId);
    }, [isTransmitting, bits]);


    // Canvas 2: The Oscilloscope (Voltage Waveform)
    useEffect(() => {
        const canvas = waveCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let xOffset = 0;
        let animationId: number;

        const drawGrid = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.strokeStyle = '#1e293b'; // slate-800
            ctx.lineWidth = 1;

            ctx.beginPath();
            for (let x = 0; x < w; x += 20) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
            for (let y = 0; y < h; y += 20) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
            ctx.stroke();
        };

        const drawWave = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            drawGrid();

            if (!isTransmitting) {
                // Flat line at 0V
                ctx.beginPath();
                ctx.moveTo(0, h - 20);
                ctx.lineTo(w, h - 20);
                ctx.strokeStyle = '#22c55e'; // Green signal
                ctx.lineWidth = 2;
                ctx.stroke();
                return;
            }

            ctx.beginPath();
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#22c55e';

            const step = 60; // Width of one bit
            let currentX = -xOffset;
            const baseline = h - 20;
            const topline = 20;

            // Draw initial segment
            ctx.moveTo(currentX, baseline);

            for (let i = 0; i < bits.length; i++) {
                const bit = bits[i];
                const y = bit === '1' ? topline : baseline;

                // Vertical edge (Instant transition for ideal square wave)
                ctx.lineTo(currentX, y);

                // Horizontal hold
                ctx.lineTo(currentX + step, y);

                currentX += step;
            }

            ctx.stroke();
            ctx.shadowBlur = 0;

            if (isTransmitting) {
                xOffset += 2; // Scroll speed
                // Loop or stop
                if (xOffset > bits.length * 60 + w) {
                    // End
                }
                animationId = requestAnimationFrame(drawWave);
            }
        };

        if (isTransmitting) {
            xOffset = -canvas.width + 50; // Start from right
            drawWave();
        } else {
            drawGrid();
            // Flat line
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - 20);
            ctx.lineTo(canvas.width, canvas.height - 20);
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        return () => cancelAnimationFrame(animationId);
    }, [isTransmitting, bits]);

    return (
        <div className="bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-700 my-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="text-blue-500" />
                הדמיה פיזית: ביטים ואותות חשמליים
            </h2>

            {/* Container for both charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. Stream View */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                        <Server size={16} /> העברת נתונים (Data Stream)
                    </h3>
                    <div className="relative h-32 w-full flex items-center justify-center bg-slate-900/50 rounded-lg overflow-hidden">
                        <canvas ref={streamCanvasRef} width={400} height={120} className="w-full h-full" />
                        <div className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">CHANNEL: FIBER/COPPER</div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-slate-500 font-mono">
                        <span>TX: {isTransmitting ? 'ACTIVE' : 'IDLE'}</span>
                        <span>SPEED: 10 MBPS</span>
                    </div>
                </div>

                {/* 2. Oscilloscope View */}
                <div className="bg-black p-4 rounded-xl border border-slate-700 shadow-inner">
                    <h3 className="text-green-500 text-sm mb-3 flex items-center gap-2 font-mono">
                        <Power size={16} /> אוסילוסקופ (Voltage)
                    </h3>
                    <div className="relative h-32 w-full bg-[#0a0a0a] rounded-lg border border-slate-800 overflow-hidden relative">
                        {/* Grid Pattern CSS fallback handled by canvas drawGrid */}
                        <canvas ref={waveCanvasRef} width={400} height={120} className="w-full h-full block" />
                        <div className="absolute top-2 right-2 text-green-500/50 text-[10px] font-mono">5V Scale</div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-green-600/70 font-mono">
                        <span>SIGNAL: DIGITAL</span>
                        <span>NRZ ENCODING</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg border border-slate-600">
                    <span className="text-slate-400 text-xs uppercase ml-2 px-2">Data:</span>
                    <div className="flex gap-1">
                        {bits.split('').map((bit, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`w-8 h-8 flex items-center justify-center rounded font-mono font-bold ${bit === '1' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                                    }`}
                            >
                                {bit}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={startTransmission}
                    disabled={isTransmitting}
                    className="relative overflow-hidden group px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {isTransmitting ? 'משדר נתונים...' : 'שלח אות חשמלי'}
                        <Activity className={`w-4 h-4 ${isTransmitting ? 'animate-pulse' : ''}`} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
    );
};

export default BitDemo;
