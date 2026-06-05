import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, Share2, MapPin, ChevronLeft, ChevronRight, User, ShieldCheck, ImageOff, Building2, ArrowRight, Loader2 } from 'lucide-react';

// ─── Reel data with reliable Mixkit CDN videos + Unsplash thumbnails ────────
const reels = [
    {
        id: 1,
        video: "https://assets.mixkit.co/videos/preview/mixkit-house-with-a-big-pool-and-a-terrace-4073-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        title: "The Glass Pavilion",
        location: "Vijay Nagar, Indore",
        price: "₹12.5 Cr",
        agent: "Arya Khan",
        tag: "VERIFIED",
    },
    {
        id: 2,
        video: "https://assets.mixkit.co/videos/preview/mixkit-white-couch-and-a-pool-view-of-a-beach-apartment-3-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        title: "Azure Infinity Estate",
        location: "Arera Colony, Bhopal",
        price: "₹18.2 Cr",
        agent: "Vikram Malhotra",
        tag: "EXCLUSIVE",
    },
    {
        id: 3,
        video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-house-with-big-pool-4071-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80",
        title: "Skyline Citadel",
        location: "City Center, Gwalior",
        price: "₹9.5 Cr",
        agent: "Sana Kapoor",
        tag: "NEW",
    },
    {
        id: 4,
        video: "https://assets.mixkit.co/videos/preview/mixkit-stylish-hotel-room-with-a-pool-view-4882-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        title: "The Sapphire Manor",
        location: "New Market, Bhopal",
        price: "₹24 Cr",
        agent: "Rohan Dev",
        tag: "BEST VALUE",
    },
];

// ─── Small inline Skeleton for reel loading state ────────────────────────────
const ReelSkeleton = () => (
    <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Loading property preview...
        </span>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PropertyReels() {
    const [activeIdx, setActiveIdx] = useState(0);

    const featured = reels[activeIdx];
    const others = reels.filter((_, i) => i !== activeIdx);

    return (
        <section className="bg-[#061B45] py-24 sm:py-32 overflow-hidden border-t border-white/5">
            <div className="container-responsive space-y-16">
                
                {/* ─ Section Header ───────────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-[11px] font-bold uppercase tracking-widest"
                        >
                            <Play className="w-3 h-3 fill-accent" />
                            Curated Showcase
                        </motion.div>
                        <h2 className="text-4xl sm:text-6xl font-display font-medium text-white leading-tight">
                            Property <span className="text-gold-gradient italic">Highlights</span>
                        </h2>
                    </div>
                    <p className="text-white/40 max-w-sm text-sm font-medium leading-relaxed border-l border-white/10 pl-6">
                        Explore our selection of the most prestigious residences currently available in Central India's prime markets.
                    </p>
                </div>

                {/* ─ Showcase Grid ────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
                    
                    {/* Left: Featured Property (Large Card) */}
                    <motion.div 
                        key={activeIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 group relative"
                    >
                        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[3rem] overflow-hidden shadow-3xl border border-white/5">
                            <img 
                                src={featured.thumbnail} 
                                alt={featured.title} 
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            
                            {/* Badges */}
                            <div className="absolute top-8 left-8 flex gap-3">
                                <div className="bg-accent text-[#061B45] px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
                                    {featured.tag}
                                </div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl sm:text-6xl font-display font-bold text-white uppercase tracking-tighter italic leading-none">
                                        {featured.title}
                                    </h3>
                                    <div className="flex items-center gap-6 text-white/70">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-bold uppercase tracking-widest">{featured.location}</span>
                                        </div>
                                        <div className="w-px h-4 bg-white/20" />
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-bold uppercase tracking-widest">{featured.agent}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-6 rounded-3xl text-center min-w-[200px]">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Inquiry Price</p>
                                    <p className="text-3xl font-display font-bold text-white">{featured.price}</p>
                                </div>
                            </div>

                            {/* Video Play Trigger (Optional Visual) */}
                            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-24 h-24 rounded-full bg-accent text-[#061B45] flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                                    <Play className="w-8 h-8 fill-current" />
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Property List (Small Cards) */}
                    <div className="lg:col-span-4 space-y-6">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4 ml-2">Next in Collection</p>
                        <div className="grid grid-cols-1 gap-6">
                            {reels.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setActiveIdx(i)}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group flex items-center gap-6 p-4 rounded-[2rem] border transition-all duration-500 text-left ${
                                        i === activeIdx 
                                            ? 'bg-accent/10 border-accent shadow-2xl shadow-accent/10 scale-[1.02]' 
                                            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20'
                                    }`}
                                >
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                                        <img 
                                            src={item.thumbnail} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                                        />
                                    </div>
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className={`text-lg font-bold truncate uppercase tracking-tight italic ${i === activeIdx ? 'text-accent' : 'text-white/80'}`}>
                                                {item.title}
                                            </h4>
                                            {i === activeIdx && <div className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />}
                                        </div>
                                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest truncate">{item.location}</p>
                                        <p className="text-sm font-display font-medium text-white">{item.price}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Showcase Action */}
                        <div className="pt-8">
                            <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-accent hover:text-[#061B45] hover:border-accent transition-all flex items-center justify-center gap-4 group">
                                View Full Portfolio
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
