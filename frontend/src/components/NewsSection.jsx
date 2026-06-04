import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import LazyImage from './LazyImage';

const newsItems = [
    {
        id: 1,
        title: "The Rise of Luxury Micro-Markets in Central India",
        category: "Market Analysis",
        date: "June 03, 2026",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
        excerpt: "Exploring the growing demand for exclusive boutique estates and high-security residential hubs in metropolitan emerging areas."
    },
    {
        id: 2,
        title: "Modern Minimalism: The New Standard in Luxury Architecture",
        category: "Architecture",
        date: "June 01, 2026",
        image: "https://images.unsplash.com/photo-1600607687940-4e524cb357bd?w=800&auto=format&fit=crop",
        excerpt: "Discover how contemporary design and sustainable materials are redefining the luxury real estate market today."
    },
    {
        id: 3,
        title: "Investment Insights: 2026 Real Estate Market Strategies",
        category: "Investment",
        date: "May 28, 2026",
        image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&auto=format&fit=crop",
        excerpt: "Expert analysis on maximizing capital growth in commercial and residential real estate throughout the regional markets."
    }
];

export default function NewsSection() {
    return (
        <section className="section-padding bg-[#071B3A] relative overflow-hidden">
            <div className="container-responsive px-4 space-y-16 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/5 pb-12">
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
                        >
                            <Sparkles className="w-4 h-4" />
                            Market Insights
                        </motion.div>
                        <h2 className="text-5xl sm:text-7xl font-headline font-bold text-white tracking-widest uppercase italic leading-[1]">
                            Market <br/><span className="text-gold-gradient block">Insights</span>
                        </h2>
                    </div>
                    <button className="flex items-center gap-4 text-white/40 hover:text-white transition-all group">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Explore Archive</span>
                        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-gap">
                    {newsItems.map((news, i) => (
                        <motion.article 
                            key={news.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col h-full bg-[#0A254D] border border-white/5 rounded-[2.5rem] overflow-hidden group shadow-2xl hover:border-accent/20 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <LazyImage 
                                    src={news.image} 
                                    alt={news.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
                                />
                                <div className="absolute top-6 left-6 bg-[#071B3A]/60 backdrop-blur-xl px-5 py-2 rounded-xl border border-white/10">
                                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{news.category}</span>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="card-padding flex flex-col flex-1 space-y-6">
                                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/50">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {news.date}
                                    </div>
                                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        Trending
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <h3 className="text-xl sm:text-2xl font-headline font-bold text-white leading-tight uppercase italic group-hover:text-accent transition-colors duration-500 line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed line-clamp-2">
                                        {news.excerpt}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between group/link">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Read Full Article</span>
                                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
