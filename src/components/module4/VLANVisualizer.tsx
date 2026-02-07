import { useState } from 'react';
import { TagIcon, PCIcon } from './Module4Icons';

// 4. VLAN Visualizer
const VLANVisualizer = () => {
    const [mode, setMode] = useState<'flat' | 'vlan'>('flat'); // 'flat' or 'vlan'

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl border-t-4 border-purple-500 font-heebo" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-3 rounded-xl text-purple-400">
                        <TagIcon size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">VLANs (Virtual LANs)</h2>
                        <p className="text-slate-400">פיצול לוגי של מתג פיזי אחד.</p>
                    </div>
                </div>
                <button
                    onClick={() => setMode(mode === 'flat' ? 'vlan' : 'flat')}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                    {mode === 'flat' ? 'הפעל VLANs' : 'בטל VLANs'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className={`p-4 rounded-xl border transition-all ${mode === 'flat' ? 'bg-slate-800 border-slate-600' : 'bg-slate-900 border-purple-500'}`}>
                        <h3 className="font-bold text-white mb-2">{mode === 'flat' ? 'רשת שטוחה (Flat Network)' : 'רשת מחולקת (Segmented)'}</h3>
                        <p className="text-sm text-slate-300">
                            {mode === 'flat'
                                ? 'כל המחשבים שומעים את ה-Broadcast של כולם. אין אבטחה, אין הפרדה.'
                                : 'VLAN 10 (מכירות) מופרד לחלוטין מ-VLAN 20 (הנהלה). הם לא רואים זה את זה ללא ראוטר.'}
                        </p>
                    </div>

                    {mode === 'vlan' && (
                        <div className="bg-yellow-900/20 border border-yellow-600/50 p-4 rounded-lg text-sm text-yellow-200">
                            <strong>802.1Q Tagging:</strong> כאשר הודעה עוברת בין מתגים (Trunk), מוסיפים לה "תגית" (Tag) של 4 בייטים כדי לדעת לאיזה צבע היא שייכת.
                        </div>
                    )}
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex flex-col items-center">
                    {/* The Switch */}
                    <div className="w-full h-16 bg-slate-800 rounded border-2 border-slate-600 flex justify-around items-center mb-8 relative">
                        <div className="text-xs text-slate-500 absolute -top-5 left-2">Switch Ports</div>
                        {/* Ports */}
                        {[1, 2, 3, 4].map(p => (
                            <div key={p} className={`w-8 h-6 border bg-black ${mode === 'vlan' ? (p <= 2 ? 'border-red-500 bg-red-900/20' : 'border-blue-500 bg-blue-900/20') : 'border-slate-500'}`}></div>
                        ))}
                    </div>

                    {/* PCs */}
                    <div className="flex gap-8">
                        <div className={`flex flex-col items-center p-2 rounded ${mode === 'vlan' ? 'bg-red-900/10 border border-red-500/30' : ''}`}>
                            <PCIcon className="text-slate-300" />
                            <span className="text-xs mt-1 text-slate-400">PC 1</span>
                            {mode === 'vlan' && <span className="text-[10px] text-red-400 font-bold">VLAN 10</span>}
                        </div>
                        <div className={`flex flex-col items-center p-2 rounded ${mode === 'vlan' ? 'bg-red-900/10 border border-red-500/30' : ''}`}>
                            <PCIcon className="text-slate-300" />
                            <span className="text-xs mt-1 text-slate-400">PC 2</span>
                            {mode === 'vlan' && <span className="text-[10px] text-red-400 font-bold">VLAN 10</span>}
                        </div>
                        <div className="w-px bg-slate-700 h-20 mx-2"></div>
                        <div className={`flex flex-col items-center p-2 rounded ${mode === 'vlan' ? 'bg-blue-900/10 border border-blue-500/30' : ''}`}>
                            <PCIcon className="text-slate-300" />
                            <span className="text-xs mt-1 text-slate-400">PC 3</span>
                            {mode === 'vlan' && <span className="text-[10px] text-blue-400 font-bold">VLAN 20</span>}
                        </div>
                        <div className={`flex flex-col items-center p-2 rounded ${mode === 'vlan' ? 'bg-blue-900/10 border border-blue-500/30' : ''}`}>
                            <PCIcon className="text-slate-300" />
                            <span className="text-xs mt-1 text-slate-400">PC 4</span>
                            {mode === 'vlan' && <span className="text-[10px] text-blue-400 font-bold">VLAN 20</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VLANVisualizer;
