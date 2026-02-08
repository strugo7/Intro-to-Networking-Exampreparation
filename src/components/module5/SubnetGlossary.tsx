import React from 'react';
import { BookOpen, Hash, Calculator, Globe, Shield, ArrowRightFromLine, Cpu, Network } from 'lucide-react';

interface Term {
    term: string;
    hebrew: string;
    description: string;
    icon: React.ReactNode;
    example?: string;
}

const terms: Term[] = [
    {
        term: "IP Address",
        hebrew: "כתובת IP",
        description: "תעודת הזהות של המכשיר ברשת. מורכבת מ-32 ביטים (ב-IPv4) המחולקים ל-4 מספרים.",
        icon: <Globe className="text-blue-400" />,
        example: "192.168.1.10"
    },
    {
        term: "Subnet Mask",
        hebrew: "מסכת רשת",
        description: "המספר שקובע איזה חלק מהכתובת שייך לרשת (Network) ואיזה למכשיר (Host).",
        icon: <Shield className="text-purple-400" />,
        example: "255.255.255.0"
    },
    {
        term: "CIDR",
        hebrew: "Classless Inter-Domain Routing",
        description: "שיטת כתיבה מקוצרת למסכה. הסלאש (/) מציין כמה ביטים דולקים (1) יש במסכה.",
        icon: <Hash className="text-green-400" />,
        example: "/24 (= 255.255.255.0)"
    },
    {
        term: "Network ID",
        hebrew: "כתובת רשת",
        description: "הכתובת הראשונה בכל רשת. היא מייצגת את הרשת כולה ולא ניתנת לשימוש ע\"י מכשיר.",
        icon: <Network className="text-yellow-400" />,
        example: "192.168.1.0"
    },
    {
        term: "Broadcast Address",
        hebrew: "כתובת שידור",
        description: "הכתובת האחרונה בכל רשת. משמשת לשליחת הודעה לכל המכשירים ברשת בו-זמנית.",
        icon: <ArrowRightFromLine className="text-orange-400" />,
        example: "192.168.1.255"
    },
    {
        term: "Magic Number",
        hebrew: "מספר הקסם",
        description: "ההפרש בין 256 לבין המסכה באוקטטה המעניינת. קובע את גודל הבלוק (הקפיצות) של הרשתות.",
        icon: <Calculator className="text-pink-400" />,
        example: "256 - 224 = 32"
    },
    {
        term: "Octet",
        hebrew: "אוקטטה",
        description: "קבוצה של 8 ביטים. כתובת IPv4 מורכבת מ-4 אוקטטות.",
        icon: <Cpu className="text-cyan-400" />,
        example: "11000000 = 192"
    },
    {
        term: "Default Gateway",
        hebrew: "שער ברירת מחדל",
        description: "הכתובת של הראוטר שמוציא אותנו מהרשת המקומית החוצה (למשל לאינטרנט).",
        icon: <ArrowRightFromLine className="text-teal-400" />,
        example: "192.168.1.1 (בדרך כלל)"
    }
];

const SubnetGlossary: React.FC = () => {
    return (
        <div className="backdrop-blur-xl bg-slate-900/50 p-8 rounded-2xl mb-12 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <BookOpen className="text-indigo-400" size={32} />
                מילון מונחים (Subnetting Glossary)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {terms.map((item, idx) => (
                    <div key={idx} className="group bg-slate-800/50 hover:bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <span className="text-xs font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                                {item.term}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                            {item.hebrew}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed mb-4 min-h-[60px]">
                            {item.description}
                        </p>

                        {item.example && (
                            <div className="mt-auto pt-3 border-t border-slate-700/50">
                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">דוגמה</span>
                                <code className="text-sm font-mono text-emerald-400/90 bg-slate-900/50 px-2 py-1 rounded w-full block text-center" dir="ltr">
                                    {item.example}
                                </code>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubnetGlossary;
