import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, Users2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceSearch from './VoiceSearch';

export default function Hero() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    
    // High-end luxury villa background
    const luxuryVillaImg = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format&fit=crop&q=80";

    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
            {/* Full-screen Luxury Villa Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={luxuryVillaImg}
                    className="w-full h-full object-cover"
                    alt="Luxury Estate"
                />
                {/* Dark Overlay (40-60%) */}
                <div className="absolute inset-0 bg-black/50" />
                
                {/* Subtle Text Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container-responsive flex flex-col items-center text-center px-4 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl"
                    >
                        <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_15px_#D4AF37]" />
                        Exquisite Living
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="font-headline font-black text-7xl sm:text-9xl md:text-[8rem] lg:text-[10rem] text-white tracking-tighter leading-[0.85] uppercase"
                        >
                            <span className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">Modern</span> <br />
                            <span className="text-gold-gradient italic font-display lowercase tracking-normal drop-shadow-[0_10px_20px_rgba(212,175,55,0.3)]">Minimalist</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-white/90 text-lg sm:text-2xl font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                    >
                        Curating Central India's most distinguished estates for those who settle for nothing less than architectural perfection.
                    </motion.p>
                </motion.div>

                {/* White Glassmorphism Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="w-full max-w-5xl bg-white/15 backdrop-blur-2xl p-3 rounded-3xl sm:rounded-full flex flex-col sm:flex-row shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/30 group hover:bg-white/25 transition-all duration-500"
                >
                    <div className="flex-[1.5] flex items-center px-10 py-5 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/20">
                        <Search className="text-white w-6 h-6 mr-6 opacity-80" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Locate your sanctuary..."
                            className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-white/70 font-bold text-lg outline-none"
                        />
                    </div>
                    <div className="flex-1 flex items-center px-10 py-5 sm:py-0 hidden md:flex border-r border-white/20">
                        <MapPin className="text-white w-6 h-6 mr-6 opacity-80" />
                        <select className="bg-transparent border-none focus:ring-0 w-full text-white font-bold text-lg appearance-none cursor-pointer outline-none">
                            <option className="bg-primary text-white">Regional Domains</option>
                            <option className="bg-primary text-white">Indore Metropolis</option>
                            <option className="bg-primary text-white">Bhopal Heritage</option>
                            <option className="bg-primary text-white">Gwalior Citadel</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4 pr-3 pl-3 sm:pl-0">
                        <VoiceSearch onResult={(res) => setSearchQuery(res)} />
                        <motion.button 
                            whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(212,175,55,0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/properties')}
                            className="bg-gold-gradient text-primary px-14 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-4 whitespace-nowrap shadow-xl"
                        >
                            Explore Estates
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <div className="w-7 h-12 rounded-full border-2 border-white/30 p-1.5 flex justify-center">
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]"
                    />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">Scroll to Discover</span>
            </motion.div>
        </section>
    );
}
