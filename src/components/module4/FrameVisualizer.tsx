import { useState } from 'react';
import { LayersIcon } from './Module4Icons';

const FrameVisualizer = () => {
    const [hoverField, setHoverField] = useState<string | null>(null);

    const fields = [
        { id: 'pre', label: 'Preamble', size: '8 Bytes', desc: 'רצף ביטים (101010...) לסנכרון השעון בין הכרטיסים. ה-SFD בסוף מסמן את תחילת המסגרת.' },
        { id: 'dst', label: 'Destination MAC', size: '6 Bytes', desc: 'כתובת היעד הפיזית. המתג מסתכל *רק* על השדה הזה כדי להחליט לאן להעביר.' },
        { id: 'src', label: 'Source MAC', size: '6 Bytes', desc: 'כתובת המקור. המתג משתמש בשדה הזה כדי *ללמוד* איפה נמצא השולח.' },
        { id: 'type', label: 'Type / Length', size: '2 Bytes', desc: 'מגדיר איזה פרוטוקול נמצא בפנים (למשל IPv4 = 0x0800) או את אורך המידע.' },
        { id: 'data', label: 'Payload (Data)', size: '46-1500 Bytes', desc: 'החבילה עצמה (IP Packet) משכבה 3. אם היא קטנה מדי, מוסיפים ריפוד (Padding).' },
        { id: 'fcs', label: 'FCS', size: '4 Bytes', desc: 'Frame Check Sequence. בדיקת שגיאות (CRC). אם המסגרת נפגעה בדרך, היא נזרקת.' }
    ];

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl mb-12 border-t-4 border-sky-500 font-heebo" dir="rtl">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-sky-500/20 p-3 rounded-xl text-sky-400">
                    <LayersIcon size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">אנטומיה של מסגרת (Ethernet Frame)</h2>
                    <p className="text-slate-400">ככה נראית ה"מעטפה" של שכבה 2.</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex w-full h-20 rounded-lg overflow-hidden border border-slate-600 font-mono text-xs md:text-sm cursor-help shadow-lg select-none" dir="ltr">
                    <div onMouseEnter={() => setHoverField('pre')} className="flex-none w-20 bg-slate-800 flex items-center justify-center text-slate-500 border-r border-slate-700 hover:bg-slate-700 transition-colors">Preamble</div>
                    <div onMouseEnter={() => setHoverField('dst')} className="flex-1 bg-red-900/40 flex items-center justify-center text-red-200 border-r border-slate-700 hover:bg-red-800/50 transition-colors">Dest MAC</div>
                    <div onMouseEnter={() => setHoverField('src')} className="flex-1 bg-green-900/40 flex items-center justify-center text-green-200 border-r border-slate-700 hover:bg-green-800/50 transition-colors">Src MAC</div>
                    <div onMouseEnter={() => setHoverField('type')} className="flex-none w-16 bg-yellow-900/30 flex items-center justify-center text-yellow-200 border-r border-slate-700 hover:bg-yellow-800/50 transition-colors">Type</div>
                    <div onMouseEnter={() => setHoverField('data')} className="flex-[3] bg-blue-900/40 flex items-center justify-center text-blue-200 border-r border-slate-700 hover:bg-blue-800/50 transition-colors">Data (Payload)</div>
                    <div onMouseEnter={() => setHoverField('fcs')} className="flex-none w-16 bg-purple-900/40 flex items-center justify-center text-purple-200 hover:bg-purple-800/50 transition-colors">FCS</div>
                </div>

                <div className="min-h-[100px] bg-slate-900/50 p-4 rounded-lg border border-slate-700 transition-all duration-300">
                    {hoverField ? (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xl font-bold text-white">{fields.find(f => f.id === hoverField)?.label}</h4>
                                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-sky-400">{fields.find(f => f.id === hoverField)?.size}</span>
                            </div>
                            <p className="text-slate-300">{fields.find(f => f.id === hoverField)?.desc}</p>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-500">
                            העבר את העכבר על חלקי המסגרת לקבלת הסבר
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FrameVisualizer;
