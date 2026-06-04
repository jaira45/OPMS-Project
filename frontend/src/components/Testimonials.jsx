import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import LazyImage from './LazyImage';

const testimonials = [
    {
        id: 1,
        name: "Vikram Singh",
        role: "Real Estate Investor",
        text: "The platform has redefined our property acquisition process. Their attention to detail and professional market insights are truly exceptional. We found our dream villa within weeks.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ananya Sharma",
        role: "Luxury Homeowner",
        text: "From the first search to the final closing, the experience was seamless. The quality of expert advice made my property search stress-free and efficient. Highly recommended for premium listings.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "Property Developer",
        text: "Professional excellence and a deep understanding of the local market. This platform is an essential tool for anyone serious about real estate development in Central India.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="section-padding bg-[#071B3A] relative overflow-hidden px-4">
            {/* Background Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/[0.02] blur-[150px] rounded-full pointer-events-none" />

            <div className="container-responsive relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-10 text-center lg:text-left">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                        <Sparkles className="w-4 h-4" />
                        Client Reviews
                    </motion.div>
                    
                    <div className="space-y-4">
                        <h2 className="text-5xl sm:text-7xl font-headline font-bold text-white tracking-widest leading-[1] uppercase italic">
                            Trusted <br />
                            <span className="text-gold-gradient block">Experiences</span>
                        </h2>
                        <p className="text-white/40 text-lg sm:text-xl font-medium max-w-xl mx-auto lg:mx-0">
                            Our commitment to excellence reflected through the words of our esteemed clients and investors.
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center lg:justify-start">
                        <button onClick={prev} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all shadow-xl">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={next} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all shadow-xl">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Testimonial Card */}
                <div className="lg:col-span-12 xl:col-span-7 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#0A254D] border border-white/5 card-padding rounded-[2.5rem] sm:rounded-[4rem] shadow-3xl relative h-full flex flex-col justify-between group overflow-hidden"
                        >
                            <Quote className="absolute top-12 right-12 w-24 h-24 text-white/[0.03] group-hover:text-accent/[0.05] transition-colors duration-700" />
                            
                            <div className="space-y-10 relative z-10">
                                <div className="flex gap-1.5 text-accent">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                
                                <p className="text-xl sm:text-2xl font-headline font-bold text-white leading-relaxed italic tracking-tight uppercase">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent/20">
                                            <LazyImage 
                                                src={testimonials[currentIndex].image} 
                                                className="w-full h-full object-cover" 
                                                alt={testimonials[currentIndex].name} 
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-gold-gradient p-1 rounded-lg">
                                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-headline font-bold text-white text-xl tracking-tight uppercase italic">{testimonials[currentIndex].name}</h4>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/60">{testimonials[currentIndex].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
