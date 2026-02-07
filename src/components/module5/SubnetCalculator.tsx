import React, { useState, useEffect } from 'react';
import { Sliders, CheckCircle, Info } from 'lucide-react';

const SubnetCalculator: React.FC = () => {
    const [cidr, setCidr] = useState(24);
    const [ip] = useState([192, 168, 10, 50]);

    // Derived values
    const hostBits = 32 - cidr;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = Math.max(0, totalHosts - 2);

    // Binary strings
    const maskBinary = '1'.repeat(cidr) + '0'.repeat(hostBits);

    const getOctet = (binStr: string, index: number) => {
        return parseInt(binStr.substr(index * 8, 8), 2);
    }

    const maskOctets = [0, 1, 2, 3].map(i => getOctet(maskBinary, i));

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-blue-500" /> מחשבון Subnetting ויזואלי
                    </h3>
                    <div className="text-3xl font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 rounded-lg">
                        /{cidr}
                    </div>
                </div>

                {/* Slider */}
                <div className="mb-8 px-4">
                    <input
                        type="range"
                        min="8" max="30"
                        value={cidr}
                        onChange={(e) => setCidr(parseInt(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                        <span>/8</span>
                        <span>/16</span>
                        <span>/24</span>
                        <span>/30</span>
                    </div>
                </div>

                {/* Visual Bits */}
                <div className="mb-8 overflow-x-auto pb-4">
                    <div className="flex gap-1 justify-center min-w-max">
                        {Array.from({ length: 32 }).map((_, i) => (
                            <div key={i} className={`
                                w-2 h-6 md:w-3 md:h-8 rounded-sm
                                ${i < cidr ? 'bg-blue-500' : 'bg-green-500'}
                                ${i > 0 && i % 8 === 0 ? 'ml-2' : ''}
                            `} title={i < cidr ? 'Network Bit' : 'Host Bit'} />
                        ))}
                    </div>
                    <div className="flex justify-center gap-8 mt-2 text-sm font-bold">
                        <span className="text-blue-500">{cidr} Network Bits</span>
                        <span className="text-green-500">{hostBits} Host Bits</span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoCard label="Subnet Mask" value={maskOctets.join('.')} icon={<Info className="w-4 h-4" />} />
                    <InfoCard label="Total Hosts" value={totalHosts.toLocaleString()} />
                    <InfoCard label="Usable Hosts" value={usableHosts.toLocaleString()} highlight />
                    <InfoCard label="Network Address" value={`192.168.10.${cidr >= 24 ? (50 & maskOctets[3]) : '0'}`} />
                    <InfoCard label="Broadcast Address" value={`192.168.10.${cidr >= 24 ? ((50 & maskOctets[3]) + totalHosts - 1) : '255'}`} />
                </div>
            </div>

            {/* Cheat Sheet */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold">
                    טבלת עזר מהירה (Class C)
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                        <thead className="text-slate-500 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="p-3">CIDR</th>
                                <th className="p-3">Subnet Mask</th>
                                <th className="p-3">Hosts</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {[24, 25, 26, 27, 28, 29, 30].map(c => (
                                <tr key={c} className={c === cidr ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                                    <td className="p-2 font-mono font-bold text-blue-600">/{c}</td>
                                    <td className="p-2 font-mono text-slate-600 dark:text-slate-400">255.255.255.{256 - Math.pow(2, 32 - c)}</td>
                                    <td className="p-2 font-bold">{Math.pow(2, 32 - c) - 2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ label, value, highlight = false, icon }: any) => (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900' : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700'}`}>
        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1 flex items-center gap-2">
            {icon} {label}
        </div>
        <div className={`text-lg font-mono font-bold ${highlight ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
            {value}
        </div>
    </div>
);

export default SubnetCalculator;
