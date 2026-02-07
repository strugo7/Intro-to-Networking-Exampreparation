import { UserProgress } from '../types';

const STORAGE_KEY = 'net_academy_progress';

const DEFAULT_PROGRESS: UserProgress = {
    completedModules: [],
    quizScores: {},
    streak: 1
};

export const getProgress = (): UserProgress => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return DEFAULT_PROGRESS;
        return JSON.parse(stored);
    } catch (e) {
        console.error('Failed to load progress', e);
        return DEFAULT_PROGRESS;
    }
};

export const saveProgress = (progress: UserProgress): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error('Failed to save progress', e);
    }
};

export const markModuleCompleted = (moduleId: string): UserProgress => {
    const current = getProgress();
    if (!current.completedModules.includes(moduleId)) {
        const updated = {
            ...current,
            completedModules: [...current.completedModules, moduleId]
        };
        saveProgress(updated);
        return updated;
    }
    return current;
};

export const saveQuizScore = (moduleId: string, score: number): UserProgress => {
    const current = getProgress();
    const updated = {
        ...current,
        quizScores: {
            ...current.quizScores,
            [moduleId]: Math.max(score, current.quizScores[moduleId] || 0) // Keep highest score
        }
    };
    // Also mark as complete if score is > 0 (or some threshold)
    if (score >= 0 && !updated.completedModules.includes(moduleId)) {
        updated.completedModules = [...updated.completedModules, moduleId];
    }
    saveProgress(updated);
    return updated;
};

export const resetProgress = (): UserProgress => {
    saveProgress(DEFAULT_PROGRESS);
    return DEFAULT_PROGRESS;
};
