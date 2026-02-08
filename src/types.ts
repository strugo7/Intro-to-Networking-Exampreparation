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

export type ContentBlockType = 'text' | 'video' | 'image' | 'code' | 'info' | 'table' | 'router-diagram' | 'encapsulation-diagram' | 'list' | 'osi-table' | 'mnemonic' | 'scenario' | 'transmission-visualizer' | 'topology-explorer' | 'osi-intro' | 'architecture-demo' | 'protocol-explorer' | 'dns-simulator' | 'multiplexing-simulator' | 'three-way-handshake' | 'packet-journey' | 'ip-header-visualizer' | 'router-simulator' | 'fragmentation-demo' | 'frame-visualizer' | 'switch-simulator' | 'arp-explainer' | 'vlan-visualizer'
  | 'routing-protocols' | 'protocol-comparison' | 'bit-demo' | 'fiber-demo' | 'copper-demo' | 'wifi-demo' | 'media-comparison'
  | 'layer3-intro' | 'ip-addressing' | 'binary-converter' | 'subnet-calculator' | 'routing-types' | 'protocols-demo' | 'layer3-quiz'
  | 'layer2-intro' | 'ethernet-lesson' | 'switching-lesson' | 'stp-lesson' | 'vlan-lesson' | 'layer2-quiz'
  | 'security-intro' | 'mitre-stages' | 'common-attacks' | 'nmap-simulator' | 'security-quiz';

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

export interface GlossaryVisualization {
  type: 'arp-table' | 'routing' | 'bandwidth' | 'dhcp-flow' | 'dns-lookup' | 'cidr' | 'ethernet-frame' | 'ping' | 'http-request' | 'osi-layers' | 'nat-table' | 'tcp-handshake' | 'tcpip-model' | 'ip-breakdown' | 'mac-format' | 'port-list' | 'subnet-visual' | 'traceroute';
  data?: any;
  steps?: any[];
  fields?: string[];
}

export interface GlossaryTerm {
  term: string;
  fullName: string;
  category: string;
  layer: string;
  definitionEn: string;
  definitionHe: string;
  relatedTerms: string[];
  visualization: GlossaryVisualization | null;
  tags?: string[]; // Optional for backward compatibility if needed
}

export interface UserProgress {
  completedModules: string[];
  quizScores: Record<string, number>;
  streak: number;
}