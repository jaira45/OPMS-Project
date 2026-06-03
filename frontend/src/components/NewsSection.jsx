import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ArrowRight, Newspaper } from 'lucide-react';

const newsItems = [
    {
        id: 1,
        title: "The Rise of Luxury Micro-Markets in Central India",
        category: "Market Trends",
        date: "June 03, 2026",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
        excerpt: "Discover why ultra-high-net-worth individuals are shifting focus to boutique estates in Tier-2 metropolitan hubs."
    },
    {
        id: 2,
        title: "Architectural Minimalism: Form Meets Global Wealth",
        category: "Design",
        date: "June 01, 2026",
        image: "https://images.unsplash.com/photo-1600607687940-4e524cb357bd?w=800&auto=format&fit=crop",
        excerpt: "An exclusive look at how minimalist design is becoming the new gold standard for luxury property valuation."
    },
    {
        id: 3,
        title: "Investment Intelligence: 2026 Portfolio Strategies",
        category: "Investment",
        date: "May 28, 2026",
        image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&auto=format&fit=crop",
        excerpt: "Leveraging digital prop-tech platforms to maximize ROI in the evolving commercial real estate landscape."
    }
];

export default function NewsSection() {
    return (
        <section className="container-responsive py-40 space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/5 dark:bg-dark-primary/10 border border-primary/10 text-primary dark:text-dark-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
                    >
                        <Newspaper className="w-4 h-4" />
                        Market Intelligence
                    </motion.div>
                    <h2 className="font-headline font-black text-6xl sm:text-8xl text-primary dark:text-dark-on-surface tracking-tighter uppercase leading-[0.85]">
                        Global <span className="text-gold-gradient italic font-display lowercase tracking-normal">Insights</span>
                    </h2>
                </div>
                <button className="flex items-center gap-6 font-black text-primary dark:text-dark-primary uppercase tracking-[0.3em] text-[10px] group">
                    Enter Archive
                    <div className="w-14 h-14 rounded-full border border-primary/10 dark:border-white/10 flex items-center justify-center group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-500 shadow-xl">
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {newsItems.map((news, i) => (
                    <motion.article 
                        key={news.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="group flex flex-col gap-8 cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-slate-200">
                            <img 
                                src={news.image} 
                                alt={news.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                            />
                            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl px-5 py-2.5 rounded-2xl shadow-xl">
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{news.category}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-6 px-4">
                            <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-primary/30 dark:text-white/20">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {news.date}
                                </div>
                                <div className="flex items-center gap-2 text-[#D4AF37]">
                                    <TrendingUp className="w-4 h-4" />
                                    Protocol Alpha
                                </div>
                            </div>
                            <h3 className="font-headline font-black text-3xl text-primary dark:text-dark-on-surface leading-tight tracking-tighter uppercase italic group-hover:text-[#D4AF37] transition-colors duration-500">
                                {news.title}
                            </h3>
                            <p className="text-on-surface-variant dark:text-dark-on-surface-variant text-base font-medium leading-relaxed line-clamp-3">
                                {news.excerpt}
                            </p>
                            <div className="pt-4 flex items-center gap-3 text-primary/40 dark:text-white/40 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-widest">Read Dossier</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
