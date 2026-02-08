import React from 'react';
import VlanSimCanvas from './VlanSimCanvas';
import { Layers, Shield, Lock, Activity, Settings, DollarSign, Plug, Tag, Network } from 'lucide-react';

const VlanLesson: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
                    Virtual LANs (VLANs)
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    הפרד ומשול. איך מחלקים מתג פיזי אחד למספר רשתות לוגיות נפרדות ומאובטחות.
                </p>
            </div>

            {/* What is VLAN */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Layers className="text-yellow-400" /> מה זה VLAN?
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                            במקום לקנות מתג נפרד לכל מחלקה (כספים, פיתוח, הנהלה), אנחנו לוקחים מתג אחד גדול ומחלקים אותו לוגית.
                            <br /><br />
                            <strong className="text-red-400">הכלל החשוב:</strong> מחשב ב-VLAN 10 ל<strong>א יכול</strong> לדבר ישירות עם מחשב ב-VLAN 20, גם אם הם מחוברים לאותו מתג פיזי (אלא אם יש נתב בדרך).
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3">
                                <Lock className="text-green-400" />
                                <div>
                                    <div className="font-bold text-slate-200">Security</div>
                                    <div className="text-xs text-slate-500">הפרדה מוחלטת</div>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3">
                                <Activity className="text-blue-400" />
                                <div>
                                    <div className="font-bold text-slate-200">Performance</div>
                                    <div className="text-xs text-slate-500">פחות רעש (Broadcast)</div>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3">
                                <Settings className="text-purple-400" />
                                <div>
                                    <div className="font-bold text-slate-200">Management</div>
                                    <div className="text-xs text-slate-500">גמישות בשינויים</div>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-3 rounded-lg flex items-center gap-3">
                                <DollarSign className="text-yellow-400" />
                                <div>
                                    <div className="font-bold text-slate-200">Cost</div>
                                    <div className="text-xs text-slate-500">פחות חומרה</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Concept */}
                    <div className="bg-slate-800 rounded-xl p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <div className="flex justify-center mb-4">
                            <div className="bg-slate-700 w-full max-w-[200px] h-12 rounded border border-slate-600 flex items-center justify-center text-slate-400 text-sm">
                                Physical Switch
                            </div>
                        </div>
                        <div className="flex justify-around relative">
                            {/* Abstract connections */}
                            <div className="absolute top-0 left-1/4 w-0.5 h-8 bg-slate-600 -translate-y-full"></div>
                            <div className="absolute top-0 right-1/4 w-0.5 h-8 bg-slate-600 -translate-y-full"></div>

                            <div className="bg-blue-500/20 border border-blue-500/40 p-4 rounded-lg w-1/3 text-center">
                                <div className="text-blue-400 font-bold mb-2">VLAN 10</div>
                                <div className="text-xs text-slate-400">Sales</div>
                            </div>
                            <div className="bg-green-500/20 border border-green-500/40 p-4 rounded-lg w-1/3 text-center">
                                <div className="text-green-400 font-bold mb-2">VLAN 20</div>
                                <div className="text-xs text-slate-400">Engineering</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Port Types */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plug className="text-orange-400" /> סוגי פורטים (Ports)
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Access Port */}
                    <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-blue-500 hover:bg-slate-750 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white">Access Port</h3>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">End Devices</span>
                        </div>
                        <p className="text-slate-400 mb-4">
                            מחובר למחשב קצה (PC, מדפסת). שייך ל-VLAN <strong>אחד בלבד</strong>.
                            המידע יוצא ונכנס ללא תיוג (Untagged).
                        </p>
                        <div className="bg-black/30 p-3 rounded font-mono text-sm text-green-400">
                            switchport mode access<br />
                            switchport access vlan 10
                        </div>
                    </div>

                    {/* Trunk Port */}
                    <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-purple-500 hover:bg-slate-750 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white">Trunk Port</h3>
                            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Switch-to-Switch</span>
                        </div>
                        <p className="text-slate-400 mb-4">
                            צינור מרכזי שמעביר מידע של <strong>מספר VLANs</strong> במקביל.
                            מחבר בין מתגים. המידע מסומן באמצעות תג (Tagged).
                        </p>
                        <div className="bg-black/30 p-3 rounded font-mono text-sm text-green-400">
                            switchport mode trunk<br />
                            switchport trunk allowed vlan 10,20
                        </div>
                    </div>
                </div>
            </div>

            {/* 802.1Q Tagging */}
            <div className="bg-slate-900 border border-slate-700/50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Tag className="text-pink-400" /> תיוג 802.1Q
                </h2>
                <p className="text-slate-400 mb-6">
                    איך המתג השני יודע אם החבילה שייכת ל-VLAN 10 או 20? אנחנו מוסיפים "מדבקה" (Tag) של 4 בתים לתוך ה-Frame.
                </p>

                {/* Visual Frame with Tag */}
                <div className="relative overflow-x-auto pb-4">
                    <div className="flex min-w-[600px] gap-1 text-center font-mono text-sm">
                        <div className="flex-[2] bg-slate-800 p-3 border-r border-slate-600 rounded-l-lg opacity-50">
                            <div className="text-white font-bold">Dest MAC</div>
                        </div>
                        <div className="flex-[2] bg-slate-800 p-3 border-r border-slate-600 opacity-50">
                            <div className="text-white font-bold">Src MAC</div>
                        </div>

                        {/* THE TAG */}
                        <div className="w-40 bg-pink-500/20 border-2 border-pink-500 p-2 rounded relative transform -translate-y-2 scale-110 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-pink-400 font-bold text-xs whitespace-nowrap">
                                4 Bytes Added
                            </div>
                            <div className="text-pink-400 font-bold">802.1Q Tag</div>
                            <div className="text-[10px] text-pink-300 mt-1">VID: 10</div>
                        </div>

                        <div className="w-20 bg-slate-800 p-3 border-r border-slate-600 opacity-50">
                            <div className="text-white font-bold">Type</div>
                        </div>
                        <div className="flex-[3] bg-slate-800 p-3 opacity-50 rounded-r-lg">
                            <div className="text-white font-bold">Data...</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Simulator */}
            <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Network className="text-cyan-400" /> מעבדה: סימולטור VLAN
                </h2>
                <p className="text-slate-400 mb-4">
                    נסו לשלוח פינג בין מחשבים. שימו לב: פינג יעבוד רק אם המחשבים באותו VLAN!
                </p>
                <VlanSimCanvas />
            </div>
        </div>
    );
};

export default VlanLesson;
