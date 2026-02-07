import React, { useState } from 'react';
import { Layers, ArrowDown } from './Module1Icons';

const OSIIntro: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState<number | null>(null);

    const layers = [
        { id: 7, name: 'Application', he: 'אפליקציה', desc: 'הממשק מול המשתמש. כאן עובדים הדפדפן, האימייל וכו\'.', protocols: 'HTTP, DNS, SMTP', analogy: 'כתיבת המכתב עצמו על הדף.' },
        { id: 6, name: 'Presentation', he: 'הצגה', desc: 'תרגום המידע, הצפנה וכיווץ.', protocols: 'SSL, JPEG, ASCII', analogy: 'תרגום המכתב לשפה שהמקבל מבין והכנסתו למעטפה.' },
        { id: 5, name: 'Session', he: 'שיחה', desc: 'ניהול הדו-שיח (פתיחה וסגירה של ה-Connection).', protocols: 'RPC', analogy: 'שיחת הטלפון המקדימה: "אתה בבית? אני שולח לך מכתב".' },
        { id: 4, name: 'Transport', he: 'תעבורה', desc: 'אמינות, סדר ובקרת זרימה. פירוק המידע למקטעים (Segments).', protocols: 'TCP, UDP', analogy: 'מספור הדפים במכתב כדי שאם אחד יאבד, נדע איזה חסר.' },
        { id: 3, name: 'Network', he: 'רשת', desc: 'ניתוב (Routing) וכתובות לוגיות (IP).', protocols: 'IP, ICMP, Router', analogy: 'כתיבת הכתובת על המעטפה והחלטה של הדוור באיזה כביש לנסוע.' },
        { id: 2, name: 'Data Link', he: 'ערוץ הנתונים', desc: 'תקשורת פיזית בתוך ה-LAN. כתובות MAC.', protocols: 'Ethernet, Switch', analogy: 'המשאית הספציפית שלוקחת את המכתב מתיבת הדואר לסניף המקומי.' },
        { id: 1, name: 'Physical', he: 'פיזית', desc: 'העברת הביטים (0/1) בצורה חשמלית/אופטית.', protocols: 'Cables, WiFi, Hub', analogy: 'הכביש עצמו, האספלט שהמשאית נוסעת עליו.' },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 bg-slate-900/30 p-6 rounded-xl border border-slate-700/50">
            <div className="flex-1 space-y-2">
                {layers.map((layer) => (
                    <div
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id === activeLayer ? null : layer.id)}
                        className={`cursor-pointer transition-all duration-300 transform ${activeLayer === layer.id ? 'scale-105 translate-x-2' : 'hover:bg-slate-800'} 
                            p-4 rounded-lg border ${activeLayer === layer.id ? 'bg-gradient-to-r from-blue-900 to-slate-900 border-blue-400' : 'bg-slate-800/50 border-slate-700'} relative overflow-hidden`}
                    >
                        <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <span className={`font-mono text-sm px-2 py-1 rounded ${activeLayer === layer.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>L{layer.id}</span>
                                <span className="font-bold text-lg text-slate-100">{layer.name}</span>
                                <span className="text-slate-400 text-sm">({layer.he})</span>
                            </div>
                            {activeLayer === layer.id && <ArrowDown size={16} className="text-blue-400" />}
                        </div>

                        <div className={`mt-0 overflow-hidden transition-all duration-500 ease-in-out ${activeLayer === layer.id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            <p className="text-slate-300 mb-2">{layer.desc}</p>
                            <div className="text-sm text-blue-300 mb-2"><strong>פרוטוקולים/רכיבים:</strong> {layer.protocols}</div>
                            <div className="bg-slate-900/50 p-3 rounded border-r-2 border-yellow-500 text-sm text-slate-400 italic">
                                💡 {layer.analogy}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-1 hidden md:flex items-center justify-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700 p-8 min-h-[500px]">
                {!activeLayer ? (
                    <div className="text-center text-slate-500">
                        <Layers size={64} className="mx-auto mb-4 opacity-20" />
                        <p className="text-lg">לחץ על שכבה בצד ימין כדי לראות פרטים ואנלוגיות</p>
                    </div>
                ) : (
                    <div className="text-center animate-pulse-slow max-w-xs">
                        <div className="text-8xl font-black text-slate-800/80 mb-6 drop-shadow-lg">L{activeLayer}</div>
                        <h3 className="text-3xl font-bold text-blue-400 mb-4">{layers.find(l => l.id === activeLayer)?.name}</h3>
                        <p className="text-xl text-white leading-relaxed">{layers.find(l => l.id === activeLayer)?.analogy}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OSIIntro;
