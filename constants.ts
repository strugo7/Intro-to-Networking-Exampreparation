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
      title: 'מודל OSI ותהליך ה-Encapsulation',
      description: 'למד את היסודות של מודל ה-OSI, תהליך הכימוס (Encapsulation) וההבדל בין תיאוריה למציאות.',
      blocks: [
        { 
            type: 'text', 
            id: 'encap_prob', 
            title: '1. הבעיה: איך שולחים מידע בלי שהוא יאבד?', 
            content: `לפני שנכנסים לשכבות, המאמר מסביר עיקרון קריטי שנקרא Encapsulation (כימוס/עטיפה). תחשבו על זה ככה: אתם רוצים לשלוח מכתב לחבר שמזמין אותו לחתונה.

תרחיש א': כתבתם את המכתב וזרקתם אותו לתיבת הדואר כמו שהוא – דף נייר פתוח, בלי מעטפה, בלי כתובת ובלי בול.
התוצאה: הדוור לא יידע למי זה שייך. המכתב לא יגיע.

תרחיש ב': הכנסתם את המכתב למעטפה. על המעטפה כתבתם כתובת שולח, כתובת נמען, מיקוד ושמתם בול.
התוצאה: שירות הדואר יודע בדיוק לאן להעביר את זה.

במחשבים זה אותו דבר: אי אפשר סתם "לזרוק" מידע (כמו הודעת פייסבוק) לכבל הרשת. המחשב חייב לעטוף את המידע הזה ב"מעטפות" דיגיטליות שנקראות Headers (כותרות). תהליך הוספת הכותרות האלו נקרא Encapsulation.` 
        },
        {
            type: 'image',
            id: 'encap_img',
            title: 'המחשה: מידע גולמי מול מעטפה (Raw vs Encapsulated)',
            content: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAqShFT-htP3v6o7GrPYSBvYy8dGoN_ilk_sUqTTv0ElSUYzT12FzB5f34aMZue1UgNJhIvtZffQ82spgEev26iY0FvMjoeCLkRGykihJnCZHTgmgxlg10wQaxjuKjuyikB9kky0cNriFUhpJ6KXGvglcNfXPGNVN4Qpa86gABOxXx7bMG7bS3yFcU1gJjl98L9LWAdbzv2s-_UkhEheLlumgIJxI0uQxXxn1AdC-ZXN0GsiJ9Nk7PCi5yYBGMY2D0GUeJfXlGkKs'
        },
        { 
            type: 'text', 
            id: 'why_osi', 
            title: '2. למה המציאו את מודל OSI?', 
            content: 'בעבר, כל חברה בנתה ציוד תקשורת משלה עם "שפה" משלה. ציוד של חברה א\' לא יכל לדבר עם ציוד של חברה ב\' כי הם ארזו את המידע בצורה שונה. מודל ה-OSI נוצר כדי ליצור שפה משותפת שכולם – ממתכנתי אפליקציות ועד יצרני כבלים – יוכלו לעבוד לפיה.' 
        },
        { 
            type: 'text', 
            id: 'layers_7', 
            title: '3. שבע השכבות (The 7 Layers)', 
            content: `המודל מחלק את התקשורת ל-7 שכבות. כל שכבה מוסיפה את ה"מעטפה" (Header) שלה ומעבירה הלאה.
            
• שכבות 7, 6, 5 (השכבות הגבוהות): האפליקציה, התצוגה והשיחה (Application, Presentation, Session). אלו אחראיות על התוכנה והמידע עצמו.

• שכבה 4 (Transport): אחראית על העברת המידע (למשל פרוטוקול TCP).
שם היחידה בשכבה זו: Segment.

• שכבה 3 (Network): אחראית על כתובות לוגיות (IP) וניתוב (כאן עובדים ראוטרים).
שם היחידה בשכבה זו: Packet.

• שכבה 2 (Data Link): אחראית על כתובות פיזיות (MAC) ומעבר בין רכיבים סמוכים (כאן עובדים מתגים/Switches).
שם היחידה בשכבה זו: Frame.

• שכבה 1 (Physical): הכבלים והאותות החשמליים עצמם.` 
        },
        {
            type: 'osi-table',
            id: 'osi_table_visual'
        },
        { 
            type: 'text', 
            id: 'osi_tcp', 
            title: '4. המציאות מול התיאוריה (OSI vs TCP/IP)', 
            content: 'מודל ה-OSI הוא מודל תיאורטי מצוין ללימוד, אבל בפועל האינטרנט עובד לפי מודל שנקרא TCP/IP. במודל TCP/IP המודרני יש רק 5 שכבות (הוא מאחד את שכבות 5, 6 ו-7 לשכבה אחת גדולה של "אפליקציה"). עם זאת, אנשי רשת עדיין משתמשים במונחי OSI (למשל: "בעיה ב-Layer 2").' 
        },
        { 
            type: 'info', 
            id: 'summary', 
            title: 'סיכום למבחן (נקודות זהב)', 
            data: [
                { label: 'Encapsulation', text: 'התהליך שבו מידע נעטף ב-Headers (כותרות) כדי שהרשת תדע לאן לשלוח אותו.' },
                { label: 'תפקיד המודל', text: 'ליצור סטנדרט אחיד (Interoperability) כדי שמכשירים שונים יוכלו לדבר זה עם זה.' },
                { label: 'שכבה 4 (PDU)', text: 'Segment' },
                { label: 'שכבה 3 (PDU)', text: 'Packet (כאן עובד Router)' },
                { label: 'שכבה 2 (PDU)', text: 'Frame (כאן עובד Switch)' }
            ] 
        }
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
    { 
        term: "ACL", 
        definition: "Access Control List. A set of rules that filters network traffic.",
        hebrewDefinition: "רשימת בקרת גישה. סט של חוקים המסנן תעבורת רשת.",
        category: "Security",
        tags: []
    },
    { 
        term: "ARP", 
        definition: "A communication protocol used for discovering the link layer address, such as a MAC address, associated with a given internet layer address, typically an IPv4 address.", 
        hebrewDefinition: "פרוטוקול המיפוי (ARP) הוא פרוטוקול תקשורת המשמש לגילוי כתובת שכבת הקישור, כגון כתובת MAC, המשוייכת לכתובת שכבת האינטרנט נתונה, בדרך כלל כתובת IPv4.",
        category: "Protocol",
        tags: ["Layer 2/3"],
        relatedTerms: ["IP Address", "MAC Address", "RARP"],
        visualType: "arp-table"
    },
    { 
        term: "BGP", 
        definition: "Border Gateway Protocol. A standardized exterior gateway protocol designed to exchange routing and reachability information among autonomous systems (AS) on the Internet.",
        hebrewDefinition: "פרוטוקול שער גבול. פרוטוקול ניתוב חיצוני שנועד להחליף מידע ניתוב והגעה בין מערכות אוטונומיות (AS) באינטרנט.",
        category: "Routing",
        tags: ["Layer 3"]
    },
    { 
        term: "Bandwidth", 
        definition: "The maximum amount of data transmitted over an internet connection in a given amount of time.", 
        hebrewDefinition: "כמות הנתונים המקסימלית המועברת בחיבור אינטרנט בפרק זמן נתון.",
        category: "General",
        tags: ["Performance"]
    },
    { 
        term: "CIDR", 
        definition: "Classless Inter-Domain Routing. A method for allocating IP addresses and for IP routing.",
        hebrewDefinition: "שיטה להקצאת כתובות IP וניתוב IP.",
        category: "Addressing",
        tags: ["Layer 3"]
    },
    { 
        term: "DHCP", 
        definition: "Dynamic Host Configuration Protocol. A client/server protocol that automatically provides an Internet Protocol (IP) host with its IP address and other related configuration information.",
        hebrewDefinition: "פרוטוקול תצורת מארח דינמי. פרוטוקול לקוח/שרת המספק אוטומטית למארח IP את כתובת ה-IP שלו ומידע תצורה אחר.",
        category: "Protocol",
        tags: ["Layer 7"]
    },
    {
        term: "DNS",
        definition: "Domain Name System. Translates domain names to IP addresses so browsers can load Internet resources.",
        hebrewDefinition: "מערכת שמות מתחם. מתרגמת שמות תחום לכתובות IP כדי שדפדפנים יוכלו לטעון משאבי אינטרנט.",
        category: "Protocol",
        tags: ["Layer 7"]
    },
    { 
        term: "IP Address", 
        definition: "A unique string of numbers separated by periods that identifies each computer using the Internet Protocol to communicate over a network.", 
        hebrewDefinition: "מחרוזת ייחודית של מספרים המופרדים בנקודות המזהה כל מחשב המשתמש בפרוטוקול האינטרנט לתקשורת ברשת.",
        category: "Addressing",
        tags: ["Layer 3"]
    },
    { 
        term: "Latency", 
        definition: "The time it takes for data to pass from one point on a network to another.", 
        hebrewDefinition: "הזמן שלוקח לנתונים לעבור מנקודה אחת ברשת לאחרת.",
        category: "Performance",
        tags: []
    },
    { 
        term: "MAC Address", 
        definition: "A unique identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment.", 
        hebrewDefinition: "מזהה ייחודי המוקצה לבקר ממשק רשת (NIC) לשימוש ככתובת רשת בתקשורת בתוך מקטע רשת.",
        category: "Hardware",
        tags: ["Layer 2"]
    },
    { 
        term: "Router", 
        definition: "A device that forwards data packets between computer networks.", 
        hebrewDefinition: "מכשיר המעביר חבילות נתונים בין רשתות מחשבים.",
        category: "Hardware",
        tags: ["Layer 3"]
    },
    { 
        term: "Switch", 
        definition: "A device that connects devices within a network (LAN) and uses MAC addresses to forward data.", 
        hebrewDefinition: "מכשיר המחבר מכשירים בתוך רשת (LAN) ומשתמש בכתובות MAC להעברת נתונים.",
        category: "Hardware",
        tags: ["Layer 2"]
    },
    { 
        term: "Firewall", 
        definition: "A network security device that monitors and filters incoming and outgoing network traffic.", 
        hebrewDefinition: "מכשיר אבטחת רשת המנטר ומסנן תעבורת רשת נכנסת ויוצאת.",
        category: "Security",
        tags: []
    }
];