import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Building2, ArrowRight, Home, Globe, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';

export default function Hero() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('Type');
    
    const luxuryVillaImg = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format&fit=crop&q=80";

    const stats = [
        { icon: Home, label: 'Properties Listed', value: '3,200+' },
        { icon: ShieldCheck, label: 'Certified Agents', value: '850+' },
        { icon: Globe, label: 'Global Markets', value: '25+' },
    ];

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (propertyType !== 'Type') params.set('type', propertyType);
        navigate(`/property?${params.toString()}`);
    };

    return (
        <section className="relative min-h-[600px] lg:h-screen lg:min-h-[850px] w-full overflow-hidden flex items-center pt-24 lg:pt-0">
            {/* Hero Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <LazyImage
                    src={luxuryVillaImg}
                    className="w-full h-full object-cover animate-pan scale-105"
                    alt="Luxury Real Estate"
                />
                <div className="absolute inset-0 bg-[#071B3A]/65 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-transparent opacity-70" />
            </div>

            {/* Hero Content Architecture */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-8 xl:col-span-7 space-y-10 sm:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6 sm:space-y-10 max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-accent"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Premium Real Estate Platform</span>
                            </motion.div>

                            <h1 className="hero-heading text-white tracking-tighter">
                                <span className="block mb-2">Find Your</span>
                                <span className="text-gold-gradient block lg:inline-block">Exclusive</span>
                                <span className="block mt-2">Residence</span>
                            </h1>
                        </div>

                        <p className="text-white/60 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed border-l border-accent/30 pl-6 sm:pl-10">
                            Discover the most prestigious properties in Central India. Connect with certified advisors for a professional, secure experience.
                        </p>

                        <div className="space-y-8 pt-4">
                            {/* Property Search Terminal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="w-full bg-[#0A254D]/40 backdrop-blur-3xl p-3 rounded-[2.5rem] flex flex-col lg:flex-row shadow-2xl border border-white/5 items-center group focus-within:border-accent/20 transition-all"
                            >
                                <div className="flex-[1.5] w-full flex items-center px-6 py-5 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/5">
                                    <MapPin className="text-accent w-5 h-5 mr-4" />
                                    <input
                                        type="text"
                                        placeholder="City or Area..."
                                        className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-white/20 font-bold italic text-lg outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 w-full flex items-center px-6 py-5 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/5 relative">
                                    <Building2 className="text-white/20 w-4 h-4 mr-4" />
                                    <select 
                                        className="bg-transparent border-none focus:ring-0 w-full text-white/50 font-bold text-[10px] uppercase tracking-widest appearance-none cursor-pointer outline-none"
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                    >
                                        <option className="bg-[#071B3A]" value="Type">Property Type</option>
                                        <option className="bg-[#071B3A]" value="Luxury Villa">Luxury Villa</option>
                                        <option className="bg-[#071B3A]" value="Penthouse">Penthouse</option>
                                        <option className="bg-[#071B3A]" value="Estate">Private Estate</option>
                                    </select>
                                    <ChevronRight className="w-4 h-4 text-accent rotate-90 absolute right-6 pointer-events-none" />
                                </div>
                                <div className="p-1.5 w-full lg:w-auto">
                                    <button 
                                        onClick={handleSearch}
                                        className="bg-gold-gradient text-primary h-14 lg:h-16 px-10 rounded-2xl lg:rounded-3xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 w-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <Search className="w-4 h-4" />
                                        Explore
                                    </button>
                                </div>
                            </motion.div>

                            <div className="flex flex-wrap items-center gap-8 pl-4">
                                <button className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Connect with Advisor</span>
                                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white/5 group-hover:border-accent/40 transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                                <button className="text-white/30 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">
                                    Schedule a Visit
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Market Overview Statistics - Hidden on Tablet/Mobile for density */}
                <div className="lg:col-span-4 xl:col-span-5 hidden xl:block">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-16 rounded-[4rem] space-y-12 shadow-2xl ml-auto relative overflow-hidden"
                    >
                        <div className="space-y-12 relative z-10">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-4xl font-headline font-bold text-white tracking-tighter leading-none italic">{stat.value}</p>
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-10 border-t border-white/5">
                             <div className="flex items-center gap-6 text-white/20 text-[9px] font-bold uppercase tracking-[0.5em] hover:text-accent transition-colors cursor-pointer">
                                Market Insights Report
                                <ArrowRight className="w-4 h-4" />
                             </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
