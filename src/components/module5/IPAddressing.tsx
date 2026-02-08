import React, { useEffect, useRef, useState } from 'react';
import { Network, Database, Globe, Key, AlertTriangle } from 'lucide-react';

const IPAddressing: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // IPv4 Structure Visualizer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Make it responsive
        canvas.width = canvas.parentElement?.clientWidth || 600;
        canvas.height = 200;

        const octets = [192, 168, 1, 100];
        const binaries = octets.map(o => o.toString(2).padStart(8, '0'));
        let currentHover = -1;

        const draw = (hover: number) => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const octetWidth = (w - 80) / 4;
            const startX = 40;
            const centerY = h / 2;

            // Draw total bits label
            ctx.fillStyle = '#64748b';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('32 bits total', w / 2, 30);

            // Draw brace
            ctx.beginPath();
            ctx.moveTo(startX, 40);
            ctx.lineTo(startX, 45);
            ctx.lineTo(startX + (w - 80), 45);
            ctx.lineTo(startX + (w - 80), 40);
            ctx.strokeStyle = '#94a3b8';
            ctx.stroke();

            for (let i = 0; i < 4; i++) {
                const x = startX + i * octetWidth;
                const isHovered = hover === i;
                const isNetwork = i < 3; // Simplified /24 view

                // Box
                ctx.beginPath();
                ctx.roundRect(x + 5, centerY - 30, octetWidth - 10, 60, 8);
                ctx.fillStyle = isHovered
                    ? (isNetwork ? 'rgba(59,130,246,0.3)' : 'rgba(34,197,94,0.3)')
                    : (isNetwork ? 'rgba(59,130,246,0.1)' : 'rgba(34,197,94,0.1)');
                ctx.strokeStyle = isNetwork ? '#3b82f6' : '#22c55e';
                ctx.lineWidth = isHovered ? 2 : 1;
                ctx.fill();
                ctx.stroke();

                // Decimal
                ctx.fillStyle = isNetwork ? '#2563eb' : '#16a34a';
                ctx.font = isHovered ? 'bold 24px monospace' : '20px monospace';
                ctx.fillText(octets[i].toString(), x + octetWidth / 2, centerY + 8);

                // Binary (if hovered)
                if (isHovered) {
                    ctx.fillStyle = '#f59e0b';
                    ctx.font = '12px monospace';
                    ctx.fillText(binaries[i], x + octetWidth / 2, centerY + 45);
                    ctx.fillText('8 bits', x + octetWidth / 2, centerY - 40);
                }

                // Dot separater
                if (i < 3) {
                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '24px monospace';
                    ctx.fillText('.', x + octetWidth, centerY + 8);
                }
            }
        };

        draw(-1);

        // Mouse handler
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const octetWidth = (canvas.width - 80) / 4;
            const startX = 40;

            let found = -1;
            for (let i = 0; i < 4; i++) {
                if (mouseX >= startX + i * octetWidth && mouseX < startX + (i + 1) * octetWidth) {
                    found = i;
                }
            }

            if (found !== currentHover) {
                currentHover = found;
                draw(currentHover);
            }
        };

        const handleMouseLeave = () => {
            if (currentHover !== -1) {
                currentHover = -1;
                draw(-1);
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, []);

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Network className="w-6 h-6 text-blue-500" /> מהי כתובת IP?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                    כתובת IP היא תעודת הזהות של המכשיר ברשת. בגרסה 4 (IPv4) היא מורכבת מ-32 ביטים, המחולקים ל-4 חלקים שנקראים "אוקטטים".
                </p>

                {/* Interactive Canvas */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
                    <p className="text-sm text-center text-slate-500 mb-2">הוזיזו את העכבר על המספרים לראות את הערך הבינארי</p>
                    <canvas ref={canvasRef} className="w-full h-[200px]" />
                    <div className="flex justify-center gap-6 text-sm font-medium mt-2">
                        <span className="flex items-center gap-1 text-blue-600"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> חלק הרשת (Network)</span>
                        <span className="flex items-center gap-1 text-green-600"><span className="w-3 h-3 bg-green-500 rounded-full"></span> חלק המארח (Host)</span>
                    </div>
                </div>
            </div>

            {/* Classes Grid */}
            <div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">מחלקות IP (Classes)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300">Class A</h4>
                            <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">ענקי</span>
                        </div>
                        <div className="text-sm font-mono text-slate-600 dark:text-slate-400 mb-2">0.0.0.0 - 127.255.255.255</div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">משמש ארגונים ענקיים. חצי מהכתובות בעולם.</p>
                        <div className="mt-3 text-xs bg-white dark:bg-slate-900 p-2 rounded border border-blue-100 dark:border-blue-900">
                            <strong>Host/Net:</strong> 16 Million
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-purple-800 dark:text-purple-300">Class B</h4>
                            <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded">בינוני</span>
                        </div>
                        <div className="text-sm font-mono text-slate-600 dark:text-slate-400 mb-2">128.0.0.0 - 191.255.255.255</div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">אוניברסיטאות וחברות גדולות.</p>
                        <div className="mt-3 text-xs bg-white dark:bg-slate-900 p-2 rounded border border-purple-100 dark:border-purple-900">
                            <strong>Host/Net:</strong> 65,534
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-5 rounded-xl border border-green-200 dark:border-green-800">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-green-800 dark:text-green-300">Class C</h4>
                            <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">קטן</span>
                        </div>
                        <div className="text-sm font-mono text-slate-600 dark:text-slate-400 mb-2">192.0.0.0 - 223.255.255.255</div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">רשתות ביתיות ועסקים קטנים.</p>
                        <div className="mt-3 text-xs bg-white dark:bg-slate-900 p-2 rounded border border-green-100 dark:border-green-900">
                            <strong>Host/Net:</strong> 254
                        </div>
                    </div>
                </div>
            </div>

            {/* Public vs Private */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                        <Key className="w-5 h-5 text-orange-500" /> כתובות פרטיות (Private)
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        כתובות לשימוש פנימי בלבד (LAN). לא יכולות לצאת לאינטרנט ללא תרגום (NAT).
                    </p>
                    <ul className="space-y-1 font-mono text-sm bg-white dark:bg-slate-800 p-3 rounded">
                        <li>10.0.0.0 - 10.255.255.255</li>
                        <li>172.16.0.0 - 172.31.255.255</li>
                        <li>192.168.0.0 - 192.168.255.255</li>
                    </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                        <Globe className="w-5 h-5 text-blue-500" /> כתובות ציבוריות (Public)
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        כתובות ייחודיות בעולם שניתן לגלוש איתן באינטרנט. מוקצות ע"י ספקי האינטרנט.
                    </p>
                    <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <AlertTriangle className="w-4 h-4 text-blue-500" />
                        <span>לדוגמה: 8.8.8.8 (Google DNS)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPAddressing;
