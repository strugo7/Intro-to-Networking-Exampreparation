import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';

interface Log {
    type: 'command' | 'output' | 'error' | 'info';
    text: string;
}

const NmapSimulator: React.FC = () => {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<Log[]>([
        { type: 'info', text: 'Welcome to Nmap Simulator v1.0' },
        { type: 'info', text: 'Type "help" for available commands.' }
    ]);
    const [isScanning, setIsScanning] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        if (!cmd) return;

        setLogs(prev => [...prev, { type: 'command', text: `> ${cmd}` }]);
        setInput('');

        if (cmd === 'clear') {
            setLogs([]);
            return;
        }

        if (cmd === 'help') {
            setLogs(prev => [...prev, {
                type: 'info',
                text: `Available Commands:
  nmap <target>        Basic Scan
  nmap -sS <target>    Stealth SYN Scan
  nmap -O <target>     OS Detection
  clear                Clear terminal`
            }]);
            return;
        }

        if (cmd.startsWith('nmap')) {
            await runNmap(cmd);
        } else {
            setLogs(prev => [...prev, { type: 'error', text: `Command not found: ${cmd}` }]);
        }
    };

    const runNmap = async (cmd: string) => {
        setIsScanning(true);
        const args = cmd.split(' ');
        const target = args[args.length - 1];

        // Simulating scan delay
        setLogs(prev => [...prev, { type: 'output', text: `Starting Nmap 7.94 at ${new Date().toLocaleTimeString()}` }]);

        await new Promise(r => setTimeout(r, 800));
        setLogs(prev => [...prev, { type: 'output', text: `Initiating Ping Scan at ${target}...` }]);

        await new Promise(r => setTimeout(r, 1200));
        setLogs(prev => [...prev, { type: 'output', text: `Scanning ${target} [1000 ports]...` }]);

        await new Promise(r => setTimeout(r, 1500));

        let result = '';
        if (cmd.includes('-O')) {
            result = `PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
Device type: general purpose
Running: Linux 4.X|5.X
OS details: Linux 4.15 - 5.6`;
        } else {
            result = `PORT     STATE SERVICE
21/tcp   closed ftp
22/tcp   open   ssh
80/tcp   open   http
443/tcp  open   https
3306/tcp open   mysql`;
        }

        setLogs(prev => [...prev, { type: 'output', text: result }]);
        setLogs(prev => [...prev, { type: 'info', text: `Nmap done: 1 IP address (1 host up) scanned in 3.52 seconds` }]);
        setIsScanning(false);
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl max-w-4xl mx-auto font-mono text-sm my-12">
            {/* Terminal Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-slate-400" />
                    <span className="text-slate-300 text-xs">root@kali: ~</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-[400px] overflow-y-auto bg-black/95 text-green-400 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {logs.map((log, i) => (
                    <div key={i} className={`mb-1 whitespace-pre-wrap 
                        ${log.type === 'command' ? 'text-white font-bold mt-4' : ''}
                        ${log.type === 'error' ? 'text-red-400' : ''}
                        ${log.type === 'info' ? 'text-blue-300' : ''}
                    `}>
                        {log.text}
                    </div>
                ))}

                {isScanning && (
                    <div className="animate-pulse text-green-600 mt-2">_ Scanning...</div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleCommand} className="bg-slate-800 p-2 flex gap-2 border-t border-slate-700">
                <span className="text-green-400 font-bold">{'>'}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isScanning}
                    placeholder="Type 'nmap 192.168.1.1' or 'help'"
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-slate-600"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={isScanning || !input}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                >
                    Run
                </button>
            </form>
        </div>
    );
};

export default NmapSimulator;
