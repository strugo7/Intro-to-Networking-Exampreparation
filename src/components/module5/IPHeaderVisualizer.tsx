import React, { useState } from 'react';
import { Search } from 'lucide-react';

const IPHeaderVisualizer: React.FC = () => {
    const [hoverField, setHoverField] = useState<string | null>(null);

    const fields = [
        { id: 'ver', label: 'Version', bits: 4, desc: 'IPv4 או IPv6. בדרך כלל הערך הוא 4.' },
        { id: 'ihl', label: 'IHL', bits: 4, desc: 'אורך הכותרת (בדרך כלל 20 בייטים).' },
        { id: 'tos', label: 'Type of Service', bits: 8, desc: 'תיעדוף (QoS). כאן קובעים אם זו שיחת זום שצריכה עדיפות על פני מייל.' },
        { id: 'len', label: 'Total Length', bits: 16, desc: 'הגודל הכולל של החבילה (Header + Data).' },
        { id: 'id', label: 'Identification', bits: 16, desc: 'זיהוי ייחודי לפרגמנטציה. משייך חתיכות לאותה חבילה מקורית.' },
        { id: 'flg', label: 'Flags', bits: 3, desc: 'הוראות לפרגמנטציה: "Don\'t Fragment" או "More Fragments".' },
        { id: 'off', label: 'Fragment Offset', bits: 13, desc: 'איפה החתיכה הזו ממוקמת ביחס לחבילה המקורית.' },
        { id: 'ttl', label: 'TTL (Time to Live)', bits: 8, desc: 'מונה חיים. יורד ב-1 בכל ראוטר. ב-0 החבילה מתה (מונע לולאות אינסופיות).' },
        { id: 'proto', label: 'Protocol', bits: 8, desc: 'מי מחכה בפנים? 6=TCP, 17=UDP, 1=ICMP.' },
        { id: 'sum', label: 'Header Checksum', bits: 16, desc: 'בדיקת תקינות. מוודא שהכותרת לא נהרסה בדרך.' },
        { id: 'src', label: 'Source IP Address', bits: 32, desc: 'מאיפה יצאתי? (למשל 192.168.1.5)' },
        { id: 'dst', label: 'Destination IP Address', bits: 32, desc: 'לאן אני הולך? (למשל 8.8.8.8)' },
    ];

    const currentField = fields.find(f => f.id === hoverField);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                <div className="text-center text-slate-500 text-xs mb-4 font-mono">IPv4 HEADER (20 Bytes)</div>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-32 gap-1 text-[10px] font-mono select-none min-w-[700px]" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                        {/* Row 1 */}
                        <div onMouseEnter={() => setHoverField('ver')} className="col-span-4 bg-blue-900/50 hover:bg-blue-600 text-blue-200 border border-blue-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors">VER</div>
                        <div onMouseEnter={() => setHoverField('ihl')} className="col-span-4 bg-blue-900/30 hover:bg-blue-600 text-blue-200 border border-blue-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors">IHL</div>
                        <div onMouseEnter={() => setHoverField('tos')} className="col-span-8 bg-slate-800 hover:bg-slate-600 text-slate-300 border border-slate-700 p-2 rounded flex items-center justify-center cursor-help transition-colors">TOS</div>
                        <div onMouseEnter={() => setHoverField('len')} className="col-span-16 bg-slate-800 hover:bg-slate-600 text-slate-300 border border-slate-700 p-2 rounded flex items-center justify-center cursor-help transition-colors">Total Length</div>

                        {/* Row 2 */}
                        <div onMouseEnter={() => setHoverField('id')} className="col-span-16 bg-purple-900/40 hover:bg-purple-600 text-purple-200 border border-purple-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors">Identification</div>
                        <div onMouseEnter={() => setHoverField('flg')} className="col-span-3 bg-purple-900/40 hover:bg-purple-600 text-purple-200 border border-purple-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors">Flg</div>
                        <div onMouseEnter={() => setHoverField('off')} className="col-span-13 bg-purple-900/40 hover:bg-purple-600 text-purple-200 border border-purple-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors">Fragment Offset</div>

                        {/* Row 3 */}
                        <div onMouseEnter={() => setHoverField('ttl')} className="col-span-8 bg-red-900/40 hover:bg-red-600 text-red-200 border border-red-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors font-bold">TTL</div>
                        <div onMouseEnter={() => setHoverField('proto')} className="col-span-8 bg-green-900/40 hover:bg-green-600 text-green-200 border border-green-700/50 p-2 rounded flex items-center justify-center cursor-help transition-colors">Protocol</div>
                        <div onMouseEnter={() => setHoverField('sum')} className="col-span-16 bg-slate-800 hover:bg-slate-600 text-slate-300 border border-slate-700 p-2 rounded flex items-center justify-center cursor-help transition-colors">Header Checksum</div>

                        {/* Row 4 */}
                        <div onMouseEnter={() => setHoverField('src')} className="col-span-32 bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 p-3 rounded flex items-center justify-center font-bold cursor-help transition-colors shadow-lg">Source IP Address</div>

                        {/* Row 5 */}
                        <div onMouseEnter={() => setHoverField('dst')} className="col-span-32 bg-emerald-800 hover:bg-emerald-500 text-white border border-emerald-700 p-3 rounded flex items-center justify-center font-bold cursor-help transition-colors shadow-lg mt-1">Destination IP Address</div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/3 min-h-[200px]">
                {currentField ? (
                    <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl border-t-4 border-emerald-500 animate-fade-in">
                        <h4 className="text-2xl font-bold text-white mb-2">{currentField.label}</h4>
                        <div className="text-emerald-400 font-mono text-sm mb-4">{currentField.bits} bits</div>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            {currentField.desc}
                        </p>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 p-6 rounded-xl border-dashed border-2 border-slate-700 flex flex-col items-center justify-center h-full text-slate-500 text-center">
                        <Search size={48} className="mb-4 opacity-50" />
                        <p>העבר את העכבר על שדות הכותרת<br />כדי לראות הסבר מפורט</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IPHeaderVisualizer;
