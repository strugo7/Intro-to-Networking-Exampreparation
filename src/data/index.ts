import { Language, Module } from '../types';
import modulesData from './modules/modules.json';
import glossaryData from './modules/glossary.json';

export const getModules = (language: Language): Module[] => {
    return modulesData.map((module: any) => ({
        id: module.id,
        icon: module.icon,
        image: module.image,
        difficulty: module.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        estimatedTime: module.estimatedTime,
        type: module.type as 'content' | 'practice',
        topologyData: null,
        title: module[language]?.title || module['en'].title,
        description: module[language]?.description || module['en'].description,
        blocks: module[language]?.blocks || [],
        resources: module[language]?.resources || [],
        questions: module[language]?.questions || []
    }));
};

export const getGlossary = () => glossaryData;
