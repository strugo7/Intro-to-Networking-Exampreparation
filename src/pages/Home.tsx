import { Lock, BookOpen, Layers, Globe, Zap, Share2, ArrowLeftRight, AppWindow, Shield, Cloud } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getModules } from '../data';
import { TRANSLATIONS } from '../data/translations';
import { UserProgress } from '../types';

// Helper to map icon names to Lucide components
const IconMap: any = { Globe, Layers, Zap, Share2, ArrowLeftRight, AppWindow, Shield, Cloud };

const getIcon = (iconName: string) => {
    const Icon = IconMap[iconName] || BookOpen;
    return <Icon size={24} className="text-white" />;
};

export const Home = () => {
    const { lang, progress } = useAppContext();
    const t = TRANSLATIONS[lang];
    const isRTL = lang === 'he';
    const modules = getModules(lang);
    const navigate = useNavigate();

    const level = Math.floor(progress.completedModules.length / 2) + 1;

    const handleModuleClick = (id: string, isLocked: boolean) => {
        if (isLocked) return;
        navigate(`/module/${id}`);
    };

    return (
        <div className="flex flex-col grow font-sans">
            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                <div className="flex flex-col max-w-[1200px] flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pb-6 pt-2">
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">{t.myPath}</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.pathDesc}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-card-dark px-3 py-1.5 rounded-full border border-slate-200 dark:border-card-border">
                            <Trophy size={18} />
                            <span>{t.level} {level}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {modules.map((module) => {
                            const isCompleted = progress.completedModules.includes(module.id);
                            const isLocked = false; // logic to be added

                            if (isLocked) {
                                return (
                                    <div key={module.id} className="flex flex-col rounded-xl border border-slate-200 dark:border-card-border bg-slate-50 dark:bg-card-dark/50 overflow-hidden shadow-none opacity-75 select-none relative h-full">
                                        <div className="flex flex-col flex-1 p-5 gap-4">
                                            <h3 className="text-slate-700 dark:text-slate-300 text-xl font-bold">{module.title}</h3>
                                            <button className="w-full mt-auto cursor-not-allowed items-center justify-center rounded-lg h-10 px-4 bg-slate-300 dark:bg-slate-700 text-slate-500 text-sm font-bold flex gap-2" disabled>
                                                <Lock size={16} /> <span>{t.locked}</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div key={module.id} onClick={() => handleModuleClick(module.id, isLocked)} className={`flex flex-col rounded-xl border border-slate-200 dark:border-card-border bg-white dark:bg-card-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer h-full`}>
                                    <div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(0deg, rgba(16, 22, 34, 0.8) 0%, rgba(16, 22, 34, 0.2) 100%), url("${module.image}")` }}>
                                        <div className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'}`}>
                                            <div className={`p-2 rounded-lg inline-flex items-center justify-center mb-1 shadow-lg ${isCompleted ? 'bg-slate-700' : 'bg-primary'}`}>
                                                {getIcon(module.icon)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 p-5 gap-4">
                                        <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">{module.title}</h3>
                                        <button className={`w-full mt-auto cursor-pointer items-center justify-center rounded-lg h-10 px-4 text-sm font-bold transition-colors flex gap-2 ${isCompleted ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'bg-primary text-white'}`}>
                                            {isCompleted ? t.review : t.continue}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
