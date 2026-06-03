import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Vikram Singh",
        role: "Real Estate Investor",
        text: "OPMS has redefined how I search for premium properties. The platform's attention to detail and curated listings are unparalleled in Central India.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ananya Sharma",
        role: "Homeowner",
        text: "The virtual walkthrough feature saved me so much time. Finding my dream home was a seamless and actually enjoyable process thanks to OPMS.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "Commercial Developer",
        text: "A professional and efficient service. The data-driven insights provided by the OPMS team were crucial for our latest project acquisition.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="bg-primary dark:bg-dark-surface py-32 sm:py-48 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
                <Quote className="text-[#D4AF37] w-[600px] h-[600px] absolute -top-40 -left-40 rotate-12" />
            </div>

            <div className="container-responsive relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl"
                    >
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        Member Testimonials
                    </motion.div>
                    <h2 className="font-headline font-black text-6xl sm:text-[6rem] text-white tracking-tighter leading-[0.85] uppercase">
                        Our Elite <br />
                        <span className="text-gold-gradient italic font-display lowercase tracking-normal">Community</span>
                    </h2>
                    <div className="flex gap-6">
                        <button onClick={prev} className="w-16 h-16 rounded-[1.5rem] border border-white/10 flex items-center justify-center text-white hover:bg-gold-gradient hover:text-primary transition-all shadow-xl bg-white/5">
                            <ChevronLeft className="w-7 h-7" />
                        </button>
                        <button onClick={next} className="w-16 h-16 rounded-[1.5rem] border border-white/10 flex items-center justify-center text-white hover:bg-gold-gradient hover:text-primary transition-all shadow-xl bg-white/5">
                            <ChevronRight className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: -30 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 sm:p-20 rounded-[5rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] space-y-12 relative"
                        >
                            <div className="flex gap-1.5 text-[#D4AF37]">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-current drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                                ))}
                            </div>
                            
                            <p className="text-2xl sm:text-4xl font-black text-white leading-[1.2] italic tracking-tight font-display">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div className="flex items-center gap-8 pt-10 border-t border-white/10">
                                <div className="relative">
                                    <img 
                                        src={testimonials[currentIndex].image} 
                                        className="w-20 h-20 rounded-3xl object-cover shadow-2xl border-2 border-[#D4AF37]/30" 
                                        alt={testimonials[currentIndex].name} 
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-gold-gradient p-1.5 rounded-lg shadow-lg">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-white text-2xl tracking-tighter uppercase italic">{testimonials[currentIndex].name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] opacity-80">{testimonials[currentIndex].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
