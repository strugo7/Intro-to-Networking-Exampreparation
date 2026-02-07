import React, { useState } from 'react';
import { RouterIcon, LayersIcon } from './Module5Icons';
import { Home, ArrowRight } from 'lucide-react';

const PacketJourneyDemo: React.FC = () => {
    const [step, setStep] = useState(0);
    // Steps:
    // 0: Idle
    // 1: Host -> R1
    // 2: Processing R1
    // 3: R1 -> R2
    // 4: Processing R2
    // 5: R2 -> R3
    // 6: Processing R3
    // 7: R3 -> Host B
    // 8: Arrived

    const nodes = [
        { id: 'hostA', name: 'Host A', ip: '192.168.1.10', mac: 'AA:AA' },
        { id: 'r1', name: 'R1', ip: '192.168.1.1', macIn: 'R1:11', macOut: 'R1:22' },
        { id: 'r2', name: 'R2', ip: '10.0.0.1', macIn: 'R2:11', macOut: 'R2:22' },
        { id: 'r3', name: 'R3', ip: '172.16.0.1', macIn: 'R3:11', macOut: 'R3:22' },
        { id: 'hostB', name: 'Host B', ip: '172.16.0.50', mac: 'BB:BB' }
    ];

    const explanations = [
        "מוכן ליציאה. לחץ על 'התחל מסע' כדי לשלוח את החבילה.",
        "החבילה יוצאת מ-Host A (צד ימין). כתובת היעד (IP) היא של Host B, אבל כתובת ה-MAC היא של הראוטר הראשון.",
        "החבילה הגיעה ל-R1. הראוטר מסיר את המעטפה הישנה (Layer 2 Frame) ובודק בטבלת הניתוב לאן להעביר את ה-IP.",
        "R1 מצא מסלול! הוא אורז את החבילה במעטפה חדשה. המקור: R1, היעד: R2.",
        "החבילה הגיעה ל-R2. שוב, הסרת המעטפה, בדיקת IP, והחלטה לאן להעביר.",
        "R2 מעביר ל-R3. שים לב: ה-IP לא השתנה לרגע! רק ה-MAC משתנה בכל קפיצה (Hop).",
        "החבילה אצל R3. הוא מזהה שהיעד (Host B) נמצא ברשת המקומית שלו.",
        "R3 שולח את החבילה ישירות ל-Host B (צד שמאל). המעטפה האחרונה נכתבת עם ה-MAC של Host B.",
        "החבילה הגיעה ליעד בהצלחה! Host B פותח את המעטפה וקורא את המידע."
    ];

    const getCurrentMacs = () => {
        switch (step) {
            case 1: return { src: nodes[0].mac, dst: nodes[1].macIn };
            case 3: return { src: nodes[1].macOut, dst: nodes[2].macIn };
            case 5: return { src: nodes[2].macOut, dst: nodes[3].macIn };
            case 7: return { src: nodes[3].macOut, dst: nodes[4].mac };
            default: return { src: '...', dst: '...' };
        }
    };

    const getPacketPosition = () => {
        // Right to Left movement (RTL: 95% is right, 5% is left)
        switch (step) {
            case 0: return '95%'; // Start at Host A
            case 1: return '80%'; // Moving to R1
            case 2: return '75%'; // At R1
            case 3: return '55%'; // Moving to R2
            case 4: return '50%'; // At R2
            case 5: return '30%'; // Moving to R3
            case 6: return '25%'; // At R3
            case 7: return '5%';  // Moving to Host B
            case 8: return '5%';  // At Host B
            default: return '95%';
        }
    };

    const nextStep = () => {
        if (step < 8) setStep(step + 1);
        else setStep(0);
    };

    const macs = getCurrentMacs();

    return (
        <div className="bg-slate-900/50 border border-slate-700 p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <LayersIcon className="text-pink-400" size={32} />
                המסע מקצה לקצה (End-to-End)
            </h3>

            {/* Explanation Box */}
            <div className="mb-8 bg-slate-900 border-r-4 border-emerald-500 p-4 rounded shadow-lg min-h-[80px] flex items-center">
                <p className="text-lg text-emerald-100">
                    <span className="font-bold text-emerald-400 ml-2">שלב {step}:</span>
                    {explanations[step]}
                </p>
            </div>

            {/* Diagram */}
            <div className="relative h-48 bg-slate-800/30 rounded-xl border border-slate-700 flex justify-between items-center px-4 md:px-12 mb-6" dir="ltr">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-700 -z-1"></div>

                {/* Nodes - Reverse map for LTR logic in visual but RTL feel */}
                {/* Visual Order LTR: Host B (Left) ... Router ... Host A (Right)
                    But logical flow in RTL is Right -> Left.
                    The logic `getPacketPosition` assumes 95% = Right.
                    Changing layout to LTR makes positioning easier with `left` property.
                  */}

                {/* 
                   Wait, original code used dir="rtl" on html but positions were percentage based.
                   Start at Host A (Right) -> Host B (Left).
                   So Host A should be at rightmost position.
                   
                   Nodes array: [HostA, R1, R2, R3, HostB]
                   If I map them simply, HostA is first. In LTR flex-row, HostA is left.
                   I need HostA on RIGHT. So I should render them in reverse order OR use flex-row-reverse.
                */}

                {[...nodes].reverse().map((node, i) => (
                    <div key={node.id} className="relative z-10 flex flex-col items-center bg-slate-900 p-2 rounded-lg border border-slate-600 shadow-xl w-20">
                        {node.id.includes('host') ?
                            <Home className={node.id === 'hostA' ? 'text-blue-400' : 'text-purple-400'} size={24} /> :
                            <RouterIcon className="text-orange-400" size={24} />
                        }
                        <div className="text-xs font-bold text-white mt-1">{node.name}</div>
                        <div className="text-[9px] text-slate-500 font-mono">{node.ip}</div>
                    </div>
                ))}

                {/* Packet */}
                {step > 0 && (
                    <div
                        className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-20 flex flex-col items-center"
                        style={{
                            left: getPacketPosition(),
                            transform: 'translate(-50%, -50%)',
                            opacity: (step % 2 === 0 && step !== 8) ? 0.5 : 1 // Dim when processing inside router
                        }}
                    >
                        <div className={`
                            bg-slate-900 border-2 rounded p-2 shadow-2xl w-40 text-[10px] font-mono
                            ${step % 2 === 0 ? 'border-orange-500 scale-90' : 'border-blue-500 scale-110'}
                            transition-all
                        `}>
                            {/* L2 Header */}
                            <div className="flex justify-between border-b border-slate-700 pb-1 mb-1 text-pink-400 font-bold">
                                <span>L2 FRAME (MAC)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 mb-2 text-slate-300">
                                <div>Src: {macs.src}</div>
                                <div className="text-right">Dst: {macs.dst}</div>
                            </div>

                            {/* L3 Header */}
                            <div className="bg-emerald-900/30 border border-emerald-500/30 p-1 rounded">
                                <div className="text-emerald-400 text-center mb-1 font-bold">L3 IP (Fixed)</div>
                                <div className="flex justify-between text-white">
                                    <span>{nodes[0].ip}</span> &rarr;
                                    <span>{nodes[4].ip}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                            {step % 2 === 0 && step !== 8 ? "Routing Decision..." : "Traveling..."}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={nextStep}
                    className={`
                        px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2
                        ${step === 8 ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'}
                    `}
                >
                    {step === 0 ? "התחל מסע (Start)" : (step === 8 ? "אתחל מחדש (Reset)" : <>הצעד הבא (Next) <ArrowRight className="inline" size={16} /></>)}
                </button>
            </div>
        </div>
    );
};

export default PacketJourneyDemo;
