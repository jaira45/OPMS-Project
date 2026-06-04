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
                {/* ─ Header ─────────────────────────────────────── */}
                <section className="container-responsive py-16 sm:py-32 space-y-10 sm:space-y-16 section-padding">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-white/5 backdrop-blur-3xl border border-white/10 text-accent rounded-full text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl"
                    >
                        <Sparkles className="w-4 h-4" />
                        Professional Advisory
                    </motion.div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="space-y-8">
                            <h1 className="hero-heading text-white tracking-widest leading-none">
                                Get In <br />
                                <span className="font-display italic text-gold-gradient normal-case tracking-normal block -mt-2">Touch</span>
                            </h1>
                        </div>
                        <div className="max-w-2xl lg:border-l border-white/10 lg:pl-16">
                            <p className="body-text text-xl sm:text-2xl font-medium leading-relaxed italic opacity-60">
                                Our expert real estate advisors are available to handle your enquiries and facilitate your next property acquisition in Central India.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container-responsive grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start section-padding">
                    {/* Information Cluster */}
                    <div className="lg:col-span-5 space-y-12 sm:space-y-20">
                        <section className="space-y-8 sm:space-y-12">
                            {contactInfo.map((item, i) => (
                                <motion.a 
                                    key={i}
                                    href={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="flex items-center gap-6 sm:gap-10 group"
                                >
                                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center text-accent shadow-2xl group-hover:bg-accent group-hover:text-primary transition-all duration-700">
                                        <item.icon className="w-6 h-6 sm:w-10 sm:h-10" />
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <p className="label-link text-white/30">{item.label}</p>
                                        <p className="text-xl sm:text-2xl font-bold text-white tracking-tight italic">{item.val}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </section>

                        {/* Operational Readiness Node */}
                        <section className="bg-gold-gradient p-10 sm:p-20 rounded-[3rem] sm:rounded-[4rem] text-primary shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
                           <div className="relative z-10 space-y-8 sm:space-y-12">
                               <div className="flex items-center gap-4 text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary/60">
                                   <Clock className="w-5 h-5" />
                                   Service Availability
                               </div>
                               <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[0.9] italic">Mon - Sat <br/> 09:00 - 21:00 <span className="text-xl not-italic opacity-40">IST</span></h3>
                               <p className="border-t border-primary/20 pt-10 mt-10 text-primary/60 font-bold text-[12px] uppercase tracking-widest italic leading-relaxed">Our concierge team is active during these hours to assist your search.</p>
                           </div>
                        </section>
                    </div>

                    {/* Inquiry Terminal */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white/[0.02] backdrop-blur-3xl p-8 sm:p-24 rounded-[3rem] sm:rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden"
                        >
                            <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gold-gradient" />

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="py-16 sm:py-32 text-center space-y-10"
                                    >
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-accent/20 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center mx-auto text-accent shadow-2xl">
                                            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-3xl sm:text-5xl font-bold text-white italic">Message Received</h3>
                                            <p className="text-base sm:text-xl max-w-sm mx-auto opacity-60">Thank you for contacting us. Our senior advisor will reach out to you within 24 business hours.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-16">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                                            <div className="space-y-3 sm:space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-accent px-6">Full Identity</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 sm:py-8 font-bold text-white outline-none focus:border-accent transition-all text-[11px] sm:text-[12px] tracking-widest placeholder:text-white/5 italic"
                                                    placeholder="e.g. Alexander Pierce"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-3 sm:space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-accent px-6">Secure Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 sm:py-8 font-bold text-white outline-none focus:border-accent transition-all text-[11px] sm:text-[12px] tracking-widest placeholder:text-white/5 italic"
                                                    placeholder="office@concierge.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3 sm:space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-accent px-6">Inquiry Subject</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 sm:py-8 font-bold text-white outline-none focus:border-accent transition-all text-[11px] sm:text-[12px] tracking-widest placeholder:text-white/5 italic"
                                                placeholder="Elite Property Acquisition | Strategic Consultation"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-3 sm:space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-accent px-6">Consultation Brief</label>
                                            <textarea
                                                rows={6}
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[3rem] px-8 py-8 sm:px-10 sm:py-10 font-bold text-white outline-none focus:border-accent transition-all text-[11px] sm:text-[12px] tracking-widest placeholder:text-white/5 resize-none italic"
                                                placeholder="Please define your requirements..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gold-gradient text-primary py-6 sm:py-10 rounded-full font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[11px] sm:text-[12px] shadow-3xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-6 sm:gap-8 group"
                                        >
                                            Submit Enquiry
                                            <Send className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform duration-500" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Master Intelligence Grid (Map) */}
                <section className="container-responsive pt-24 sm:pt-48">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="bg-white/5 p-5 rounded-[7rem] border border-white/10 shadow-3xl overflow-hidden group"
                    >
                         <div className="w-full h-[400px] sm:h-[700px] rounded-[3rem] sm:rounded-[6rem] overflow-hidden relative border border-white/10">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.216654763198!2d77.42875137532057!3d23.235171779024095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268e31ba061%3A0xe2125712f6a73c1c!2sDB%20City%20Mall!5e0!3m2!1sen!2sin!4v1717430000000!5m2!1sen!2sin" 
                                className="w-full h-full grayscale invert opacity-40 contrast-125 saturate-0 brightness-75 transition-all duration-[3s] group-hover:scale-110"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-[#071B3A]/40 pointer-events-none" />

                            <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 pointer-events-none">
                                <div className="md:col-span-2 bg-[#0A254D]/90 backdrop-blur-3xl p-6 sm:p-8 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-4 sm:gap-6">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-gradient rounded-full flex items-center justify-center text-primary shadow-xl ring-4 ring-white/10 shrink-0">
                                         <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
                                     </div>
                                     <div className="space-y-1">
                                         <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-accent italic">Bhopal Headquarters</p>
                                         <p className="text-lg sm:text-2xl font-bold text-white tracking-tight uppercase italic leading-tight">Arera Hills, Bhopal, India 462011</p>
                                     </div>
                                 </div>
                                 <div className="bg-gold-gradient p-8 rounded-3xl shadow-xl flex items-center justify-center text-primary border border-white/20">
                                     <div className="text-center space-y-0.5">
                                         <p className="label-link !text-[10px] opacity-60">Support Status</p>
                                         <p className="text-2xl font-bold uppercase tracking-widest italic leading-none">Active</p>
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
