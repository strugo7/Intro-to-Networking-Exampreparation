import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProgress, saveProgress, markModuleCompleted, saveQuizScore } from '../services/progressService';
import { UserProgress, Language } from '../types';

type Theme = 'light' | 'dark';

interface AppContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    progress: UserProgress;
    updateProgress: (moduleId: string, score?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>(Language.HE);
    const [theme, setTheme] = useState<Theme>('dark');
    const [progress, setProgressState] = useState<UserProgress>(getProgress());

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const updateProgress = (moduleId: string, score?: number) => {
        let updated: UserProgress;
        if (score !== undefined) {
            updated = saveQuizScore(moduleId, score);
        } else {
            updated = markModuleCompleted(moduleId);
        }
        setProgressState(updated);
    };

    return (
        <AppContext.Provider value={{ lang, setLang, theme, setTheme, progress, updateProgress }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
