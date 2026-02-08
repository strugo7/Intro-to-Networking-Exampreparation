import React, { useEffect, useRef, useState } from 'react';

const CopperSignalCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [voltage, setVoltage] = useState(5);
    const [freq, setFreq] = useState(3);

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
            // Double for high res
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

            const midY = h / 2;
            const amp = (voltage / 10) * (h * 0.35);

            // Grid background
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            for (let y = 0; y < h; y += 30) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }

            // Center line
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(0, midY);
            ctx.lineTo(w, midY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Voltage labels
            ctx.fillStyle = '#e74c3c';
            ctx.font = '11px IBM Plex Mono';
            ctx.textAlign = 'right';
            ctx.fillText(`+${voltage}V (1)`, w - 10, midY - amp - 5);
            ctx.fillStyle = '#3498db';
            ctx.fillText(`-${voltage}V (0)`, w - 10, midY + amp + 15);
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('0V', w - 10, midY - 5);

            // Digital signal (square wave)
            // Pattern: 1 0 1 1 0 0 1 0 ...
            const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1];
            // bitWidth depends on freq. Higher freq -> smaller width
            // Base width at freq 1 = w / 4?
            const bitWidth = w / (bits.length * (1 / freq) * 0.5);
            const offset = (frame * 2) % bitWidth;

            ctx.beginPath();
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#e74c3c';
            ctx.shadowBlur = 8;
            ctx.lineJoin = 'round';

            let firstPoint = true;
            // Draw enough bits to fill screen + buffer
            const totalBitsToDraw = Math.ceil(w / bitWidth) + 2;

            for (let i = 0; i < totalBitsToDraw; i++) {
                // Loop through bits array
                const bi = i % bits.length;
                const x = i * bitWidth - offset;

                const val = bits[bi];
                const y = val === 1 ? midY - amp : midY + amp;

                if (firstPoint) {
                    ctx.moveTo(x, y);
                    firstPoint = false;
                } else {
                    // Vertical transition from previous
                    const prevBi = (i - 1 + bits.length) % bits.length;
                    const prevVal = bits[prevBi];
                    const prevY = prevVal === 1 ? midY - amp : midY + amp;

                    ctx.lineTo(x, prevY);
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(x + bitWidth, y);

                // Bit label
                ctx.save();
                ctx.shadowBlur = 0;
                ctx.fillStyle = val === 1 ? '#2ecc71' : '#e74c3c';
                ctx.font = 'bold 14px IBM Plex Mono';
                ctx.textAlign = 'center';
                if (x + bitWidth / 2 > 0 && x + bitWidth / 2 < w) {
                    ctx.fillText(val.toString(), x + bitWidth / 2, val === 1 ? midY - amp - 15 : midY + amp + 25);
                }
                ctx.restore();
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

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
    }, [voltage, freq]);

    return (
        <div className="space-y-6">
            <div ref={containerRef} className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                <canvas ref={canvasRef} className="block w-full h-[300px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span>מתח (Voltage)</span>
                        <span id="voltage-val" className="font-mono text-indigo-500">{voltage}V</span>
                    </label>
                    <input
                        type="range"
                        min="1" max="10"
                        value={voltage}
                        onChange={(e) => setVoltage(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>1V</span>
                        <span>10V</span>
                    </div>
                </div>

                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span>תדר (Frequency)</span>
                        <span id="freq-val" className="font-mono text-indigo-500">
                            {['נמוכה מאוד', 'נמוכה', 'בינונית', 'גבוהה', 'גבוהה מאוד'][freq - 1] || 'גבוהה'}
                        </span>
                    </label>
                    <input
                        type="range"
                        min="1" max="5"
                        value={freq}
                        onChange={(e) => setFreq(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Hz</span>
                        <span>MHz</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CopperSignalCanvas;
