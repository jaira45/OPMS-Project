import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, Users2, ArrowRight, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceSearch from './VoiceSearch';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop",
        title: "Modern Minimalist",
        subtitle: "Luxury Reimagined"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1600607687940-4e524cb357bd?w=1920&auto=format&fit=crop",
        title: "Heritage Estates",
        subtitle: "Timeless Elegance"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=1920&auto=format&fit=crop",
        title: "Urban Sanctuary",
        subtitle: "Inner-City Bliss"
    }
];

export default function Hero() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Slideshow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={slides[currentSlide].image}
                        className="w-full h-full object-cover"
                        alt="Hero background"
                    />
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background dark:to-dark-bg" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 container-responsive flex flex-col items-center text-center px-4 space-y-12">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        Premium Property Network
                    </motion.div>

                    <div className="overflow-hidden">
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="font-headline font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter leading-[0.9]"
                        >
                            {slides[currentSlide].title.split(' ')[0]} <br />
                            <span className="text-accent italic font-display">{slides[currentSlide].title.split(' ')[1]}</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-white/80 text-base sm:text-xl font-bold max-w-2xl mx-auto"
                    >
                        Discover unparalleled architectural excellence and luxury living with OPMS – the definitive portfolio for distinguished estates.
                    </motion.p>
                </div>

                {/* Animated Floating Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, type: "spring", damping: 20 }}
                    className="w-full max-w-4xl glass dark:glass-dark p-2 rounded-[2.5rem] sm:rounded-full flex flex-col sm:flex-row shadow-2xl group hover:shadow-accent/10 transition-all border border-white/30"
                >
                    <div className="flex-[1.5] flex items-center px-8 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/20">
                        <Search className="text-white w-5 h-5 mr-4 opacity-50 group-focus-within:text-accent group-focus-within:opacity-100 transition-all" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by location, landmarks, or lifestyle..."
                            className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-white/40 font-bold text-sm"
                        />
                    </div>
                    <div className="flex-1 flex items-center px-8 py-4 sm:py-0 hidden md:flex border-r border-white/20">
                        <MapPin className="text-white w-5 h-5 mr-4 opacity-50 transition-all" />
                        <select className="bg-transparent border-none focus:ring-0 w-full text-white font-bold text-sm appearance-none cursor-pointer leading-none">
                            <option className="bg-primary">All Locations</option>
                            <option className="bg-primary">Indore</option>
                            <option className="bg-primary">Bhopal</option>
                            <option className="bg-primary">Gwalior</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 pr-2">
                        <VoiceSearch onResult={(res) => setSearchQuery(res)} />
                        <button 
                            onClick={() => navigate('/properties')}
                            className="bg-primary dark:bg-accent text-white px-10 py-5 sm:py-0 h-[3.5rem] sm:h-[4.5rem] rounded-[2rem] sm:rounded-full font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 flex items-center justify-center gap-3 group/btn hover:bg-secondary dark:hover:bg-white dark:hover:text-primary"
                        >
                            Explore Estates
                            <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Quick Shortcuts */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-wrap justify-center gap-12 pt-8"
                >
                    {[
                        { label: 'Active Collection', value: '3,200+', icon: <Building2 className="w-5 h-5 text-accent" /> },
                        { label: 'Verified Sellers', value: '850+', icon: <Users2 className="w-5 h-5 text-accent" /> },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-accent transition-all">
                                {stat.icon}
                            </div>
                            <div className="text-left">
                                <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/20 p-1 flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-accent rounded-full"
                    />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Discover More</span>
            </motion.div>
        </section>
    );
}
