import { useState } from 'react';
import { Cloud, Building2, Globe, Lock, Users, Shield, Shuffle, CheckCircle, XCircle, ArrowRight, Zap, Server, Eye, DollarSign, Settings } from 'lucide-react';

type DeploymentType = 'public' | 'private' | 'hybrid';

interface DeploymentModel {
    id: DeploymentType;
    name: string;
    hebrewName: string;
    icon: any;
    color: string;
    gradient: string;
    description: string;
    whoUses: string[];
    pros: string[];
    cons: string[];
    examples: string[];
}

const deploymentModels: DeploymentModel[] = [
    {
        id: 'public',
        name: 'Public Cloud',
        hebrewName: 'ענן ציבורי',
        icon: Globe,
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-600',
        description: 'תשתית משותפת הזמינה לציבור הרחב. המשאבים נמצאים בבעלות ספק חיצוני וומשותפים בין לקוחות רבים.',
        whoUses: [
            'סטארטאפים שרוצים להתחיל מהר',
            'חברות עם עומסים משתנים',
            'אפליקציות Web גלובליות',
            'פרויקטים זמניים או בדיקות',
        ],
        pros: [
            'עלות התחלתית נמוכה מאוד',
            'סקלביליות כמעט אינסופית',
            'אין צורך בתחזוקת חומרה',
            'גישה גלובלית מיידית',
            'שדרוגים אוטומטיים',
        ],
        cons: [
            'פחות שליטה על התשתית',
            'חששות פרטיות (Multi-tenancy)',
            'תלות בספק אחד (Vendor Lock-in)',
            'עלויות יכולות לגדול מהר',
        ],
        examples: ['AWS', 'Microsoft Azure', 'Google Cloud Platform'],
    },
    {
        id: 'private',
        name: 'Private Cloud',
        hebrewName: 'ענן פרטי',
        icon: Lock,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-600',
        description: 'תשתית ענן המוקדשת אך ורק לארגון אחד. יכולה להיות מנוהלת באתר הלקוח (On-Premise) או אצל ספק חיצוני.',
        whoUses: [
            'ארגונים פיננסיים וביטוח',
            'מוסדות ממשלתיים',
            'חברות עם דרישות Compliance מחמירות',
            'ארגוני בריאות (HIPAA)',
        ],
        pros: [
            'שליטה מלאה על התשתית והנתונים',
            'אבטחה ופרטיות מירביות',
            'התאמה אישית מלאה',
            'עמידה ברגולציות מחמירות',
            'ביצועים צפויים וקבועים',
        ],
        cons: [
            'עלות גבוהה של הקמה ותחזוקה',
            'דורש מומחיות פנימית',
            'סקלביליות מוגבלת',
            'זמן פריסה ארוך יותר',
        ],
        examples: ['VMware Private Cloud', 'OpenStack', 'Azure Stack'],
    },
    {
        id: 'hybrid',
        name: 'Hybrid Cloud',
        hebrewName: 'ענן היברידי',
        icon: Shuffle,
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-600',
        description: 'שילוב של ענן ציבורי ופרטי. מאפשר גמישות - מידע רגיש בפרטי, עומסי עבודה אחרים בציבורי.',
        whoUses: [
            'ארגונים גדולים עם צרכים מגוונים',
            'חברות במעבר הדרגתי לענן',
            'ארגונים עם תנועה עונתית',
            'חברות עם מידע רגיש וגם ציבורי',
        ],
        pros: [
            'הטוב משני העולמות',
            'גמישות מירבית',
            'שליטה על מידע רגיש',
            'אופטימיזציה של עלויות',
            'מעבר הדרגתי לענן',
        ],
        cons: [
            'מורכבות בניהול',
            'אתגרי אינטגרציה',
            'דרישות אבטחה מורכבות',
            'צורך במומחיות רחבה',
        ],
        examples: ['AWS Outposts', 'Azure Arc', 'Google Anthos'],
    },
];

const DeploymentModels = () => {
    const [activeModel, setActiveModel] = useState<DeploymentType>('public');
    const [hoveredModel, setHoveredModel] = useState<DeploymentType | null>(null);

    const currentModel = deploymentModels.find(m => m.id === activeModel)!;
    const ModelIcon = currentModel.icon;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    סוגי עננים: <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">איזה ענן מתאים לך?</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Deployment Models - כל סוג ענן מתאים למצבים וארגונים שונים
                </p>
            </div>

            {/* Interactive Visual */}
            <div className="relative bg-slate-900/50 rounded-3xl border border-slate-700/50 p-8 md:p-12 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-500 rounded-full blur-3xl" />
                </div>

                <div className="relative grid md:grid-cols-3 gap-6">
                    {deploymentModels.map((model) => {
                        const Icon = model.icon;
                        const isActive = activeModel === model.id;
                        const isHovered = hoveredModel === model.id;

                        return (
                            <div
                                key={model.id}
                                onClick={() => setActiveModel(model.id)}
                                onMouseEnter={() => setHoveredModel(model.id)}
                                onMouseLeave={() => setHoveredModel(null)}
                                className={`group cursor-pointer transition-all duration-500 rounded-3xl p-6 ${isActive
                                        ? `bg-gradient-to-br ${model.gradient} shadow-2xl scale-105 z-10`
                                        : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all ${isActive
                                        ? 'bg-white/20'
                                        : `bg-gradient-to-br ${model.gradient}`
                                    }`}>
                                    <Icon size={40} className="text-white" />
                                </div>

                                {/* Title */}
                                <h3 className={`text-xl font-bold text-center mb-2 ${isActive ? 'text-white' : 'text-white'}`}>
                                    {model.name}
                                </h3>
                                <p className={`text-center text-sm mb-4 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                                    {model.hebrewName}
                                </p>

                                {/* Mini description */}
                                <p className={`text-center text-sm ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                                    {model.id === 'public' && '🌍 משותף לכולם'}
                                    {model.id === 'private' && '🔒 ייעודי לארגון אחד'}
                                    {model.id === 'hybrid' && '🔀 שילוב של שניהם'}
                                </p>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="mt-4 flex justify-center">
                                        <CheckCircle className="text-white" size={24} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Info */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Diagram */}
                <div className={`bg-gradient-to-br ${currentModel.gradient} p-1 rounded-3xl`}>
                    <div className="bg-slate-900 rounded-[22px] p-8 h-full">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">
                            ויזואליזציה: {currentModel.name}
                        </h3>

                        <div className="flex justify-center items-center min-h-[250px]">
                            {activeModel === 'public' && (
                                <div className="text-center">
                                    <div className="relative inline-block">
                                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-2 border-blue-400/50 flex items-center justify-center">
                                            <Cloud size={64} className="text-blue-400" />
                                        </div>
                                        {/* Multiple users around */}
                                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-10 h-10 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center"
                                                style={{
                                                    top: `${50 + 45 * Math.sin(angle * Math.PI / 180)}%`,
                                                    left: `${50 + 45 * Math.cos(angle * Math.PI / 180)}%`,
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                <Users size={16} className="text-blue-400" />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-slate-400 mt-4 text-sm">ארגונים רבים משתמשים באותה תשתית</p>
                                </div>
                            )}

                            {activeModel === 'private' && (
                                <div className="text-center">
                                    <div className="relative inline-block">
                                        <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 p-4">
                                            <div className="h-full rounded-xl border-2 border-dashed border-purple-400/50 flex flex-col items-center justify-center gap-2">
                                                <Lock size={32} className="text-purple-400" />
                                                <Building2 size={32} className="text-purple-300" />
                                            </div>
                                        </div>
                                        <div className="absolute -top-2 -right-2 px-2 py-1 bg-purple-500 rounded-full text-xs text-white font-bold">
                                            ארגון אחד
                                        </div>
                                    </div>
                                    <p className="text-slate-400 mt-4 text-sm">תשתית ייעודית לארגון בלבד</p>
                                </div>
                            )}

                            {activeModel === 'hybrid' && (
                                <div className="text-center">
                                    <div className="flex items-center gap-4">
                                        {/* Private side */}
                                        <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-400/50 flex flex-col items-center justify-center">
                                            <Lock size={24} className="text-purple-400 mb-2" />
                                            <span className="text-xs text-purple-300">Private</span>
                                            <span className="text-xs text-slate-500">מידע רגיש</span>
                                        </div>

                                        {/* Connection */}
                                        <div className="flex flex-col items-center">
                                            <Shuffle className="text-emerald-400 animate-pulse" size={24} />
                                            <div className="text-xs text-slate-500 mt-1">חיבור</div>
                                        </div>

                                        {/* Public side */}
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/50 flex flex-col items-center justify-center">
                                            <Globe size={24} className="text-blue-400 mb-2" />
                                            <span className="text-xs text-blue-300">Public</span>
                                            <span className="text-xs text-slate-500">עומסים גמישים</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 mt-4 text-sm">שילוב גמיש לפי הצורך</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                    {/* Description */}
                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${currentModel.gradient}`}>
                                <ModelIcon size={24} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">{currentModel.name}</h4>
                                <p className="text-slate-400 text-sm">{currentModel.hebrewName}</p>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{currentModel.description}</p>
                    </div>

                    {/* Who Uses */}
                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Users size={18} className="text-blue-400" />
                            מי משתמש?
                        </h4>
                        <ul className="space-y-2">
                            {currentModel.whoUses.map((user, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                    <ArrowRight size={14} className={`text-${currentModel.color}-400`} />
                                    {user}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-4">
                            <h5 className="font-bold text-emerald-400 mb-3 flex items-center gap-2 text-sm">
                                <CheckCircle size={16} /> יתרונות
                            </h5>
                            <ul className="space-y-1">
                                {currentModel.pros.slice(0, 3).map((pro, i) => (
                                    <li key={i} className="text-slate-300 text-xs flex items-start gap-2">
                                        <span className="text-emerald-400 mt-1">•</span>
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4">
                            <h5 className="font-bold text-red-400 mb-3 flex items-center gap-2 text-sm">
                                <XCircle size={16} /> חסרונות
                            </h5>
                            <ul className="space-y-1">
                                {currentModel.cons.slice(0, 3).map((con, i) => (
                                    <li key={i} className="text-slate-300 text-xs flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                        {currentModel.examples.map((example, i) => (
                            <span
                                key={i}
                                className={`px-4 py-2 rounded-full bg-gradient-to-r ${currentModel.gradient} text-white text-sm font-medium`}
                            >
                                {example}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Community Cloud Note */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Users className="text-amber-400" size={20} />
                    📚 בונוס: Community Cloud
                </h4>
                <p className="text-slate-300">
                    קיים גם מודל נוסף שנקרא <strong className="text-amber-300">Community Cloud</strong> -
                    ענן שמשותף בין מספר ארגונים עם צרכים דומים (למשל, כמה בנקים או מוסדות ממשלתיים).
                    הוא מהווה פשרה בין Public ל-Private.
                </p>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-500/30 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Zap className="text-blue-400" size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-2">💡 נקודה חשובה למבחן</h4>
                        <p className="text-slate-300">
                            <strong className="text-blue-300">Public Cloud</strong> = משאבים משותפים, עלות נמוכה, סקלביליות.
                            <strong className="text-purple-300"> Private Cloud</strong> = שליטה מלאה, אבטחה מירבית, Compliance.
                            <strong className="text-emerald-300"> Hybrid</strong> = הטוב משני העולמות, מורכבות גבוהה יותר.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeploymentModels;
