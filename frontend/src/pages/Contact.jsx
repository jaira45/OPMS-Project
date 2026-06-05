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
        <div className="bg-[#fcfcfc] dark:bg-[#061B45] min-h-screen font-body transition-colors duration-500">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-20">
                {/* ─ Hero Section ─────────────────────────────────────── */}
                <section className="relative overflow-hidden py-16 lg:py-24">
                    <div className="absolute top-0 right-0 w-[50%] h-full bg-[#061B45]/5 dark:bg-white/5 skew-x-[-12deg] translate-x-20 rounded-l-[5rem] pointer-events-none" />
                    
                    <div className="container-responsive relative z-10">
                        <div className="max-w-4xl space-y-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-[11px] font-bold uppercase tracking-widest"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Elite Advisory Service
                            </motion.div>
                            
                            <h1 className="text-5xl lg:text-7xl font-display font-medium text-[#061B45] dark:text-white leading-[1.1] tracking-tight">
                                Delivering Excellence through <br/>
                                <span className="text-gold-gradient italic">Personalized Service</span>
                            </h1>
                            
                            <p className="text-lg lg:text-xl text-slate-600 dark:text-white/60 max-w-2xl leading-relaxed">
                                Our bespoke real estate consultancy is designed for discerning clients seeking exclusive property acquisitions in Central India.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─ Main Content Grid ─────────────────────────────────── */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
                    
                    {/* Left: Contact Info & Hours */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="grid grid-cols-1 gap-6">
                            {contactMethods.map((item, i) => (
                                <motion.a 
                                    key={i}
                                    href={item.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex items-start gap-6 p-6 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500"
                                >
                                    <div className="w-14 h-14 bg-accent/10 dark:bg-accent/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#061B45] transition-all duration-500 shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">{item.label}</p>
                                        <p className="text-xl font-bold text-[#061B45] dark:text-white tracking-tight">{item.val}</p>
                                        <p className="text-sm text-slate-500 dark:text-white/40">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Business Hours: Compact & Elegant */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-[#061B45] dark:bg-accent/5 p-8 rounded-[2.5rem] text-white border border-white/5 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-accent">
                                        <Clock className="w-5 h-5" />
                                        <span className="text-[12px] font-bold uppercase tracking-widest">Operational Hours</span>
                                    </div>
                                    <h3 className="text-2xl font-bold italic tracking-tight">Mon - Sat, 09:00 - 21:00</h3>
                                    <p className="text-sm text-white/40 max-w-xs">All timings are in Indian Standard Time (IST).</p>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10">
                                    <Globe className="w-4 h-4 text-accent" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Global Support</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Inquiry Form */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-white/[0.03] p-8 lg:p-14 rounded-[3rem] border border-slate-100 dark:border-white/10 shadow-xl dark:shadow-3xl relative"
                        >
                            <div className="mb-10">
                                <h2 className="text-3xl font-display font-medium text-[#061B45] dark:text-white mb-3">Send a Professional Inquiry</h2>
                                <p className="text-slate-500 dark:text-white/40">Our senior portfolio managers will review your requirements.</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-20 text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#061B45] dark:text-white italic">Inquiry Received</h3>
                                        <p className="text-slate-500 dark:text-white/60 max-w-xs mx-auto">We have received your message and will contact you within 24 business hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-accent ml-2">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-accent dark:text-white transition-all"
                                                placeholder="e.g. Julian Vane"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-accent ml-2">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-accent dark:text-white transition-all"
                                                placeholder="vane@luxury.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="sm:col-span-2 space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-accent ml-2">Subject of Consultation</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-accent dark:text-white transition-all"
                                                placeholder="Elite Acquisition Strategy"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div className="sm:col-span-2 space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-accent ml-2">Consultation Brief</label>
                                            <textarea
                                                rows={5}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-6 text-sm outline-none focus:border-accent dark:text-white transition-all resize-none"
                                                placeholder="Briefly describe your property requirements..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="sm:col-span-2 bg-accent text-[#061B45] py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[12px] shadow-xl hover:shadow-accent/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-4 mt-4"
                                        >
                                            Deliver Inquiry
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>

                {/* ─ Map Section ───────────────────────────────────────── */}
                <section className="container-responsive pt-24">
                     <div className="rounded-[4rem] overflow-hidden border border-slate-100 dark:border-white/10 shadow-3xl h-[450px] lg:h-[600px] relative group">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.216654763198!2d77.42875137532057!3d23.235171779024095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268e31ba061%3A0xe2125712f6a73c1c!2sDB%20City%20Mall!5e0!3m2!1sen!2sin!4v1717430000000!5m2!1sen!2sin" 
                            className="w-full h-full grayscale invert-[0.1] dark:invert dark:opacity-50 transition-all duration-1000 group-hover:scale-105"
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                        ></iframe>
                        <div className="absolute top-8 left-8 bg-[#061B45]/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 text-white space-y-1 shadow-2xl">
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none mb-1">Corporate Nexus</p>
                            <h4 className="text-xl font-bold tracking-tight">Arera Hills, Bhopal</h4>
                            <p className="text-xs text-white/40">Madhya Pradesh, India 462011</p>
                        </div>
                     </div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
