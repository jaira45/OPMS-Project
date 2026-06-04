import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ArrowRight, Newspaper, Sparkles } from 'lucide-react';
import LazyImage from './LazyImage';

const newsItems = [
    {
        id: 1,
        title: "The Rise of Luxury Micro-Markets in Central India",
        category: "Imperial Intelligence",
        date: "June 03, 2026",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
        excerpt: "Analyzing the migration of ultra-high-net-worth individuals into boutique estates and high-security metropolitan hubs."
    },
    {
        id: 2,
        title: "Architectural Minimalism: The New Gold Standard",
        category: "Strategic Design",
        date: "June 01, 2026",
        image: "https://images.unsplash.com/photo-1600607687940-4e524cb357bd?w=800&auto=format&fit=crop",
        excerpt: "How structural austerity and high-performance materials are redefining the luxury valuation algorithms."
    },
    {
        id: 3,
        title: "Investment Protocol: 2026 Sovereign Strategies",
        category: "Wealth Allocation",
        date: "May 28, 2026",
        image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&auto=format&fit=crop",
        excerpt: "Leveraging digital predictive intelligence to maximize capital appreciation in the commercial stratosphere."
    }
];

export default function NewsSection() {
    return (
        <section className="container-responsive py-48 space-y-24">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-white/10 pb-16">
                <div className="space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
                    >
                        <Sparkles className="w-5 h-5" />
                        Market Intelligence
                    </motion.div>
                    <h2 className="font-headline font-black text-6xl sm:text-8xl md:text-[9.5rem] text-white tracking-tighter uppercase leading-[0.8] italic">
                        Imperial <span className="text-gold-gradient italic font-display lowercase tracking-normal block lg:inline">Briefings</span>
                    </h2>
                </div>
                <button className="flex items-center gap-8 font-black text-white/40 hover:text-accent uppercase tracking-[0.5em] text-[11px] group transition-all">
                    Access Intelligence Archive
                    <div className="w-20 h-20 rounded-[2.5rem] border border-white/10 flex items-center justify-center group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-700 shadow-3xl ring-2 ring-white/0 group-hover:ring-accent/20">
                        <ArrowRight className="w-8 h-8" />
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {newsItems.map((news, i) => (
                    <motion.article 
                        key={news.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="group flex flex-col gap-10 cursor-pointer"
                    >
                        <div className="relative aspect-[4/5] rounded-[5rem] overflow-hidden shadow-3xl bg-white/5 border border-white/10 ring-1 ring-white/0 group-hover:ring-accent/30 transition-all duration-700">
                            <LazyImage 
                                src={news.image} 
                                alt={news.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] brightness-75 group-hover:brightness-100" 
                            />
                            <div className="absolute top-10 left-10 bg-[#071B3A]/80 backdrop-blur-3xl px-8 py-4 rounded-[2rem] border border-white/20 shadow-3xl">
                                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">{news.category}</span>
                            </div>
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-transparent opacity-60" />
                        </div>
                        
                        <div className="space-y-8 px-6">
                            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-l border-accent/40 pl-6">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    {news.date}
                                </div>
                                <div className="flex items-center gap-3 text-accent/60">
                                    <TrendingUp className="w-4 h-4" />
                                    Alpha 2.0
                                </div>
                            </div>
                            <h3 className="font-headline font-black text-4xl text-white leading-[1.1] tracking-tighter uppercase italic group-hover:text-accent transition-colors duration-700">
                                {news.title}
                            </h3>
                            <p className="text-white/40 text-lg font-medium leading-relaxed line-clamp-3 italic">
                                {news.excerpt}
                            </p>
                            <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-white/20 group-hover:text-white transition-colors duration-500">
                                <span className="text-[11px] font-black uppercase tracking-[0.5em]">Analyze Dossier</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
