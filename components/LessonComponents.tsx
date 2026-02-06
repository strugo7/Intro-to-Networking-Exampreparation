import React from 'react';
import { Play, Cloud, Laptop, Printer, Router, FileText, ExternalLink, CheckCircle, Info, ChevronRight, ArrowRight, Lightbulb, User } from 'lucide-react';

// --- Video Player Placeholder ---
export const VideoPlayer = ({ title }: { title: string }) => (
  <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer mb-8">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    
    {/* Network Nodes Animation Effect */}
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="w-full h-full absolute opacity-30">
          <svg className="w-full h-full">
             <circle cx="20%" cy="30%" r="4" fill="white" className="animate-pulse" />
             <circle cx="80%" cy="70%" r="4" fill="white" className="animate-pulse" />
             <circle cx="50%" cy="50%" r="6" fill="#3b82f6" />
             <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
             <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
          </svg>
       </div>
    </div>

    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center pl-1 shadow-xl group-hover:scale-110 transition-transform duration-300">
        <Play fill="white" className="text-white" size={32} />
      </div>
      <span className="mt-4 text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        Video: {title}
      </span>
    </div>
  </div>
);

// --- Info Block (Why use a layered model?) ---
export const InfoBlock = ({ title, items }: { title: string, items: {label: string, text: string}[] }) => (
  <div className="my-8">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
    <div className="grid gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-blue-50 dark:bg-card-dark border border-blue-100 dark:border-card-border p-4 rounded-xl flex gap-4">
          <div className="mt-1">
             <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
               <CheckCircle size={16} className="text-primary dark:text-blue-400" />
             </div>
          </div>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">{item.label}</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.text}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Terminal / Code Block ---
export const TerminalBlock = ({ code, title }: { code: string, title?: string }) => (
  <div className="my-8 rounded-xl overflow-hidden bg-[#1e293b] shadow-xl border border-slate-700 font-mono text-sm">
    <div className="bg-[#0f172a] px-4 py-2 flex items-center gap-2 border-b border-slate-700">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span className="ml-2 text-slate-400 text-xs">{title || 'terminal'}</span>
    </div>
    <div className="p-4 text-slate-300 whitespace-pre overflow-x-auto">
      {code}
    </div>
  </div>
);

// --- Router Diagram (Visualizing Router Function) ---
export const RouterDiagram = ({ isRTL }: { isRTL: boolean }) => (
  <div className="my-8 bg-slate-50 dark:bg-card-dark border border-slate-200 dark:border-card-border rounded-xl p-8 relative overflow-hidden">
    <div className="flex items-center justify-between max-w-2xl mx-auto relative z-10">
      
      {/* Network A */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
           <Cloud size={64} className="text-slate-200 dark:text-slate-700" fill="currentColor" />
           <span className="absolute inset-0 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">Net A</span>
        </div>
        <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-mono text-blue-500">192.168.1.0/24</div>
        <div className="flex gap-2 text-slate-400">
           <Laptop size={20} />
           <Printer size={20} />
        </div>
      </div>

      {/* Connection Line */}
      <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-600 mx-4 h-0 relative"></div>

      {/* Router */}
      <div className="flex flex-col items-center relative -mt-4">
         <div className="bg-primary p-4 rounded-full shadow-lg text-white relative z-10">
            <Router size={32} />
         </div>
         <span className="mt-2 font-bold text-slate-700 dark:text-slate-200 text-sm">ROUTER 1</span>
      </div>

      {/* Connection Line */}
      <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-600 mx-4 h-0 relative"></div>

      {/* Network B */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
           <Cloud size={64} className="text-slate-200 dark:text-slate-700" fill="currentColor" />
           <span className="absolute inset-0 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">Net B</span>
        </div>
        <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-mono text-emerald-500">10.1.1.0/24</div>
        <div className="flex gap-2 text-slate-400">
           <Laptop size={20} />
           <Router size={20} />
        </div>
      </div>

    </div>
    <div className="text-center mt-8 text-xs text-slate-400 uppercase tracking-widest">
       {isRTL ? 'איור 1: טופולוגיית רשת בסיסית' : 'Figure 1: Basic Network Topology'}
    </div>
  </div>
);

// --- Routing Table Component ---
export const RoutingTable = ({ data, isRTL }: { data: any, isRTL: boolean }) => (
  <div className="my-8 rounded-xl border border-slate-200 dark:border-card-border overflow-hidden bg-white dark:bg-card-dark shadow-sm">
      <div className="bg-slate-50 dark:bg-[#1e293b] px-4 py-3 border-b border-slate-200 dark:border-card-border flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Routing Table View</span>
          <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
             <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
             <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 dark:bg-slate-800/50">
                <tr>
                    <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'סוג' : 'Type'}</th>
                    <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'רשת יעד' : 'Destination'}</th>
                    <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'ממשק יציאה' : 'Interface'}</th>
                    <th className={`px-6 py-3 font-medium ${isRTL ? 'text-right' : 'text-center'}`}>Metric</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {data.rows.map((row: any, idx: number) => (
                    <tr key={idx} className="bg-white dark:bg-card-dark hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">{row.type}</td>
                        <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300">{row.dest}</td>
                        <td className="px-6 py-4">
                            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded text-xs font-mono">
                                {row.interface}
                            </span>
                        </td>
                        <td className={`px-6 py-4 text-slate-400 ${isRTL ? 'text-right' : 'text-center'}`}>{row.metric}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      <div className="px-4 py-2 bg-slate-50 dark:bg-[#1e293b] border-t border-slate-200 dark:border-card-border flex gap-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <b>C</b> = Connected</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> <b>S</b> = Static</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-full"></span> <b>R</b> = RIP</span>
      </div>
  </div>
);

// --- Encapsulation Diagram ---
export const EncapsulationDiagram = ({ isRTL }: { isRTL: boolean }) => {
    const Arrow = () => (
        <div className={`text-slate-300 dark:text-slate-600 ${isRTL ? 'rotate-180' : ''}`}>
             <ChevronRight size={24} />
             <ChevronRight size={24} className="-ml-4 opacity-50" />
        </div>
    );

    return (
        <div className="my-8 py-10 px-4 border border-slate-200 dark:border-card-border rounded-xl bg-slate-50 dark:bg-card-dark flex flex-wrap items-center justify-center gap-4 md:gap-8">
            
            <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-16 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="font-mono font-bold text-slate-600 dark:text-slate-300">DATA</span>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Application</span>
            </div>

            <Arrow />

            <div className="flex flex-col items-center gap-2">
                <div className="flex shadow-sm">
                    <div className="w-8 h-16 bg-blue-600 rounded-l-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold -rotate-90 whitespace-nowrap">L4 HDR</span>
                    </div>
                    <div className="w-24 h-16 bg-white dark:bg-slate-800 border-y-2 border-r-2 border-blue-600/30 rounded-r-lg flex items-center justify-center">
                        <span className="font-mono font-bold text-slate-600 dark:text-slate-300">DATA</span>
                    </div>
                </div>
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Segment</span>
            </div>

            <Arrow />

            <div className="flex flex-col items-center gap-2">
                <div className="flex shadow-sm">
                    <div className="w-8 h-16 bg-primary rounded-l-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold -rotate-90 whitespace-nowrap">IP HDR</span>
                    </div>
                    <div className="w-28 h-16 bg-white dark:bg-slate-800 border-y-2 border-r-2 border-primary/30 rounded-r-lg flex items-center justify-center">
                        <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-xs">SEGMENT</span>
                    </div>
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Packet</span>
            </div>

             <Arrow />

            <div className="flex flex-col items-center gap-2">
                <div className="flex shadow-sm">
                    <div className="w-8 h-16 bg-emerald-500 rounded-l-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold -rotate-90 whitespace-nowrap">MAC</span>
                    </div>
                    <div className="w-24 h-16 bg-white dark:bg-slate-800 border-y-2 border-emerald-500/30 flex items-center justify-center">
                        <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-xs">PKT</span>
                    </div>
                     <div className="w-8 h-16 bg-emerald-500/80 rounded-r-lg flex items-center justify-center">
                        <span className="text-xs text-white font-bold -rotate-90 whitespace-nowrap">FCS</span>
                    </div>
                </div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Frame</span>
            </div>

        </div>
    );
}

// --- List Block ---
export const ListBlock = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-outside ml-6 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
        {items.map((item, i) => (
            <li key={i}>{item}</li>
        ))}
    </ul>
);

// --- OSI Table (Detailed 7-Layer Table) ---
export const OSITable = ({ isRTL }: { isRTL: boolean }) => (
  <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-card-border shadow-sm">
    <table className="w-full text-sm text-right min-w-[600px]">
      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
        <tr>
          <th className="px-4 py-3 text-center w-12">#</th>
          <th className="px-4 py-3">שכבה</th>
          <th className="px-4 py-3">תפקיד</th>
          <th className="px-4 py-3">פרוטוקולים נפוצים</th>
          <th className="px-4 py-3 text-center">יחידת נתונים (PDU)</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-card-dark text-slate-700 dark:text-slate-300">
        {/* Layer 7 */}
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <td className="px-4 py-3 text-center font-bold">7</td>
          <td className="px-4 py-3 font-bold text-red-500">שכבת האפליקציה<br/><span className="text-xs font-normal text-slate-500">(Application)</span></td>
          <td className="px-4 py-3">ממשק למשתמש וליישומים</td>
          <td className="px-4 py-3 ltr text-right">HTTP, DNS, FTP, SMTP</td>
          <td className="px-4 py-3 text-center font-bold bg-slate-50 dark:bg-slate-800/30 row-span-3 border-b border-slate-200 dark:border-slate-700 align-middle">נתונים (Data)</td>
        </tr>
        {/* Layer 6 */}
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <td className="px-4 py-3 text-center font-bold">6</td>
          <td className="px-4 py-3 font-bold text-orange-500">שכבת ההצגה<br/><span className="text-xs font-normal text-slate-500">(Presentation)</span></td>
          <td className="px-4 py-3">קידוד, הצפנה ודחיסת נתונים</td>
          <td className="px-4 py-3 ltr text-right">JPEG, SSL/TLS, GIF</td>
           {/* PDU merged */}
        </tr>
        {/* Layer 5 */}
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <td className="px-4 py-3 text-center font-bold">5</td>
          <td className="px-4 py-3 font-bold text-yellow-600">שכבת השיחה<br/><span className="text-xs font-normal text-slate-500">(Session)</span></td>
          <td className="px-4 py-3">ניהול שיחות וסנכרון</td>
          <td className="px-4 py-3 ltr text-right">RPC, NetBIOS</td>
           {/* PDU merged */}
        </tr>
        {/* Layer 4 */}
        <tr className="bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <td className="px-4 py-3 text-center font-bold">4</td>
          <td className="px-4 py-3 font-bold text-blue-600">שכבת התעבורה<br/><span className="text-xs font-normal text-slate-500">(Transport)</span></td>
          <td className="px-4 py-3">העברת נתונים מקצה לקצה, בקרת זרימה</td>
          <td className="px-4 py-3 ltr text-right">TCP, UDP</td>
          <td className="px-4 py-3 text-center font-bold">סגמנט (Segment)</td>
        </tr>
        {/* Layer 3 */}
        <tr className="bg-cyan-50/50 dark:bg-cyan-900/10 hover:bg-cyan-50 dark:hover:bg-cyan-900/20">
          <td className="px-4 py-3 text-center font-bold">3</td>
          <td className="px-4 py-3 font-bold text-cyan-600">שכבת הרשת<br/><span className="text-xs font-normal text-slate-500">(Network)</span></td>
          <td className="px-4 py-3">ניתוב ומציאת הנתיב הטוב ביותר (IP)</td>
          <td className="px-4 py-3 ltr text-right">IPv4, IPv6, ICMP</td>
          <td className="px-4 py-3 text-center font-bold">חבילה (Packet)</td>
        </tr>
        {/* Layer 2 */}
        <tr className="bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
          <td className="px-4 py-3 text-center font-bold">2</td>
          <td className="px-4 py-3 font-bold text-indigo-600">שכבת ערוץ הנתונים<br/><span className="text-xs font-normal text-slate-500">(Data Link)</span></td>
          <td className="px-4 py-3">כתובות פיזיות (MAC) ותקשורת מקומית</td>
          <td className="px-4 py-3 ltr text-right">Ethernet, Switch, Wi-Fi</td>
          <td className="px-4 py-3 text-center font-bold">מסגרת (Frame)</td>
        </tr>
        {/* Layer 1 */}
        <tr className="bg-slate-50 dark:bg-slate-800/20">
          <td className="px-4 py-3 text-center font-bold">1</td>
          <td className="px-4 py-3 font-bold text-slate-600">שכבה פיזית<br/><span className="text-xs font-normal text-slate-500">(Physical)</span></td>
          <td className="px-4 py-3">שידור ביטים על המדיה הפיזית</td>
          <td className="px-4 py-3 ltr text-right">Cables, Hubs, Bits</td>
          <td className="px-4 py-3 text-center font-bold">ביטים (Bits)</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const MnemonicBlock = ({ title, content }: { title: string, content: string }) => (
  <div className="my-8 bg-gradient-to-r from-blue-50 to-white dark:from-card-dark dark:to-background-dark border-r-4 border-blue-500 shadow-sm rounded-l-lg p-6 flex gap-4">
     <div className="shrink-0 mt-1">
         <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
             <Lightbulb size={24} />
         </div>
     </div>
     <div>
         <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{title}</h3>
         <p className="text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap leading-relaxed" dir="ltr">{content}</p>
     </div>
  </div>
);

export const ScenarioBlock = () => (
    <div className="my-8 py-8 border-y border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center">
        <div className="flex items-center gap-8 md:gap-16 text-slate-600 dark:text-slate-400">
             <div className="flex flex-col items-center gap-2">
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                    <User size={32} />
                 </div>
                 <span className="font-bold text-sm">שולח</span>
             </div>
             
             <div className="flex-1 border-t-2 border-dashed border-slate-300 w-32 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-background-light dark:bg-background-dark px-2 text-red-500 font-bold">ללא כתובת!</span>
             </div>

             <div className="flex flex-col items-center gap-2 relative">
                 <div className="w-14 h-16 border-2 border-slate-300 rounded bg-white dark:bg-slate-800 flex items-center justify-center relative">
                    <FileText size={24} className="text-slate-300" />
                    <div className="absolute top-0 right-0 p-1">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                 </div>
                 <span className="font-bold text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">ללא כותרת</span>
             </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">איור 1: שליחת נתונים ללא מעטפה/כמוסה.</p>
    </div>
);
