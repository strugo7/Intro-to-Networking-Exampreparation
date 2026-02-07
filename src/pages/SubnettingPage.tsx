import { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, Network, Check, X, RefreshCw, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const SubnettingPage = () => {
    const { lang } = useAppContext();
    const navigate = useNavigate();
    const isRTL = lang === 'he';

    // State for Calculator
    const [ip, setIp] = useState('192.168.1.10');
    const [mask, setMask] = useState('24');
    const [calcResult, setCalcResult] = useState<any>(null);

    // State for Practice
    const [question, setQuestion] = useState<any>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const calculateSubnet = () => {
        try {
            const ipParts = ip.split('.').map(Number);
            const cidr = parseInt(mask);

            if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255) || isNaN(cidr) || cidr < 0 || cidr > 32) {
                setCalcResult({ error: 'Invalid IP or CIDR' });
                return;
            }

            // Binary calculation logic simplified
            const ipBin = ipParts.map(p => p.toString(2).padStart(8, '0')).join('');
            const netBin = ipBin.substring(0, cidr).padEnd(32, '0');
            const broadBin = ipBin.substring(0, cidr).padEnd(32, '1');

            const toIp = (bin: string) => bin.match(/.{8}/g)?.map(b => parseInt(b, 2)).join('.') || '';

            const networkAddress = toIp(netBin);
            const broadcastAddress = toIp(broadBin);
            const hosts = Math.pow(2, 32 - cidr) - 2;

            setCalcResult({
                networkAddress,
                broadcastAddress,
                hosts: hosts > 0 ? hosts : 0,
                subnetMask: toIp('1'.repeat(cidr).padEnd(32, '0'))
            });

        } catch (e) {
            setCalcResult({ error: 'Calculation Error' });
        }
    };

    const generateQuestion = () => {
        // Simple question generator
        const qCidr = 24 + Math.floor(Math.random() * 6); // /24 to /30
        const qIp = `10.0.0.${Math.floor(Math.random() * 255)}`;

        // Calculate answer
        const ipParts = qIp.split('.').map(Number);
        const ipBin = ipParts.map(p => p.toString(2).padStart(8, '0')).join('');
        const hosts = Math.pow(2, 32 - qCidr) - 2;

        setQuestion({
            ip: qIp,
            cidr: qCidr,
            answer: hosts
        });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!question) return;
        if (parseInt(userAnswer) === question.answer) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        generateQuestion();
        calculateSubnet();
    }, []);

    return (
        <div className="flex flex-col grow h-full bg-slate-50 dark:bg-background-dark">
            <div className="max-w-5xl mx-auto w-full px-6 py-10">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft size={24} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Subnetting Master</h1>
                        <p className="text-slate-500 mt-2">Learn to calculate Network IDs, Broadcasts, and Host ranges.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calculator Section */}
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-card-border shadow-sm h-fit">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-primary">
                                <Calculator size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Subnet Calculator</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">IP Address</label>
                                <input
                                    type="text"
                                    value={ip}
                                    onChange={(e) => setIp(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">CIDR (/{mask})</label>
                                <input
                                    type="number"
                                    value={mask}
                                    onChange={(e) => setMask(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono text-sm"
                                    min="0" max="32"
                                />
                            </div>
                        </div>
                        <button onClick={calculateSubnet} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2 rounded-lg text-sm mb-6 hover:opacity-90 transition-opacity">
                            Calculate
                        </button>

                        {calcResult && !calcResult.error && (
                            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Network Address:</span>
                                    <span className="font-mono font-bold text-primary">{calcResult.networkAddress}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Broadcast Address:</span>
                                    <span className="font-mono font-bold text-orange-500">{calcResult.broadcastAddress}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Subnet Mask:</span>
                                    <span className="font-mono text-slate-600 dark:text-slate-400">{calcResult.subnetMask}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
                                    <span className="text-sm text-slate-500">Usable Hosts:</span>
                                    <span className="font-bold text-emerald-500">{calcResult.hosts.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                        {calcResult?.error && <div className="text-red-500 text-center font-bold">{calcResult.error}</div>}
                    </div>

                    {/* Practice Section */}
                    <div className="flex flex-col gap-6">
                        {/* Educational Content */}
                        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-card-border shadow-sm space-y-6">

                            {/* Intro Card */}
                            <div className="bg-primary text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-xl font-bold mb-2">למה בכלל צריך Subnet Mask?</h2>
                                    <p className="text-blue-100 text-sm leading-relaxed mb-3">
                                        כתובת IP מורכבת משני חלקים: <strong>שם הרשת (Network)</strong> ו-<strong>שם המארח (Host)</strong>.<br />
                                        ה-Subnet Mask הוא ה"קו המפריד" שאומר למחשב איפה נגמר שם הרשת ומתחיל מספר הבית.
                                    </p>
                                    <div className="flex gap-2 text-xs font-mono">
                                        <span className="bg-white/20 px-2 py-1 rounded">/24 = 255.255.255.0</span>
                                        <span className="bg-white/20 px-2 py-1 rounded">/16 = 255.255.0.0</span>
                                    </div>
                                </div>
                                <Network className="absolute -bottom-4 -right-4 text-white/10" size={100} />
                            </div>

                            {/* Detailed Explanation */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">מושגי יסוד (CIDR & Hosts)</h3>
                                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex gap-3">
                                        <div className="min-w-[4px] h-full bg-blue-500 rounded-full"></div>
                                        <div>
                                            <span className="font-bold text-slate-800 dark:text-slate-200 block">CIDR (/24, /30)</span>
                                            מספר הביטים ששייכים לרשת. למשל /24 אומר ש-24 הביטים הראשונים (3 האוקטטות הראשונות) הם הכתובת של הרשת, ורק ה-8 האחרונים הם למחשבים.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="min-w-[4px] h-full bg-emerald-500 rounded-full"></div>
                                        <div>
                                            <span className="font-bold text-slate-800 dark:text-slate-200 block">חישוב כמות מחשבים</span>
                                            הנוסחה היא <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">2^(h) - 2</code>, כאשר h הוא מספר הביטים שנשארו למארח.<br />
                                            למה פחות 2? כי כתובת ה-Network (הראשונה) וכתובת ה-Broadcast (האחרונה) שמורות.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Example Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-3 py-2">CIDR</th>
                                            <th className="px-3 py-2">Mask</th>
                                            <th className="px-3 py-2">Hosts</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr className="bg-white dark:bg-card-dark">
                                            <td className="px-3 py-2 font-mono font-bold text-primary">/24</td>
                                            <td className="px-3 py-2 font-mono text-slate-500">255.255.255.0</td>
                                            <td className="px-3 py-2 font-bold text-slate-800 dark:text-slate-200">254</td>
                                        </tr>
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                                            <td className="px-3 py-2 font-mono font-bold text-primary">/25</td>
                                            <td className="px-3 py-2 font-mono text-slate-500">255.255.255.128</td>
                                            <td className="px-3 py-2 font-bold text-slate-800 dark:text-slate-200">126</td>
                                        </tr>
                                        <tr className="bg-white dark:bg-card-dark">
                                            <td className="px-3 py-2 font-mono font-bold text-primary">/30</td>
                                            <td className="px-3 py-2 font-mono text-slate-500">255.255.255.252</td>
                                            <td className="px-3 py-2 font-bold text-slate-800 dark:text-slate-200">2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Practice Widget */}
                        <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-card-border shadow-sm flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <RefreshCw size={20} className="text-primary" /> Practice
                                </h2>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Host Calculation</span>
                            </div>

                            {question && (
                                <div className="flex flex-col items-center text-center">
                                    <p className="text-slate-500 mb-2">How many usable hosts are in the network:</p>
                                    <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white mb-6">
                                        {question.ip} / {question.cidr}
                                    </div>

                                    <div className="w-full flex gap-3 text-center">
                                        <input
                                            type="number"
                                            placeholder="Enter number of hosts"
                                            className={`flex-1 bg-slate-100 dark:bg-slate-900 border-2 rounded-xl px-4 py-3 text-center font-bold text-lg outline-none transition-colors ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : feedback === 'incorrect' ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent focus:border-primary'}`}
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                            disabled={feedback === 'correct'}
                                        />
                                        <button
                                            onClick={feedback === 'correct' ? generateQuestion : checkAnswer}
                                            className={`px-6 py-3 rounded-xl font-bold text-white transition-colors ${feedback === 'correct' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-blue-600'}`}
                                        >
                                            {feedback === 'correct' ? 'Next' : 'Check'}
                                        </button>
                                    </div>

                                    {feedback === 'correct' && (
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold mt-4 animate-in slide-in-from-bottom-2">
                                            <CheckCircle size={20} /> Correct! {question.answer} usable hosts.
                                        </div>
                                    )}
                                    {feedback === 'incorrect' && (
                                        <div className="flex items-center gap-2 text-red-500 font-bold mt-4 animate-in slide-in-from-bottom-2">
                                            <X size={20} /> Incorrect. Think about 2^(32-CIDR) - 2.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
