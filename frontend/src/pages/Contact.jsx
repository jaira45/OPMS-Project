import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { Send, Mail, Phone, MapPin, Sparkles, MessageCircle, CheckCircle2, Globe, Clock, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    const contactInfo = [
        { label: 'Private Line', val: '+91 98765 43210', icon: Phone, path: 'tel:+919876543210' },
        { label: 'Secure Mail', val: 'concierge@opms.com', icon: Mail, path: 'mailto:concierge@opms.com' },
        { label: 'Nexus H.Q.', val: 'Arera Hills, Bhopal, India', icon: MapPin, path: '#' },
    ];

    return (
        <div className="bg-[#071B3A] text-white min-h-screen">
            <Navbar />

            <main className="pt-32 pb-40">
                {/* ─ Header Welcome ────────────────────────────────────────── */}
                <section className="container-responsive py-24 space-y-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-accent/10 border border-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg"
                    >
                        <Sparkles className="w-3 h-3" />
                        Concierge Services
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h1 className="font-headline font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-tight sm:leading-[0.9] uppercase">
                                Initiate <br />
                                <span className="font-display italic text-gold-gradient normal-case tracking-normal block -mt-2 sm:-mt-4">communication</span>
                            </h1>
                        </div>
                        <div className="max-w-xl">
                            <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed">
                                Our elite advisory team is prepared to facilitate your next high-stakes property acquisition in Central India's most exclusive markets.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container-responsive grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                    {/* Information Cluster */}
                    <div className="lg:col-span-5 space-y-16">
                        <section className="space-y-10">
                            {contactInfo.map((item, i) => (
                                <motion.a 
                                    key={i}
                                    href={item.path}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-8 group"
                                >
                                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-accent shadow-2xl group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 leading-none">{item.label}</p>
                                        <p className="text-2xl font-headline font-black text-white tracking-tight uppercase">{item.val}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </section>

                        {/* Availability Node */}
                        <section className="bg-gold-gradient p-12 rounded-[4rem] text-primary shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
                           <div className="relative z-10 space-y-8">
                               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
                                   <Clock className="w-4 h-4" />
                                   Operational Window
                               </div>
                               <h3 className="text-5xl font-headline font-black uppercase tracking-tighter leading-none">Mon - Sat <br/> 09:00 - 21:00</h3>
                               <p className="text-primary/60 font-black text-[10px] uppercase tracking-widest italic">Live concierge support active during these hours.</p>
                           </div>
                        </section>
                    </div>

                    {/* Inquiry Terminal */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white/5 backdrop-blur-3xl p-10 sm:p-20 rounded-[5rem] border border-white/10 shadow-3xl relative overflow-hidden"
                        >
                            {/* Decorative element */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient opacity-20" />

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-20 text-center space-y-10"
                                    >
                                        <div className="w-28 h-28 bg-accent/20 rounded-[3rem] flex items-center justify-center mx-auto text-accent scale-110 shadow-2xl">
                                            <CheckCircle2 className="w-14 h-14" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-headline font-black text-white tracking-tight uppercase">Dossier Received</h3>
                                            <p className="text-white/40 font-medium text-lg max-w-xs mx-auto">Your inquiry has been routed to our lead advisors. Expect a secure transmission shortly.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 px-8">Identificator</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-7 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-widest placeholder:text-white/5"
                                                    placeholder="Full Private Name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 px-8">Digital Link</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-7 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-widest placeholder:text-white/5"
                                                    placeholder="Your Secure Email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 px-8">Subject Protocol</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-7 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-widest placeholder:text-white/5"
                                                placeholder="Asset Interest | Investment Inquiry"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 px-8">Detailed Briefing</label>
                                            <textarea
                                                rows={5}
                                                className="w-full bg-white/5 border border-white/10 rounded-[3.5rem] px-10 py-9 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-widest placeholder:text-white/5 resize-none"
                                                placeholder="Specify asset preferences or partnership details..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gold-gradient text-primary py-8 rounded-full font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-6 group"
                                        >
                                            Transmit Securely
                                            <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Map Interface */}
                <section className="container-responsive pt-40">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 p-4 rounded-[6rem] border border-white/10 shadow-3xl overflow-hidden"
                    >
                        <div className="w-full h-[600px] rounded-[5rem] overflow-hidden relative border border-white/10">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.216654763198!2d77.42875137532057!3d23.235171779024095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268e31ba061%3A0xe2125712f6a73c1c!2sDB%20City%20Mall!5e0!3m2!1sen!2sin!4v1717430000000!5m2!1sen!2sin" 
                                className="w-full h-full grayscale invert opacity-60 contrast-125 transition-all duration-1000 group-hover:opacity-100"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-[#071B3A]/20 pointer-events-none" />

                            <div className="absolute bottom-16 left-16 right-16 grid grid-cols-1 md:grid-cols-3 gap-10 pointer-events-none">
                                <div className="md:col-span-2 bg-[#071B3A]/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/20 shadow-3xl flex items-center gap-8">
                                    <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center text-primary shadow-2xl">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-accent tracking-[0.4em]">Operations Center</p>
                                        <p className="text-3xl font-headline font-black text-white tracking-tight uppercase">Arera Hills, Bhopal, India 462011</p>
                                    </div>
                                </div>
                                <div className="bg-gold-gradient p-10 rounded-[3rem] shadow-3xl flex items-center justify-center text-primary">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Status</p>
                                        <p className="text-3xl font-headline font-black uppercase tracking-widest">Live</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </motion.div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
