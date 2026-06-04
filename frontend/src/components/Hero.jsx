import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, Users2, ArrowRight, Home, TrendingUp, Trophy, Globe, ShieldCheck, UserCheck, Headphones, LayoutGrid, Coins, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceSearch from './VoiceSearch';

import LazyImage from './LazyImage';

export default function Hero() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('Type');
    
    const luxuryVillaImg = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format&fit=crop&q=80";

    const stats = [
        { icon: Home, label: 'Capital Assets', value: '3,200+' },
        { icon: ShieldCheck, label: 'Verified Partners', value: '850+' },
        { icon: Globe, label: 'Global Reach', value: '25+' },
    ];

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (propertyType !== 'Type') params.set('type', propertyType);
        navigate(`/property?${params.toString()}`);
    };

    return (
        <section className="relative h-screen min-h-[950px] w-full overflow-hidden flex items-center">
            {/* ─ Master Media Layer ────────────────────────────────────── */}
            <div className="absolute inset-0 z-0 scale-105">
                <LazyImage
                    src={luxuryVillaImg}
                    className="w-full h-full object-cover animate-pan"
                    alt="Luxury Estate"
                />
                <div className="absolute inset-0 bg-[#071B3A]/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-transparent opacity-60" />
            </div>

            {/* ─ Information Architecture ──────────────────────────────── */}
            <div className="relative z-10 w-full max-w-[1700px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-32">
                <div className="lg:col-span-8 space-y-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="space-y-12"
                    >
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
                            >
                                <Sparkles className="w-5 h-5" />
                                The Imperial Collection 2026
                            </motion.div>

                            <h1 className="font-headline font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                                <span className="text-6xl sm:text-8xl md:text-9xl block mb-4">Acquire</span>
                                <span className="font-display italic text-8xl sm:text-9xl md:text-[11rem] text-gold-gradient normal-case leading-none block -mt-4">Extraordinary</span>
                            </h1>
                        </div>

                        <p className="text-white/40 text-xl sm:text-2xl font-medium max-w-2xl leading-relaxed italic border-l-2 border-accent/30 pl-10">
                            Navigating the horizon of ultra-luxury real estate with unparalleled discretion and a focus on generational wealth.
                        </p>

                        {/* Master Search Terminal */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="max-w-5xl bg-white/5 backdrop-blur-3xl p-3 rounded-[3rem] flex flex-col lg:flex-row shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] border border-white/10 items-center group-focus-within:ring-2 ring-accent/20 transition-all"
                        >
                            <div className="flex-[1.5] w-full flex items-center px-10 py-7 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/10 group/item">
                                <MapPin className="text-accent w-7 h-7 mr-6 group-focus-within/item:scale-110 transition-transform" />
                                <input
                                    type="text"
                                    placeholder="Metropolitan Sector or Landmark..."
                                    className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-white/20 font-display italic text-2xl outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 w-full flex items-center px-10 py-7 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/10 relative">
                                <Building2 className="text-accent/40 w-6 h-6 mr-6" />
                                <select 
                                    className="bg-transparent border-none focus:ring-0 w-full text-white/60 font-black text-xs uppercase tracking-widest appearance-none cursor-pointer outline-none"
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                >
                                    <option className="bg-[#071B3A]">Type</option>
                                    <option className="bg-[#071B3A]">Manor</option>
                                    <option className="bg-[#071B3A]">Penthouse</option>
                                    <option className="bg-[#071B3A]">Private Island</option>
                                </select>
                                <ChevronRight className="w-5 h-5 text-accent rotate-90 absolute right-10 pointer-events-none" />
                            </div>
                            <div className="p-2 w-full lg:w-auto">
                                <button 
                                    onClick={handleSearch}
                                    className="bg-gold-gradient text-primary h-20 px-12 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-6 w-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all group/btn"
                                >
                                    <Search className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                                    Synchronize Results
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ─ Tactical Statistics Grid ────────────────────────────── */}
                <div className="lg:col-span-4 hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                        className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-16 rounded-[4rem] space-y-12 shadow-3xl ml-auto relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-all duration-1000" />
                        
                        <div className="space-y-12 relative z-10">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-8 group/stat">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shadow-2xl group-hover/stat:bg-accent group-hover/stat:text-primary transition-all duration-700">
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-4xl font-headline font-black text-white tracking-tighter leading-none italic">{stat.value}</p>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-10 border-t border-white/10">
                             <div className="flex items-center gap-6 text-white/20 text-[9px] font-black uppercase tracking-[0.5em] group-hover:text-accent transition-colors cursor-pointer">
                                Examine Performance Audit
                                <ArrowRight className="w-4 h-4" />
                             </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
