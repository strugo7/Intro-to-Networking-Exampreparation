import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight, Menu, CheckCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getModules } from '../data';
import { TRANSLATIONS } from '../data/translations';
import { ContentBlock } from '../types';
import Quiz from '../components/Quiz';
import { VideoPlayer, InfoBlock, TerminalBlock, RouterDiagram, RoutingTable, EncapsulationDiagram, ListBlock, OSITable, MnemonicBlock, ScenarioBlock } from '../components/LessonComponents';
import TransmissionVisualizer from '../components/module1/TransmissionVisualizer';
import TopologyExplorer from '../components/module1/TopologyExplorer';
import OSIIntro from '../components/module1/OSIIntro';
import BitDemo from '../components/module1/BitDemo';
import FiberDemo from '../components/module1/FiberDemo';
import CopperDemo from '../components/module1/CopperDemo';
import WiFiDemo from '../components/module1/WiFiDemo';
import MediaComparison from '../components/module1/MediaComparison';
import ArchitectureDemo from '../components/module7/ArchitectureDemo';
import ProtocolExplorer from '../components/module7/ProtocolExplorer';
import DNSSimulator from '../components/module7/DNSSimulator';
import MultiplexingSimulator from '../components/module6/MultiplexingSimulator';
import ThreeWayHandshake from '../components/module6/ThreeWayHandshake';
import PacketJourneyDemo from '../components/module5/PacketJourneyDemo';
import IPHeaderVisualizer from '../components/module5/IPHeaderVisualizer';
import RouterSimulator from '../components/module5/RouterSimulator';
import FragmentationDemo from '../components/module5/FragmentationDemo';
import RoutingProtocols from '../components/module5/RoutingProtocols';
import ProtocolComparison from '../components/module5/ProtocolComparison';
import FrameVisualizer from '../components/module4/FrameVisualizer';
import SwitchSimulator from '../components/module4/SwitchSimulator';
import ARPExplainer from '../components/module4/ARPExplainer';
import VLANVisualizer from '../components/module4/VLANVisualizer';

import ReactMarkdown from 'react-markdown';


export const ModulePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { lang, updateProgress } = useAppContext();
    const t = TRANSLATIONS[lang];
    const isRTL = lang === 'he';

    const modules = getModules(lang);
    const activeModule = modules.find(m => m.id === id);

    const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');


    if (!activeModule) return <div>Module not found</div>;

    const handleQuizComplete = (score: number) => {
        if (id) {
            updateProgress(id, score);
        }
    };

    const handleMarkComplete = () => {
        if (id) {
            updateProgress(id);
            navigate('/');
        }
    };



    const renderBlock = (block: ContentBlock) => {
        switch (block.type) {
            case 'text':
                return (
                    <div key={block.id} className="mb-8">
                        {block.title && <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 scroll-mt-24" id={block.id}>{block.title}</h2>}
                        <div className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed prose dark:prose-invert max-w-none">
                            <ReactMarkdown>{block.content as string}</ReactMarkdown>
                        </div>
                    </div>
                );
            case 'video': return <VideoPlayer key={block.id} title={block.title || 'Video'} />;
            case 'code': return <TerminalBlock key={block.id} code={block.content as string} title={block.title} />;
            case 'info': return <InfoBlock key={block.id} title={block.title || 'Info'} items={block.data} />;
            case 'router-diagram': return <RouterDiagram key={block.id} isRTL={isRTL} />;
            case 'table': return <RoutingTable key={block.id} data={block.data} isRTL={isRTL} />;
            case 'image':
                return (
                    <div key={block.id} className="mb-8 flex flex-col items-center">
                        <img
                            src={block.content as string}
                            alt={block.title}
                            className="rounded-xl shadow-lg border border-slate-200 dark:border-card-border max-w-full md:max-w-2xl"
                            onError={(e) => {
                                console.error(`Failed to load image: ${block.content}`);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        {block.title && <span className="mt-3 text-sm text-slate-500 dark:text-slate-400 italic">{block.title}</span>}
                    </div>
                );
            case 'encapsulation-diagram': return <EncapsulationDiagram key={block.id} isRTL={isRTL} />;
            case 'list': return <ListBlock key={block.id} items={block.content as string[]} />;
            case 'osi-table': return <OSITable key={block.id} isRTL={isRTL} />;
            case 'transmission-visualizer': return <TransmissionVisualizer key={block.id} />;
            case 'topology-explorer': return <TopologyExplorer key={block.id} />;
            case 'osi-intro': return <OSIIntro key={block.id} />;
            case 'bit-demo': return <BitDemo key={block.id} />;
            case 'fiber-demo': return <FiberDemo key={block.id} />;
            case 'copper-demo': return <CopperDemo key={block.id} />;
            case 'wifi-demo': return <WiFiDemo key={block.id} />;
            case 'media-comparison': return <MediaComparison key={block.id} />;
            case 'bit-demo': return <BitDemo key={block.id} />;
            case 'fiber-demo': return <FiberDemo key={block.id} />;
            case 'copper-demo': return <CopperDemo key={block.id} />;
            case 'wifi-demo': return <WiFiDemo key={block.id} />;
            case 'media-comparison': return <MediaComparison key={block.id} />;
            case 'architecture-demo': return <ArchitectureDemo key={block.id} />;
            case 'protocol-explorer': return <ProtocolExplorer key={block.id} />;
            case 'dns-simulator': return <DNSSimulator key={block.id} />;
            case 'multiplexing-simulator': return <MultiplexingSimulator key={block.id} />;
            case 'three-way-handshake': return <ThreeWayHandshake key={block.id} />;
            case 'packet-journey': return <PacketJourneyDemo key={block.id} />;
            case 'ip-header-visualizer': return <IPHeaderVisualizer key={block.id} />;
            case 'router-simulator': return <RouterSimulator key={block.id} />;
            case 'fragmentation-demo': return <FragmentationDemo key={block.id} />;
            case 'frame-visualizer': return <FrameVisualizer key={block.id} />;
            case 'switch-simulator': return <SwitchSimulator key={block.id} />;
            case 'arp-explainer': return <ARPExplainer key={block.id} />;
            case 'vlan-visualizer': return <VLANVisualizer key={block.id} />;
            case 'routing-protocols': return <RoutingProtocols key={block.id} />;
            case 'protocol-comparison': return <ProtocolComparison key={block.id} />;
            case 'mnemonic': return <MnemonicBlock key={block.id} title={block.title!} content={block.content as string} />;
            case 'scenario': return <ScenarioBlock key={block.id} />;
            default: return null;
        }
    };

    const navItems = activeModule.blocks?.filter(b => b.title) || [];

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar (Table of Contents) */}
                <aside className={`w-80 bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-card-border overflow-y-auto hidden lg:flex flex-col shrink-0 ${isRTL ? 'border-l border-r-0' : ''}`}>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-primary">Home</span>
                            <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
                            <span className="truncate">{activeModule.title}</span>
                        </div>
                        {/* TOC */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Icons.List size={14} /> {t.tableOfContents}
                            </h3>
                            <div className="space-y-1">
                                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl overflow-hidden">
                                    <div className="px-3 py-3 flex items-center gap-3 bg-blue-100/50 dark:bg-blue-900/20 text-primary dark:text-blue-400 font-bold text-sm">
                                        <div className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">#</div>
                                        {activeModule.title}
                                    </div>
                                    <div className="py-2">
                                        <button onClick={() => setActiveTab('learn')} className={`w-full text-${isRTL ? 'right' : 'left'} px-10 py-2 text-sm ${activeTab === 'learn' ? 'text-primary font-bold' : 'text-slate-600'} hover:text-primary transition-colors flex items-center gap-2`}>
                                            <Icons.BookOpen size={14} /> {t.learn}
                                        </button>
                                        {navItems.map((item, i) => (
                                            <a href={`#${item.id}`} key={i} className="block px-10 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-card-border/50 transition-colors border-l-2 border-transparent hover:border-primary ml-3">
                                                {item.title}
                                            </a>
                                        ))}
                                        {activeModule.questions.length > 0 && (
                                            <button onClick={() => setActiveTab('quiz')} className={`w-full text-${isRTL ? 'right' : 'left'} px-10 py-2 text-sm ${activeTab === 'quiz' ? 'text-primary font-bold' : 'text-slate-600'} hover:text-primary transition-colors flex items-center gap-2`}>
                                                <Icons.HelpCircle size={14} /> {t.quiz}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Scroll Area */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth p-6 md:p-12">
                    {activeTab === 'quiz' ? (
                        <Quiz questions={activeModule.questions} onComplete={handleQuizComplete} language={lang} />
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {activeModule.difficulty}
                                    </span>
                                    <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                                        <Icons.Clock size={14} /> {activeModule.estimatedTime}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                                    {activeModule.title}
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-primary pl-6">
                                    {activeModule.description}
                                </p>
                            </div>

                            <div className="space-y-12">
                                {activeModule.blocks?.map(renderBlock)}
                            </div>

                            <div className="mt-16 flex justify-center">
                                <button
                                    onClick={handleMarkComplete}
                                    className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95"
                                >
                                    <CheckCircle size={20} />
                                    {t.congrats || "Complete Lesson"}
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Conditional Navigation for Module 4 -> Module 5 */}
                    {id === 'm4' && (
                        <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
                            <div
                                onClick={() => navigate('/module/m5')}
                                className="group cursor-pointer bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-2xl p-8 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        השיעור הבא: שכבה 3 - הרשת (Network) 🌐
                                    </h3>
                                    <p className="text-slate-400">
                                        עולים קומה: איך האינטרנט עובד באמת? IP, Routers ו-Subnetting.
                                    </p>
                                </div>
                                <div className="bg-blue-600/20 p-4 rounded-full text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all transform rotate-180">
                                    <ArrowRight size={32} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conditional Navigation for Module 5 */}
                    {id === 'm5' && (
                        <div className="max-w-4xl mx-auto px-6 mt-12 mb-20">
                            <div
                                onClick={() => navigate('/practice/binary')}
                                className="group cursor-pointer bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-2xl p-8 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        השיעור הבא: אומנות הבינארית ו-IP 🚀
                                    </h3>
                                    <p className="text-slate-400">
                                        למדו איך המחשב באמת קורא את הכתובות האלו (0 ו-1) ותירגלו המרות.
                                    </p>
                                </div>
                                <div className="bg-blue-600/20 p-4 rounded-full text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                    <ArrowLeft size={32} />
                                </div>
                            </div>
                        </div>
                    )}
                </main>


            </div>
        </div>
    );
};
