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

    const contactMethods = [
        { 
            label: 'Private Consultation', 
            val: '+91 98765 43210', 
            desc: 'Direct line to our senior acquisition team.',
            icon: Phone, 
            path: 'tel:+919876543210' 
        },
        { 
            label: 'Official Correspondence', 
            val: 'concierge@opms.com', 
            desc: 'Average response time: 2 business hours.',
            icon: Mail, 
            path: 'mailto:concierge@opms.com' 
        },
        { 
            label: 'Global Headquarters', 
            val: 'Arera Hills, Bhopal', 
            desc: 'Strategic operations center, Central India.',
            icon: MapPin, 
            path: '#' 
        },
    ];

    return (
        <div className="bg-white dark:bg-[#061B45] min-h-screen font-body transition-colors duration-500">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-20">
                {/* ─ Hero Section ─────────────────────────────────────── */}
                <section className="relative overflow-hidden py-20 lg:py-28 bg-slate-50 dark:bg-transparent">
                    <div className="absolute top-0 right-0 w-[50%] h-full bg-[#061B45]/5 dark:bg-white/5 skew-x-[-12deg] translate-x-20 rounded-l-[5rem] pointer-events-none" />
                    
                    <div className="container-responsive relative z-10">
                        <div className="max-w-4xl space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/40 rounded-full text-[#061B45] dark:text-accent text-[12px] font-bold uppercase tracking-widest"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Premium Real Estate Advisory
                            </motion.div>
                            
                            <h1 className="text-5xl lg:text-8xl font-display font-medium text-[#061B45] dark:text-white leading-[1.05] tracking-tight">
                                Professional Support for <br/>
                                <span className="text-gold-gradient italic">Elite Acquisitions</span>
                            </h1>
                            
                            <p className="text-xl lg:text-2xl text-slate-700 dark:text-white/80 max-w-2xl leading-relaxed font-medium">
                                Our concierge team is dedicated to facilitating seamless property transactions for sophisticated international and domestic investors.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─ Main Content Grid ─────────────────────────────────── */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-12">
                    
                    {/* Left: Contact Info & Hours */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="grid grid-cols-1 gap-8">
                            {contactMethods.map((item, i) => (
                                <motion.a 
                                    key={i}
                                    href={item.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex items-start gap-8 p-8 bg-white dark:bg-[#0A1120] border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-2xl hover:border-accent/40 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-[#061B45]/5 dark:bg-accent/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#061B45] transition-all duration-500 shrink-0 border border-accent/20">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{item.label}</p>
                                        <p className="text-2xl font-bold text-[#061B45] dark:text-white tracking-tight">{item.val}</p>
                                        <p className="text-[15px] font-medium text-slate-500 dark:text-white/50 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Business Hours: Compact & Elegant */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-[#061B45] p-10 rounded-[3rem] text-white shadow-3xl relative overflow-hidden ring-1 ring-white/10"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px] -mr-24 -mt-24" />
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4 text-accent">
                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <span className="text-[13px] font-bold uppercase tracking-widest">Global Support Hours</span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold italic tracking-tight uppercase leading-none">Monday — Saturday</h3>
                                    <p className="text-4xl font-display font-medium text-accent">09:00 — 21:00 <span className="text-xl opacity-40 font-body not-italic tracking-widest ml-2">IST</span></p>
                                </div>
                                <div className="pt-8 border-t border-white/10 flex items-center gap-4 text-white/50 text-sm font-medium">
                                    <Globe className="w-5 h-5 text-accent" />
                                    Bilingual assistance available (English & Hindi)
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Inquiry Form */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-[#0A1120] p-10 lg:p-16 rounded-[4rem] border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-3xl relative overflow-hidden"
                        >
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />
                            
                            <div className="mb-12 space-y-3">
                                <h2 className="text-4xl font-display font-medium text-[#061B45] dark:text-white">Submit a Consultation Request</h2>
                                <p className="text-lg text-slate-500 dark:text-white/50 leading-relaxed font-medium">Please provide your details below. A dedicated portfolio manager will reach out within one business day.</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-24 text-center space-y-8"
                                    >
                                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20 shadow-inner">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-bold text-[#061B45] dark:text-white italic leading-none">Inquiry Successfully Delivered</h3>
                                            <p className="text-xl text-slate-500 dark:text-white/60 max-w-sm mx-auto leading-relaxed">Thank you for your interest in OPMS. Your strategic consultation request is being processed.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-accent ml-2">Full Identity</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-[15px] font-medium outline-none focus:border-accent dark:text-white transition-all shadow-inner"
                                                placeholder="e.g. Julian Vane"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-accent ml-2">Secure Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-[15px] font-medium outline-none focus:border-accent dark:text-white transition-all shadow-inner"
                                                placeholder="vane@luxury.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="sm:col-span-2 space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-accent ml-2">Consultation Subject</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 text-[15px] font-medium outline-none focus:border-accent dark:text-white transition-all shadow-inner"
                                                placeholder="Elite Property Acquisition Strategy | Portfolio Expansion"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div className="sm:col-span-2 space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-accent ml-2">Briefing / Requirements</label>
                                            <textarea
                                                rows={6}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl px-6 py-6 text-[15px] font-medium outline-none focus:border-accent dark:text-white transition-all resize-none shadow-inner"
                                                placeholder="Please specify your investment goals or property requirements..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="sm:col-span-2 bg-[#061B45] dark:bg-accent text-white dark:text-[#061B45] py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[13px] shadow-2xl hover:scale-[1.01] active:scale-[0.98] hover:bg-accent hover:text-[#061B45] transition-all flex items-center justify-center gap-6 mt-6"
                                        >
                                            Submit Secure Inquiry
                                            <Send className="w-5 h-5 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>

                {/* ─ Map Section ───────────────────────────────────────── */}
                <section className="container-responsive pt-32">
                     <div className="rounded-[5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-3xl h-[500px] lg:h-[700px] relative group ring-1 ring-slate-100 dark:ring-white/5">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.216654763198!2d77.42875137532057!3d23.235171779024095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268e31ba061%3A0xe2125712f6a73c1c!2sDB%20City%20Mall!5e0!3m2!1sen!2sin!4v1717430000000!5m2!1sen!2sin" 
                            className="w-full h-full grayscale-[0.2] dark:invert dark:opacity-40 transition-all duration-1000 group-hover:scale-110"
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                        ></iframe>
                        <div className="absolute bottom-10 left-10 p-1 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-3xl">
                            <div className="bg-[#061B45] p-10 rounded-[2.8rem] text-white space-y-3 max-w-sm">
                                <p className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] leading-none mb-2">Nexus Headquarters</p>
                                <h4 className="text-3xl font-bold tracking-tight italic">Arera Hills, Bhopal</h4>
                                <p className="text-[15px] text-white/50 leading-relaxed">Strategic Business District, Madhya Pradesh, India 462011</p>
                            </div>
                        </div>
                     </div>
                </section>
            </main>


            <Footer />
            <BottomNav />
        </div>
    );
}
