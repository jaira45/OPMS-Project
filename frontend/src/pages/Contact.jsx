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
                {/* ─ Cinematic Header ─────────────────────────────────────── */}
                <section className="container-responsive py-24 space-y-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 px-8 py-3 bg-accent/10 border border-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
                    >
                        <Sparkles className="w-4 h-4" />
                        Concierge Protocols
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <h1 className="font-headline font-black text-6xl sm:text-8xl md:text-[9rem] tracking-tighter leading-tight sm:leading-[0.85] uppercase italic">
                                Secure <br />
                                <span className="font-display italic text-gold-gradient normal-case tracking-normal block -mt-4">Transmission</span>
                            </h1>
                        </div>
                        <div className="max-w-2xl border-l border-white/10 pl-12">
                            <p className="text-white/40 text-xl md:text-2xl font-medium leading-relaxed italic">
                                Our elite advisory council is standing by to facilitate high-stakes negotiations across Central India's most prestigious markets.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container-responsive grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    {/* Information Cluster */}
                    <div className="lg:col-span-5 space-y-20">
                        <section className="space-y-12">
                            {contactInfo.map((item, i) => (
                                <motion.a 
                                    key={i}
                                    href={item.path}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    className="flex items-center gap-10 group"
                                >
                                    <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-center text-accent shadow-3xl group-hover:bg-accent group-hover:text-primary transition-all duration-700 ring-1 ring-white/0 group-hover:ring-accent/20">
                                        <item.icon className="w-9 h-9" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 leading-none">{item.label}</p>
                                        <p className="text-3xl font-headline font-black text-white tracking-tighter uppercase italic">{item.val}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </section>

                        {/* Operational Readiness Node */}
                        <section className="bg-gold-gradient p-16 rounded-[5rem] text-primary shadow-[0_64px_128px_-32px_rgba(212,175,55,0.3)] relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -mr-24 -mt-24 blur-[80px] group-hover:bg-white/20 transition-all duration-2000" />
                           <div className="relative z-10 space-y-10">
                               <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">
                                   <Clock className="w-5 h-5" />
                                   Operational Window
                               </div>
                               <h3 className="text-6xl font-headline font-black uppercase tracking-tighter leading-[0.9] italic">Mon - Sat <br/> 09:00 - 21:00 <span className="text-2xl not-italic opacity-40">GMT+5.5</span></h3>
                               <p className="border-t border-primary/20 pt-8 mt-6 text-primary/60 font-black text-[11px] uppercase tracking-[0.4em] italic leading-relaxed">Live executive concierge support active during these operational benchmarks.</p>
                           </div>
                        </section>
                    </div>

                    {/* Inquiry Terminal */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            className="bg-white/5 backdrop-blur-3xl p-12 sm:p-24 rounded-[6rem] border border-white/10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] relative overflow-hidden"
                        >
                            {/* Cinematic Glow */}
                            <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient" />

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-32 text-center space-y-12"
                                    >
                                        <div className="w-32 h-32 bg-accent/20 rounded-[4rem] flex items-center justify-center mx-auto text-accent scale-110 shadow-3xl ring-2 ring-accent/20">
                                            <CheckCircle2 className="w-16 h-16" />
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-5xl font-headline font-black text-white tracking-tighter uppercase italic">Dossier Received</h3>
                                            <p className="text-white/30 font-black text-sm uppercase tracking-widest max-w-xs mx-auto leading-relaxed">Inquiry routed to lead advisory council. Secure transmission confirmed.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-16">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                            <div className="space-y-5">
                                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-accent px-10">Principal Identity</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-8 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-[0.3em] placeholder:text-white/5 italic"
                                                    placeholder="Enter Full Name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-5">
                                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-accent px-10">Digital Node</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-8 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-[0.3em] placeholder:text-white/5 italic"
                                                    placeholder="Secure Email Link"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-5">
                                            <label className="text-[11px] font-black uppercase tracking-[0.4em] text-accent px-10">Subject Protocol</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-8 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-[0.3em] placeholder:text-white/5 italic"
                                                placeholder="Asset Interest | Portfolio Expansion"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-5">
                                            <label className="text-[11px] font-black uppercase tracking-[0.4em] text-accent px-10">Detailed Briefing</label>
                                            <textarea
                                                rows={5}
                                                className="w-full bg-white/5 border border-white/10 rounded-[4rem] px-12 py-10 font-bold text-white outline-none focus:border-accent transition-all uppercase text-[11px] tracking-[0.3em] placeholder:text-white/5 resize-none italic"
                                                placeholder="Specify asset parameters or partnership directives..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gold-gradient text-primary py-9 rounded-full font-black uppercase tracking-[0.6em] text-[12px] shadow-3xl hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-8 group"
                                        >
                                            Synchronize Transmission
                                            <Send className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Master Intelligence Grid (Map) */}
                <section className="container-responsive pt-48">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="bg-white/5 p-5 rounded-[7rem] border border-white/10 shadow-3xl overflow-hidden group"
                    >
                        <div className="w-full h-[700px] rounded-[6rem] overflow-hidden relative border border-white/10">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.216654763198!2d77.42875137532057!3d23.235171779024095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268e31ba061%3A0xe2125712f6a73c1c!2sDB%20City%20Mall!5e0!3m2!1sen!2sin!4v1717430000000!5m2!1sen!2sin" 
                                className="w-full h-full grayscale invert opacity-40 contrast-125 saturate-0 brightness-75 transition-all duration-[3s] group-hover:scale-110"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-[#071B3A]/40 pointer-events-none" />

                            <div className="absolute bottom-16 left-16 right-16 grid grid-cols-1 md:grid-cols-3 gap-12 pointer-events-none items-stretch">
                                <div className="md:col-span-2 bg-[#0A254D]/90 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-3xl flex items-center gap-10">
                                    <div className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center text-primary shadow-3xl ring-4 ring-white/10">
                                        <MapPin className="w-9 h-9" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-black uppercase text-accent tracking-[0.5em]">Primary Nexus H.Q.</p>
                                        <p className="text-4xl font-headline font-black text-white tracking-tighter uppercase italic">Arera Hills, Bhopal, India 462011</p>
                                    </div>
                                </div>
                                <div className="bg-gold-gradient p-12 rounded-[4rem] shadow-3xl flex items-center justify-center text-primary border border-white/20">
                                    <div className="text-center space-y-2">
                                        <p className="text-[11px] font-black uppercase tracking-[0.5em] opacity-60">Status</p>
                                        <p className="text-4xl font-headline font-black uppercase tracking-widest italic">Online</p>
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
