import { useState } from 'react';
import { Cloud, Server, Code, Package, Database, Monitor, User, Shield, Settings, HardDrive, Network, Layers, ChevronDown, CheckCircle } from 'lucide-react';

interface ServiceLayer {
    name: string;
    hebrewName: string;
    icon: any;
    color: string;
}

const layers: ServiceLayer[] = [
    { name: 'Applications', hebrewName: 'אפליקציות', icon: Monitor, color: 'purple' },
    { name: 'Data', hebrewName: 'נתונים', icon: Database, color: 'blue' },
    { name: 'Runtime', hebrewName: 'סביבת הרצה', icon: Code, color: 'cyan' },
    { name: 'Middleware', hebrewName: 'Middleware', icon: Layers, color: 'teal' },
    { name: 'Operating System', hebrewName: 'מערכת הפעלה', icon: Settings, color: 'green' },
    { name: 'Virtualization', hebrewName: 'וירטואליזציה', icon: Package, color: 'lime' },
    { name: 'Servers', hebrewName: 'שרתים', icon: Server, color: 'yellow' },
    { name: 'Storage', hebrewName: 'אחסון', icon: HardDrive, color: 'orange' },
    { name: 'Networking', hebrewName: 'רשתות', icon: Network, color: 'red' },
];

type ModelType = 'onprem' | 'iaas' | 'paas' | 'saas';

interface ModelInfo {
    id: ModelType;
    name: string;
    hebrewName: string;
    description: string;
    examples: string[];
    customerManages: number; // Number of layers customer manages (from top)
    color: string;
    gradient: string;
}

const models: ModelInfo[] = [
    {
        id: 'onprem',
        name: 'On-Premises',
        hebrewName: 'תשתית מקומית',
        description: 'הארגון מנהל הכל - מהחומרה ועד האפליקציות. שליטה מלאה אך אחריות מלאה.',
        examples: ['שרתים פיזיים בארגון', 'חדר שרתים פנימי'],
        customerManages: 9,
        color: 'amber',
        gradient: 'from-amber-500 to-orange-600'
    },
    {
        id: 'iaas',
        name: 'IaaS',
        hebrewName: 'תשתית כשירות',
        description: 'הספק מנהל את החומרה הפיזית (שרתים, רשתות, אחסון). אתה מנהל את מערכת ההפעלה ומעלה.',
        examples: ['Amazon EC2', 'AWS S3', 'Azure VMs', 'Google Compute Engine'],
        customerManages: 5,
        color: 'blue',
        gradient: 'from-blue-500 to-cyan-600'
    },
    {
        id: 'paas',
        name: 'PaaS',
        hebrewName: 'פלטפורמה כשירות',
        description: 'הספק מנהל גם את הפלטפורמה (Runtime, Middleware). אתה מתמקד רק באפליקציות ובנתונים.',
        examples: ['Google App Engine', 'Heroku', 'Microsoft Azure App Service'],
        customerManages: 2,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-600'
    },
    {
        id: 'saas',
        name: 'SaaS',
        hebrewName: 'תוכנה כשירות',
        description: 'הספק מנהל הכל! אתה רק משתמש בתוכנה המוכנה ומנהל את הנתונים שלך.',
        examples: ['Gmail', 'Office 365', 'Dropbox', 'Salesforce', 'Google Docs'],
        customerManages: 1,
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-600'
    },
];

const ServiceModelsCompare = () => {
    const [activeModel, setActiveModel] = useState<ModelType>('iaas');
    const [showDetails, setShowDetails] = useState(false);

    const currentModel = models.find(m => m.id === activeModel)!;

    const getLayerStatus = (layerIndex: number): 'customer' | 'provider' => {
        const customerLayers = currentModel.customerManages;
        return layerIndex < customerLayers ? 'customer' : 'provider';
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    מודלי שירות: <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">מי אחראי על מה?</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Shared Responsibility Model - ככל שעולים במודל, הספק לוקח יותר אחריות ואתה מתמקד יותר בעסק שלך
                </p>
            </div>

            {/* Model Selector */}
            <div className="flex flex-wrap justify-center gap-4">
                {models.map((model) => (
                    <button
                        key={model.id}
                        onClick={() => setActiveModel(model.id)}
                        className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 ${activeModel === model.id
                                ? `bg-gradient-to-r ${model.gradient} shadow-lg scale-105`
                                : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className="text-center">
                            <div className="font-bold text-white text-lg">{model.name}</div>
                            <div className={`text-sm ${activeModel === model.id ? 'text-white/80' : 'text-slate-400'}`}>
                                {model.hebrewName}
                            </div>
                        </div>
                        {activeModel === model.id && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                                <ChevronDown className="text-white animate-bounce" size={20} />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Main Visualization */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Stack Visualization */}
                <div className="bg-slate-900/50 rounded-3xl border border-slate-700/50 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">
                        מי מנהל מה ב-{currentModel.name}?
                    </h3>

                    {/* Legend */}
                    <div className="flex justify-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-cyan-500" />
                            <span className="text-sm text-slate-300">אתה מנהל</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-teal-500" />
                            <span className="text-sm text-slate-300">הספק מנהל</span>
                        </div>
                    </div>

                    {/* Stack */}
                    <div className="space-y-2">
                        {layers.map((layer, index) => {
                            const status = getLayerStatus(index);
                            const LayerIcon = layer.icon;
                            return (
                                <div
                                    key={layer.name}
                                    className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${status === 'customer'
                                            ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/50'
                                            : 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border border-emerald-500/50'
                                        }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    <div className={`p-2 rounded-lg ${status === 'customer' ? 'bg-blue-500/20' : 'bg-emerald-500/20'
                                        }`}>
                                        <LayerIcon size={20} className={status === 'customer' ? 'text-blue-400' : 'text-emerald-400'} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-white">{layer.hebrewName}</div>
                                        <div className="text-xs text-slate-400">{layer.name}</div>
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${status === 'customer'
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'bg-emerald-500/20 text-emerald-300'
                                        }`}>
                                        {status === 'customer' ? (
                                            <>
                                                <User size={12} />
                                                אתה
                                            </>
                                        ) : (
                                            <>
                                                <Cloud size={12} />
                                                ספק
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Model Details */}
                <div className="space-y-6">
                    {/* Description Card */}
                    <div className={`bg-gradient-to-br ${currentModel.gradient} p-1 rounded-3xl`}>
                        <div className="bg-slate-900 rounded-[22px] p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${currentModel.gradient}`}>
                                    <Cloud size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{currentModel.name}</h3>
                                    <p className="text-slate-400">{currentModel.hebrewName}</p>
                                </div>
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                {currentModel.description}
                            </p>
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="text-emerald-400" size={20} />
                            דוגמאות מהעולם האמיתי
                        </h4>
                        <div className="flex flex-wrap gap-3">
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

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-6 text-center">
                            <div className="text-4xl font-black text-blue-400 mb-2">
                                {currentModel.customerManages}
                            </div>
                            <div className="text-slate-400 text-sm">שכבות שאתה מנהל</div>
                        </div>
                        <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-6 text-center">
                            <div className="text-4xl font-black text-emerald-400 mb-2">
                                {9 - currentModel.customerManages}
                            </div>
                            <div className="text-slate-400 text-sm">שכבות שהספק מנהל</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pizza Analogy */}
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-3xl border border-orange-500/30 p-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                    🍕 האנלוגיה של הפיצה
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30">
                        <div className="text-4xl mb-3">🏠</div>
                        <div className="font-bold text-amber-400">On-Premises</div>
                        <div className="text-sm text-slate-400 mt-2">עושים פיצה בבית - קונים, מכינים, אופים ומנקים</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-2xl border border-blue-500/30">
                        <div className="text-4xl mb-3">🥫</div>
                        <div className="font-bold text-blue-400">IaaS</div>
                        <div className="text-sm text-slate-400 mt-2">קונים ערכה מוכנה - אתה רק מכין ואופה</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-2xl border border-purple-500/30">
                        <div className="text-4xl mb-3">📦</div>
                        <div className="font-bold text-purple-400">PaaS</div>
                        <div className="text-sm text-slate-400 mt-2">פיצה קפואה - אתה רק מחמם ומוסיף תוספות</div>
                    </div>
                    <div className="text-center p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30">
                        <div className="text-4xl mb-3">🛵</div>
                        <div className="font-bold text-emerald-400">SaaS</div>
                        <div className="text-sm text-slate-400 mt-2">משלוח פיצה - אתה רק אוכל!</div>
                    </div>
                </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/30 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                        <Shield className="text-purple-400" size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-2">💡 נקודה חשובה למבחן - Shared Responsibility Model</h4>
                        <p className="text-slate-300">
                            <strong className="text-purple-300">ככל שעולים במודל (מ-IaaS ל-SaaS)</strong>, הספק לוקח יותר אחריות על התשתית והאבטחה.
                            <strong className="text-blue-300"> אבל!</strong> האחריות על <strong className="text-amber-300">הנתונים והגישה</strong> תמיד נשארת אצלך.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceModelsCompare;
