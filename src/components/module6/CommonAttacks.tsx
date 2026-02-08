import { ServerCrash, Ear, Fish, Database, Users, ShieldAlert, Lock, Eye, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const attacks = [
    {
        id: 'ddos',
        title: 'DDoS (Distributed Denial of Service)',
        hebrew: 'מניעת שירות מבוזרת',
        icon: <ServerCrash className="w-8 h-8 text-red-500" />,
        description: 'התוקף מציף את השרת במיליוני בקשות סרק ממחשבים רבים בו-זמנית (Botnet), עד שהשרת קורס.',
        impact: ['availability'],
        realWorld: 'השבתת שרתי Xbox/PlayStation בחגים.',
        protection: 'Firewall, CDN (Cloudflare), Rate Limiting.'
    },
    {
        id: 'mitm',
        title: 'Man-in-the-Middle (MITM)',
        hebrew: 'האדם שבאמצע',
        icon: <Ear className="w-8 h-8 text-orange-500" />,
        description: 'התוקף יושב על קו התקשורת בין המשתמש לשרת (למשל WiFi ציבורי) ומאזין למידע שעובר.',
        impact: ['confidentiality', 'integrity'],
        realWorld: 'גניבת סיסמאות בבית קפה עם WiFi פתוח.',
        protection: 'HTTPS (Encryption), VPN.'
    },
    {
        id: 'phishing',
        title: 'Phishing',
        hebrew: 'דיוג',
        icon: <Fish className="w-8 h-8 text-purple-500" />,
        description: 'הנדסה חברתית: שליחת מייל/SMS מתחזה כדי לגרום למשתמש למסור פרטים.',
        impact: ['confidentiality', 'access'],
        realWorld: 'מייל "זכית בלוטו" או "חשבונך נחסם"',
        protection: '2FA (אימות דו-שלבי), מודעות עובדים.'
    },
    {
        id: 'sqli',
        title: 'SQL Injection',
        hebrew: 'הזרקת SQL',
        icon: <Database className="w-8 h-8 text-blue-500" />,
        description: 'הכנסת קוד זדוני לשדות קלט באתר כדי לפרוץ למסד הנתונים.',
        impact: ['confidentiality', 'integrity'],
        realWorld: 'פריצה לאתרי אינטרנט ישנים וגניבת בסיס הנתונים.',
        protection: 'Input Validation, Prepared Statements.'
    }
];

const CiaImpactBadge: React.FC<{ type: string }> = ({ type }) => {
    const config: any = {
        confidentiality: { icon: Lock, label: 'Confidentiality', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
        integrity: { icon: ShieldAlert, label: 'Integrity', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
        availability: { icon: Server, label: 'Availability', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
        access: { icon: Users, label: 'Access Control', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' }
    };

    const item = config[type] || config.confidentiality;
    const Icon = item.icon;

    return (
        <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold border ${item.color}`}>
            <Icon size={12} /> {item.label}
        </span>
    );
};

const CommonAttacks: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">מתקפות נפוצות</h2>
                <p className="text-slate-400">איך כל מתקפה פוגעת במודל ה-CIA?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attacks.map((attack, index) => (
                    <motion.div
                        key={attack.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-colors"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                                {attack.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{attack.title}</h3>
                                <span className="text-sm text-slate-500 font-mono">{attack.hebrew}</span>
                            </div>
                        </div>

                        <p className="text-slate-300 mb-6 h-16">{attack.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {attack.impact.map(i => <CiaImpactBadge key={i} type={i} />)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-slate-800/50">
                            <div>
                                <span className="block text-slate-500 text-xs font-bold mb-1">דוגמה:</span>
                                <span className="text-slate-300">{attack.realWorld}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs font-bold mb-1">הגנה:</span>
                                <span className="text-emerald-400">{attack.protection}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CommonAttacks;
