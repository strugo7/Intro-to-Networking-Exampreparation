import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp, Languages, Computer, Router, Flag } from 'lucide-react';
import { GlossaryTerm, Language } from '../types';
import { GLOSSARY, TRANSLATIONS } from '../constants';

interface GlossaryViewProps {
  language: Language;
  onBack: () => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const CATEGORIES = ["All Terms", "Protocols", "Hardware", "Security", "Routing", "Addressing", "General"];

export const GlossaryView: React.FC<GlossaryViewProps> = ({ language, onBack }) => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All Terms");
  const [expandedTerm, setExpandedTerm] = useState<string | null>("ARP"); // Default open for demo
  const t = TRANSLATIONS[language];
  const isRTL = language === Language.HE;

  const filteredGlossary = GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(filter.toLowerCase()) || 
                          item.definition.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory === "All Terms" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  const toggleTerm = (term: string) => {
    setExpandedTerm(expandedTerm === term ? null : term);
  };

  return (
    <div className="w-full max-w-[960px] mx-auto flex flex-col gap-6 px-4 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-2 font-medium w-fit"
      >
         <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} />
         {t.back}
      </button>

      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111418] dark:text-white text-4xl sm:text-5xl font-black tracking-[-0.033em]">{t.glossary}</h1>
        <p className="text-[#617589] dark:text-gray-400 text-lg">Browse standard terms, protocols, and definitions.</p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full shadow-sm">
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-[#617589]`}>
           <Search size={24} />
        </div>
        <input 
          className={`w-full h-14 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} rounded-xl border-none bg-white dark:bg-[#1a2632] text-lg text-[#111418] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-primary shadow-sm transition-all outline-none`}
          placeholder="Search terms (e.g., OSPF, Bandwidth)..." 
          type="text" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Filters & Alphabet Quick Jump */}
      <div className="flex flex-col gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-all ${
                 selectedCategory === cat 
                   ? 'bg-[#1a2632] dark:bg-white text-white dark:text-[#1a2632] font-semibold transform scale-105' 
                   : 'bg-white dark:bg-[#1a2632] text-[#111418] dark:text-gray-300 border border-[#e5e7eb] dark:border-[#2a3642] hover:border-primary hover:text-primary'
               }`}
             >
               {cat}
             </button>
          ))}
        </div>
        
        {/* A-Z Alphabet Bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-b border-[#f0f2f4] dark:border-[#2a3642]">
          {ALPHABET.map(letter => (
            <a key={letter} className="shrink-0 size-8 flex items-center justify-center rounded-md hover:bg-[#f0f2f4] dark:hover:bg-[#2a3642] text-[#617589] dark:text-gray-400 text-sm font-medium transition-colors cursor-pointer">
              {letter}
            </a>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4 pb-20">
        {filteredGlossary.map((item) => {
          const isExpanded = expandedTerm === item.term;
          
          if (isExpanded) {
            return (
              <div key={item.term} className="bg-white dark:bg-[#1a2632] rounded-xl shadow-lg border-l-4 border-primary p-6 flex flex-col gap-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Background Decoration */}
                <div className={`absolute top-0 ${isRTL ? 'left-0 rounded-br-full bg-gradient-to-br' : 'right-0 rounded-bl-full bg-gradient-to-bl'} w-32 h-32 from-blue-50 to-transparent dark:from-blue-900/20 pointer-events-none`}></div>
                
                {/* Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-[#111418] dark:text-white font-black text-2xl tracking-tight">{item.term}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 uppercase tracking-wide">{item.category}</span>
                      {item.tags?.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{tag}</span>
                      ))}
                    </div>
                    <p className="text-base text-[#617589] dark:text-gray-400 font-medium">{item.term} Definition</p>
                  </div>
                  <button onClick={() => toggleTerm(item.term)} className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                     <ChevronUp size={20} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Content Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
                   {/* Text Definitions */}
                   <div className="flex flex-col gap-6">
                      {/* English */}
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2 mb-1">
                            <Flag size={14} className="text-primary" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">English Definition</span>
                         </div>
                         <p className="text-[#111418] dark:text-gray-200 leading-relaxed text-sm">{item.definition}</p>
                      </div>
                      
                      {/* Hebrew */}
                      {item.hebrewDefinition && (
                          <div className="flex flex-col gap-2 relative">
                             <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 h-full w-0.5 bg-gray-100 dark:bg-gray-700`}></div>
                             <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'pl-3' : 'justify-end pr-3'}`}>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hebrew Definition</span>
                                <Languages size={14} className="text-primary" />
                             </div>
                             <p className={`text-[#111418] dark:text-gray-200 leading-relaxed text-sm ${isRTL ? 'text-left pl-3' : 'text-right pr-3'}`} dir="rtl">
                                {item.hebrewDefinition}
                             </p>
                          </div>
                      )}
                   </div>

                   {/* Visual / Extra */}
                   {(item.visualType === 'arp-table' || item.relatedTerms) && (
                     <div className="flex flex-col gap-6">
                        {item.visualType === 'arp-table' && (
                           <div className="flex flex-col gap-3">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ARP Table Visualization</span>
                              <div className="bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex flex-col gap-3">
                                  <div className="flex justify-between text-xs font-mono text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                                     <span>IP Address</span>
                                     <span>MAC Address</span>
                                     <span>Type</span>
                                  </div>
                                  <div className="flex justify-between text-xs font-mono text-[#111418] dark:text-gray-300">
                                     <span>192.168.1.1</span>
                                     <span className="text-primary">00:1A:2B:3C:4D:5E</span>
                                     <span className="text-green-600">Dynamic</span>
                                  </div>
                                  <div className="flex justify-between text-xs font-mono text-[#111418] dark:text-gray-300">
                                     <span>192.168.1.15</span>
                                     <span className="text-primary">AA:BB:CC:11:22:33</span>
                                     <span className="text-green-600">Dynamic</span>
                                  </div>
                                  <div className="mt-2 h-24 w-full rounded bg-white dark:bg-[#1a2632] border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
                                      <div className="absolute left-4 top-1/2 -translate-y-1/2 size-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                                         <Computer size={16} className="text-gray-500" />
                                      </div>
                                      <div className="absolute right-4 top-1/2 -translate-y-1/2 size-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                                         <Router size={16} className="text-gray-500" />
                                      </div>
                                      <div className="h-0.5 w-24 bg-gray-300 dark:bg-gray-500 relative">
                                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">Request?</div>
                                      </div>
                                  </div>
                              </div>
                           </div>
                        )}
                        
                        {item.relatedTerms && (
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Related Terms:</span>
                            {item.relatedTerms.map(rt => (
                               <span key={rt} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer">
                                  {rt}
                               </span>
                            ))}
                          </div>
                        )}
                     </div>
                   )}
                </div>
              </div>
            );
          }

          // Collapsed State
          return (
             <div 
               key={item.term} 
               onClick={() => toggleTerm(item.term)}
               className="bg-white dark:bg-[#1a2632] rounded-lg shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-[#374151] p-4 flex items-center justify-between cursor-pointer group transition-all"
             >
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-3">
                      <h3 className="text-[#111418] dark:text-gray-100 font-bold text-lg">{item.term}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{item.category}</span>
                   </div>
                   <p className="text-sm text-[#617589] dark:text-gray-400">{item.definition.substring(0, 60)}...</p>
                </div>
                <ChevronDown size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
             </div>
          );
        })}
      </div>
      
      <div className="flex justify-center pb-12">
        <button className="flex items-center gap-2 text-primary font-medium hover:underline">
           <span>Load more definitions</span>
           <ChevronDown size={16} />
        </button>
      </div>

    </div>
  );
};