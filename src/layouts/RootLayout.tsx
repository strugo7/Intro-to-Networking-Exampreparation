import { Network, Sun, Moon } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';

export const RootLayout = () => {
    const { lang, setLang, theme, setTheme } = useAppContext();
    const t = TRANSLATIONS[lang];
    const isRTL = lang === Language.HE;
    const location = useLocation();

    // Active link helper
    const isActive = (path: string) => location.pathname === path ? 'text-primary dark:text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white';

    return (
        <div className={`flex flex-col min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-white`} dir={isRTL ? 'rtl' : 'ltr'}>
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-card-border bg-white dark:bg-[#111318] px-4 md:px-10 py-3 shadow-sm font-sans">
                <Link to="/" className="flex items-center gap-4 text-slate-900 dark:text-white cursor-pointer">
                    <div className="size-8 text-primary">
                        <Network size={32} />
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">NetAcademy</h2>
                </Link>

                <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                    <nav className="hidden md:flex items-center gap-9">
                        <Link to="/" className={`text-sm font-medium leading-normal transition-colors ${isActive('/')}`}>
                            {t.home}
                        </Link>
                        <Link to="/practice/binary" className={`text-sm font-medium leading-normal transition-colors ${isActive('/practice/binary')}`}>
                            {t.binaryPractice}
                        </Link>
                        <Link to="/glossary" className={`text-sm font-medium leading-normal transition-colors ${isActive('/glossary')}`}>
                            {t.glossary}
                        </Link>
                        <Link to="/practice/subnet-academy" className={`text-sm font-medium leading-normal transition-colors ${isActive('/practice/subnet-academy')}`}>
                            Subnet Academy
                        </Link>
                        {/* Exam Link */}
                        <Link to="/practice/exam" className={`text-sm font-medium leading-normal transition-colors ${isActive('/practice/exam')}`}>
                            Exam Simulator
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setLang(lang === Language.EN ? Language.HE : Language.EN)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-card-border transition-colors"
                        >
                            {lang === Language.EN ? 'EN' : 'HE'}
                        </button>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-card-border transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}
