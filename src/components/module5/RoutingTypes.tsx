import React, { useEffect, useRef, useState } from 'react';
import { Route, Search, CheckCircle, XCircle } from 'lucide-react';

const RoutingTypes: React.FC = () => {
    // Canvas Refs for 3 animations
    const directRef = useRef<HTMLCanvasElement>(null);
    const staticRef = useRef<HTMLCanvasElement>(null);
    const dynamicRef = useRef<HTMLCanvasElement>(null);

    // Routing Table State
    const [searchIP, setSearchIP] = useState("");
    const [searchResult, setSearchResult] = useState<{ status: string, message: string } | null>(null);

    const checkRoute = () => {
        if (searchIP.startsWith("192.168.")) {
            setSearchResult({ status: 'success', message: 'Directly Connected (Interface eth0)' });
        } else if (searchIP.startsWith("10.")) {
            setSearchResult({ status: 'warning', message: 'Static Route via 192.168.1.254' });
        } else {
            setSearchResult({ status: 'error', message: 'No route found (Default Gateway)' });
        }
    };

    // Draw Function Helper
    const drawSimpleRoute = (canvas: HTMLCanvasElement, color: string, type: 'direct' | 'static' | 'dynamic') => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const w = canvas.width = canvas.parentElement?.clientWidth || 300;
        const h = canvas.height = 160;

        ctx.clearRect(0, 0, w, h);

        // Routers
        const r1 = { x: 60, y: h / 2 };
        const r2 = { x: w - 60, y: h / 2 };

        // Line
        ctx.beginPath();
        ctx.moveTo(r1.x, r1.y);
        ctx.lineTo(r2.x, r2.y);
        ctx.strokeStyle = '#e2e8f0';
        ctx.setLineDash(type === 'static' ? [5, 5] : []);
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nodes
        [r1, r2].forEach((r, i) => {
            ctx.beginPath();
            ctx.arc(r.x, r.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = '#1e293b';
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '12px sans-serif';
            ctx.fillText(i === 0 ? 'R1' : 'R2', r.x, r.y);
        });

        // Animation packet
        const time = Date.now() / 1000;
        const phase = time % 2; // 2 seconds loop
        const progress = phase < 1 ? phase : 0;

        if (progress > 0) {
            const px = r1.x + (r2.x - r1.x) * progress;
            ctx.beginPath();
            ctx.arc(px, h / 2, 6, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }

        // Label
        ctx.fillStyle = color;
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(type.toUpperCase(), w / 2, h / 2 - 20);
    };

    useEffect(() => {
        let animId: number;
        const animate = () => {
            if (directRef.current) drawSimpleRoute(directRef.current, '#3b82f6', 'direct');
            if (staticRef.current) drawSimpleRoute(staticRef.current, '#f59e0b', 'static');
            if (dynamicRef.current) drawSimpleRoute(dynamicRef.current, '#8b5cf6', 'dynamic');
            animId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="ניתוב ישיר" desc="חיבור פיזי. לא צריך להגדיר כלום." canvasRef={directRef} />
                <Card title="ניתוב סטטי" desc='הגדרה ידנית ע"י מנהל הרשת.' canvasRef={staticRef} />
                <Card title="ניתוב דינמי" desc="הנתב לומד לבד מנתבים אחרים (OSPF/RIP)." canvasRef={dynamicRef} />
            </div>

            {/* Interactive Lookup */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-500" /> סימולטור טבלת ניתוב
                </h3>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="הכנס כתובת IP (למשל: 192.168.1.1)"
                        value={searchIP}
                        onChange={(e) => setSearchIP(e.target.value)}
                        className="flex-1 p-2 border rounded dark:bg-slate-900 dark:border-slate-700"
                    />
                    <button onClick={checkRoute} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">בדוק</button>
                </div>

                {searchResult && (
                    <div className={`p-4 rounded border flex items-center gap-3 ${searchResult.status === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
                        searchResult.status === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-700' :
                            'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        {searchResult.status === 'success' ? <CheckCircle className="w-5 h-5" /> :
                            searchResult.status === 'warning' ? <Route className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        {searchResult.message}
                    </div>
                )}
            </div>
        </div>
    );
};

const Card = ({ title, desc, canvasRef }: any) => (
    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <p className="text-sm text-slate-500 mb-4 h-10">{desc}</p>
        <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-inner overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-[160px]" />
        </div>
    </div>
);

export default RoutingTypes;
