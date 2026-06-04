import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, Users2, ArrowRight, Home, TrendingUp, Trophy, Globe, ShieldCheck, UserCheck, Headphones, LayoutGrid, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceSearch from './VoiceSearch';

export default function Hero() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    
    const luxuryVillaImg = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format&fit=crop&q=80";

    const stats = [
        { icon: Home, label: 'Active Properties', value: '3,200+' },
        { icon: UserCheck, label: 'Verified Agents', value: '850+' },
        { icon: Users2, label: 'Happy Clients', value: '12,000+' },
        { icon: MapPin, label: 'Cities Covered', value: '25+' },
    ];

    const badges = [
        { icon: <ShieldCheck className="w-4 h-4 text-accent" />, label: "Verified Listings" },
        { icon: <UserCheck className="w-4 h-4 text-accent" />, label: "Elite Agents" },
        { icon: <Headphones className="w-4 h-4 text-accent" />, label: "Premium Support" },
    ];

    return (
        <section className="relative h-screen min-h-[900px] w-full overflow-hidden flex items-center">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src={luxuryVillaImg}
                    className="w-full h-full object-cover"
                    alt="Luxury Estate"
                />
                <div className="absolute inset-0 bg-[#071B3A]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A]/90 via-[#071B3A]/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1700px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-20">
                <div className="lg:col-span-8 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]"
                        >
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                            Premium Property Network
                        </motion.div>

                        <div className="space-y-4">
                            <h1 className="font-headline font-black text-white leading-none tracking-tight">
                                <span className="text-6xl sm:text-7xl block mb-2">Find. Explore. Own.</span>
                                <span className="font-display italic text-8xl sm:text-9xl text-gold-gradient lowercase leading-tight">Extraordinary Homes.</span>
                            </h1>
                        </div>

                        <p className="text-white/70 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                            Discover handpicked luxury properties, verified agents, <br /> and the finest real estate experiences.
                        </p>

                        <div className="flex flex-wrap gap-8 pt-4">
                            {badges.map((badge, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    {badge.icon}
                                    <span className="text-white/80 text-sm font-semibold">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Integrated Horizontal Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="w-full bg-white p-1.5 rounded-2xl flex flex-col sm:flex-row shadow-2xl items-center"
                    >
                        <div className="flex-[1.5] flex items-center px-6 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-slate-100">
                            <MapPin className="text-slate-400 w-5 h-5 mr-4" />
                            <input
                                type="text"
                                placeholder="Search by location, landmark..."
                                className="bg-transparent border-none focus:ring-0 w-full text-slate-800 placeholder:text-slate-500 font-medium text-sm outline-none"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-6 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-slate-100 group">
                            <LayoutGrid className="text-slate-400 w-5 h-5 mr-4 group-hover:text-accent transition-colors" />
                            <select className="bg-transparent border-none focus:ring-0 w-full text-slate-600 font-bold text-sm appearance-none cursor-pointer outline-none">
                                <option>Property Type</option>
                                <option>Villa</option>
                                <option>Penthouse</option>
                                <option>Mansion</option>
                            </select>
                        </div>
                        <div className="flex-1 flex items-center px-6 py-4 sm:py-0 border-r border-slate-100">
                             <Coins className="text-slate-400 w-5 h-5 mr-4" />
                             <input type="text" placeholder="Min Price" className="bg-transparent border-none focus:ring-0 w-full text-slate-600 font-bold text-sm outline-none placeholder:text-slate-500" />
                        </div>
                        <div className="flex-1 flex items-center px-6 py-4 sm:py-0 border-r border-slate-100">
                             <Coins className="text-slate-400 w-5 h-5 mr-4" />
                             <input type="text" placeholder="Max Price" className="bg-transparent border-none focus:ring-0 w-full text-slate-600 font-bold text-sm outline-none placeholder:text-slate-500" />
                        </div>
                        <div className="p-1 w-full sm:w-auto">
                            <button 
                                className="bg-[#071B3A] text-white h-14 px-8 rounded-xl font-bold text-sm flex items-center justify-center gap-3 w-full shadow-lg hover:bg-[#0A254D] transition-all"
                            >
                                <Search className="w-4 h-4" />
                                Search Properties
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Statistics Card - Dark Glass */}
                <div className="lg:col-span-4 hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="bg-black/30 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl space-y-10 shadow-2xl ml-auto max-w-[320px]"
                    >
                        <div className="grid grid-cols-1 gap-10">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent/80 shadow-lg group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-headline font-black text-white leading-none mb-1">{stat.value}</p>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
