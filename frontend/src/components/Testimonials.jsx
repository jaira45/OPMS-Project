import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import LazyImage from './LazyImage';

const testimonials = [
    {
        id: 1,
        name: "Vikram Singh",
        role: "Strategic Asset Investor",
        text: "OPMS has fundamentally redefined the parameters of luxury property acquisition. Their focus on high-fidelity listings and absolute discretion is unprecedented.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ananya Sharma",
        role: "Private Estate Owner",
        text: "The digital choreography of the search experience and the quality of global-standard advice provided made my acquisition not just efficient, but truly prestigious.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "Nexus Development CEO",
        text: "Operational excellence and a profound understanding of real estate as a multi-generational asset class. OPMS is more than a platform—it's a sovereign intelligence service.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="bg-[#071B3A] py-48 sm:py-64 relative overflow-hidden">
            {/* ─ Master Decorative Context ──────────────────────────────── */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-accent/[0.03] blur-[200px] rounded-full -ml-96 -mb-96" />

            <div className="container-responsive relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl"
                    >
                        <Sparkles className="w-5 h-5" />
                        The Vanguard Community
                    </motion.div>
                    
                    <h2 className="font-headline font-black text-6xl sm:text-8xl md:text-[9.5rem] text-white tracking-tighter leading-[0.8] uppercase italic">
                        Voices of <br />
                        <span className="text-gold-gradient italic font-display normal-case tracking-normal block lg:-mt-4">Succession</span>
                    </h2>

                    <div className="flex gap-8 pt-8">
                        <button onClick={prev} className="w-20 h-20 rounded-[2.5rem] border border-white/10 flex items-center justify-center text-white hover:bg-gold-gradient hover:text-primary transition-all duration-700 shadow-3xl bg-white/5 backdrop-blur-3xl group ring-2 ring-white/0 hover:ring-accent/20">
                            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-2 transition-transform" />
                        </button>
                        <button onClick={next} className="w-20 h-20 rounded-[2.5rem] border border-white/10 flex items-center justify-center text-white hover:bg-gold-gradient hover:text-primary transition-all duration-700 shadow-3xl bg-white/5 backdrop-blur-3xl group ring-2 ring-white/0 hover:ring-accent/20">
                            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -40 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 sm:p-24 rounded-[6rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] space-y-16 relative overflow-hidden group/card"
                        >
                            {/* Card Accent */}
                            <div className="absolute top-0 right-0 w-full h-1 bg-gold-gradient opacity-40" />
                            <Quote className="absolute -top-16 -right-16 w-64 h-64 text-white/[0.02] rotate-12" />
                            
                            <div className="flex gap-2 text-accent">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} className="w-8 h-8 fill-current drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                                ))}
                            </div>
                            
                            <p className="text-3xl sm:text-5xl font-black text-white leading-[1.1] italic tracking-tighter font-headline uppercase">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div className="flex items-center gap-10 pt-16 border-t border-white/10">
                                <div className="relative group/avatar">
                                    <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden shadow-3xl border-2 border-accent/30 group-hover/avatar:border-accent transition-all duration-700">
                                        <LazyImage 
                                            src={testimonials[currentIndex].image} 
                                            className="w-full h-full object-cover scale-110 group-hover/avatar:scale-100 transition-transform duration-1000" 
                                            alt={testimonials[currentIndex].name} 
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 bg-gold-gradient p-2.5 rounded-2xl shadow-3xl ring-4 ring-[#071B3A]">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-headline font-black text-white text-3xl tracking-tighter uppercase italic">{testimonials[currentIndex].name}</h4>
                                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent opacity-60 italic">{testimonials[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
