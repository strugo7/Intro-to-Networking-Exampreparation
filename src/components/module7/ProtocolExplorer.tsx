import React from 'react';
import { GlobeIcon, SearchIcon, MailIcon, FileIcon, RefreshIcon, LockIcon } from './Module7Icons';

const ProtocolCard: React.FC<{ name: string; title: string; desc: string; port: string; type: string; icon: any }> = ({ name, title, desc, port, type, icon: Icon }) => (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-xl relative overflow-hidden group hover:transform hover:-translate-y-1 hover:shadow-xl transition-all border border-slate-700/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-800 rounded-lg text-purple-400">
                <Icon size={32} />
            </div>
            <div className="text-right">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Port {port}</span>
                <span className="block text-xs text-blue-400">{type}</span>
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <h4 className="text-sm font-medium text-slate-400 mb-3">{title}</h4>
        <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
    </div>
);

const ProtocolExplorer: React.FC = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProtocolCard
                name="HTTP / HTTPS"
                title="Hypertext Transfer Protocol"
                desc="השפה של האינטרנט. משמש להעברת דפי אינטרנט. S מציין Secure (מוצפן). בקשות GET, POST וכו'."
                port="80 / 443"
                type="TCP"
                icon={GlobeIcon}
            />
            <ProtocolCard
                name="DNS"
                title="Domain Name System"
                desc="מתרגם שמות דומיין (www.google.com) לכתובות IP. עובד היררכית."
                port="53"
                type="UDP / TCP"
                icon={SearchIcon}
            />
            <ProtocolCard
                name="DHCP"
                title="Dynamic Host Config Protocol"
                desc="מחלק אוטומטית כתובות IP למחשבים ברשת. חוסך הגדרה ידנית (תהליך DORA)."
                port="67 / 68"
                type="UDP"
                icon={RefreshIcon}
            />
            <ProtocolCard
                name="SMTP"
                title="Simple Mail Transfer Protocol"
                desc="משמש לשליחת אימיילים מהלקוח לשרת, ובין שרתים לשרתים."
                port="25"
                type="TCP"
                icon={MailIcon}
            />
            <ProtocolCard
                name="FTP"
                title="File Transfer Protocol"
                desc="פרוטוקול ותיק להעברת קבצים. לא מאובטח כברירת מחדל (הסיסמה עוברת כטקסט גלוי)."
                port="20 / 21"
                type="TCP"
                icon={FileIcon}
            />
            <ProtocolCard
                name="SSH"
                title="Secure Shell"
                desc="גישה מאובטחת ומוצפנת לשליטה מרחוק על שרתים וציוד תקשורת (מחליף את Telnet)."
                port="22"
                type="TCP"
                icon={LockIcon}
            />
        </div>
    );
};

export default ProtocolExplorer;
