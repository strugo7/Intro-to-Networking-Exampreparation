import { useState } from 'react';
import { Cloud, Server, Building2, Globe, Zap, Shield, DollarSign, Clock, ArrowRight, CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react';

const CloudIntro = () => {
    const [activeComparison, setActiveComparison] = useState<'cloud' | 'onprem' | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    const cloudPros = [
        { icon: DollarSign, text: 'עלות התחלתית נמוכה (Pay-as-you-go)', color: 'emerald' },
        { icon: Zap, text: 'סקלביליות וגמישות גבוהה', color: 'blue' },
        { icon: Clock, text: 'פריסה מהירה ו-Time to Market קצר', color: 'purple' },
        { icon: Shield, text: 'זמינות ו-Disaster Recovery מובנים', color: 'cyan' },
        { icon: Cloud, text: 'תקורה תפעולית מופחתת', color: 'pink' },
    ];

    const cloudCons = [
        { text: 'פחות שליטה על התשתית', color: 'amber' },
        { text: 'תלות בחיבור לאינטרנט', color: 'amber' },
        { text: 'עלויות תפעוליות שוטפות', color: 'amber' },
        { text: 'אחריות משותפת לאבטחה', color: 'amber' },
        { text: 'חששות לגבי מיקום הנתונים', color: 'amber' },
    ];

    const onpremPros = [
        { icon: Shield, text: 'שליטה מלאה על מערכות ונתונים', color: 'emerald' },
        { icon: Building2, text: 'התאמה אישית וגמישות גבוהה', color: 'blue' },
        { icon: CheckCircle, text: 'קל יותר לאכוף Compliance מחמיר', color: 'purple' },
        { icon: WifiOff, text: 'אין תלות בחיבור אינטרנט', color: 'cyan' },
        { icon: DollarSign, text: 'עלויות צפויות לטווח ארוך', color: 'pink' },
    ];

    const onpremCons = [
        { text: 'השקעה הונית גבוהה מראש', color: 'red' },
        { text: 'סקלביליות מוגבלת', color: 'red' },
        { text: 'זמני פריסה ארוכים', color: 'red' },
        { text: 'דורש תחזוקה ומומחיות פנימית', color: 'red' },
        { text: 'Disaster Recovery יקר ומורכב', color: 'red' },
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 p-12">
                {/* Animated clouds background */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute opacity-10"
                            style={{
                                left: `${(i * 20) % 100}%`,
                                top: `${(i * 15) % 80}%`,
                                animation: `float ${8 + i * 2}s ease-in-out infinite`,
                                animationDelay: `${i * 0.5}s`,
                            }}
                        >
                            <Cloud size={80 + i * 20} className="text-white" />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
                        <Cloud className="text-blue-400" size={24} />
                        <span className="text-blue-200 font-medium">Cloud Computing</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        מהו <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">מחשוב ענן</span>?
                    </h2>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        מודל מחשוב שבו משאבי IT (שרתים, אחסון, רשתות, אפליקציות) מסופקים דרך האינטרנט 
                        על ידי ספק צד שלישי, במודל תשלום לפי שימוש.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>

            {/* Interactive Comparison Section */}
            <div className="bg-slate-900/50 rounded-3xl border border-slate-700/50 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-white text-center mb-8">
                    השוואה: <span className="text-blue-400">ענן</span> מול <span className="text-amber-400">תשתית מקומית</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Cloud Card */}
                    <div
                        onClick={() => setActiveComparison(activeComparison === 'cloud' ? null : 'cloud')}
                        className={`group cursor-pointer transition-all duration-500 rounded-2xl border-2 p-6 ${
                            activeComparison === 'cloud'
                                ? 'bg-blue-900/30 border-blue-500 scale-[1.02]'
                                : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
                        }`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                                <Cloud size={32} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Cloud Computing</h4>
                                <p className="text-slate-400 text-sm">מחשוב ענן</p>
                            </div>
                            <ArrowRight className={`mr-auto text-blue-400 transition-transform ${activeComparison === 'cloud' ? 'rotate-90' : ''}`} />
                        </div>

                        <p className="text-slate-300 mb-6">
                            משאבי IT מסופקים על ידי ספק צד שלישי דרך האינטרנט. תשלום לפי שימוש בלבד.
                        </p>

                        {activeComparison === 'cloud' && (
                            <div className="space-y-6 animate-in slide-in-from-top-4">
                                <div>
                                    <h5 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                        <CheckCircle size={18} /> יתרונות
                                    </h5>
                                    <ul className="space-y-2">
                                        {cloudPros.map((pro, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                                <pro.icon size={16} className="text-emerald-400" />
                                                {pro.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                                        <XCircle size={18} /> חסרונות
                                    </h5>
                                    <ul className="space-y-2">
                                        {cloudCons.map((con, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                {con.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* On-Premise Card */}
                    <div
                        onClick={() => setActiveComparison(activeComparison === 'onprem' ? null : 'onprem')}
                        className={`group cursor-pointer transition-all duration-500 rounded-2xl border-2 p-6 ${
                            activeComparison === 'onprem'
                                ? 'bg-amber-900/30 border-amber-500 scale-[1.02]'
                                : 'bg-slate-800/50 border-slate-700 hover:border-amber-500/50'
                        }`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
                                <Server size={32} className="text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">On-Premises</h4>
                                <p className="text-slate-400 text-sm">תשתית מקומית</p>
                            </div>
                            <ArrowRight className={`mr-auto text-amber-400 transition-transform ${activeComparison === 'onprem' ? 'rotate-90' : ''}`} />
                        </div>

                        <p className="text-slate-300 mb-6">
                            כל תשתית ה-IT ממוקמת, נרכשת ומנוהלת בתוך מתקני הארגון עצמו.
                        </p>

                        {activeComparison === 'onprem' && (
                            <div className="space-y-6 animate-in slide-in-from-top-4">
                                <div>
                                    <h5 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                        <CheckCircle size={18} /> יתרונות
                                    </h5>
                                    <ul className="space-y-2">
                                        {onpremPros.map((pro, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                                <pro.icon size={16} className="text-emerald-400" />
                                                {pro.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                                        <XCircle size={18} /> חסרונות
                                    </h5>
                                    <ul className="space-y-2">
                                        {onpremCons.map((con, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                {con.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center text-slate-500 text-sm mt-6">
                    💡 לחץ על כל כרטיס כדי לראות את היתרונות והחסרונות
                </p>
            </div>

            {/* Visual Comparison */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-white text-center mb-10">
                    ויזואליזציה: איפה המשאבים נמצאים?
                </h3>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Cloud Visual */}
                    <div className="text-center">
                        <h4 className="text-lg font-bold text-blue-400 mb-6">☁️ Cloud Computing</h4>
                        <div className="relative">
                            {/* User */}
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                    <Building2 size={32} className="text-slate-400" />
                                    <p className="text-xs text-slate-500 mt-1">הארגון שלך</p>
                                </div>
                            </div>
                            
                            {/* Connection */}
                            <div className="flex justify-center my-2">
                                <div className="flex flex-col items-center">
                                    <Wifi size={20} className="text-blue-400 animate-pulse" />
                                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-purple-400" />
                                    <Globe size={20} className="text-purple-400" />
                                </div>
                            </div>
                            
                            {/* Cloud */}
                            <div className="flex justify-center mt-4">
                                <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30 backdrop-blur">
                                    <Cloud size={48} className="text-blue-400 mx-auto mb-2" />
                                    <p className="text-sm text-blue-300 font-medium">ספק הענן</p>
                                    <div className="flex gap-2 justify-center mt-3">
                                        <Server size={16} className="text-slate-400" />
                                        <Server size={16} className="text-slate-400" />
                                        <Server size={16} className="text-slate-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* On-Premise Visual */}
                    <div className="text-center">
                        <h4 className="text-lg font-bold text-amber-400 mb-6">🏢 On-Premises</h4>
                        <div className="relative">
                            <div className="p-6 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-2xl border border-amber-500/30">
                                <Building2 size={48} className="text-amber-400 mx-auto mb-4" />
                                <p className="text-sm text-amber-300 font-medium mb-4">הארגון שלך</p>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                    <p className="text-xs text-slate-400 mb-2">חדר שרתים פנימי</p>
                                    <div className="flex gap-2 justify-center">
                                        <Server size={20} className="text-amber-400" />
                                        <Server size={20} className="text-amber-400" />
                                        <Server size={20} className="text-amber-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                            הענן לא תמיד עדיף! הבחירה בין Cloud ל-On-Premise תלויה בצרכי הארגון: 
                            <strong className="text-blue-300"> אם צריכים גמישות ופריסה מהירה</strong> - ענן. 
                            <strong className="text-amber-300"> אם צריכים שליטה מלאה ו-Compliance מחמיר</strong> - On-Premise.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                    75% { transform: translateY(-25px) translateX(5px); }
                }
            `}</style>
        </div>
    );
};

export default CloudIntro;
