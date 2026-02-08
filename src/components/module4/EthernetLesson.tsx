import React, { useState } from 'react';
import FrameJourneyCanvas from './FrameJourneyCanvas';
import ArpCanvas from './ArpCanvas';
import { ArrowRight, Hash, Database, Globe, Shield, Play } from 'lucide-react';

const EthernetLesson: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                    Ethernet & MAC Addresses
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    הסטנדרט שמניע את העולם. איך מחשבים מדברים זה עם זה ברמה הפיזית והלוגית.
                </p>
            </div>

            {/* Frame Structure Visual */}
            <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Database className="text-blue-400" /> מבנה מסגרת Ethernet
                </h2>

                <div className="relative overflow-x-auto pb-4">
                    <div className="flex min-w-[800px] gap-1 text-center font-mono text-sm">
                        <div className="flex-1 bg-slate-700/50 p-3 rounded-l-lg border-r border-slate-600">
                            <div className="text-yellow-400 font-bold">Preamble</div>
                            <div className="text-xs text-slate-500 mt-1">7 Bytes</div>
                        </div>
                        <div className="w-16 bg-slate-700/50 p-3 border-r border-slate-600">
                            <div className="text-yellow-400 font-bold">SFD</div>
                            <div className="text-xs text-slate-500 mt-1">1 B</div>
                        </div>
                        <div className="flex-[2] bg-blue-900/30 p-3 border-r border-slate-600">
                            <div className="text-blue-400 font-bold">Dest MAC</div>
                            <div className="text-xs text-slate-500 mt-1">6 Bytes</div>
                        </div>
                        <div className="flex-[2] bg-blue-900/30 p-3 border-r border-slate-600">
                            <div className="text-green-400 font-bold">Src MAC</div>
                            <div className="text-xs text-slate-500 mt-1">6 Bytes</div>
                        </div>
                        <div className="w-20 bg-purple-900/30 p-3 border-r border-slate-600">
                            <div className="text-purple-400 font-bold">Type</div>
                            <div className="text-xs text-slate-500 mt-1">2 B</div>
                        </div>
                        <div className="flex-[4] bg-slate-800 p-3 border-r border-slate-600">
                            <div className="text-white font-bold">Payload (Data)</div>
                            <div className="text-xs text-slate-500 mt-1">46-1500 Bytes</div>
                        </div>
                        <div className="w-24 bg-red-900/20 p-3 rounded-r-lg">
                            <div className="text-red-400 font-bold">FCS</div>
                            <div className="text-xs text-slate-500 mt-1">4 B</div>
                        </div>
                    </div>
                </div>
                <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                    * <strong>Preamble & SFD:</strong> סיגנלים לסנכרון השעון בין הכרטיסים.<br />
                    * <strong>Addresses:</strong> כתובות ה-MAC של השולח והמקבל.<br />
                    * <strong>Type:</strong> איזה פרוטוקול נמצא בפנים? (למשל IPv4 או ARP).<br />
                    * <strong>FCS:</strong> בדיקת יתירות מחזורית (CRC) לגילוי שגיאות בשידור.
                </p>
            </div>

            {/* Frame Journey Animation */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Play size={18} className="text-green-400" /> סימולציה: מסע של Frame
                    </h3>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Interactive</span>
                </div>
                <FrameJourneyCanvas />
            </div>

            {/* MAC Address Section */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Hash className="text-purple-400" /> כתובת MAC
                    </h2>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        לכל כרטיס רשת בעולם יש כתובת ייחודית (כמו תעודת זהות) הצרובה בחומרה.
                        היא מורכבת מ-48 ביטים, וכתובה בבסיס הקסדצימלי (בסיס 16).
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 font-mono text-center text-xl tracking-wider mb-6">
                        <span className="text-purple-400">00:1A:2B</span>
                        <span className="text-slate-500 mx-1">:</span>
                        <span className="text-cyan-400">3C:4D:5E</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                            <div className="text-purple-400 font-bold mb-1">OUI (יצרן)</div>
                            <p className="text-xs text-slate-400">3 הבתים הראשונים מזהים את החברה (Intel, Cisco, Apple...)</p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                            <div className="text-cyan-400 font-bold mb-1">NIC (מכשיר)</div>
                            <p className="text-xs text-slate-400">3 הבתים האחרונים הם מזהה ייחודי לכרטיס הספציפי.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <h3 className="font-bold text-white mb-4">סוגי כתובות MAC</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="bg-slate-700 p-2 rounded text-white h-fit">👤</div>
                            <div>
                                <strong className="text-white block">Unicast</strong>
                                <span className="text-slate-400 text-sm">הודעה למכשיר אחד ספציפי. הביט הראשון של הבית הראשון הוא 0.</span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="bg-blue-900/50 p-2 rounded text-white h-fit">📢</div>
                            <div>
                                <strong className="text-white block">Broadcast</strong>
                                <span className="text-slate-400 text-sm">
                                    הודעה לכולם! הכתובת היא <code className="bg-slate-900 px-1 rounded text-red-300">FF:FF:FF:FF:FF:FF</code>.
                                </span>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="bg-purple-900/50 p-2 rounded text-white h-fit">👥</div>
                            <div>
                                <strong className="text-white block">Multicast</strong>
                                <span className="text-slate-400 text-sm">הודעה לקבוצת מכשירים שנרשמו לקבל אותה. (מתחיל ב-01:00:5E ב-IP).</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ARP Section */}
            <div className="pt-8 border-t border-slate-800">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Globe className="text-green-400" /> פרוטוקול ARP
                        </h2>
                        <h3 className="text-lg text-slate-200 mb-2">Address Resolution Protocol</h3>
                        <p className="text-slate-300 leading-relaxed">
                            אנחנו מדברים בכתובות IP, אבל הכבלים מבינים רק MAC. איך מגשרים על הפער?<br />
                            כשמחשב רוצה לדבר עם 192.168.1.5, הוא צועק (Broadcast):<br />
                            <span className="italic text-yellow-200">"למי יש את ה-IP הזה? תנו לי את ה-MAC שלכם!"</span><br />
                            והמכשיר הנכון עונה לו.
                        </p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 min-w-[280px]">
                        <div className="text-sm font-mono text-slate-400 mb-2">ARP Table Example:</div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs border-b border-slate-700 pb-1">
                                <span>IP Address</span>
                                <span>MAC Address</span>
                            </div>
                            <div className="flex justify-between font-mono text-green-300 text-sm">
                                <span>192.168.1.1</span>
                                <span>00:11:22:33:44:55</span>
                            </div>
                            <div className="flex justify-between font-mono text-green-300 text-sm">
                                <span>192.168.1.5</span>
                                <span>AA:BB:CC:DD:EE:FF</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
                    <ArpCanvas />
                </div>
            </div>
        </div>
    );
};

export default EthernetLesson;
