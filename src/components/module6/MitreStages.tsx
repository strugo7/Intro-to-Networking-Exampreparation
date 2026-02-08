import React, { useState } from 'react';
import { Search, Key, Terminal, Anchor, UploadCloud, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const stages = [
    {
        id: 'recon',
        title: 'Reconnaissance',
        hebrew: 'איסוף מודיעין',
        icon: <Search className="w-8 h-8 text-blue-400" />,
        description: 'התוקף אוסף מידע על המטרה: כתובות IP, עובדים, טכנולוגיות.',
        techniques: ['Nmap Scanning', 'Social Engineering', 'Google Dorking'],
        color: 'border-blue-500 bg-blue-500/10'
    },
    {
        id: 'access',
        title: 'Initial Access',
        hebrew: 'חדירה ראשונית',
        icon: <Key className="w-8 h-8 text-yellow-400" />,
        description: 'השגת דריסת רגל ראשונה בתוך הרשת הארגונית.',
        techniques: ['Phishing Email', 'Exploiting Vulnerabilities', 'USB Drop'],
        color: 'border-yellow-500 bg-yellow-500/10'
    },
    {
        id: 'execution',
        title: 'Execution',
        hebrew: 'הוצאה לפועל',
        icon: <Terminal className="w-8 h-8 text-red-400" />,
        description: 'הפעלת קוד זדוני על המחשב שהותקף.',
        techniques: ['Malware', 'PowerShell Scripts', 'Macros'],
        color: 'border-red-500 bg-red-500/10'
    },
    {
        id: 'persistence',
        title: 'Persistence',
        hebrew: 'התבססות',
        icon: <Anchor className="w-8 h-8 text-purple-400" />,
        description: 'יצירת דלת אחורית כדי לחזור לרשת גם אם המחשב יופעל מחדש.',
        techniques: ['Registry Keys', 'Scheduled Tasks', 'New User Account'],
        color: 'border-purple-500 bg-purple-500/10'
    },
    {
        id: 'exfil',
        title: 'Exfiltration',
        hebrew: 'גניבת מידע',
        icon: <UploadCloud className="w-8 h-8 text-emerald-400" />,
        description: 'העברת המידע הרגיש החוצה לשרתי התוקף.',
        techniques: ['DNS Tunneling', 'HTTP Upload', 'Email Forwarding'],
        color: 'border-emerald-500 bg-emerald-500/10'
    }
];

const MitreStages: React.FC = () => {
    const [selectedStage, setSelectedStage] = useState<string | null>(null);

    return (
        <div className="py-12 bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <span className="bg-red-500 w-2 h-8 rounded-full" />
                    שרשרת התקיפה (Attack Chain)
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    איך תוקף חושב? רוב מתקפות הסייבר המורכבות עוקבות אחרי דפוס פעולה ידוע מראש.
                    מודל זה מבוסס על מסגרת MITRE ATT&CK.
                </p>
            </div>

            {/* Stages Flow */}
            <div className="relative">
                {/* Connecting Line (Hidden on mobile) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-purple-900 to-emerald-900 -z-10 rounded-full opacity-50" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {stages.map((stage, index) => (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div
                                onClick={() => setSelectedStage(stage.id)}
                                className={`
                                    relative flex flex-col items-center bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2
                                    ${selectedStage === stage.id ? stage.color + ' shadow-lg shadow-current/20 scale-105' : 'border-slate-800 hover:border-slate-600'}
                                `}
                            >
                                <div className="mb-4 bg-slate-950 p-3 rounded-full shadow-inner border border-slate-800">
                                    {stage.icon}
                                </div>
                                <h3 className="font-bold text-white text-lg text-center">{stage.title}</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">{stage.hebrew}</p>

                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                                    <Info size={20} />
                                </div>
                            </div>

                            {/* Mobile Connector Arrow */}
                            {index < stages.length - 1 && (
                                <div className="md:hidden flex justify-center py-2 text-slate-700">
                                    <ChevronRight className="rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detailed View */}
            <motion.div
                layout
                className="mt-8 overflow-hidden"
            >
                {selectedStage ? (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        key={selectedStage}
                        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                    >
                        {(() => {
                            const stage = stages.find(s => s.id === selectedStage)!;
                            return (
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className={`p-4 rounded-xl ${stage.color} bg-opacity-20`}>
                                        {stage.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-2">{stage.title} - {stage.hebrew}</h3>
                                        <p className="text-lg text-slate-300 mb-6">{stage.description}</p>

                                        <div>
                                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">טכניקות נפוצות:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {stage.techniques.map(tech => (
                                                    <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-sm text-emerald-400 font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                ) : (
                    <div className="text-center text-slate-500 p-8 border-2 border-dashed border-slate-800 rounded-2xl">
                        לחץ על אחד השלבים למעלה לפירוט נוסף
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default MitreStages;
