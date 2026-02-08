import { useState } from 'react';
import {
    TrendingUp, Zap, Shield, Clock, DollarSign, Globe,
    Activity, AlertTriangle, Eye, FileWarning, Scale,
    ChevronDown, Server, Cloud, Users, Lock, Database
} from 'lucide-react';

interface Capability {
    id: string;
    name: string;
    hebrewName: string;
    icon: any;
    color: string;
    description: string;
    cloudBenefit: string;
    onpremChallenge: string;
}

const capabilities: Capability[] = [
    {
        id: 'scalability',
        name: 'Scalability & Elasticity',
        hebrewName: 'סקלביליות וגמישות',
        icon: TrendingUp,
        color: 'blue',
        description: 'היכולת להגדיל או להקטין משאבים בהתאם לביקוש. Elasticity = הקצאה אוטומטית בזמן אמת.',
        cloudBenefit: 'משאבים לפי דרישה (On-demand), הרחבה אוטומטית, ללא התחייבות מראש',
        onpremChallenge: 'צריך לקנות חומרה מראש, זמן הקמה ארוך, קשה להתאים לשינויים'
    },
    {
        id: 'availability',
        name: 'High Availability',
        hebrewName: 'זמינות גבוהה',
        icon: Activity,
        color: 'emerald',
        description: 'הבטחה שהמערכת תהיה זמינה ופועלת כמעט תמיד, עם זמני השבתה מינימליים.',
        cloudBenefit: 'זמינות מובנית (Built-in), פריסה גלובלית, יתירות אוטומטית',
        onpremChallenge: 'דורש מומחיות גבוהה, ציוד יקר, תחזוקה מורכבת'
    },
    {
        id: 'dr',
        name: 'Disaster Recovery',
        hebrewName: 'התאוששות מאסון',
        icon: Shield,
        color: 'purple',
        description: 'היכולת להתאושש מכשלים חמורים (אסונות טבע, תקיפות) ולהחזיר את המערכת לפעולה.',
        cloudBenefit: 'DR מובנה כחלק מהשירות, גיבויים אוטומטיים, אתרי DR בעלות נמוכה',
        onpremChallenge: 'הקמת אתר DR יקרה ומורכבת, דורש תחזוקה כפולה'
    },
    {
        id: 'cost',
        name: 'Pay-as-you-go',
        hebrewName: 'תשלום לפי שימוש',
        icon: DollarSign,
        color: 'amber',
        description: 'מודל תשלום שבו משלמים רק על מה שצורכים בפועל, ללא השקעה הונית מראש.',
        cloudBenefit: 'אין CAPEX (השקעה הונית), רק OPEX (הוצאות שוטפות), חיזוי עלויות קל',
        onpremChallenge: 'השקעה גדולה מראש, עלויות תחזוקה קבועות גם כשלא משתמשים'
    },
    {
        id: 'deployment',
        name: 'Fast Deployment',
        hebrewName: 'פריסה מהירה',
        icon: Clock,
        color: 'cyan',
        description: 'היכולת להקים ולפרוס מערכות חדשות בזמן קצר מאוד (דקות במקום שבועות).',
        cloudBenefit: 'הקמת שרת בדקות, Time-to-Market קצר, ניסוי מהיר',
        onpremChallenge: 'הזמנת ציוד, הובלה, התקנה - שבועות עד חודשים'
    },
    {
        id: 'global',
        name: 'Global Accessibility',
        hebrewName: 'נגישות גלובלית',
        icon: Globe,
        color: 'pink',
        description: 'גישה למשאבים מכל מקום בעולם דרך האינטרנט.',
        cloudBenefit: 'נקודות נוכחות (PoP) ברחבי העולם, CDN מובנה, עבודה מרחוק קלה',
        onpremChallenge: 'מוגבל למיקום פיזי, צורך ב-VPN, ביצועים ירודים מרחוק'
    },
];

interface SecurityConcern {
    id: string;
    name: string;
    hebrewName: string;
    icon: any;
    color: string;
    description: string;
    quote?: string;
}

const securityConcerns: SecurityConcern[] = [
    {
        id: 'control',
        name: 'Loss of Control',
        hebrewName: 'אובדן שליטה',
        icon: Eye,
        color: 'red',
        description: 'הנתונים והאפליקציות נמצאים אצל צד שלישי. ניהול זהויות והרשאות בידי הספק.'
    },
    {
        id: 'multitenancy',
        name: 'Multi-tenancy',
        hebrewName: 'ריבוי דיירים',
        icon: Users,
        color: 'amber',
        description: 'מספר לקוחות חולקים את אותה חומרה פיזית - סיכון לזליגת מידע או התקפות בין דיירים.'
    },
    {
        id: 'cia',
        name: 'CIA Triad Concerns',
        hebrewName: 'חששות CIA',
        icon: Lock,
        color: 'purple',
        description: 'פגיעה פוטנציאלית בסודיות (Confidentiality), שלמות (Integrity) וזמינות (Availability) של המידע.'
    },
];

const CloudCapabilities = () => {
    const [activeCapability, setActiveCapability] = useState<string>('scalability');
    const [showSecurityConcerns, setShowSecurityConcerns] = useState(false);

    const currentCapability = capabilities.find(c => c.id === activeCapability)!;
    const CapIcon = currentCapability.icon;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    יכולות הענן: <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">מה הענן נותן לנו?</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Cloud Capabilities - היתרונות שהופכים את הענן לאטרקטיבי
                </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {capabilities.map((cap) => {
                    const Icon = cap.icon;
                    const isActive = activeCapability === cap.id;

                    return (
                        <button
                            key={cap.id}
                            onClick={() => setActiveCapability(cap.id)}
                            className={`group p-4 rounded-2xl transition-all duration-300 ${isActive
                                    ? `bg-${cap.color}-500/20 border-2 border-${cap.color}-500 scale-105`
                                    : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                                }`}
                            style={{
                                backgroundColor: isActive ? `var(--${cap.color}-500-20)` : undefined,
                                borderColor: isActive ? `var(--${cap.color}-500)` : undefined,
                            }}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all ${isActive ? `bg-${cap.color}-500` : 'bg-slate-700 group-hover:bg-slate-600'
                                }`}
                                style={{
                                    backgroundColor: isActive ? `rgb(var(--color-${cap.color}-500))` : undefined,
                                }}>
                                <Icon size={24} className={isActive ? 'text-white' : 'text-slate-300'} />
                            </div>
                            <div className="text-center">
                                <div className="text-xs font-bold text-white mb-1">{cap.hebrewName}</div>
                                <div className="text-xs text-slate-500">{cap.name}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Active Capability Details */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Main Info */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-4 rounded-2xl bg-gradient-to-br from-${currentCapability.color}-500 to-${currentCapability.color}-600`}
                                style={{
                                    background: `linear-gradient(135deg, rgb(var(--color-${currentCapability.color}-500)), rgb(var(--color-${currentCapability.color}-600)))`
                                }}>
                                <CapIcon size={32} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{currentCapability.hebrewName}</h3>
                                <p className="text-slate-400">{currentCapability.name}</p>
                            </div>
                        </div>

                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            {currentCapability.description}
                        </p>

                        {/* Scalability Animation */}
                        {activeCapability === 'scalability' && (
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                                <h4 className="text-white font-bold mb-4">📈 הדגמת סקלביליות</h4>
                                <div className="flex items-end gap-2 h-24">
                                    {[1, 2, 3, 5, 8, 5, 3, 2, 4, 6, 4].map((height, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t transition-all duration-500"
                                            style={{
                                                height: `${height * 10}%`,
                                                animationDelay: `${i * 100}ms`
                                            }}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-500 text-sm mt-4 text-center">
                                    הענן מתאים את המשאבים אוטומטית לפי העומס
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: Comparison */}
                    <div className="space-y-6">
                        {/* Cloud Benefit */}
                        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Cloud className="text-emerald-400" size={24} />
                                <h4 className="font-bold text-emerald-400">בענן</h4>
                            </div>
                            <p className="text-slate-300">{currentCapability.cloudBenefit}</p>
                        </div>

                        {/* On-Prem Challenge */}
                        <div className="bg-amber-900/20 border border-amber-500/30 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Server className="text-amber-400" size={24} />
                                <h4 className="font-bold text-amber-400">ב-On-Premise</h4>
                            </div>
                            <p className="text-slate-300">{currentCapability.onpremChallenge}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Concerns Section */}
            <div className="bg-red-900/10 rounded-3xl border border-red-500/20 overflow-hidden">
                <button
                    onClick={() => setShowSecurityConcerns(!showSecurityConcerns)}
                    className="w-full p-6 flex items-center justify-between hover:bg-red-900/10 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                            <AlertTriangle className="text-red-400" size={24} />
                        </div>
                        <div className="text-right">
                            <h3 className="text-xl font-bold text-white">
                                אז למה לא כולם עוברים לענן? 🤔
                            </h3>
                            <p className="text-slate-400 text-sm">החששות והסיכונים של מחשוב ענן</p>
                        </div>
                    </div>
                    <ChevronDown className={`text-red-400 transition-transform ${showSecurityConcerns ? 'rotate-180' : ''}`} size={24} />
                </button>

                {showSecurityConcerns && (
                    <div className="p-6 pt-0 space-y-6 animate-in slide-in-from-top-4">
                        <div className="grid md:grid-cols-3 gap-6">
                            {securityConcerns.map((concern) => {
                                const Icon = concern.icon;
                                return (
                                    <div
                                        key={concern.id}
                                        className={`bg-${concern.color}-900/20 border border-${concern.color}-500/30 rounded-2xl p-6`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 bg-${concern.color}-500/20 rounded-lg`}>
                                                <Icon size={20} className={`text-${concern.color}-400`} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{concern.hebrewName}</h4>
                                                <p className="text-xs text-slate-500">{concern.name}</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-300 text-sm">{concern.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* John Chambers Quote */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border-r-4 border-red-500">
                            <blockquote className="text-slate-300 italic text-lg mb-4">
                                "Cloud Computing is a security nightmare and it can't be handled in traditional ways."
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                                    <Users size={20} className="text-slate-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">John Chambers</div>
                                    <div className="text-sm text-slate-500">CEO, Cisco</div>
                                </div>
                            </div>
                        </div>

                        {/* MITRE Reference */}
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="text-purple-400" size={20} />
                                <h4 className="font-bold text-purple-300">MITRE ATT&CK for Cloud</h4>
                            </div>
                            <p className="text-slate-300 text-sm">
                                מסגרת MITRE מגדירה טקטיקות וטכניקות תקיפה ספציפיות לסביבות ענן.
                                חשוב להכיר אותה כדי להגן על משאבי הענן שלכם.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-500/30 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Scale className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-2">💡 סיכום למבחן</h4>
                        <p className="text-slate-300">
                            הענן מציע יתרונות משמעותיים: <strong className="text-cyan-300">Scalability</strong>,
                            <strong className="text-emerald-300"> High Availability</strong>,
                            <strong className="text-purple-300"> Disaster Recovery מובנה</strong>,
                            <strong className="text-amber-300"> Pay-as-you-go</strong> ו-
                            <strong className="text-pink-300">פריסה מהירה</strong>.
                            אבל יש גם חששות: <strong className="text-red-300">אובדן שליטה, Multi-tenancy ואתגרי אבטחה</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloudCapabilities;
