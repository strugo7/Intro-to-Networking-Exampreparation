export enum Language {
  EN = 'en',
  HE = 'he'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ContentBlockType = 'text' | 'video' | 'image' | 'code' | 'info' | 'table' | 'router-diagram' | 'encapsulation-diagram' | 'list' | 'osi-table' | 'mnemonic' | 'scenario';

export interface ContentBlock {
  type: ContentBlockType;
  id: string;
  title?: string; // Used for Table of Contents
  content?: string | string[]; // Text content, code snippet, or image URL
  data?: any; // For complex components like tables
}

export interface Resource {
  type: 'pdf' | 'link';
  title: string;
  size?: string; // e.g. "1.2 MB"
  url?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  type?: 'content' | 'practice';
  // Deprecated: content string
  content?: string; 
  // New structured content
  blocks?: ContentBlock[]; 
  resources?: Resource[];
  questions: Question[];
  topologyData?: any;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  hebrewDefinition?: string;
  category: string; // e.g., 'Protocol', 'Hardware', 'Security'
  tags?: string[]; // e.g., ['Layer 2', 'Routing']
  relatedTerms?: string[];
  visualType?: 'arp-table' | 'none'; // For specific visualizations
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  streak: number;
}