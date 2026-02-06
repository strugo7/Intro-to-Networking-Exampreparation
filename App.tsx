import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Network, CheckCircle, Lock, ArrowLeft, ArrowRight, Sun, Moon,
  FileText, ExternalLink, Menu, X, ChevronDown, ChevronUp, Bot, Send, Trophy, ChevronRight
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { getModules, GLOSSARY, TRANSLATIONS, INITIAL_PROGRESS } from './constants';
import { Language, Module, UserProgress, ContentBlock } from './types';
import TopologyVisualizer from './components/TopologyVisualizer';
import Quiz from './components/Quiz';
import BinaryPractice from './components/BinaryPractice'; 
import { GlossaryView } from './components/GlossaryView';
import { VideoPlayer, InfoBlock, TerminalBlock, RouterDiagram, RoutingTable, EncapsulationDiagram, ListBlock, OSITable, MnemonicBlock, ScenarioBlock } from './components/LessonComponents';
import { getAIExplanation } from './services/geminiService';

const App = () => {
  const [lang, setLang] = useState<Language>(Language.HE); // Default to HE for demo
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); 
  const [view, setView] = useState<'dashboard' | 'module' | 'glossary' | 'practice'>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn'); // Removed visualize tab, now integrated
  
  const modules = getModules(lang);
  const activeModule = modules.find(m => m.id === activeModuleId);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === Language.HE;

  // AI Chat state
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Helper to get Lucide icon
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon size={24} className="text-white" /> : <BookOpen size={24} className="text-white" />;
  };

  const handleModuleClick = (id: string, isLocked: boolean) => {
    if (isLocked) return;
    setActiveModuleId(id);
    setActiveTab('learn');
    setView('module');
    setAiResponse('');
  };

  const handleQuizComplete = (score: number) => {
    if (activeModuleId) {
      setProgress(prev => ({
        ...prev,
        completedModules: Array.from(new Set([...prev.completedModules, activeModuleId])),
        quizScores: { ...prev.quizScores, [activeModuleId]: score }
      }));
    }
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    const response = await getAIExplanation(activeModule?.title || 'Computer Networks', aiQuery, lang);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  // --- Renderers ---

  const Header = () => (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-card-border bg-white dark:bg-[#111318] px-4 md:px-10 py-3 shadow-sm font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4 text-slate-900 dark:text-white cursor-pointer" onClick={() => setView('dashboard')}>
        <div className="size-8 text-primary">
          <Network size={32} />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden md:block">NetAcademy</h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        <div className="hidden md:flex items-center gap-9">
          <button onClick={() => setView('dashboard')} className={`text-sm font-medium leading-normal transition-colors ${view === 'dashboard' ? 'text-primary dark:text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white'}`}>
              {t.home}
          </button>
          <button onClick={() => setView('practice')} className={`text-sm font-medium leading-normal transition-colors ${view === 'practice' ? 'text-primary dark:text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white'}`}>
              {t.binaryPractice}
          </button>
          <button onClick={() => setView('glossary')} className={`text-sm font-medium leading-normal transition-colors ${view === 'glossary' ? 'text-primary dark:text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white'}`}>
              {t.glossary}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setLang(lang === Language.EN ? Language.HE : Language.EN)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-card-border transition-colors"
            >
                {lang === Language.EN ? 'EN' : 'HE'}
            </button>

            <button 
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-card-dark text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-card-border transition-colors"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
      </div>
    </header>
  );

  const Dashboard = () => {
    const level = Math.floor(progress.completedModules.length / 2) + 1;
    return (
      <div className="flex flex-col grow font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
          <div className="flex flex-col max-w-[1200px] flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pb-6 pt-2">
              <div className="flex flex-col">
                <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight">{t.myPath}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.pathDesc}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-card-dark px-3 py-1.5 rounded-full border border-slate-200 dark:border-card-border">
                <Trophy size={18} />
                <span>{t.level} {level}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {modules.map((module, idx) => {
                const isCompleted = progress.completedModules.includes(module.id);
                // Force unlock all modules as requested
                const isLocked = false; 
                const isInProgress = !isCompleted;
                const percent = isCompleted ? 100 : (isInProgress ? 0 : 0);

                if (isLocked) {
                  return (
                    <div key={module.id} className="flex flex-col rounded-xl border border-slate-200 dark:border-card-border bg-slate-50 dark:bg-card-dark/50 overflow-hidden shadow-none opacity-75 select-none relative h-full">
                       {/* Locked card content same as before... */}
                       <div className="flex flex-col flex-1 p-5 gap-4">
                          <h3 className="text-slate-700 dark:text-slate-300 text-xl font-bold">{module.title}</h3>
                          <button className="w-full mt-auto cursor-not-allowed items-center justify-center rounded-lg h-10 px-4 bg-slate-300 dark:bg-slate-700 text-slate-500 text-sm font-bold flex gap-2" disabled>
                             <Lock size={16} /> <span>{t.locked}</span>
                          </button>
                       </div>
                    </div>
                  )
                }

                return (
                  <div key={module.id} onClick={() => handleModuleClick(module.id, isLocked)} className={`flex flex-col rounded-xl border border-slate-200 dark:border-card-border bg-white dark:bg-card-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer h-full`}>
                    <div className="relative h-40 bg-cover bg-center" style={{backgroundImage: `linear-gradient(0deg, rgba(16, 22, 34, 0.8) 0%, rgba(16, 22, 34, 0.2) 100%), url("${module.image || 'https://images.unsplash.com/photo-1558494949-efdeb6bf80d1?auto=format&fit=crop&q=80'}")`}}>
                      <div className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'}`}>
                        <div className={`p-2 rounded-lg inline-flex items-center justify-center mb-1 shadow-lg ${isCompleted ? 'bg-slate-700' : 'bg-primary'}`}>
                           {getIcon(module.icon)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5 gap-4">
                      <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">{module.title}</h3>
                      <button className={`w-full mt-auto cursor-pointer items-center justify-center rounded-lg h-10 px-4 text-sm font-bold transition-colors flex gap-2 ${isCompleted ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'bg-primary text-white'}`}>
                        {isCompleted ? t.review : t.continue}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ModuleView = () => {
    if (!activeModule) return null;
    
    // --- Structured Content Renderer ---
    const renderBlock = (block: ContentBlock) => {
        switch (block.type) {
            case 'text':
                return (
                    <div key={block.id} className="mb-8">
                        {block.title && <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 scroll-mt-24" id={block.id}>{block.title}</h2>}
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{block.content}</p>
                    </div>
                );
            case 'video':
                return <VideoPlayer key={block.id} title={block.title || 'Video'} />;
            case 'code':
                return <TerminalBlock key={block.id} code={block.content as string} title={block.title} />;
            case 'info':
                return <InfoBlock key={block.id} title={block.title || 'Info'} items={block.data} />;
            case 'router-diagram':
                return <RouterDiagram key={block.id} isRTL={isRTL} />;
            case 'table':
                return <RoutingTable key={block.id} data={block.data} isRTL={isRTL} />;
            case 'encapsulation-diagram':
                return <EncapsulationDiagram key={block.id} isRTL={isRTL} />;
            case 'list':
                return <ListBlock key={block.id} items={block.content as string[]} />;
            case 'osi-table':
                return <OSITable key={block.id} isRTL={isRTL} />;
            case 'mnemonic':
                return <MnemonicBlock key={block.id} title={block.title!} content={block.content as string} />;
            case 'scenario':
                return <ScenarioBlock key={block.id} />;
            default:
                return null;
        }
    };

    const navItems = activeModule.blocks?.filter(b => b.title) || [];

    return (
      <div className={`flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white`} dir={isRTL ? 'rtl' : 'ltr'}>
        
        <div className="flex-1 flex overflow-hidden">
             {/* Sidebar (Table of Contents) */}
            <aside className={`w-80 bg-white dark:bg-[#111318] border-r border-slate-200 dark:border-card-border overflow-y-auto hidden lg:flex flex-col shrink-0 ${isRTL ? 'border-l border-r-0' : ''}`}>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <span onClick={() => setView('dashboard')} className="cursor-pointer hover:text-primary">Home</span>
                        <ChevronRight size={14} className={isRTL ? 'rotate-180' : ''} />
                        <span className="truncate">Network Fundamentals</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-bold mb-2 text-slate-600 dark:text-slate-300">
                            <span>{t.progress}</span>
                            <span className="text-primary">35%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-card-border rounded-full overflow-hidden">
                             <div className="h-full bg-primary w-[35%] rounded-full"></div>
                        </div>
                    </div>

                    {/* TOC */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Icons.List size={14} /> {t.tableOfContents}
                        </h3>
                        <div className="space-y-1">
                            {/* Previous Modules Mock */}
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400">
                                <CheckCircle size={16} className="text-emerald-500" />
                                <span className="text-sm font-medium line-through decoration-slate-400/50">Introduction to Models</span>
                            </div>

                            {/* Active Module */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl overflow-hidden">
                                <div className="px-3 py-3 flex items-center gap-3 bg-blue-100/50 dark:bg-blue-900/20 text-primary dark:text-blue-400 font-bold text-sm">
                                    <div className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">2</div>
                                    {activeModule.title}
                                </div>
                                <div className="py-2">
                                    {navItems.map((item, i) => (
                                        <a href={`#${item.id}`} key={i} className="block px-10 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-card-border/50 transition-colors border-l-2 border-transparent hover:border-primary ml-3">
                                            {item.title}
                                        </a>
                                    ))}
                                    {activeModule.questions.length > 0 && (
                                         <button onClick={() => setActiveTab('quiz')} className={`w-full text-${isRTL ? 'right' : 'left'} px-10 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-card-border/50 transition-colors border-l-2 border-transparent hover:border-primary ml-3 flex items-center gap-2`}>
                                             <Icons.HelpCircle size={14} /> {t.quiz}
                                         </button>
                                    )}
                                </div>
                            </div>

                             {/* Locked Module Mock */}
                             <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 opacity-60">
                                <Lock size={16} />
                                <span className="text-sm font-medium">TCP/IP Model</span>
                            </div>
                        </div>
                    </div>

                     {/* Resources */}
                     <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Icons.Folder size={14} /> {t.resources}
                        </h3>
                        <div className="space-y-2">
                            {activeModule.resources?.map((res, i) => (
                                <a key={i} href={res.url || '#'} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-card-dark border border-slate-100 dark:border-card-border rounded-lg hover:border-primary/50 transition-colors group">
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded shadow-sm text-red-500">
                                        {res.type === 'pdf' ? <FileText size={18} /> : <ExternalLink size={18} className="text-blue-500"/>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-primary">{res.title}</div>
                                        {res.size && <div className="text-xs text-slate-400">{res.size}</div>}
                                    </div>
                                </a>
                            ))}
                        </div>
                     </div>
                </div>
            </aside>

            {/* Main Content Scroll Area */}
            <main className="flex-1 overflow-y-auto relative scroll-smooth">
                {activeTab === 'quiz' ? (
                     <Quiz questions={activeModule.questions} onComplete={handleQuizComplete} language={lang} />
                ) : (
                    <div className="max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-14">
                        {/* Title Section */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {t.modules} 1.{modules.findIndex(m => m.id === activeModuleId) + 1}
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

                        {/* Blocks Rendering */}
                        <div className="space-y-12">
                            {activeModule.blocks?.map(renderBlock)}
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-20 pt-8 border-t border-slate-200 dark:border-card-border flex justify-between">
                            <button className="flex items-center gap-3 text-left group">
                                <div className={`w-12 h-12 rounded-full border border-slate-200 dark:border-card-border flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors ${isRTL ? 'order-last' : ''}`}>
                                    <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
                                </div>
                                <div className={isRTL ? 'text-right' : 'text-left'}>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{t.prevLesson}</div>
                                    <div className="text-slate-700 dark:text-slate-200 font-bold">1.1 Introduction</div>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 text-right group">
                                <div className={isRTL ? 'text-left' : 'text-right'}>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{t.nextLesson}</div>
                                    <div className="text-slate-700 dark:text-slate-200 font-bold">1.3 TCP/IP Model</div>
                                </div>
                                <div className={`w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform ${isRTL ? 'order-first' : ''}`}>
                                    <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* AI Tutor Floating Button */}
            <div className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-50`}>
                <button 
                    onClick={() => setIsAiOpen(!isAiOpen)}
                    className="w-14 h-14 bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                    {isAiOpen ? <X size={24} /> : <Bot size={28} />}
                </button>
                {/* AI Chat Popup (Simplified for brevity) */}
                {isAiOpen && (
                    <div className={`absolute bottom-16 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-card-border overflow-hidden animate-in slide-in-from-bottom-5`}>
                         <div className="p-4 bg-primary text-white font-bold flex justify-between">
                            <span>AI Tutor</span>
                         </div>
                         <div className="h-64 p-4 overflow-y-auto bg-slate-50 dark:bg-[#111318]">
                             {aiResponse ? <p className="text-sm text-slate-700 dark:text-slate-300">{aiResponse}</p> : <p className="text-sm text-slate-400 italic text-center mt-10">Ask me anything about this lesson...</p>}
                         </div>
                         <div className="p-3 border-t border-slate-200 dark:border-card-border flex gap-2 bg-white dark:bg-card-dark">
                             <input className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm outline-none" placeholder="Ask a question..." value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAskAI()} />
                             <button onClick={handleAskAI} className="bg-primary text-white p-2 rounded-lg"><Send size={16}/></button>
                         </div>
                    </div>
                )}
            </div>

        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="flex-1 flex flex-col">
        {view === 'dashboard' && <Dashboard />}
        {view === 'module' && <ModuleView />}
        {view === 'glossary' && <GlossaryView language={lang} onBack={() => setView('dashboard')} />}
        {view === 'practice' && (
             <div className="flex flex-col grow">
                <div className="max-w-7xl mx-auto px-4 py-4 w-full">
                  <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4 font-medium transition-colors w-fit">
                     <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} /> {t.back}
                 </button>
                </div>
                <BinaryPractice language={lang} />
             </div>
        )}
      </main>
    </div>
  );
};

export default App;