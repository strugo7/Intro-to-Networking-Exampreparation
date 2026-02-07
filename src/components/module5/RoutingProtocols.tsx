import React, { useState, useEffect, useRef } from 'react';
import { Play, Shield, Zap, Globe, Lock, Unlock } from 'lucide-react';

type Protocol = 'rip' | 'ospf' | 'bgp';

const RoutingProtocols = () => {
    const [protocol, setProtocol] = useState<Protocol>('rip');
    const [ospfHighSpeed, setOspfHighSpeed] = useState(false);
    const [bgpPolicyActive, setBgpPolicyActive] = useState(false);
    const [animating, setAnimating] = useState(false);

    // Animation Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const packetRef = useRef<HTMLDivElement>(null);

    const runAnimation = () => {
        if (animating) return;
        setAnimating(true);

        // Determine path based on state
        // We will use CSS classes/transforms for React animation instead of direct DOM manipulation of SVG paths for simplicity in React, 
        // or we can use the same logic if we render the paths.
        // Let's use a timeout to simulate the packet travel

        setTimeout(() => {
            setAnimating(false);
        }, 2000);
    };

    const protocols = {
        rip: {
            title: "RIP: סופר הקפיצות (הוותיק)",
            icon: "🐢",
            color: "green",
            description: (
                <>
                    <p className="mb-4">פרוטוקול RIP הוא כמו נהג שבוחר תמיד בדרך עם הכי מעט רמזורים, גם אם היא פקוקה לגמרי.</p>
                    <h4 className="font-bold text-lg mb-2">איך זה עובד?</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-6 font-heebo">
                        <li><strong>Metric:</strong> Hop Count (מספר הראוטרים בדרך).</li>
                        <li><strong>Bellman-Ford:</strong> כל 30 שניות, הראוטר צועק לשכנים שלו את כל מה שהוא יודע.</li>
                        <li><strong>Max Hops:</strong> 15. אם זה 16, הרשת נחשבת Unreachable.</li>
                    </ul>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700 text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>בסימולטור:</strong> שלח פאקט מ-A ל-B. <br />
                        למרות שהדרך למטה מהירה בטירוף (כביש מהיר), RIP יבחר בדרך למעלה כי יש בה פחות "קפיצות".
                    </div>
                </>
            )
        },
        ospf: {
            title: "OSPF: ה-GPS החכם (המהיר)",
            icon: "🐆",
            color: "blue",
            description: (
                <>
                    <p className="mb-4">OSPF הוא כמו Waze. הוא רואה את כל המפה (Link State Database) ויודע איפה יש פקקים.</p>
                    <h4 className="font-bold text-lg mb-2">איך זה עובד?</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-6 font-heebo">
                        <li><strong>Metric:</strong> Cost = Reference / Bandwidth. ככל שהכבל מהיר יותר, העלות נמוכה יותר.</li>
                        <li><strong>Dijkstra:</strong> מחשב את הנתיב הקצר ביותר (SPF).</li>
                        <li><strong>Areas:</strong> מחלק את הרשת לאזורים (Area 0 הוא הראשי).</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700 text-sm text-blue-800 dark:text-blue-200">
                        <strong>בסימולטור:</strong> שדרג את הכבל התחתון לסיב אופטי (Fiber). ראה איך OSPF משנה את הנתיב מיד כי ה-Cost ירד.
                    </div>
                </>
            )
        },
        bgp: {
            title: "BGP: הדיפלומט של האינטרנט",
            icon: "🌐",
            color: "purple",
            description: (
                <>
                    <p className="mb-4">BGP הוא הפרוטוקול שמחבר בין ספקי אינטרנט (AS - Autonomous Systems). כאן לא המהירות קובעת, אלא הכסף והפוליטיקה.</p>
                    <h4 className="font-bold text-lg mb-2">איך זה עובד?</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-6 font-heebo">
                        <li><strong>Path Vector:</strong> מונע לולאות ע"י רישום הדרך (AS-PATH).</li>
                        <li><strong>Attributes:</strong> החלטות מתקבלות לפי מדיניות (Policy). למשל: "אל תעבור דרך המתחרה שלי".</li>
                        <li><strong>Scalability:</strong> מחזיק את כל האינטרנט (מאות אלפי נתיבים).</li>
                    </ul>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700 text-sm text-purple-800 dark:text-purple-200">
                        <strong>בסימולטור:</strong> הדרך הקצרה עוברת דרך "Evil Corp". הפעל מדיניות אבטחה כדי לעקוף אותם, גם אם הדרך ארוכה יותר.
                    </div>
                </>
            )
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-16 font-heebo" dir="rtl">
            {/* Control Panel */}
            <div className="lg:w-1/3 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex">
                    {(['rip', 'ospf', 'bgp'] as Protocol[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => { setProtocol(p); setAnimating(false); }}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${protocol === p
                                ? `bg-${protocols[p].color}-600 text-white shadow-md`
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            <span className="text-xl">{protocols[p].icon}</span>
                            <span className="hidden md:inline uppercase">{p}</span>
                        </button>
                    ))}
                </div>

                <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border-t-4 border-${protocols[protocol].color}-600 h-full`}>
                    <h2 className={`text-2xl font-black mb-4 text-${protocols[protocol].color}-600`}>
                        {protocols[protocol].title}
                    </h2>
                    <div className="text-slate-600 dark:text-slate-300 mb-8">
                        {protocols[protocol].description}
                    </div>

                    <div className="mt-auto space-y-4">
                        {/* Protocol Specific Controls */}
                        {protocol === 'ospf' && (
                            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Link Speed (Bottom)</span>
                                <button
                                    onClick={() => setOspfHighSpeed(!ospfHighSpeed)}
                                    className={`px-3 py-1 rounded text-xs shadow-sm border transition-colors flex items-center gap-2 font-bold ${ospfHighSpeed
                                        ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700'
                                        : 'bg-white text-slate-600 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                                        }`}
                                >
                                    {ospfHighSpeed ? <Zap size={14} /> : null}
                                    {ospfHighSpeed ? "10Gbps (Fiber)" : "10Mbps (Slow)"}
                                </button>
                            </div>
                        )}

                        {protocol === 'bgp' && (
                            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Security Policy</span>
                                <button
                                    onClick={() => setBgpPolicyActive(!bgpPolicyActive)}
                                    className={`px-3 py-1 rounded text-xs shadow-sm border transition-colors flex items-center gap-2 font-bold ${bgpPolicyActive
                                        ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700'
                                        : 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700'
                                        }`}
                                >
                                    {bgpPolicyActive ? <Lock size={14} /> : <Unlock size={14} />}
                                    {bgpPolicyActive ? "Block Evil Corp" : "Policy Inactive"}
                                </button>
                            </div>
                        )}

                        <button
                            onClick={runAnimation}
                            disabled={animating}
                            className={`w-full py-3 px-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-white font-bold text-lg ${animating
                                ? 'bg-slate-400 cursor-not-allowed'
                                : `bg-${protocols[protocol].color}-600 hover:bg-${protocols[protocol].color}-700 hover:shadow-${protocols[protocol].color}-500/30 transform hover:-translate-y-1`
                                }`}
                        >
                            <Play size={20} fill="currentColor" />
                            {animating ? 'שולח...' : 'שלח חבילה'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Visualization Area */}
            <div ref={containerRef} className="lg:w-2/3 bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 relative overflow-hidden min-h-[400px] flex items-center justify-center">
                <GridBackground />

                {/* Geometries based on protocol */}
                <div className="relative w-full h-full max-w-lg aspect-video">
                    {protocol === 'rip' && <RipTopology animating={animating} />}
                    {protocol === 'ospf' && <OspfTopology highSpeed={ospfHighSpeed} animating={animating} />}
                    {protocol === 'bgp' && <BgpTopology policy={bgpPolicyActive} animating={animating} />}
                </div>
            </div>
        </div>
    );
};

// --- Sub Components ---

const GridBackground = () => (
    <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '24px 24px' }}>
    </div>
);

const Node: React.FC<{ x: number, y: number, label: string, color?: string, type?: 'router' | 'host' | 'as' }> = ({ x, y, label, color = 'slate', type = 'router' }) => {
    // Positioning is percentage based
    const style = { left: `${x}%`, top: `${y}%` };

    let shape;
    if (type === 'host') {
        shape = <div className={`w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-600 z-10 relative`}>
            <span className="font-bold text-xs">{label}</span>
        </div>;
    } else if (type === 'as') {
        shape = <div className={`w-20 h-20 ${color} rounded-xl flex flex-col items-center justify-center shadow-md border-2 z-10 relative px-2 text-center`}>
            <Globe size={16} className="mb-1 opacity-50" />
            <span className="font-bold text-xs leading-none">{label}</span>
        </div>;
    } else {
        // Router
        shape = <div className={`w-10 h-10 ${color} text-white rounded flex items-center justify-center shadow-md border border-white/20 z-10 relative`}>
            <span className="font-mono text-[10px] font-bold">{label}</span>
        </div>;
    }

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500" style={style}>
            {shape}
        </div>
    );
};

const Connection: React.FC<{ p1: { x: number, y: number }, p2: { x: number, y: number }, color?: string, label?: string, dashed?: boolean, width?: number }> =
    ({ p1, p2, color = '#94a3b8', label, dashed, width = 2 }) => {

        // Calculate path
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        // We render SVG line in a full size SVG overlay

        return null; // This logic is handled in the Topologies via SVG
    };

// --- Topologies ---

const RipTopology = ({ animating }: { animating: boolean }) => {
    // Coords in 0-100 scale
    const src = { x: 10, y: 50 };
    const dst = { x: 90, y: 50 };
    const r1 = { x: 50, y: 20 }; // Top path router
    const r2 = { x: 35, y: 80 }; // Bottom path
    const r3 = { x: 50, y: 80 };
    const r4 = { x: 65, y: 80 };

    const topPathView = `M ${src.x} ${src.y} L ${r1.x} ${r1.y} L ${dst.x} ${dst.y}`;
    const botPathView = `M ${src.x} ${src.y} L ${r2.x} ${r2.y} L ${r3.x} ${r3.y} L ${r4.x} ${r4.y} L ${dst.x} ${dst.y}`;

    // Relative Animation Paths (starting from 0,0 relative to src)
    // Top: src -> r1 (dx=40, dy=-30) -> dst (dx=40, dy=30)
    const animPathTop = `M 0 0 l 40 -30 l 40 30`;

    // Bot: src -> r2 (dx=25, dy=30) -> r3 (dx=15, dy=0) -> r4 (dx=15, dy=0) -> dst (dx=25, dy=-30)
    // const animPathBot = `M 0 0 l 25 30 l 15 0 l 15 0 l 25 -30`; // Unused for RIP currently but good for ref

    return (
        <>
            {/* SVG Connections with viewBox 0-100 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Top Path (Selected by RIP) */}
                <path d={topPathView}
                    fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 1" className="opacity-60" vectorEffect="non-scaling-stroke" />

                {/* Bottom Path */}
                <path d={botPathView}
                    fill="none" stroke="#94a3b8" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

                {/* Packet Animation */}
                {animating && (
                    <circle cx={src.x} cy={src.y} r="2" fill="#22c55e">
                        <animateMotion
                            dur="2s"
                            repeatCount="1"
                            path={animPathTop}
                            calcMode="linear"
                            fill="freeze"
                        />
                    </circle>
                )}
            </svg>

            {/* Labels */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-green-600 font-bold text-xs bg-green-50 px-2 rounded">1 Hop (RIP Choice)</div>
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-slate-400 font-bold text-xs">3 Hops (Ignored)</div>

            <Node x={src.x} y={src.y} label="Src" type="host" />
            <Node x={dst.x} y={dst.y} label="Dst" type="host" />

            <Node x={r1.x} y={r1.y} label="R1" color="bg-green-500" />

            <Node x={r2.x} y={r2.y} label="R2" color="bg-slate-400" />
            <Node x={r3.x} y={r3.y} label="R3" color="bg-slate-400" />
            <Node x={r4.x} y={r4.y} label="R4" color="bg-slate-400" />
        </>
    );
};

const OspfTopology = ({ highSpeed, animating }: { highSpeed: boolean, animating: boolean }) => {
    // Coords
    const src = { x: 10, y: 50 };
    const dst = { x: 90, y: 50 };
    const r1_top = { x: 50, y: 20 };
    const r1_bot = { x: 50, y: 80 };

    const topPathColor = highSpeed ? '#94a3b8' : '#3b82f6';
    const botPathColor = highSpeed ? '#3b82f6' : '#94a3b8';

    // Path strings for SVG lines (absolute)
    const pathTopView = `M ${src.x} ${src.y} L ${r1_top.x} ${r1_top.y} L ${dst.x} ${dst.y}`;
    const pathBotView = `M ${src.x} ${src.y} L ${r1_bot.x} ${r1_bot.y} L ${dst.x} ${dst.y}`;

    // Relative Animation Paths
    // Top: src -> top (dx=40, dy=-30) -> dst (dx=40, dy=30)
    const animPathTop = `M 0 0 l 40 -30 l 40 30`;
    // Bot: src -> bot (dx=40, dy=30) -> dst (dx=40, dy=-30)
    const animPathBot = `M 0 0 l 40 30 l 40 -30`;

    return (
        <>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Top Path */}
                <path d={pathTopView} fill="none" stroke={topPathColor} strokeWidth={highSpeed ? 0.5 : 1} vectorEffect="non-scaling-stroke" />

                {/* Bottom Path */}
                <path d={pathBotView} fill="none" stroke={botPathColor} strokeWidth={highSpeed ? 1 : 0.5} strokeDasharray={highSpeed ? "0" : "2 1"} vectorEffect="non-scaling-stroke" />

                {/* Packet Animation */}
                {animating && (
                    <circle cx={src.x} cy={src.y} r="2" fill="#3b82f6">
                        <animateMotion
                            dur="2s"
                            repeatCount="1"
                            path={highSpeed ? animPathBot : animPathTop}
                            calcMode="linear"
                            fill="freeze"
                        />
                    </circle>
                )}
            </svg>

            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-slate-500 text-xs bg-white/80 px-2 rounded border">Cost: 10</div>
            <div className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 font-bold text-xs bg-white/80 px-2 rounded border ${highSpeed ? 'text-blue-600 border-blue-200' : 'text-slate-400'}`}>
                Cost: {highSpeed ? '1 (Fiber)' : '100 (Copper)'}
            </div>

            <Node x={src.x} y={src.y} label="Src" type="host" />
            <Node x={dst.x} y={dst.y} label="Dst" type="host" />
            <Node x={r1_top.x} y={r1_top.y} label="R1" color="bg-slate-500" />
            <Node x={r1_bot.x} y={r1_bot.y} label="R2" color="bg-slate-500" />
        </>
    );
};

const BgpTopology = ({ policy, animating }: { policy: boolean, animating: boolean }) => {
    // Coords
    const src = { x: 15, y: 50 };
    const dst = { x: 85, y: 50 };

    // Top path (Short but Evil)
    const evil = { x: 50, y: 20 };

    // Bottom path (Long but Safe)
    const safe1 = { x: 35, y: 80 };
    const safe2 = { x: 65, y: 80 };

    const topPathView = `M ${src.x} ${src.y} L ${evil.x} ${evil.y} L ${dst.x} ${dst.y}`;
    const botPathView = `M ${src.x} ${src.y} L ${safe1.x} ${safe1.y} L ${safe2.x} ${safe2.y} L ${dst.x} ${dst.y}`;

    // Relative Animation Paths
    // Top (15,50 -> 50,20 -> 85,50): dx=35, dy=-30 then dx=35, dy=30
    const animPathTop = `M 0 0 l 35 -30 l 35 30`;

    // Bot (15,50 -> 35,80 -> 65,80 -> 85,50): dx=20,dy=30 -> dx=30,dy=0 -> dx=20,dy=-30
    const animPathBot = `M 0 0 l 20 30 l 30 0 l 20 -30`;

    return (
        <>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d={topPathView} fill="none" stroke={policy ? '#94a3b8' : '#ef4444'} strokeWidth={policy ? 0.5 : 1} strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
                <path d={botPathView} fill="none" stroke={policy ? '#22c55e' : '#94a3b8'} strokeWidth={policy ? 1 : 0.5} vectorEffect="non-scaling-stroke" />

                {/* Packet Animation */}
                {animating && (
                    <circle cx={src.x} cy={src.y} r="2" fill={policy ? "#22c55e" : "#ef4444"}>
                        <animateMotion
                            dur="2s"
                            repeatCount="1"
                            path={policy ? animPathBot : animPathTop}
                            calcMode="linear"
                            fill="freeze"
                        />
                    </circle>
                )}
            </svg>

            <Node x={src.x} y={src.y} label="AS 100" type="as" color="bg-white border-slate-300 text-slate-700" />
            <Node x={dst.x} y={dst.y} label="AS 400" type="as" color="bg-white border-slate-300 text-slate-700" />

            <Node x={evil.x} y={evil.y} label="AS 666 (Evil)" type="as" color="bg-red-50 border-red-200 text-red-800" />

            <Node x={safe1.x} y={safe1.y} label="AS 200" type="as" color="bg-green-50 border-green-200 text-green-800" />
            <Node x={safe2.x} y={safe2.y} label="AS 300" type="as" color="bg-green-50 border-green-200 text-green-800" />

            <div className={`absolute top-[35%] left-1/2 -translate-x-1/2 text-xs font-bold ${policy ? 'text-slate-400' : 'text-red-500'}`}>
                Shortest Path (Dangerous)
            </div>
        </>
    );
};

export default RoutingProtocols;
