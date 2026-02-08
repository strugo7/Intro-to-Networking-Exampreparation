import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const WiFiSignalCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [stats, setStats] = useState({ distance: 0, rssi: -30, speed: 1200, quality: 'מצוין' });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let frame = 0;
        let deviceX = 200;
        let dragging = false;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = 300;
            // Reset device position on resize if out of bounds?
            deviceX = Math.min(deviceX, canvas.width - 40);
        };

        const updateStats = () => {
            const maxDist = canvas.width - 160;
            const dist = deviceX - 80;
            const distMeters = Math.round((dist / maxDist) * 50);
            const strength = Math.max(-90, -30 - (dist / maxDist) * 60);
            const speed = Math.max(10, Math.round(1200 * (1 - (dist / maxDist) * 0.95)));

            let quality = 'מצוין 🚀';
            if (strength < -50) quality = 'טוב 👍';
            if (strength < -65) quality = 'בינוני ⚠️';
            if (strength < -75) quality = 'חלש ❌';
            if (strength < -85) quality = 'אין קליטה 🚫';

            setStats({ distance: distMeters, rssi: Math.round(strength), speed, quality });
        };

        const animate = () => {
            const w = canvas.width;
            const h = canvas.height;
            const routerX = 80;
            const routerY = h / 2;

            ctx.clearRect(0, 0, w, h);

            // Distance line
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(routerX, routerY + 50);
            ctx.lineTo(w - 40, routerY + 50);
            ctx.stroke();
            ctx.setLineDash([]);

            // Signal strength gradient
            const dist = deviceX - routerX;
            const maxDist = w - 120;
            const signalRatio = Math.max(0, 1 - (dist / maxDist)); // Ensure non-negative

            const grad = ctx.createLinearGradient(routerX, 0, w - 40, 0);
            grad.addColorStop(0, 'rgba(46, 204, 113, 0.15)');
            grad.addColorStop(0.5, 'rgba(241, 196, 15, 0.1)');
            grad.addColorStop(1, 'rgba(231, 76, 60, 0.05)');
            ctx.fillStyle = grad;
            ctx.fillRect(routerX, routerY - 60, maxDist, 120);

            // Waves from router
            for (let i = 0; i < 6; i++) {
                const progress = ((frame * 2 + i * 30) % 180) / 180;
                const radius = progress * maxDist;
                const alpha = (1 - progress) * 0.3 * signalRatio;

                ctx.beginPath();
                ctx.arc(routerX, routerY, radius, -0.3, 0.3);
                ctx.strokeStyle = `rgba(52, 152, 219, ${alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Walls/obstacles
            const walls = [
                { x: w * 0.4, label: 'קיר 1' },
                { x: w * 0.65, label: 'קיר 2' }
            ];
            walls.forEach(wall => {
                ctx.fillStyle = 'rgba(255,255,255,0.03)';
                ctx.fillRect(wall.x, routerY - 70, 8, 140);
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 1;
                ctx.strokeRect(wall.x, routerY - 70, 8, 140);
                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px Heebo';
                ctx.textAlign = 'center';
                ctx.fillText(wall.label, wall.x + 4, routerY - 78);
            });

            // Router Icon
            ctx.beginPath();
            ctx.arc(routerX, routerY, 20, 0, Math.PI * 2);
            ctx.fillStyle = '#1e293b'; // slate-800
            ctx.fill();
            ctx.strokeStyle = '#3b82f6'; // blue-500
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#3b82f6';
            ctx.font = '16px serif';
            ctx.textAlign = 'center';
            ctx.fillText('📡', routerX, routerY + 6);
            ctx.font = '10px Heebo';
            ctx.fillText('נתב', routerX, routerY + 36);

            // Device Icon (Draggable)
            const signalColor = signalRatio > 0.6 ? '#2ecc71' : signalRatio > 0.3 ? '#f39c12' : '#e74c3c';
            ctx.beginPath();
            // Pulse on drag
            if (dragging) {
                ctx.arc(deviceX, routerY, 25, 0, Math.PI * 2);
                ctx.fillStyle = signalColor + '20';
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(deviceX, routerY, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#1e293b';
            ctx.fill();
            ctx.strokeStyle = signalColor;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.font = '18px serif';
            ctx.fillStyle = '#fff';
            ctx.fillText('💻', deviceX, routerY + 6);
            ctx.fillStyle = signalColor;
            ctx.font = 'bold 10px Heebo';
            ctx.fillText(dragging ? 'זז...' : 'גרור אותי!', deviceX, routerY + 40);

            // Signal bars on device
            const bars = Math.max(0, Math.ceil(signalRatio * 4));
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = i < bars ? signalColor : 'rgba(255,255,255,0.1)';
                ctx.fillRect(deviceX + 15 + i * 6, routerY - 15 - i * 4, 4, 8 + i * 4);
            }

            frame++;
            animationFrameId = requestAnimationFrame(animate);
        };

        // Interaction Handlers
        const updateDevicePos = (clientX: number) => {
            const rect = canvas.getBoundingClientRect();
            // Scaling
            const scaleX = canvas.width / rect.width;

            const mx = (clientX - rect.left) * scaleX;
            // Clamp
            deviceX = Math.max(120, Math.min(canvas.width - 40, mx));
            updateStats();
        };

        const handleMouseDown = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

            const mx = (clientX - rect.left) * scaleX;
            const my = (clientY - rect.top) * scaleY;

            // Check hit on device (centered vertically)
            const dy = canvas.height / 2;

            if (Math.abs(mx - deviceX) < 40 && Math.abs(my - dy) < 40) {
                dragging = true;
                if ('preventDefault' in e) e.preventDefault(); // Prevent scroll on touch
            }
        };

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!dragging) return;
            // Prevent scroll on touch drag
            if ('preventDefault' in e && e.cancelable) e.preventDefault();

            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            updateDevicePos(clientX);
        };

        const handleMouseUp = () => dragging = false;


        window.addEventListener('resize', resize);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);

        canvas.addEventListener('touchstart', handleMouseDown, { passive: false });
        canvas.addEventListener('touchmove', handleMouseMove, { passive: false });
        canvas.addEventListener('touchend', handleMouseUp);

        resize();
        updateStats(); // Init stats
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            // ... remove others
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="space-y-6">
            <div ref={containerRef} className="relative w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                <canvas
                    ref={canvasRef}
                    className="w-full h-[300px] block cursor-grab active:cursor-grabbing touch-none"
                    title="Drag the device to calculate signal"
                />
            </div>

            {/* Live Stats Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">מרחק</div>
                    <div className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white" id="wifi-distance">{stats.distance}m</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">עוצמה (RSSI)</div>
                    <div className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white" id="wifi-strength">{stats.rssi} dBm</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">מהירות</div>
                    <div className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white" id="wifi-speed">{stats.speed} Mbps</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">איכות</div>
                    <div className="text-xl md:text-2xl font-bold" style={{
                        color: stats.rssi > -65 ? '#2ecc71' : stats.rssi > -75 ? '#f39c12' : '#e74c3c'
                    }}>{stats.quality}</div>
                </div>
            </div>
        </div>
    );
};

export default WiFiSignalCanvas;
