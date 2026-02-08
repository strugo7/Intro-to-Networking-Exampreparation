import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Send } from 'lucide-react';

interface MacEntry {
    port: string;
    isNew: boolean;
}

const MacTableCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [macTable, setMacTable] = useState<Record<string, MacEntry>>({});
    const [logs, setLogs] = useState<{ msg: string, type: 'learn' | 'forward' | 'flood' }[]>([]);

    // Constants
    const devices = [
        { label: 'PC 1', mac: 'AA:11:22:33:44:01', port: 'Fa0/1', color: '#3b82f6' },
        { label: 'PC 2', mac: 'BB:22:33:44:55:02', port: 'Fa0/2', color: '#22c55e' },
        { label: 'PC 3', mac: 'CC:33:44:55:66:03', port: 'Fa0/3', color: '#f59e0b' },
        { label: 'PC 4', mac: 'DD:44:55:66:77:04', port: 'Fa0/4', color: '#ef4444' }
    ];

    const addLog = (msg: string, type: 'learn' | 'forward' | 'flood') => {
        setLogs(prev => [{ msg, type }, ...prev].slice(0, 10)); // Keep last 10
    };

    const runSimulation = (mode: 'full' | 'single') => {
        if (isRunning) return;
        setIsRunning(true);

        if (mode === 'full') {
            setMacTable({});
            setLogs([]);
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        const sw = { x: width * 0.5, y: height * 0.45 };
        const devs = [
            { x: width * 0.12, y: height * 0.2 },
            { x: width * 0.88, y: height * 0.2 },
            { x: width * 0.12, y: height * 0.75 },
            { x: width * 0.88, y: height * 0.75 }
        ];

        // Draw Helper
        const drawStatic = (highlights: number[] = []) => {
            ctx.clearRect(0, 0, width, height);

            // Links
            devs.forEach((d, i) => {
                ctx.beginPath();
                ctx.moveTo(sw.x, sw.y);
                ctx.lineTo(d.x, d.y);
                const isHighlighted = highlights.includes(i);
                ctx.strokeStyle = isHighlighted ? devices[i].color + '88' : 'rgba(100,116,139,0.3)';
                ctx.lineWidth = isHighlighted ? 3 : 1.5;
                ctx.stroke();
            });

            // Switch
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, 35, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d418';
            ctx.fill();
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.font = '28px serif';
            ctx.textAlign = 'center';
            ctx.fillText('🔀', sw.x, sw.y + 9);
            ctx.font = '700 11px "Heebo", sans-serif';
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText('Switch', sw.x, sw.y - 42);

            // Port Labels
            ['Fa0/1', 'Fa0/2', 'Fa0/3', 'Fa0/4'].forEach((label, i) => {
                const mx = (sw.x + devs[i].x) / 2;
                const my = (sw.y + devs[i].y) / 2;
                ctx.font = '500 8px "IBM Plex Mono", monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = devices[i].color;
                ctx.fillText(label, mx, my - 6);
            });

            // Devices
            devs.forEach((d, i) => {
                ctx.font = '24px serif';
                ctx.textAlign = 'center';
                ctx.fillText('💻', d.x, d.y + 8);
                ctx.font = '700 12px "Heebo", sans-serif';
                ctx.fillStyle = devices[i].color;
                ctx.fillText(devices[i].label, d.x, d.y - 24);
                ctx.font = '500 9px "IBM Plex Mono", monospace';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(devices[i].mac, d.x, d.y + 30);
            });
        };

        const drawPacket = (x: number, y: number, color: string, label: string) => {
            ctx.save();
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.roundRect(x - 14, y - 8, 28, 16, 4);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
            ctx.font = '700 8px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = label === 'FLD' ? '#000' : '#fff'; // Dark text for yellow flood
            ctx.fillText(label, x, y + 3);
        };

        const scenarios = mode === 'full'
            ? [
                { from: 0, to: 1, desc: 'PC 1 → PC 2' },
                { from: 1, to: 0, desc: 'PC 2 → PC 1' },
                { from: 2, to: 3, desc: 'PC 3 → PC 4' },
                { from: 3, to: 2, desc: 'PC 4 → PC 3' },
                { from: 0, to: 2, desc: 'PC 1 → PC 3' }
            ]
            : (() => {
                const from = Math.floor(Math.random() * 4);
                let to = Math.floor(Math.random() * 4);
                while (to === from) to = Math.floor(Math.random() * 4);
                return [{ from, to, desc: `${devices[from].label} → ${devices[to].label}` }];
            })();

        let scenarioIdx = 0;
        let progress = 0;
        let phase = 'toSwitch'; // toSwitch, fromSwitch

        const animate = () => {
            if (scenarioIdx >= scenarios.length) {
                drawStatic();
                ctx.font = '700 14px "Heebo", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#22c55e';
                ctx.fillText(mode === 'full' ? '✅ הטבלה מלאה! Switch מכיר את כל המכשירים.' : '✅ הסתיים.', width / 2, 20);
                setIsRunning(false);
                return;
            }

            const sc = scenarios[scenarioIdx];
            const fromDev = devices[sc.from];
            const toDev = devices[sc.to];
            const fromPos = devs[sc.from];

            progress += 0.02;

            if (phase === 'toSwitch') {
                drawStatic([sc.from]);
                const p = Math.min(progress, 1);
                const x = fromPos.x + (sw.x - fromPos.x) * p;
                const y = fromPos.y + (sw.y - fromPos.y) * p;
                drawPacket(x, y, fromDev.color, 'FRM');

                ctx.font = '600 12px "Heebo", sans-serif';
                ctx.fillStyle = '#f59e0b';
                ctx.fillText(`📦 ${sc.desc} — Frame מגיע ל-Switch`, width / 2, 20);

                if (progress >= 1) {
                    // Update Table STATE logic here (need to be careful with setState inside loop)
                    // We'll update state at the end of this frame
                    setMacTable(prev => {
                        const newTable = { ...prev };
                        // Mark all old as not new
                        Object.keys(newTable).forEach(k => newTable[k].isNew = false);

                        if (!newTable[fromDev.mac]) {
                            // Only log if new learning
                            addLog(`LEARN: ${fromDev.mac} on ${fromDev.port}`, 'learn');
                        }
                        newTable[fromDev.mac] = { port: fromDev.port, isNew: true };
                        return newTable;
                    });

                    // Check dest
                    // We need to check the CURRENT table state, but inside the loop we might have closure issues.
                    // For simulation visual, we can "peek" at the state we just set mentally.
                    // However, let's use a ref or check the state setter callback? 
                    // Simpler: Just check if we *should* know it based on previous steps in 'full' mode 
                    // or just check the table state passed in?
                    // Actually, let's just peek at MacTable via a "live" variable or assuming linear progression.
                    // BETTER: Determine "known" status at start of phase based on functional update?
                    // Let's cheat slightly: In 'full' mode we know sequence. In 'single' mode we check current state.

                    progress = 0;
                    phase = 'fromSwitch';
                }
            } else {
                // Phase: fromSwitch
                // We need to know if destination is known.
                // Since setState is async, we can't read it immediately.
                // Let's assume we check the table state available at render time + the update we just queued?
                // Actually, let's rely on a helper checking the current macTable state ref if possible, or pass it through.
                // Given the complexity, let's just re-read the state in a `useEffect`? No, animation loop needs it sync.
                // SOLUTION: Use a local variable `localMacTable` initialized from state at start, and updated locally.
                // But `animate` uses closure. 

                // Hack for visual correctness: We will check `macTable` (state) inside the loop. 
                // Since `animate` is re-created or `requestAnimationFrame` keeps closure?
                // Actually, `animate` is defined once. Be careful.
                // To fix closure staleness, use a Ref for table!

                // Let's implement the Ref pattern for table data inside the effect. (See bottom)
            }

            // Wait, I can't easily fix the closure issue without refactoring significantly.
            // Let's use a Mutable Ref for logic state to ensure sync updates.
        };
        // ... (Re-implementing inside useEffect with Refs for robust state access)

        // This was just a scaffold. Let's redirect to the robust implementation below.
    };

    // ----- ROBUST IMPLEMENTATION -----

    // We use a ref to track table state synchronously for the animation logic
    const tableRef = useRef<Record<string, MacEntry>>({});

    useEffect(() => {
        // Sync ref with state when state changes (for restarting etc)
        // But actually, we want the animation to Drive the state.
        // So we won't sync BACK from state to ref automatically here to avoid loops.
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;
            const w = Math.min(rect.width, 600);
            const h = 340;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            // Draw initial static
            if (!isRunning) drawStaticLogic(ctx, w, h, {}, null, [], []);
        };

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [isRunning]); // Re-bind resize if running changes

    // The Animation Effect
    useEffect(() => {
        if (!isRunning) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        const sw = { x: width * 0.5, y: height * 0.45 };
        const devs = [
            { x: width * 0.12, y: height * 0.2 },
            { x: width * 0.88, y: height * 0.2 },
            { x: width * 0.12, y: height * 0.75 },
            { x: width * 0.88, y: height * 0.75 }
        ];

        let mode = Object.keys(tableRef.current).length === 0 ? 'full' : 'single';
        // If we just clicked "Simulation", we cleared table in handler, so it's empty.
        // If we clicked "Single", table might have data.
        // Actually, let's pass mode via a ref or state? 
        // We'll rely on the handler setting the tableRef to empty for Full.

        const scenarios = (Object.keys(tableRef.current).length === 0)
            ? [
                { from: 0, to: 1, desc: 'PC 1 → PC 2' },
                { from: 1, to: 0, desc: 'PC 2 → PC 1' },
                { from: 2, to: 3, desc: 'PC 3 → PC 4' },
                { from: 3, to: 2, desc: 'PC 4 → PC 3' },
                { from: 0, to: 2, desc: 'PC 1 → PC 3' }
            ]
            : (() => {
                const from = Math.floor(Math.random() * 4);
                let to = Math.floor(Math.random() * 4);
                while (to === from) to = Math.floor(Math.random() * 4);
                return [{ from, to, desc: `${devices[from].label} → ${devices[to].label}` }];
            })();

        let scenarioIdx = 0;
        let progress = 0;
        let phase = 'toSwitch';
        let animationFrameId: number;

        const animate = () => {
            if (scenarioIdx >= scenarios.length) {
                drawStaticLogic(ctx, width, height, tableRef.current, null, [], []);
                ctx.font = '700 14px "Heebo", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#22c55e';
                ctx.fillText('✅ סימולציה הסתיימה.', width / 2, 20);
                setIsRunning(false);
                return;
            }

            const sc = scenarios[scenarioIdx];
            const fromDev = devices[sc.from];
            const toDev = devices[sc.to];
            const fromPos = devs[sc.from];

            progress += 0.025;

            if (phase === 'toSwitch') {
                drawStaticLogic(ctx, width, height, tableRef.current, null, [sc.from], []);
                const p = Math.min(progress, 1);
                const x = fromPos.x + (sw.x - fromPos.x) * p;
                const y = fromPos.y + (sw.y - fromPos.y) * p;
                drawPacketLogic(ctx, x, y, fromDev.color, 'FRM');

                ctx.font = '600 12px "Heebo", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#f59e0b';
                ctx.fillText(`📦 ${sc.desc}`, width / 2, 20);

                if (progress >= 1) {
                    // Update Logic
                    const newTable = { ...tableRef.current };
                    Object.keys(newTable).forEach(k => newTable[k].isNew = false);

                    if (!newTable[fromDev.mac]) {
                        addLog(`LEARN: ${fromDev.mac} on ${fromDev.port}`, 'learn');
                    }
                    newTable[fromDev.mac] = { port: fromDev.port, isNew: true };
                    tableRef.current = newTable;
                    setMacTable(newTable); // Sync to UI

                    // Check Forward/Flood
                    const knownDest = newTable[toDev.mac];
                    if (knownDest) {
                        addLog(`FORWARD: → ${toDev.mac} via ${knownDest.port}`, 'forward');
                    } else {
                        addLog(`FLOOD: ${toDev.mac} unknown → Broadcast`, 'flood');
                    }

                    progress = 0;
                    phase = 'fromSwitch';
                }
            } else {
                // fromSwitch
                const knownDest = tableRef.current[toDev.mac];
                const targetIndices = knownDest ? [sc.to] : [0, 1, 2, 3].filter(i => i !== sc.from);

                drawStaticLogic(ctx, width, height, tableRef.current, null, targetIndices, []);

                targetIndices.forEach(idx => {
                    const tp = devs[idx];
                    const x = sw.x + (tp.x - sw.x) * Math.min(progress, 1);
                    const y = sw.y + (tp.y - sw.y) * Math.min(progress, 1);
                    const isFlood = !knownDest;
                    drawPacketLogic(ctx, x, y, isFlood ? '#f59e0b' : '#06b6d4', isFlood ? 'FLD' : 'FRM');
                });

                ctx.font = '600 12px "Heebo", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = knownDest ? '#06b6d4' : '#f59e0b';
                ctx.fillText(knownDest ? `✅ FORWARD — ${toDev.port}` : '📢 FLOOD — נשלח לכל הפורטים!', width / 2, 20);

                if (progress >= 1) {
                    progress = 0;
                    phase = 'toSwitch';
                    scenarioIdx++;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isRunning]);

    // Reusable Drawing Logic (refactored out of effects to be cleaner)
    const drawStaticLogic = (ctx: CanvasRenderingContext2D, W: number, H: number, table: any, overrides: any, highlights: number[], dims: number[]) => {
        const sw = { x: W * 0.5, y: H * 0.45 };
        const devs = [
            { x: W * 0.12, y: H * 0.2 },
            { x: W * 0.88, y: H * 0.2 },
            { x: W * 0.12, y: H * 0.75 },
            { x: W * 0.88, y: H * 0.75 }
        ];

        ctx.clearRect(0, 0, W, H);

        devs.forEach((d, i) => {
            ctx.beginPath();
            ctx.moveTo(sw.x, sw.y);
            ctx.lineTo(d.x, d.y);
            const isHighlighted = highlights.includes(i);
            ctx.strokeStyle = isHighlighted ? devices[i].color + '88' : 'rgba(100,116,139,0.3)';
            ctx.lineWidth = isHighlighted ? 3 : 1.5;
            ctx.stroke();
        });

        // Switch
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, 35, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d418';
        ctx.fill();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔀', sw.x, sw.y + 9);

        // Labels
        ['Fa0/1', 'Fa0/2', 'Fa0/3', 'Fa0/4'].forEach((l, i) => {
            const mx = (sw.x + devs[i].x) / 2;
            const my = (sw.y + devs[i].y) / 2;
            ctx.font = '500 9px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = devices[i].color;
            ctx.fillText(l, mx, my - 8);
        });

        // Devices
        devs.forEach((d, i) => {
            ctx.font = '24px serif';
            ctx.textAlign = 'center';
            ctx.fillText('💻', d.x, d.y + 8);
            ctx.font = '700 12px "Heebo", sans-serif';
            ctx.fillStyle = devices[i].color;
            ctx.fillText(devices[i].label, d.x, d.y - 24);
            ctx.font = '500 9px "IBM Plex Mono", monospace';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(devices[i].mac, d.x, d.y + 30);
        });
    };

    const drawPacketLogic = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, label: string) => {
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(x - 14, y - 8, 28, 16, 4);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
        ctx.font = '700 8px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = (label === 'FLD' || color === '#f59e0b') ? '#000' : '#fff';
        ctx.fillText(label, x, y + 3);
    };

    const handleRunFull = () => {
        tableRef.current = {};
        setMacTable({});
        setLogs([]);
        setIsRunning(true);
    };

    const handleRunSingle = () => {
        // Build on existing table
        setIsRunning(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        setMacTable({});
        tableRef.current = {};
        setLogs([]);

        // Force redraw idle
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            if (ctx) drawStaticLogic(ctx, w, h, {}, null, [], []);
        }
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <RotateCcw size={16} />
                </div>
                סימולטור MAC Address Table
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/50 rounded-xl relative overflow-hidden border border-slate-700/50">
                    <canvas ref={canvasRef} className="w-full h-[340px] block" />

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                        <button
                            onClick={handleRunFull}
                            disabled={isRunning}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
                        >
                            <Play size={16} /> הפעל מלא
                        </button>
                        <button
                            onClick={handleRunSingle}
                            disabled={isRunning}
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600 transition-all"
                        >
                            <Send size={16} /> שלח בודד
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-red-500/20 transition-all"
                        >
                            <RotateCcw size={16} /> אפס
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Log Console */}
                    <div className="bg-black/40 rounded-xl p-3 h-48 overflow-y-auto font-mono text-xs border border-slate-700/50 custom-scrollbar">
                        <div className="sticky top-0 bg-black/40 backdrop-blur-sm pb-2 border-b border-slate-700/50 mb-2 text-slate-400 uppercase tracking-wider text-[10px]">Event Log</div>
                        {logs.length === 0 && <div className="text-slate-600 italic p-2 text-center">Waiting for events...</div>}
                        {logs.map((log, i) => (
                            <div key={i} className={`mb-1.5 px-2 py-1 rounded border-l-2 ${log.type === 'learn' ? 'border-green-500 bg-green-500/10 text-green-300' :
                                    log.type === 'forward' ? 'border-blue-500 bg-blue-500/10 text-blue-300' :
                                        'border-amber-500 bg-amber-500/10 text-amber-300'
                                }`}>
                                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                {log.msg}
                            </div>
                        ))}
                    </div>

                    {/* MAC Table Display */}
                    <div className="bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700/50">
                        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-700/50 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">MAC Address Table</span>
                            <span className="text-[10px] text-slate-500">{Object.keys(macTable).length} Entries</span>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-900/30 text-xs text-slate-500">
                                    <tr>
                                        <th className="px-3 py-2 font-medium">Port</th>
                                        <th className="px-3 py-2 font-medium">MAC Address</th>
                                        <th className="px-3 py-2 font-medium text-right">Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(macTable).length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-3 py-8 text-center text-slate-600 text-xs italic">
                                                Table Empty
                                            </td>
                                        </tr>
                                    ) : (
                                        Object.entries(macTable).map(([mac, entry]) => (
                                            <tr key={mac} className={`border-b border-slate-700/30 ${entry.isNew ? 'bg-green-500/10 animate-pulse' : ''}`}>
                                                <td className="px-3 py-2 font-mono text-blue-300">{entry.port}</td>
                                                <td className="px-3 py-2 font-mono text-slate-300 text-xs">{mac}</td>
                                                <td className="px-3 py-2 text-right text-slate-500 text-xs">0s</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MacTableCanvas;
