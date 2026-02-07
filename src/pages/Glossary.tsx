import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Flag, Languages, Monitor, Router as RouterIcon, ArrowDown, Activity, Globe, Database, Shield, Server, Wifi, Lock, Cpu, Layers, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { glossaryData } from '../data/glossaryData';
import { GlossaryTerm, GlossaryVisualization } from '../types';

export const GlossaryPage = () => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState<string | null>('ARP');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Terms');
    const [displayCount, setDisplayCount] = useState(20);

    const categories = ['All Terms', ...Array.from(new Set(glossaryData.map(item => item.category)))];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredData = useMemo(() => {
        return glossaryData.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.definitionEn.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All Terms' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => a.term.localeCompare(b.term));
    }, [searchTerm, selectedCategory]);

    const displayedData = filteredData.slice(0, displayCount);

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 20);
    };

    return (
        <div className="flex flex-col grow min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans text-[#111418] dark:text-gray-100">
            <main className="flex-1 flex flex-col items-center w-full px-4 sm:px-10 py-8">
                <div className="w-full max-w-[960px] flex flex-col gap-6">

                    {/* Title & Search Section */}
                    <section className="flex flex-col gap-6 mb-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#111418] dark:text-white text-4xl sm:text-5xl font-black tracking-[-0.033em]">
                                Networking Glossary
                            </h1>
                            <p className="text-[#617589] dark:text-gray-400 text-lg">
                                Browse standard terms, protocols, and definitions.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#617589]">
                                <Search size={24} />
                            </div>
                            <input
                                className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-white dark:bg-[#1a2632] text-lg text-[#111418] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#137fec] shadow-sm transition-all outline-none"
                                placeholder="Search terms (e.g., OSPF, Bandwidth)..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filters & Alphabet Quick Jump */}
                        <div className="flex flex-col gap-4">
                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-3">
                                {categories.map((cat, i) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-transform hover:scale-105 ${selectedCategory === cat
                                            ? 'bg-[#1a2632] dark:bg-white text-white dark:text-[#1a2632]'
                                            : 'bg-white dark:bg-[#1a2632] text-[#111418] dark:text-gray-300 border border-[#e5e7eb] dark:border-[#2a3642] hover:border-[#137fec] hover:text-[#137fec]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* A-Z Alphabet Bar */}
                            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-b border-[#f0f2f4] dark:border-[#2a3642]">
                                {alphabet.map((char) => (
                                    <a
                                        key={char}
                                        className="shrink-0 size-8 flex items-center justify-center rounded-md hover:bg-[#f0f2f4] dark:hover:bg-[#2a3642] text-[#617589] dark:text-gray-400 text-sm font-medium transition-colors cursor-pointer"
                                        onClick={() => setSearchTerm(char)}
                                    >
                                        {char}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Dictionary Content List */}
                    <div className="flex flex-col gap-4 pb-20">
                        {displayedData.length > 0 ? (
                            displayedData.map(item => (
                                <GlossaryItem
                                    key={item.term}
                                    item={item}
                                    expandedId={expandedId}
                                    onToggle={toggleExpand}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No terms found matching your search.
                            </div>
                        )}
                    </div>

                    {/* Load More */}
                    {displayedData.length < filteredData.length && (
                        <div className="flex justify-center pb-12">
                            <button
                                onClick={handleLoadMore}
                                className="flex items-center gap-2 text-[#137fec] font-medium hover:underline"
                            >
                                <span>Load more definitions</span>
                                <ArrowDown size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const GlossaryItem = ({ item, expandedId, onToggle }: { item: GlossaryTerm, expandedId: string | null, onToggle: (id: string) => void }) => {
    const isExpanded = expandedId === item.term;

    return (
        <div
            onClick={() => onToggle(item.term)}
            className={`
                bg-white dark:bg-[#1a2632] rounded-lg transition-all cursor-pointer
                ${isExpanded
                    ? 'shadow-lg border-l-4 border-[#137fec] p-6 relative overflow-hidden'
                    : 'shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-[#374151] p-4 flex items-center justify-between group'}
            `}
        >
            {isExpanded ? (
                // Expanded View
                <>
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/20 rounded-bl-full pointer-events-none"></div>

                    {/* Header */}
                    <div className="flex items-center justify-between z-10 mb-6 relative">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <h3 className="text-[#111418] dark:text-white font-black text-2xl tracking-tight">{item.term}</h3>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 uppercase tracking-wide">
                                    {item.category}
                                </span>
                                {item.layer && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                        {item.layer}
                                    </span>
                                )}
                            </div>
                            <p className="text-base text-[#617589] dark:text-gray-400 font-medium">{item.fullName}</p>
                        </div>
                        <button className="size-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <ChevronUp size={20} className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
                        {/* Text Definitions */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Flag size={16} className="text-[#137fec]" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">English Definition</span>
                                </div>
                                <p className="text-[#111418] dark:text-gray-200 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.definitionEn }} />
                            </div>

                            {item.definitionHe && (
                                <div className="flex flex-col gap-2 relative">
                                    <div className="absolute right-0 top-0 h-full w-0.5 bg-gray-100 dark:bg-gray-700"></div>
                                    <div className="flex items-center justify-end gap-2 mb-1 pr-3">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hebrew Definition</span>
                                        <Languages size={16} className="text-[#137fec]" />
                                    </div>
                                    <p className="text-[#111418] dark:text-gray-200 leading-relaxed text-sm text-right pr-3 font-sans" dir="rtl" dangerouslySetInnerHTML={{ __html: item.definitionHe }} />
                                </div>
                            )}

                            {item.relatedTerms && item.relatedTerms.length > 0 && (
                                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Related Terms:</span>
                                    {item.relatedTerms.map(term => (
                                        <span key={term} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#137fec] text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer">
                                            {term}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Visualization */}
                        {item.visualization && (
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visualization</span>
                                <div className="bg-gray-50 dark:bg-black/30 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                                    <GlossaryVisual visualization={item.visualization} />
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                // Collapsed View
                <>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-[#111418] dark:text-gray-100 font-bold text-lg">{item.term}</h3>
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                {item.category}
                            </span>
                        </div>
                        <p className="text-sm text-[#617589] dark:text-gray-400">{item.fullName}</p>
                    </div>
                    <ChevronDown size={20} className="text-gray-400 group-hover:text-[#137fec] transition-colors" />
                </>
            )}
        </div>
    );
};

const GlossaryVisual = ({ visualization }: { visualization: GlossaryVisualization }) => {
    switch (visualization.type) {
        case 'arp-table':
            return (
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-xs font-mono text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                        <span>IP Address</span>
                        <span>MAC Address</span>
                        <span>Type</span>
                    </div>
                    {visualization.data.map((entry: any, i: number) => (
                        <div key={i} className="flex justify-between text-xs font-mono text-[#111418] dark:text-gray-300">
                            <span>{entry.ip}</span>
                            <span className="text-[#137fec]">{entry.mac}</span>
                            <span className="text-green-600">{entry.type}</span>
                        </div>
                    ))}
                    <div className="mt-2 h-20 w-full rounded bg-white dark:bg-[#1a2632] border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 size-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                            <Monitor size={16} className="text-gray-500" />
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 size-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                            <RouterIcon size={16} className="text-gray-500" />
                        </div>
                        <div className="h-0.5 w-24 bg-gray-300 dark:bg-gray-500 relative">
                            <ArrowRight size={14} className="absolute -top-2 left-1/2 -translate-x-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>
            );

        case 'routing':
            return (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                        <RouterIcon size={16} className="text-blue-500" />
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">BGP Routing Table</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-1">
                        <span>Network</span>
                        <span>Next Hop</span>
                        <span>Path</span>
                    </div>
                    {visualization.data.map((route: any, i: number) => (
                        <div key={i} className="grid grid-cols-3 gap-2 text-xs font-mono text-[#111418] dark:text-gray-300 border-b border-dashed border-gray-100 dark:border-gray-800 pb-1 last:border-0">
                            <span>{route.prefix}</span>
                            <span className="text-[#137fec]">{route.nextHop}</span>
                            <span className="truncate">{route.as}</span>
                        </div>
                    ))}
                </div>
            );

        case 'bandwidth':
            return (
                <div className="flex flex-col gap-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ArrowDown size={16} className="text-green-500" />
                            <span className="text-xs font-bold text-gray-500">DOWNLOAD</span>
                        </div>
                        <span className="text-xl font-black font-mono text-[#111418] dark:text-white">
                            {visualization.data.download} <span className="text-sm font-normal text-gray-400">{visualization.data.unit}</span>
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[80%] rounded-full"></div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <ArrowRight size={16} className="text-blue-500 -rotate-45" />
                            <span className="text-xs font-bold text-gray-500">UPLOAD</span>
                        </div>
                        <span className="text-xl font-black font-mono text-[#111418] dark:text-white">
                            {visualization.data.upload} <span className="text-sm font-normal text-gray-400">{visualization.data.unit}</span>
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[40%] rounded-full"></div>
                    </div>
                </div>
            );

        case 'dns-lookup':
            return (
                <div className="flex flex-col gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Monitor size={14} />
                        <span>Query: {visualization.data.domain}</span>
                    </div>
                    <div className="pl-4 border-l-2 border-[#137fec] py-1 flex flex-col gap-1">
                        <span className="text-[#137fec]">→ DNS Resolver</span>
                        <span className="text-gray-400 text-[10px]">Looking up record (A)...</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Server size={14} />
                        <span>Result: {visualization.data.ip} (TTL: {visualization.data.ttl})</span>
                    </div>
                </div>
            );

        case 'cidr':
            return (
                <div className="flex flex-col gap-2">
                    {visualization.data.map((item: any, i: number) => (
                        <div key={i} className="flex flex-col p-3 bg-gray-50 dark:bg-[#1e2936] rounded border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-mono font-bold text-[#137fec]">{item.cidr}</span>
                                <span className="text-[10px] bg-gray-200 dark:bg-gray-600 px-1.5 rounded text-gray-600 dark:text-gray-300">Hosts: {item.hosts}</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">Mask: {item.mask}</span>
                        </div>
                    ))}
                </div>
            );

        case 'tcp-handshake':
            return (
                <div className="flex flex-col gap-2 relative py-2">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex justify-between px-6 text-xs font-bold text-gray-500 mb-2">
                        <span>Client</span>
                        <span>Server</span>
                    </div>
                    {visualization.steps?.map((step: any, i: number) => (
                        <div key={i} className="flex items-center justify-between relative px-8 h-8">
                            {step.from === 'Client' ? (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 z-10"></div>
                                    <div className="flex-1 border-t-2 border-dashed border-blue-300 dark:border-blue-800 mx-2 relative">
                                        <ArrowRight size={12} className="absolute -top-1.5 right-0 text-blue-500" />
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 z-10"></div>
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 z-10"></div>
                                    <div className="flex-1 border-t-2 border-dashed border-green-300 dark:border-green-800 mx-2 relative">
                                        <ArrowLeft size={12} className="absolute -top-1.5 left-0 text-green-500" />
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 z-10"></div>
                                </>
                            )}
                            <span className="absolute left-1/2 -translate-x-1/2 -top-2 text-[10px] font-mono bg-white dark:bg-[#1a2632] px-1 text-gray-500">
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            );

        case 'osi-layers':
            return (
                <div className="flex flex-col-reverse gap-1">
                    {visualization.data.map((layer: any, i: number) => (
                        <div key={i} className="flex items-center h-8 rounded overflow-hidden text-xs">
                            <div
                                className="w-8 h-full flex items-center justify-center font-bold text-white"
                                style={{ backgroundColor: layer.color }}
                            >
                                {layer.num}
                            </div>
                            <div className="flex-1 h-full flex items-center justify-between px-3 bg-gray-50 dark:bg-gray-800 border-y border-r border-gray-100 dark:border-gray-700 rounded-r">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">{layer.name}</span>
                                <span className="font-mono text-[10px] text-gray-400">{layer.pdu}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'tcpip-model':
            return (
                <div className="flex flex-col gap-1">
                    {visualization.data.map((layer: any, i: number) => (
                        <div key={i} className="flex items-center h-10 rounded overflow-hidden text-xs border border-gray-100 dark:border-gray-700">
                            <div
                                className="w-8 h-full flex items-center justify-center font-bold text-white shrink-0"
                                style={{ backgroundColor: layer.color }}
                            >
                                {layer.num}
                            </div>
                            <div className="flex-1 h-full flex flex-col justify-center px-3 bg-white dark:bg-gray-800">
                                <span className="font-bold text-gray-800 dark:text-gray-100">{layer.name}</span>
                                <span className="text-[10px] text-gray-500 truncate">{layer.examples}</span>
                            </div>
                        </div>
                    ))}
                </div>
            );

        case 'port-list':
            return (
                <div className="grid grid-cols-2 gap-2">
                    {visualization.data.map((p: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#137fec]">{p.port}</span>
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{p.service}</span>
                            </div>
                            <span className="text-[10px] text-gray-400">{p.protocol}</span>
                        </div>
                    ))}
                </div>
            );

        case 'ethernet-frame':
            return (
                <div className="flex w-full overflow-hidden rounded border border-gray-200 dark:border-gray-700 text-[10px] font-mono text-center">
                    {visualization.fields?.map((field, i) => (
                        <div key={i} className={`py-2 px-1 border-r border-gray-200 dark:border-gray-700 last:border-0 grow ${field === 'Payload' ? 'grow-[3] bg-blue-50 dark:bg-blue-900/10' : 'bg-gray-50 dark:bg-gray-800'}`}>
                            {field}
                        </div>
                    ))}
                </div>
            );

        case 'ping':
            return (
                <div className="font-mono text-xs bg-black text-green-400 p-3 rounded-md">
                    <div className="mb-2 text-white">$ ping 8.8.8.8</div>
                    {visualization.data.map((line: any, i: number) => (
                        <div key={i}>
                            64 bytes from 8.8.8.8: icmp_seq={line.seq} ttl={line.ttl} time={line.time}
                        </div>
                    ))}
                    <div className="mt-2 text-gray-400">--- 8.8.8.8 ping statistics ---</div>
                    <div>3 packets transmitted, 3 received, 0% packet loss</div>
                </div>
            );

        case 'dhcp-flow':
            return (
                <div className="flex justify-between items-center py-4 px-2">
                    {visualization.steps?.map((step: string, i: number) => (
                        <div key={i} className="flex flex-col items-center gap-1 relative z-10 group">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${['Discover', 'Request'].includes(step) ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-green-100 border-green-500 text-green-700'}`}>
                                {step[0]}
                            </div>
                            <span className="text-[10px] font-medium text-gray-500">{step}</span>
                            {i < 3 && <div className="absolute top-4 left-8 w-[calc(100%+2rem)] h-0.5 bg-gray-200 -z-10"></div>}
                        </div>
                    ))}
                </div>
            );

        case 'subnet-visual':
            return (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-xs text-gray-500">Prefix</span>
                        <span className="font-mono font-bold text-[#137fec]">{visualization.data.prefix}</span>
                    </div>
                    <div className="font-mono text-xs break-all bg-gray-100 dark:bg-black p-2 rounded text-center">
                        {visualization.data.binary.split('.').map((octet: string, i: number) => (
                            <span key={i}>
                                <span className={i < 3 ? 'text-[#111418] dark:text-white font-bold' : 'text-gray-400'}>{octet}</span>
                                {i < 3 && <span className="text-gray-300">.</span>}
                            </span>
                        ))}
                    </div>
                    <span className="text-[10px] text-center text-gray-400">Network Portion vs Host Portion</span>
                </div>
            );

        default:
            return <div className="text-gray-400 text-xs italic">Visualization type not supported yet.</div>;
    }
};

export default GlossaryPage;
