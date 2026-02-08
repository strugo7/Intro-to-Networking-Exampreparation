import React, { useEffect, useRef, useState } from 'react';

// ==========================================
// RIP ANIMATION COMPONENT
// ==========================================
export const RipCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let round = 0;
        let frame = 0;

        // Resize
        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width; // 1:1 for simplicity or dpr
            canvas.height = 200;
        };
        resize();

        const routers = [
            { x: 50, y: 50, label: 'R1' },
            { x: 150, y: 50, label: 'R2' },
            { x: 250, y: 50, label: 'R3' },
            { x: 100, y: 150, label: 'R4' },
            { x: 200, y: 150, label: 'R5' }
        ];

        const links = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 1]];
        let updates: any[] = [];

        const spawnUpdate = () => {
            links.forEach(([a, b]) => {
                updates.push({ from: a, to: b, progress: 0, color: '#f59e0b' });
                updates.push({ from: b, to: a, progress: 0, color: '#f59e0b' });
            });
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            // Scale for responsiveness
            const scaleX = canvas.width / 300;
            const scaleY = canvas.height / 200;

            // Draw Links
            links.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(routers[a].x * scaleX, routers[a].y * scaleY);
                ctx.lineTo(routers[b].x * scaleX, routers[b].y * scaleY);
                ctx.strokeStyle = 'rgba(245,158,11,0.2)';
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // Draw Routers
            routers.forEach(r => {
                const x = r.x * scaleX;
                const y = r.y * scaleY;
                ctx.beginPath();
                ctx.arc(x, y, 15, 0, Math.PI * 2);
                ctx.fillStyle = '#1e293b';
                ctx.fill();
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.font = 'bold 10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#f59e0b';
                ctx.fillText(r.label, x, y);
            });

            // Updates
            for (let i = updates.length - 1; i >= 0; i--) {
                const u = updates[i];
                u.progress += 0.015;
                if (u.progress >= 1) { updates.splice(i, 1); continue; }

                const from = routers[u.from];
                const to = routers[u.to];
                const x = (from.x + (to.x - from.x) * u.progress) * scaleX;
                const y = (from.y + (to.y - from.y) * u.progress) * scaleY;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = u.color;
                ctx.fill();
            }

            if (updates.length === 0 && round < 5) {
                if (frame % 100 === 0) {
                    round++;
                    spawnUpdate();
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        spawnUpdate();
        draw();

        return () => cancelAnimationFrame(animationId);
    }, []);

    return <div ref={containerRef} className="w-full h-48 bg-slate-950 rounded-lg overflow-hidden relative"><canvas ref={canvasRef} /></div>;
};

// ==========================================
// OSPF ANIMATION COMPONENT
// ==========================================
export const OspfCanvas: React.FC = () => {
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
        let phase = 0; // 0: areas, 1: flood, 2: path

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = 200;
        };
        resize();

        // Normalized coords 0-300 width, 0-200 height
        const routers = [
            { x: 50, y: 50, label: 'R1', area: 0 },
            { x: 150, y: 30, label: 'R2', area: 0 },
            { x: 250, y: 50, label: 'R3', area: 0 },
            { x: 50, y: 150, label: 'R4', area: 1 },
            { x: 150, y: 170, label: 'R5', area: 1 },
            { x: 250, y: 150, label: 'R6', area: 2 }
        ];

        const links = [
            [0, 1], [1, 2], [0, 3], [3, 4], [2, 5], [1, 4]
        ];

        let lsaPackets: any[] = [];
        let highlightedPath: number[] = [];

        const areaColors = ['rgba(59,130,246,0.1)', 'rgba(245,158,11,0.1)', 'rgba(139,92,246,0.1)'];
        const areaBorders = ['#3b82f6', '#f59e0b', '#8b5cf6'];

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;
            const scaleX = canvas.width / 300;
            const scaleY = canvas.height / 200;

            // Areas
            if (phase >= 0) {
                // Area 0
                ctx.fillStyle = areaColors[0];
                ctx.strokeStyle = areaBorders[0];
                ctx.beginPath();
                ctx.roundRect(30 * scaleX, 10 * scaleY, 240 * scaleX, 70 * scaleY, 10);
                ctx.fill(); ctx.stroke();

                // Area 1
                ctx.fillStyle = areaColors[1];
                ctx.strokeStyle = areaBorders[1];
                ctx.beginPath();
                ctx.roundRect(30 * scaleX, 120 * scaleY, 140 * scaleX, 70 * scaleY, 10);
                ctx.fill(); ctx.stroke();

                // Area 2
                ctx.fillStyle = areaColors[2];
                ctx.strokeStyle = areaBorders[2];
                ctx.beginPath();
                ctx.roundRect(220 * scaleX, 120 * scaleY, 50 * scaleX, 60 * scaleY, 10);
                ctx.fill(); ctx.stroke();
            }

            // Links
            links.forEach(([a, b]) => {
                const isPath = phase === 2 && (
                    (a === 0 && b === 1) || (a === 1 && b === 2) || (a === 2 && b === 5) // R1-R2-R3-R6 path check? no logic just visual
                );

                // Hardcoded shortest path highlight: R1(0) -> R2(1) -> R3(2) -> R6(5) (WAIT looking at links)
                // Links are: 0-1, 1-2, 2-5... yes that works.
                const highlight = phase === 2 && ((a === 0 && b === 1) || (a === 1 && b === 2) || (a === 2 && b === 5));

                ctx.beginPath();
                ctx.moveTo(routers[a].x * scaleX, routers[a].y * scaleY);
                ctx.lineTo(routers[b].x * scaleX, routers[b].y * scaleY);
                ctx.strokeStyle = highlight ? '#22c55e' : 'rgba(100,116,139,0.3)';
                ctx.lineWidth = highlight ? 3 : 1;
                ctx.stroke();
            });

            // Routers
            routers.forEach((r, i) => {
                const x = r.x * scaleX;
                const y = r.y * scaleY;
                const isPathNode = phase === 2 && [0, 1, 2, 5].includes(i);

                ctx.beginPath();
                ctx.arc(x, y, 15, 0, Math.PI * 2);
                ctx.fillStyle = isPathNode ? '#22c55e' : '#1e293b';
                ctx.fill();
                ctx.strokeStyle = areaBorders[r.area];
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = isPathNode ? '#fff' : areaBorders[r.area];
                ctx.fillText(r.label, x, y);
            });

            // LSA Packets
            for (let i = lsaPackets.length - 1; i >= 0; i--) {
                const p = lsaPackets[i];
                p.progress += 0.02;
                if (p.progress >= 1) { lsaPackets.splice(i, 1); continue; }

                const from = routers[p.from];
                const to = routers[p.to];
                const x = (from.x + (to.x - from.x) * p.progress) * scaleX;
                const y = (from.y + (to.y - from.y) * p.progress) * scaleY;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#22c55e';
                ctx.fill();
            }

            // Logic
            if (phase === 0 && frame > 60) {
                phase = 1;
                links.forEach(([a, b]) => {
                    lsaPackets.push({ from: a, to: b, progress: 0 });
                    lsaPackets.push({ from: b, to: a, progress: 0 });
                });
            }
            if (phase === 1 && lsaPackets.length === 0 && frame > 120) {
                phase = 2;
            }
            if (frame > 300) {
                frame = 0;
                phase = 0;
            }

            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return <div ref={containerRef} className="w-full h-48 bg-slate-950 rounded-lg overflow-hidden relative"><canvas ref={canvasRef} /></div>;
};

// ==========================================
// BGP ANIMATION COMPONENT
// ==========================================
export const BgpCanvas: React.FC = () => {
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
        let packets: any[] = [];

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = 200;
        };
        resize();

        const ases = [
            { x: 50, y: 50, label: 'AS100', color: '#3b82f6' },
            { x: 250, y: 50, label: 'AS200', color: '#8b5cf6' },
            { x: 50, y: 150, label: 'AS300', color: '#22c55e' },
            { x: 250, y: 150, label: 'AS400', color: '#f59e0b' },
            { x: 150, y: 100, label: 'AS500', color: '#ef4444' }
        ];

        const peerings = [[0, 4], [1, 4], [2, 4], [3, 4], [0, 2], [1, 3]];

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;
            const scaleX = canvas.width / 300;
            const scaleY = canvas.height / 200;

            // Peerings
            peerings.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(ases[a].x * scaleX, ases[a].y * scaleY);
                ctx.lineTo(ases[b].x * scaleX, ases[b].y * scaleY);
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            // AS Clouds
            ases.forEach(as => {
                const x = as.x * scaleX;
                const y = as.y * scaleY;

                ctx.beginPath();
                ctx.arc(x, y, 25, 0, Math.PI * 2);
                ctx.fillStyle = as.color + '22';
                ctx.fill();
                ctx.strokeStyle = as.color;
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.font = 'bold 10px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = as.color;
                ctx.fillText(as.label, x, y);
            });

            // Packets
            if (frame % 30 === 0 && packets.length < 5) {
                const [a, b] = peerings[Math.floor(Math.random() * peerings.length)];
                packets.push({ from: a, to: b, progress: 0, color: ases[a].color });
            }

            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += 0.01;
                if (p.progress >= 1) { packets.splice(i, 1); continue; }

                const from = ases[p.from];
                const to = ases[p.to];
                const x = (from.x + (to.x - from.x) * p.progress) * scaleX;
                const y = (from.y + (to.y - from.y) * p.progress) * scaleY;

                ctx.beginPath();
                ctx.rect(x - 6, y - 4, 12, 8);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.font = '6px monospace';
                ctx.fillText('BGP', x, y + 2);
            }

            animationId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return <div ref={containerRef} className="w-full h-48 bg-slate-950 rounded-lg overflow-hidden relative"><canvas ref={canvasRef} /></div>;
}
