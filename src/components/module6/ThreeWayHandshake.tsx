import React, { useState, useEffect } from 'react';
import { Laptop, Server } from './Module6Icons';

const ThreeWayHandshake: React.FC = () => {
    const [step, setStep] = useState(0); // 0: Idle, 1: SYN, 2: SYN-ACK, 3: ACK, 4: Established
    const [clientState, setClientState] = useState('CLOSED');
    const [serverState, setServerState] = useState('LISTEN');

    useEffect(() => {
        if (step === 0) {
            setClientState('CLOSED');
            setServerState('LISTEN');
        } else if (step === 1) {
            setClientState('SYN_SENT');
            // Server state changes after packet arrival (simulated delay)
            setTimeout(() => setServerState('SYN_RCVD'), 2000);
        } else if (step === 2) {
            // Client state changes after packet arrival
            setTimeout(() => setClientState('ESTABLISHED'), 2000);
        } else if (step === 3) {
            // Server state changes after packet arrival
            setTimeout(() => setServerState('ESTABLISHED'), 2000);
        }
    }, [step]);

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setStep(0); // Reset
        }
    };

    return (
        <div className="bg-slate-950 p-6 rounded-3xl text-slate-200 overflow-hidden relative min-h-[400px] flex flex-col items-center">
            <style>
                {`
                @keyframes moveRight {
                    0% { left: 10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 90%; opacity: 0; }
                }
                @keyframes moveLeft {
                    0% { left: 90%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 10%; opacity: 0; }
                }
                .packet-right { animation: moveRight 2s linear forwards; }
                .packet-left { animation: moveLeft 2s linear forwards; }
                .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
                `}
            </style>

            <h2 className="text-2xl font-bold text-white mb-6">TCP 3-Way Handshake</h2>

            {/* Visual Stage */}
            <div className="flex justify-between items-center w-full max-w-2xl flex-1 relative px-8">

                {/* Client Node */}
                <div className="flex flex-col items-center gap-2 z-10 w-24">
                    <Laptop size={48} className={`text-slate-300 transition-colors duration-300 ${clientState === 'ESTABLISHED' ? 'text-green-400' : ''}`} />
                    <span className="font-bold text-white">Client</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${getStatusColor(clientState)}`}>
                        {clientState}
                    </span>
                </div>

                {/* Connection Lines */}
                <div className="flex-1 h-0.5 bg-slate-700 relative mx-4">
                    {/* Packets */}
                    {step === 1 && (
                        <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold text-white shadow-lg packet-left">
                            SYN
                        </div>
                    )}
                    {step === 2 && (
                        <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 bg-purple-600 rounded flex items-center justify-center text-xs font-bold text-white shadow-lg packet-right">
                            SYN-ACK
                        </div>
                    )}
                    {step === 3 && (
                        <div className="absolute top-1/2 -translate-y-1/2 w-16 h-8 bg-green-600 rounded flex items-center justify-center text-xs font-bold text-white shadow-lg packet-left">
                            ACK
                        </div>
                    )}
                </div>

                {/* Server Node */}
                <div className="flex flex-col items-center gap-2 z-10 w-24">
                    <Server size={48} className={`text-slate-300 transition-colors duration-300 ${serverState === 'ESTABLISHED' ? 'text-green-400' : ''}`} />
                    <span className="font-bold text-white">Server</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${getStatusColor(serverState)}`}>
                        {serverState}
                    </span>
                </div>
            </div>

            {/* Explanation Text */}
            <div className="mt-8 h-16 text-center text-sm md:text-base text-slate-300 max-w-xl transition-all">
                {step === 0 && "לחץ על 'התחל' כדי ליצור חיבור TCP."}
                {step === 1 && "שלב 1: הלקוח שולח בקשת SYN (Synchronize) לשרת כדי להתחיל שיחה."}
                {step === 2 && "שלב 2: השרת מקבל את הבקשה, ושולח חזרה SYN-ACK (אישור + בקשה נגדית)."}
                {step === 3 && "שלב 3: הלקוח מאשר את קבלת התשובה ע\"י שליחת ACK. החיבור נוצר!"}
                {step === 4 && <span className="text-green-400 font-bold">החיבור הוקם בהצלחה! (ESTABLISHED)</span>}
            </div>

            {/* Controls */}
            <button
                onClick={handleNext}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
                {step === 0 ? 'התחל לחיצת יד' : step === 3 ? 'סיום (איפוס)' : 'הבא'}
            </button>
        </div>
    );
};

// Helper for status colors
const getStatusColor = (status: string) => {
    switch (status) {
        case 'CLOSED': return 'bg-slate-700 text-slate-400';
        case 'LISTEN': return 'bg-yellow-900/30 text-yellow-500';
        case 'SYN_SENT': return 'bg-blue-900/30 text-blue-400';
        case 'SYN_RCVD': return 'bg-purple-900/30 text-purple-400';
        case 'ESTABLISHED': return 'bg-green-900/30 text-green-400 animate-pulse';
        default: return 'bg-slate-700 text-slate-400';
    }
};

export default ThreeWayHandshake;
