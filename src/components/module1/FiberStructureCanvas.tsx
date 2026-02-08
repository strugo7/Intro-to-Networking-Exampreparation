import React, { useEffect, useRef, useState } from 'react';

interface Part {
    name: string;
    desc: string;
    color: string;
    y: number;
    r: number;
}

const FiberStructureCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{ x: number, y: number, content: { name: string, desc: string } } | null>(null);
    const [hoveredPart, setHoveredPart] = useState<Part | null>(null);

    const parts: Part[] = [
        { name: 'Core (ליבה)', desc: 'ליבת זכוכית דקיקה שדרכה עובר האור. קוטר: 8-62.5 מיקרומטר', color: '#1abc9c', y: 0.5, r: 0.08 },
        { name: 'Cladding (מעטפת)', desc: 'שכבת זכוכית עם מקדם שבירה נמוך יותר — גורמת לאור להיחזר פנימה', color: '#3498db', y: 0.5, r: 0.16 },
        { name: 'Buffer (חיץ)', desc: 'שכבת הגנה מפלסטיק. מגנה על הסיב ממים ופגיעות פיזיות', color: '#9b59b6', y: 0.5, r: 0.24 },
        { name: 'Jacket (מעטה חיצוני)', desc: 'השכבה החיצונית — בד״כ PVC. מגנה מפני סביבה חיצונית ופגיעות מכניות', color: '#e67e22', y: 0.5, r: 0.32 }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = 400; // Fixed height for consistency
            draw();
        };

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2 - 40; // Shift up slightly to fit side view

            ctx.clearRect(0, 0, w, h);

            // Title
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('חתך רוחב של סיב אופטי (העבירו עכבר)', cx, 25);

            // Draw from outside in
            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                const r = part.r * w; // Scale radius relative to width
                // Cap radius max size
                const maxR = Math.min(w, h) * 0.35;
                const actualR = Math.min(r, i === 3 ? maxR : maxR * (part.r / parts[3].r));

                const isHovered = hoveredPart === part;

                ctx.beginPath();
                ctx.arc(cx, cy, actualR, 0, Math.PI * 2);
                ctx.fillStyle = part.color + (isHovered ? '60' : '30'); // Hex + alpha
                ctx.fill();
                ctx.strokeStyle = part.color + (isHovered ? 'ff' : '80');
                ctx.lineWidth = isHovered ? 3 : 1;
                ctx.stroke();

                // Label (only closest 2 rings or all if huge screen? Keeping clean for now)
                if (isHovered) {
                    // Maybe highlight label in tooltip instead
                }
            }

            // Center glow (core center)
            const corePart = parts[0];
            const maxR = Math.min(w, h) * 0.35;
            const coreR = Math.min(corePart.r * w, maxR * (corePart.r / parts[3].r));

            const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
            glow.addColorStop(0, 'rgba(26, 188, 156, 0.4)');
            glow.addColorStop(1, 'rgba(26, 188, 156, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
            ctx.fill();


            // Draw side view at bottom
            const sideY = h - 70;
            const sideH = 40;
            const sideW = Math.min(w * 0.7, 400);
            const startX = (w - sideW) / 2;

            ctx.fillStyle = '#94a3b8';
            ctx.font = '12px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('מבט צד', cx, sideY - 12);

            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                const layerH = sideH * (part.r / 0.32);
                const yOff = (sideH - layerH) / 2;
                const isHovered = hoveredPart === part;

                ctx.fillStyle = part.color + (isHovered ? '90' : '40');
                ctx.strokeStyle = part.color + (isHovered ? 'ff' : '80');
                ctx.lineWidth = 1;

                // Round rect simulation
                ctx.beginPath();
                ctx.roundRect(startX, sideY + yOff, sideW, layerH, 4);
                ctx.fill();
                ctx.stroke();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // Scaling for high DPI or CSS sizing differences
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;

            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2 - 40;

            // Re-calc maxR used in draw
            const maxR = Math.min(w, h) * 0.35;

            const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

            let hovered: Part | null = null;
            // Check concentric circles from outside in
            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                const actualR = Math.min(part.r * w, i === 3 ? maxR : maxR * (part.r / parts[3].r));

                if (dist < actualR) {
                    hovered = part;
                    // Dont break immediately? inner circles are on top of outer ones.
                    // Actually we want the innermost match.
                }
            }

            // Should be smallest match. The logical loop should check form smallest to largest or handle overlap.
            // Original code checked from largest to smallest and broke on first match:
            // "for (let i = this.parts.length - 1; i >= 0; i--) { if (dist < r) { hovered = part; break; } }" 
            // Wait, if I check Outer (Largest) first, and dist < OuterRadius, it satisfies. I break. 
            // Then I never check Inner. 
            // The original code logic was:
            // Loop from outer (3) to inner (0).
            // If dist < r_outer, it's inside outer.
            // But if it's also inside inner, we want inner.
            // So we should search from INNER (0) to OUTER (3)? 
            // Or just search all and keep the one with smallest radius that contains point.

            // Let's re-read original:
            // for (let i = this.parts.length - 1; i >= 0; i--) ... if (dist < r) { hovered = part; break; }
            // This means it prioritized OUTERMOST. If I am in Core, I am in Jacket. 
            // If dist < r_jacket (True), hovered = Jacket, break.
            // THIS LOGIC IN ORIGINAL SEEMS WRONG or I am misreading.
            // Let's check lines 400-405 of animations.js again.
            // 400: for (let i = this.parts.length - 1; i >= 0; i--)
            // 401: if (dist < this.parts[i].r * this.canvas.width)
            // 402: hovered = this.parts[i];
            // 403: break;
            // The parts array is [Core, Cladding, Buffer, Jacket].
            // i=3 is Jacket (Largest).
            // If I am at center (dist=0). 0 < Jacket.r -> True. Hovered = Jacket. Break.
            // So the original code highlighted layout INCORRECTLY? Or maybe parts was ordered differently?
            // parts = [Core, Cladding, Buffer, Jacket].
            // Yes.

            // I will FIX this logic to behave correctly: Check from smallest (0) to largest (3) and stop at first match?
            // No, check from smallest (0) to largest (3). If in 0, it's 0.
            // Loop i = 0 to 3. If dist < r[i] -> hovered = parts[i]; break;

            hovered = null;
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const actualR = Math.min(part.r * w, i === 3 ? maxR : maxR * (part.r / parts[3].r));
                if (dist < actualR) {
                    hovered = part;
                    break; // Found the smallest circle containing the point
                }
            }

            if (hovered !== hoveredPart) {
                setHoveredPart(hovered);
            }

            // Tooltip position
            if (hovered) {
                setTooltip({
                    x: e.clientX,
                    y: e.clientY,
                    content: { name: hovered.name, desc: hovered.desc }
                });
            } else {
                setTooltip(null);
            }
        };

        const handleMouseLeave = () => {
            setHoveredPart(null);
            setTooltip(null);
        };

        window.addEventListener('resize', resize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Initial draw
        resize();

        // Animation loop for smooth transitions if needed, but static draw on event is efficient enough
        // We need to re-draw when hover changes.
        // The draw() function uses hoveredPart state, but inside useEffect it's stale.
        // We should move draw() out or add it to dependencies?
        // Better: use requestAnimationFrame loop that reads a ref for hoveredPart.
    }, []); // Empty deps, but we have a problem with state updates.

    // Solution: Use Ref for hoveredPart to draw, but State to trigger re-renders of Tooltip
    // Actually, simple way: Put draw in useEffect [hoveredPart]

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // We need to duplicate the draw logic or extract it?
        // Let's rewrite the effect to depend on hoveredPart.
        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2 - 40;

            ctx.clearRect(0, 0, w, h);

            // Title
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('חתך רוחב של סיב אופטי (העבירו עכבר)', cx, 25);

            // Draw from outside in
            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                const r = part.r * w;
                const maxR = Math.min(w, h) * 0.35;
                const actualR = Math.min(r, i === 3 ? maxR : maxR * (part.r / parts[3].r));

                const isHovered = hoveredPart === part;

                ctx.beginPath();
                ctx.arc(cx, cy, actualR, 0, Math.PI * 2);
                ctx.fillStyle = part.color + (isHovered ? '60' : '30');
                ctx.fill();
                ctx.strokeStyle = part.color + (isHovered ? 'ff' : '80');
                ctx.lineWidth = isHovered ? 3 : 1;
                ctx.stroke();
            }

            // Center glow (core center)
            const corePart = parts[0];
            const maxR = Math.min(w, h) * 0.35;
            const coreR = Math.min(corePart.r * w, maxR * (corePart.r / parts[3].r));
            const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
            glow.addColorStop(0, 'rgba(26, 188, 156, 0.4)');
            glow.addColorStop(1, 'rgba(26, 188, 156, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
            ctx.fill();

            // Side view
            const sideY = h - 70;
            const sideH = 40;
            const sideW = Math.min(w * 0.7, 400);
            const startX = (w - sideW) / 2;

            ctx.fillStyle = '#94a3b8';
            ctx.font = '12px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('מבט צד', cx, sideY - 12);

            for (let i = parts.length - 1; i >= 0; i--) {
                const part = parts[i];
                const layerH = sideH * (part.r / 0.32);
                const yOff = (sideH - layerH) / 2;
                const isHovered = hoveredPart === part;

                ctx.fillStyle = part.color + (isHovered ? '90' : '40');
                ctx.strokeStyle = part.color + (isHovered ? 'ff' : '80');
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(startX, sideY + yOff, sideW, layerH, 4);
                ctx.fill();
                ctx.stroke();
            }
        }
        draw();
    }, [hoveredPart]);


    return (
        <div ref={containerRef} className="relative w-full bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-crosshair">
            <canvas ref={canvasRef} className="w-full h-[400px] block" />

            {tooltip && (
                <div
                    className="fixed z-50 bg-slate-900/90 text-white p-4 rounded-lg shadow-xl pointer-events-none backdrop-blur-sm border border-slate-700 max-w-xs"
                    style={{
                        left: tooltip.x + 20,
                        top: tooltip.y - 20,
                        transform: 'translate(0, 0)'
                    }}
                >
                    <h4 className="font-bold text-lg mb-1" style={{ color: hoveredPart?.color }}>{tooltip.content.name}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{tooltip.content.desc}</p>
                </div>
            )}
        </div>
    );
};

export default FiberStructureCanvas;
