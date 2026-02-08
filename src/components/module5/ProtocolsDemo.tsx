import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Globe, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { RipCanvas, OspfCanvas, BgpCanvas } from './RoutingProtocolsCanvas';

const ProtocolsDemo: React.FC = () => {
    return (
        <div className="space-y-12">

            {/* RIP Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">RIP <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Routing Information Protocol</span></h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">הפרוטוקול הוותיק ביותר. עובד בשיטת "שמועות" (Distance Vector). כל נתב מספר לשכניו מה הוא מכיר.</p>
                    </div>
                    <RefreshCw className="w-8 h-8 text-orange-500 opacity-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-green-50 text-green-700 p-2 rounded">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">פשוט להגדרה ומתאים לרשתות קטנות</span>
                        </div>
                        <div className="flex items-center gap-3 bg-red-50 text-red-700 p-2 rounded">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">מוגבל ל-15 קפיצות (Hops) בלבד</span>
                        </div>
                        <div className="flex items-center gap-3 bg-orange-50 text-orange-700 p-2 rounded">
                            <Clock className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">איטי להתעדכן (שולח טבלה מלאה כל 30 שניות)</span>
                        </div>
                    </div>

                    <div className="relative h-48 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                        <RipCanvas />
                    </div>
                </div>
            </div>

            {/* OSPF Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">OSPF <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Open Shortest Path First</span></h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">הסטנדרט בתעשייה ברשתות פנימיות (Enterprise). כל נתב מכיר את המפה המלאה של הרשת.</p>
                    </div>
                    <Share2 className="w-8 h-8 text-green-500 opacity-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-48 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                        <OspfCanvas />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-green-50 text-green-700 p-2 rounded">
                            <TrendingUp className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">מהיר מאוד (Fast Convergence)</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 text-blue-700 p-2 rounded">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">חכם: מחשב מסלול קצר ביותר (Cost)</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-100 text-slate-700 p-2 rounded">
                            <Share2 className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">תומך ברשתות ענק בעזרת Areas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BGP Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">BGP <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Border Gateway Protocol</span></h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">הפרוטוקול שמחזיק את האינטרנט. מחבר בין ספקיות שונות ומדינות (AS - Autonomous Systems).</p>
                    </div>
                    <Globe className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
                <div className="p-1 bg-slate-50 dark:bg-slate-900 rounded-lg border border-blue-100 dark:border-blue-900/30 text-center relative overflow-hidden">
                    <BgpCanvas />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-lg font-bold text-blue-800 dark:text-blue-300">
                        "האינטרנט הוא פשוט המון רשתות עצמאיות שמדברות BGP"
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        זהו הפרוטוקול היחיד שמסוגל להתמודד עם גודל האינטרנט העולמי (מעל מיליון נתיבים).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProtocolsDemo;
