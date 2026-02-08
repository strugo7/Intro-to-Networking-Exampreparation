import React, { useEffect, useRef } from 'react';

interface CopperCableCanvasProps {
    type: 'utp' | 'stp' | 'coaxial';
}

const CopperCableCanvas: React.FC<CopperCableCanvasProps> = ({ type }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);

            if (type === 'utp') {
                // Draw UTP cross-section
                ctx.fillStyle = '#94a3b8';
                ctx.font = '13px Heebo';
                ctx.textAlign = 'center';
                ctx.fillText('חתך רוחב — UTP', cx, 25);

                // Outer jacket
                ctx.beginPath();
                ctx.arc(cx, cy, 130, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
                ctx.fill();
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.fillStyle = '#666';
                ctx.font = '11px Heebo';
                ctx.fillText('Jacket (מעטפת)', cx, cy - 140);

                // 4 twisted pairs
                const pairs = [
                    { x: -45, y: -45, color1: '#3498db', color2: '#fff', label: 'כחול' },
                    { x: 45, y: -45, color1: '#e67e22', color2: '#fff', label: 'כתום' },
                    { x: -45, y: 45, color1: '#2ecc71', color2: '#fff', label: 'ירוק' },
                    { x: 45, y: 45, color1: '#8B4513', color2: '#fff', label: 'חום' }
                ];

                pairs.forEach(pair => {
                    const px = cx + pair.x;
                    const py = cy + pair.y;

                    // Twist visualization
                    ctx.beginPath();
                    ctx.arc(px - 12, py, 14, 0, Math.PI * 2);
                    ctx.fillStyle = pair.color1 + '40';
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(px - 12, py, 10, 0, Math.PI * 2);
                    ctx.fillStyle = pair.color1;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(px + 12, py, 14, 0, Math.PI * 2);
                    ctx.fillStyle = pair.color1 + '40';
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(px + 12, py, 10, 0, Math.PI * 2);
                    ctx.fillStyle = pair.color2;
                    ctx.strokeStyle = pair.color1;
                    ctx.lineWidth = 2;
                    ctx.fill();
                    ctx.stroke();
                });

                // Separator (UTP often has a plastic spline)
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(cx, cy - 90); ctx.lineTo(cx, cy + 90);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx - 90, cy); ctx.lineTo(cx + 90, cy);
                ctx.stroke();
                ctx.setLineDash([]);


            } else if (type === 'stp') {
                ctx.fillStyle = '#94a3b8';
                ctx.font = '13px Heebo';
                ctx.textAlign = 'center';
                ctx.fillText('חתך רוחב — STP', cx, 25);

                // Outer jacket
                ctx.beginPath();
                ctx.arc(cx, cy, 140, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
                ctx.fill();
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 3;
                ctx.stroke();

                // Overall shield
                ctx.beginPath();
                ctx.arc(cx, cy, 125, 0, Math.PI * 2);
                ctx.strokeStyle = '#c0c0c0';
                ctx.lineWidth = 4;
                ctx.setLineDash([6, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = '#c0c0c0';
                ctx.font = '10px Heebo';
                ctx.fillText('הגנה כללית (Overall Shield)', cx, cy - 133);

                // Individual shields + pairs
                const pairs = [
                    { x: -42, y: -42, color: '#3498db' },
                    { x: 42, y: -42, color: '#e67e22' },
                    { x: -42, y: 42, color: '#2ecc71' },
                    { x: 42, y: 42, color: '#8B4513' }
                ];

                pairs.forEach(pair => {
                    const px = cx + pair.x;
                    const py = cy + pair.y;

                    // Individual foil shield
                    ctx.beginPath();
                    ctx.arc(px, py, 35, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(192, 192, 192, 0.1)';
                    ctx.fill();
                    ctx.strokeStyle = '#c0c0c0';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 2]);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Wires
                    ctx.beginPath();
                    ctx.arc(px - 10, py, 9, 0, Math.PI * 2);
                    ctx.fillStyle = pair.color;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(px + 10, py, 9, 0, Math.PI * 2);
                    ctx.fillStyle = '#fff';
                    ctx.fill();
                    ctx.strokeStyle = pair.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });

                ctx.fillStyle = '#9b59b6';
                ctx.font = '10px Heebo';
                ctx.fillText('🛡️ הגנה פרטנית לכל זוג', cx, cy + 95);

            } else if (type === 'coaxial') {
                ctx.fillStyle = '#94a3b8';
                ctx.font = '13px Heebo';
                ctx.textAlign = 'center';
                ctx.fillText('חתך רוחב — Coaxial', cx, 25);

                const layers = [
                    { r: 130, color: '#333', label: 'Outer Jacket', labelColor: '#666' },
                    { r: 110, color: '#c0c0c0', label: 'Braided Shield', labelColor: '#c0c0c0' },
                    { r: 90, color: '#444', label: 'Insulator', labelColor: '#888' },
                    { r: 40, color: '#cd7f32', label: 'Conductor (מוליך)', labelColor: '#cd7f32' }
                ];

                layers.forEach((layer, i) => {
                    ctx.beginPath();
                    ctx.arc(cx, cy, layer.r, 0, Math.PI * 2);
                    ctx.fillStyle = layer.color + (i === 1 ? '40' : '30'); // Opacity 
                    ctx.fill();
                    ctx.strokeStyle = layer.color;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Label line
                    const angle = -Math.PI / 4 + i * (Math.PI / 6);
                    const lx = cx + Math.cos(angle) * (layer.r + 20);
                    const ly = cy + Math.sin(angle) * (layer.r + 20);

                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(angle) * layer.r, cy + Math.sin(angle) * layer.r);
                    ctx.lineTo(lx, ly);
                    ctx.lineTo(lx + (lx > cx ? 30 : -30), ly);
                    ctx.strokeStyle = layer.labelColor + '80';
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.fillStyle = layer.labelColor;
                    ctx.font = '10px Heebo';
                    ctx.textAlign = lx > cx ? 'left' : 'right';
                    ctx.fillText(layer.label, lx + (lx > cx ? 35 : -35), ly + 4);
                });

                // Braided pattern
                ctx.strokeStyle = '#c0c0c060';
                ctx.lineWidth = 1;
                for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
                    ctx.beginPath();
                    ctx.arc(cx + Math.cos(a) * 100, cy + Math.sin(a) * 100, 3, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Center conductor glow
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
                glow.addColorStop(0, 'rgba(205, 127, 50, 0.5)');
                glow.addColorStop(1, 'rgba(205, 127, 50, 0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(cx, cy, 40, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        draw();
    }, [type]);

    return (
        <canvas ref={canvasRef} width={400} height={350} className="w-full h-[350px] mx-auto block" />
    );
};

export default CopperCableCanvas;
