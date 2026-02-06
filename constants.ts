import { Module, GlossaryTerm, Language, UserProgress } from './types';
import { Network, Globe, Shield, Activity, Share2, Layers, Server, Wifi, Cpu, Cloud, Zap, ArrowLeftRight, AppWindow, Database } from 'lucide-react';

export const INITIAL_PROGRESS: UserProgress = {
  completedModules: [],
  quizScores: {},
  streak: 3
};

export const TRANSLATIONS = {
  [Language.EN]: {
    welcome: "Welcome back",
    progress: "Course Progress",
    streak: "Day Streak",
    search: "Search modules...",
    start: "Start Module",
    quiz: "Take Quiz",
    glossary: "Glossary",
    home: "Home",
    binaryPractice: "Binary Practice",
    profile: "Profile",
    back: "Back",
    visualize: "Interactive Visualization",
    learn: "Learn",
    modules: "Modules",
    congrats: "Module Completed!",
    score: "Your Score",
    aiTutor: "Ask AI Tutor",
    aiPrompt: "Ask a question about this topic...",
    practice: "Practice",
    binaryTitle: "Binary Conversion Practice",
    binaryDesc: "Convert IP addresses to machine language using the Octet method (8 bits).",
    octetTitle: "The Octet Method",
    octetDesc: "To convert a decimal number to binary, we turn 'ON' (value 1) only the bits whose sum equals the requested number. The rest remain 'OFF' (value 0).",
    targetDecimal: "Decimal Number (Target)",
    binaryResult: "Binary Result",
    check: "Check Answer",
    next: "Next Exercise",
    success: "Excellent! Correct Answer.",
    successDesc: "The binary result exactly matches decimal number",
    conversionTable: "Conversion Table",
    bitValue: "Bit Value",
    switch: "Switch",
    resultBit: "Result",
    myPath: "Learning Modules",
    pathDesc: "Comprehensive study path for Computer Networks",
    level: "Scholar",
    locked: "Locked",
    completed: "Completed",
    inProgress: "In Progress",
    notStarted: "Not Started",
    continue: "Continue Learning",
    review: "Review",
    resources: "Resources",
    tableOfContents: "Table of Contents",
    nextLesson: "Next Lesson",
    prevLesson: "Previous Lesson"
  },
  [Language.HE]: {
    welcome: "ברוך שובך",
    progress: "התקדמות הקורס",
    streak: "רצף ימים",
    search: "חפש מודולים...",
    start: "התחל מודול",
    quiz: "בחן את עצמך",
    glossary: "מילון מושגים",
    home: "מסך הבית",
    binaryPractice: "תרגול המרה לבינארי",
    profile: "פרופיל",
    back: "חזור",
    visualize: "המחשה אינטראקטיבית",
    learn: "למד",
    modules: "מודולים",
    congrats: "מודול הושלם!",
    score: "הציון שלך",
    aiTutor: "שאל את המורה הווירטואלי",
    aiPrompt: "שאל שאלה על נושא זה...",
    practice: "תרגול",
    binaryTitle: "תרגול המרה לבינארי",
    binaryDesc: "המירו כתובות IP לשפת המכונה באמצעות שיטת ה-Octet (8 סיביות).",
    octetTitle: "שיטת האוקטטה (Octet)",
    octetDesc: "כדי להמיר מספר עשרוני לבינארי, עלינו להדליק (ערך 1) רק את הסיביות שסכומן שווה למספר המבוקש. שאר הסיביות יישארו כבויות (ערך 0).",
    targetDecimal: "מספר עשרוני (מטרה)",
    binaryResult: "תוצאה בינארית נוכחית",
    check: "בדוק תשובה",
    next: "תרגיל הבא",
    success: "מעולה! הצלחה.",
    successDesc: "התוצאה הבינארית תואמת בדיוק למספר העשרוני",
    conversionTable: "טבלת המרה פעילה",
    bitValue: "ערך סיבית",
    switch: "מתג הפעלה",
    resultBit: "תוצאה בינארית",
    myPath: "מודולי לימוד",
    pathDesc: "מסלול לימוד מקיף לרשתות תקשורת מחשבים",
    level: "מלומד",
    locked: "נעול",
    completed: "הושלם",
    inProgress: "בתהליך",
    notStarted: "לא התחיל",
    continue: "המשך ללמוד",
    review: "חזרה על החומר",
    resources: "חומרי עזר",
    tableOfContents: "תוכן העניינים",
    nextLesson: "השיעור הבא",
    prevLesson: "השיעור הקודם"
  }
};

// Simplified Raw Data Structure for Translation Function
const RAW_MODULE_DATA = [
  {
    id: 'm1',
    icon: 'Globe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZfpmtnRa46hlRPLKTE1QJSr0HHkPH69_mFIzylHDbBqFOLga-usC90XHROWpfy5hQmhigr0JbDuFaZlkbDXe6OFXKPKssKpPjkmSK3DxP4r3-EQQ5KbhhVlg_GFk3JzsPw5VRHmALZB9x6o2OMXtRxdf2GukBgf7X5gI0LIBxjXeNHnTi5PgN9FrCCNbM9RdFvuu5yOVzKKIkmmeThFWKhpfYeT4YoXN9T8QIamqPxT53dx2mY9GmpOQfU-2s5yncms-ZlE1LMV4',
    difficulty: 'Beginner',
    estimatedTime: '30 min',
    type: 'content',
    en: {
      title: 'Introduction to Networking',
      description: 'Learn the fundamentals of how computers communicate, LANs, WANs, and the Internet.',
      blocks: [
          { type: 'video', id: 'vid1', title: 'Network Basics Explained' },
          { type: 'text', id: 't1', title: 'What is a Computer Network?', content: 'A computer network is a set of computers sharing resources located on or provided by network nodes.' }
      ],
      resources: [{ type: 'pdf', title: 'Network_Basics.pdf', size: '2.4 MB' }],
      questions: []
    },
    he: {
      title: 'מבוא לתקשורת מחשבים',
      description: 'למד את היסודות של תקשורת מחשבים, רשתות מקומיות (LAN), רשתות מרחביות (WAN) והאינטרנט.',
      blocks: [
          { type: 'video', id: 'vid1', title: 'יסודות הרשת' },
          { type: 'text', id: 't1', title: 'מהי רשת מחשבים?', content: 'רשת מחשבים היא קבוצה של מחשבים המשתפים משאבים. המחשבים משתמשים בפרוטוקולי תקשורת משותפים כדי לתקשר זה עם זה.' }
      ],
      resources: [{ type: 'pdf', title: 'Network_Basics.pdf', size: '2.4 MB' }],
      questions: []
    }
  },
  {
    id: 'm2',
    icon: 'Layers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCErOIaGnK6Y9iHmO7FUPISZ77hMnn8xMuNyJmm65iNZ87imRFqr9-mu8szeULxuGFL-8XVGSjvuxQCYW9r2GGSmNlB4-I-x040q_Up5cD5Xs2YVpq6bg33dAKsn1lOxYT_mR46z9IxQiA5jsWZKDp10oGE8v8V6hpYr_1-cHvKdL3UuBJdge4TWbLBmlaL7tmcKKH0dazdQHY8vFepQSOkgB0jeDDX31piH7o1BOegCub6UOo3nnZtgVf4i4vCTnw3yVlupKGYjTk',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    type: 'content',
    en: {
      title: 'OSI Model',
      description: 'The Open Systems Interconnection (OSI) model describes seven layers that computer systems use to communicate.',
      blocks: [], questions: [], resources: []
    },
    he: {
      title: 'מודל OSI',
      description: 'מודל ה-OSI מתאר שבע שכבות שמערכות מחשב משתמשות כדי לתקשר ברשת.',
      blocks: [
        { type: 'text', id: 'intro', title: 'הבנת מודל ה-OSI', content: 'בשיעור זה נסביר מהו מודל ה-OSI בצורה פשוטה וקלה להבנה. זהו אחד המושגים החשובים ביותר בתקשורת נתונים.' },
        { type: 'text', id: 'encap', title: 'מהי כמוסה (Encapsulation)?', content: 'כדי להבין את מודל ה-OSI, עלינו להבין קודם מהי כמוסת נתונים.' },
        { type: 'scenario', id: 'scen1' },
        { type: 'text', id: 'layers_intro', title: '7 השכבות של מודל ה-OSI', content: 'מודל ה-OSI (Open Systems Interconnection) הוא מסגרת המחלקת את תהליך תקשורת הנתונים ל-7 שכבות נפרדות.' },
        { type: 'osi-table', id: 'osi_tab' },
        { type: 'mnemonic', id: 'mnem', title: 'טיפ לזיכרון (Mnemonic)', content: 'כדי לזכור את סדר השכבות מלמעלה למטה באנגלית (A-P-S-T-N-D-P):\n"All People Seem To Need Data Processing"' }
      ],
      resources: [],
      questions: []
    }
  },
  {
    id: 'm3',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1558494949-efdeb6bf80d1?auto=format&fit=crop&q=80',
    difficulty: 'Intermediate',
    estimatedTime: '30 min',
    type: 'content',
    en: { title: 'Layer 1 - Physical', description: 'Cables, fiber optics, wireless frequencies and bits.', blocks: [], questions: [], resources: [] },
    he: { title: 'שכבה 1 - השכבה הפיזית', description: 'כבלים, סיבים אופטיים, תדרים אלחוטיים וביטים.', blocks: [], questions: [], resources: [] }
  },
  {
    id: 'm4',
    icon: 'Share2',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    difficulty: 'Intermediate',
    estimatedTime: '40 min',
    type: 'content',
    en: { title: 'Layer 2 - Data Link', description: 'MAC addresses, Switching, VLANs and Frames.', blocks: [], questions: [], resources: [] },
    he: { title: 'שכבה 2 - שכבת Data Link', description: 'כתובות MAC, מיתוג (Switching), VLANs ומסגרות (Frames).', blocks: [], questions: [], resources: [] }
  },
  {
    id: 'm5',
    icon: 'Globe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2_qBbu8eSOR1BzAv8NYE2NSyPwe5lIGtvUc3fbgPKIjpSy31Rb-EUGSiYzfhCj17RubCwZzwmx1_BDGtRJ1Timkz8-DWzLDM-69WVTNI8SC7hUl1gPSkZs5U5Eh5BlgqjIjSOIeENKE87StsTziPxFU0qX8-fkvRBFk3ZHPAAJPTJoRqbe5mEUuU8lpgx2G4r3z1ZaipRUb0ntyG8zBoGqtqhEfO_AfavYkKqe1qMXqKrsRG3S-3iEVonTHwUAHF0ox6EyTdJ8Rs',
    difficulty: 'Intermediate',
    estimatedTime: '50 min',
    type: 'content',
    en: { title: 'Layer 3 - Network', description: 'IP Addressing, Routing, Subnetting and Packets.', blocks: [], questions: [], resources: [] },
    he: { title: 'שכבה 3 - שכבת הרשת', description: 'כתובות IP, ניתוב (Routing), תתי-רשתות וחבילות (Packets).', blocks: [], questions: [], resources: [] }
  },
  {
    id: 'm6',
    icon: 'ArrowLeftRight',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    difficulty: 'Advanced',
    estimatedTime: '45 min',
    type: 'content',
    en: { title: 'Layer 4 - Transport', description: 'TCP vs UDP, reliability, flow control and segments.', blocks: [], questions: [], resources: [] },
    he: { title: 'שכבה 4 - שכבת התעבורה', description: 'TCP מול UDP, אמינות, בקרת זרימה וסגמנטים.', blocks: [], questions: [], resources: [] }
  },
  {
    id: 'm7',
    icon: 'AppWindow',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    difficulty: 'Beginner',
    estimatedTime: '35 min',
    type: 'content',
    en: { title: 'Application Layer', description: 'HTTP, DNS, DHCP, Email protocols and user interfaces.', blocks: [], questions: [], resources: [] },
    he: { title: 'שכבת האפליקציה', description: 'HTTP, DNS, DHCP, פרוטוקולי דוא"ל וממשקי משתמש.', blocks: [], questions: [], resources: [] }
  },
  {
    id: 'm8',
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
    difficulty: 'Advanced',
    estimatedTime: '60 min',
    type: 'content',
    en: { title: 'Security', description: 'Firewalls, VPNs, Encryption and Network Attacks.', blocks: [], questions: [], resources: [] },
    he: { title: 'אבטחה', description: 'חומות אש (Firewalls), VPN, הצפנה והתקפות רשת.', blocks: [], questions: [], resources: [] }
  },
  {
    id: 'm9',
    icon: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    difficulty: 'Advanced',
    estimatedTime: '50 min',
    type: 'content',
    en: { title: 'Cloud', description: 'Cloud computing models, virtualization and SaaS/PaaS/IaaS.', blocks: [], questions: [], resources: [] },
    he: { title: 'ענן', description: 'מודלי מחשוב ענן, וירטואליזציה ו-SaaS/PaaS/IaaS.', blocks: [], questions: [], resources: [] }
  },
];


export const getModules = (language: Language): Module[] => {
  return RAW_MODULE_DATA.map(module => ({
    id: module.id,
    icon: module.icon,
    image: module.image,
    difficulty: module.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
    estimatedTime: module.estimatedTime,
    type: module.type as 'content' | 'practice',
    topologyData: null,
    title: module[language].title,
    description: module[language].description,
    blocks: module[language].blocks || [],
    resources: module[language].resources || [],
    questions: module[language].questions || []
  }));
};

export const MODULES = getModules(Language.EN);
export const GLOSSARY: GlossaryTerm[] = [
    { term: "Bandwidth", definition: "The maximum amount of data transmitted over an internet connection in a given amount of time.", category: "Performance" },
    { term: "IP Address", definition: "A unique string of numbers separated by periods that identifies each computer using the Internet Protocol to communicate over a network.", category: "Addressing" },
    { term: "Latency", definition: "The time it takes for data to pass from one point on a network to another.", category: "Performance" },
    { term: "Router", definition: "A device that forwards data packets between computer networks.", category: "Hardware" },
    { term: "Switch", definition: "A device that connects devices within a network (LAN) and uses MAC addresses to forward data.", category: "Hardware" },
    { term: "Protocol", definition: "A set of rules governing the exchange or transmission of data between devices.", category: "Fundamentals" },
    { term: "Firewall", definition: "A network security device that monitors and filters incoming and outgoing network traffic.", category: "Security" },
    { term: "DNS", definition: "Domain Name System. Translates domain names (like google.com) to IP addresses.", category: "Application" }
];