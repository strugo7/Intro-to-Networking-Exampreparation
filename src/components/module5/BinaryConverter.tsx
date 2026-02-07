import React, { useState } from 'react';
import { RefreshCw, Calculator, ArrowDown } from 'lucide-react';

const BinaryConverter: React.FC = () => {
    // Single Byte State
    const [byte, setByte] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

    // Full IP State
    const [ipOctets, setIpOctets] = useState<string[]>(["192", "168", "1", "100"]);
    const [convertedIP, setConvertedIP] = useState<string[] | null>(null);

    const toggleBit = (index: number) => {
        const newByte = [...byte];
        newByte[index] = newByte[index] === 0 ? 1 : 0;
        setByte(newByte);
    };

    const calculateDecimal = () => {
        return byte.reduce((acc, val, i) => acc + val * Math.pow(2, 7 - i), 0);
    };

    const handleIPChange = (index: number, val: string) => {
        const newOctets = [...ipOctets];
        newOctets[index] = val;
        setIpOctets(newOctets);
    };

    const convertFullIP = () => {
        const result = ipOctets.map(oct => {
            const num = parseInt(oct) || 0;
            return Math.max(0, Math.min(255, num)).toString(2).padStart(8, '0');
        });
        setIpOctets(ipOctets.map(oct => Math.max(0, Math.min(255, parseInt(oct) || 0)).toString()));
        setConvertedIP(result);
    };

    return (
        <div className="space-y-12">

            {/* Interactive Byte Converter */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                    <Calculator className="w-5 h-5 text-purple-500" /> ממיר אינטראקטיבי: בינארי לעשרוני
                </h3>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {byte.map((bit, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-xs text-slate-500 mb-1">{Math.pow(2, 7 - i)}</span>
                            <button
                                onClick={() => toggleBit(i)}
                                className={`w-10 h-14 rounded-lg font-mono text-xl font-bold transition-all ${bit === 1
                                        ? 'bg-purple-600 text-white shadow-purple-500/50 shadow-lg translate-y-[-2px]'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                            >
                                {bit}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider">תוצאה עשרונית</span>
                    <span className="text-5xl font-black text-purple-600 font-mono tracking-tight">
                        {calculateDecimal()}
                    </span>
                    <div className="mt-2 text-xs text-slate-400">
                        {byte.map((b, i) => b === 1 ? Math.pow(2, 7 - i) : 0).filter(v => v > 0).join(' + ') || '0'} = {calculateDecimal()}
                    </div>
                </div>
            </div>

            {/* Full IP Converter */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                    <RefreshCw className="w-5 h-5 text-green-500" /> ממיר כתובת IP מלאה
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6" dir="ltr">
                    {ipOctets.map((oct, i) => (
                        <React.Fragment key={i}>
                            <input
                                type="number"
                                min="0" max="255"
                                value={oct}
                                onChange={(e) => handleIPChange(i, e.target.value)}
                                className="w-20 p-2 text-center rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-lg font-mono"
                            />
                            {i < 3 && <span className="text-2xl font-bold text-slate-400">.</span>}
                        </React.Fragment>
                    ))}
                    <button
                        onClick={convertFullIP}
                        className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                        המר
                    </button>
                </div>

                {convertedIP && (
                    <div className="space-y-2 p-4 bg-slate-900 text-green-400 rounded-lg font-mono text-center" dir="ltr">
                        <div className="flex justify-center gap-4 text-sm md:text-base flex-wrap">
                            {convertedIP.map((bin, i) => (
                                <span key={i} className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                    {bin}
                                </span>
                            ))}
                        </div>
                        <div className="text-xs text-slate-500 pt-2 border-t border-slate-800 mt-2">
                            {convertedIP.join('')}
                        </div>
                    </div>
                )}
            </div>

            {/* Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 border-r-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900">
                    <h4 className="font-bold mb-2">עשרוני לבינארי</h4>
                    <p className="text-sm">בודקים אם המספר גדול מ-128. אם כן, כותבים 1 ומחסירים. ממשיכים לחזקה הבאה (64) וכן הלאה.</p>
                </div>
                <div className="p-4 border-r-4 border-purple-500 bg-purple-50 dark:bg-purple-900/10 dark:border-purple-900">
                    <h4 className="font-bold mb-2">בינארי לעשרוני</h4>
                    <p className="text-sm">מסכמים את ערכי החזקות של כל המקומות שיש בהם '1'. לדוגמה: 101 = 4 + 1 = 5.</p>
                </div>
            </div>
        </div>
    );
};

export default BinaryConverter;
