import React, { useState } from 'react';
import { SearchIcon, RefreshIcon } from './Module7Icons';

const DNSSimulator: React.FC = () => {
    const [domain, setDomain] = useState('');
    const [status, setStatus] = useState<'idle' | 'querying' | 'resolved' | 'error'>('idle');
    const [result, setResult] = useState('');
    const [logs, setLogs] = useState<string[]>([]);

    const records: { [key: string]: string } = {
        'google.com': '142.250.185.78',
        'mta.ac.il': '192.114.47.11',
        'facebook.com': '157.240.195.35',
        'ynet.co.il': '5.29.176.66'
    };

    const handleResolve = () => {
        if (!domain) return;
        setStatus('querying');
        setLogs([]);
        setResult('');

        const steps = [
            { msg: '1. המחשב שלך שואל: "מי זה ' + domain + '?"' },
            { msg: '2. שליחת שאלה לשרת ה-DNS (בפורט 53)...' },
            { msg: '3. שרת ה-DNS מחפש ברשומות...' },
        ];

        let currentStep = 0;

        const runStep = () => {
            if (currentStep < steps.length) {
                const msg = steps[currentStep].msg;
                setLogs(prev => [...prev, msg]);
                currentStep++;
                setTimeout(runStep, 1000);
            } else {
                // Finish
                const ip = records[domain.toLowerCase()];
                if (ip) {
                    setStatus('resolved');
                    setResult(ip);
                    setLogs(prev => [...prev, `4. נמצאה תשובה! הכתובת היא: ${ip}`]);
                } else {
                    setStatus('error');
                    setLogs(prev => [...prev, `4. שגיאה: הדומיין לא נמצא במאגר הדמו.`]);
                }
            }
        };
        runStep();
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-400 text-sm font-mono">DNS Resolver Tool</div>
            </div>

            <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">DNS: ספר הטלפונים של האינטרנט</h3>
                    <p className="text-slate-400">אנחנו זוכרים שמות (google.com), המחשבים מדברים בכתובות (IP). ה-DNS הוא המתרגם.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="הכנס דומיין (למשל: mta.ac.il)"
                        className="flex-1 bg-slate-950 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-purple-500 text-left ltr"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
                    />
                    <button
                        onClick={handleResolve}
                        disabled={status === 'querying'}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {status === 'querying' ? <RefreshIcon className="animate-spin" /> : <SearchIcon />}
                        תרגם ל-IP
                    </button>
                </div>

                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm min-h-[150px]">
                    {logs.length === 0 && <span className="text-slate-600">// הלוגים יופיעו כאן...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="text-green-400 mb-1 animate-pulse-slow">{`> ${log}`}</div>
                    ))}
                    {status === 'resolved' && (
                        <div className="mt-4 p-4 bg-green-900/30 border border-green-500/30 rounded text-center">
                            <span className="text-slate-300 block text-xs mb-1">RESOLVED ADDRESS</span>
                            <span className="text-2xl text-white font-bold tracking-widest">{result}</span>
                        </div>
                    )}
                </div>
                <div className="mt-4 text-center text-xs text-slate-500">
                    * נסה להקליד: google.com, mta.ac.il, facebook.com
                </div>
            </div>
        </div>
    );
};

export default DNSSimulator;
