import { useState } from 'react';
import { BroadcastIcon, PCIcon } from './Module4Icons';

// 3. ARP Explanation
const ARPExplainer = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl mb-12 border-t-4 border-yellow-500 font-heebo" dir="rtl">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-500/20 p-3 rounded-xl text-yellow-400">
                    <BroadcastIcon size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">פרוטוקול ARP</h2>
                    <p className="text-slate-400">Address Resolution Protocol: הגישור בין IP ל-MAC.</p>
                </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl relative min-h-[200px] flex items-center justify-between px-4 md:px-12">
                {/* Host A */}
                <div className="text-center relative z-10">
                    <PCIcon size={48} className="text-blue-400 mx-auto" />
                    <div className="text-white font-bold mt-2 text-sm md:text-base">192.168.1.10</div>
                    <div className="text-xs text-slate-500">MAC: AA:AA</div>
                    {step === 1 && (
                        <div className="absolute -top-16 left-0 bg-yellow-100 text-black p-2 rounded text-xs w-48 shadow-lg bubble-right z-20">
                            "מי זה 192.168.1.20? אני צריך את ה-MAC שלו!"
                        </div>
                    )}
                </div>

                {/* Host B */}
                <div className="text-center relative z-10">
                    <PCIcon size={48} className="text-green-400 mx-auto" />
                    <div className="text-white font-bold mt-2 text-sm md:text-base">192.168.1.20</div>
                    <div className="text-xs text-slate-500">MAC: BB:BB</div>
                    {step === 2 && (
                        <div className="absolute -top-16 right-0 bg-green-100 text-black p-2 rounded text-xs w-48 shadow-lg bubble-left z-20">
                            "זה אני! ה-MAC שלי הוא BB:BB. קח אותו."
                        </div>
                    )}
                </div>

                {/* Broadcast Animation */}
                {step === 1 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <div className="text-yellow-500 font-bold text-sm mb-2">BROADCAST</div>
                        <div className="h-1 bg-yellow-500/50 w-3/4 mx-auto rounded animate-pulse"></div>
                    </div>
                )}
                {/* Unicast Reply */}
                {step === 2 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <div className="text-green-500 font-bold text-sm mb-2">UNICAST REPLY</div>
                        <div className="h-1 bg-green-500/50 w-3/4 mx-auto rounded"></div>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row justify-center mt-6 gap-4">
                <button onClick={() => setStep(1)} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full border border-slate-600 transition-colors">1. שלח ARP Request</button>
                <button onClick={() => setStep(2)} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full border border-slate-600 transition-colors">2. קבל ARP Reply</button>
            </div>
        </div>
    );
};

export default ARPExplainer;
