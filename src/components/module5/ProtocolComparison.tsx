import React from 'react';
import { Check, X, Server, Zap, Shield, Globe } from 'lucide-react';

const ProtocolComparison = () => {
    return (
        <div className="my-12 font-heebo" dir="rtl">
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
                סיכום השוואתי: הקרב המשולש
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* RIP Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border-t-4 border-green-500 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 flex flex-col items-center border-b border-green-100 dark:border-green-800">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner">
                            🐢
                        </div>
                        <h4 className="text-xl font-black text-green-700 dark:text-green-400">RIP</h4>
                        <span className="text-xs font-bold uppercase tracking-wider text-green-600/70 dark:text-green-400/70">Distance Vector</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <Feature label="מטריק (Metric)" value="Hop Count (קפיצות)" icon={<Zap size={16} />} />
                        <Feature label="מגבלה" value="עד 15 קפיצות" icon={<X size={16} className="text-red-500" />} />
                        <Feature label="מהירות התכנסות" value="איטית מאוד" icon={<Server size={16} />} />
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-sm font-bold text-slate-500 block mb-1">שימוש עיקרי:</span>
                            <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded inline-block">
                                רשתות קטנות / ישנות
                            </span>
                        </div>
                    </div>
                </div>

                {/* OSPF Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-500 hover:-translate-y-1 transition-transform duration-300 relative z-10 scale-105">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                        הנפוץ ביותר
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 flex flex-col items-center border-b border-blue-100 dark:border-blue-800">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner">
                            🐆
                        </div>
                        <h4 className="text-xl font-black text-blue-700 dark:text-blue-400">OSPF</h4>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600/70 dark:text-blue-400/70">Link State</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <Feature label="מטריק (Metric)" value="Cost (רוחב פס)" icon={<Zap size={16} className="text-yellow-500" />} />
                        <Feature label="מגבלה" value="אין (מחלק לאזורים)" icon={<Check size={16} className="text-green-500" />} />
                        <Feature label="מהירות התכנסות" value="מהירה (Fast)" icon={<Server size={16} />} />
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-sm font-bold text-slate-500 block mb-1">שימוש עיקרי:</span>
                            <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded inline-block">
                                ארגונים גדולים (Enterprise)
                            </span>
                        </div>
                    </div>
                </div>

                {/* BGP Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border-t-4 border-purple-500 hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 flex flex-col items-center border-b border-purple-100 dark:border-purple-800">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner">
                            🌐
                        </div>
                        <h4 className="text-xl font-black text-purple-700 dark:text-purple-400">BGP</h4>
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600/70 dark:text-purple-400/70">Path Vector</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <Feature label="מטריק (Metric)" value="Policy & Attributes" icon={<Shield size={16} className="text-purple-500" />} />
                        <Feature label="מגבלה" value="מורכבות (לא גודל)" icon={<Globe size={16} className="text-purple-400" />} />
                        <Feature label="מהירות התכנסות" value="בינונית (יציבות)" icon={<Server size={16} />} />
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-sm font-bold text-slate-500 block mb-1">שימוש עיקרי:</span>
                            <span className="text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded inline-block">
                                ספקי אינטרנט (ISP)
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Feature = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 text-slate-400 dark:text-slate-500">
            {icon}
        </div>
        <div>
            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">{label}</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{value}</span>
        </div>
    </div>
);

export default ProtocolComparison;
