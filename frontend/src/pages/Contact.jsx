import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { 
    Send, Mail, Phone, MapPin, Sparkles, 
    MessageCircle, CheckCircle2, Globe, Clock,
    ChevronRight, ExternalLink
} from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    const contactInfo = [
        { label: 'Cloud Mail', val: 'contact@opms.com', icon: Mail, path: 'mailto:contact@opms.com' },
        { label: 'Hotline', val: '+91 98765 43210', icon: Phone, path: 'tel:+919876543210' },
        { label: 'Nexus H.Q.', val: 'DB Mall, Arera Hills, Bhopal', icon: MapPin, path: '#' },
    ];

    return (
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-32 pb-40 container-responsive space-y-20">
                {/* Header Welcome */}
                <div className="max-w-3xl space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest"
                    >
                        <Sparkles className="w-3 h-3" />
                        Access Global Support
                    </motion.div>
                    <h1 className="font-headline font-black text-5xl sm:text-8xl text-primary dark:text-white tracking-tighter leading-[0.9] italic">
                        Initiate <span className="text-secondary">Communication</span>
                    </h1>
                    <p className="text-on-surface-variant dark:text-white/40 text-xl font-medium leading-relaxed">
                        Our elite advisory team is standing by to facilitate your next high-stakes property acquisition in Central India's premier markets.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Connection Node */}
                    <div className="lg:col-span-5 space-y-12">
                        <section className="space-y-8">
                            {contactInfo.map((item, i) => (
                                <motion.a 
                                    key={i}
                                    href={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 group hover:translate-x-2 transition-all"
                                >
                                    <div className="w-16 h-16 bg-white dark:bg-dark-surface-variant rounded-[2rem] flex items-center justify-center text-primary dark:text-white shadow-xl group-hover:bg-primary group-hover:text-white transition-all ring-1 ring-surface-variant dark:ring-dark-surface-variant/20">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/20 leading-none">{item.label}</p>
                                        <p className="text-xl font-black text-primary dark:text-white tracking-tight">{item.val}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </section>

                        <section className="bg-primary space-y-8 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-secondary">
                               <Clock className="w-4 h-4" />
                               Availability Node
                           </div>
                           <h3 className="text-3xl font-black italic tracking-tighter leading-tight">Mon-Sat<br/>09:00 - 21:00 IST</h3>
                           <button className="w-full py-5 bg-white text-primary rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-white transition-all shadow-xl flex items-center justify-center gap-3">
                               <Globe className="w-4 h-4" />
                               International Inquiries
                           </button>
                        </section>
                    </div>

                    {/* Inquiry Terminal */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-dark-surface-variant p-8 sm:p-16 rounded-[4rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-3xl relative">
                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-20 text-center space-y-8"
                                    >
                                        <div className="w-24 h-24 bg-secondary/10 rounded-[2.5rem] flex items-center justify-center mx-auto text-secondary scale-110">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-black text-primary dark:text-white tracking-tight uppercase">Transmission Success</h3>
                                            <p className="text-on-surface-variant dark:text-white/40 font-bold max-w-xs mx-auto">Your dossier has been routed to the appropriate department. Stay alert for our response.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/20 px-4">Originator</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-primary/5 dark:bg-white/5 border-none rounded-3xl px-8 py-5 font-bold text-primary dark:text-white outline-none focus:ring-4 ring-secondary/5 transition-all"
                                                    placeholder="Full Identity Name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/20 px-4">Digital Link</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-primary/5 dark:bg-white/5 border-none rounded-3xl px-8 py-5 font-bold text-primary dark:text-white outline-none focus:ring-4 ring-secondary/5 transition-all"
                                                    placeholder="name@domain.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/20 px-4">Subject Protocol</label>
                                            <input
                                                type="text"
                                                className="w-full bg-primary/5 dark:bg-white/5 border-none rounded-3xl px-8 py-5 font-bold text-primary dark:text-white outline-none focus:ring-4 ring-secondary/5 transition-all"
                                                placeholder="Interested in Estate XYZ"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/20 px-4">Briefing</label>
                                            <textarea
                                                rows={5}
                                                className="w-full bg-primary/5 dark:bg-white/5 border-none rounded-[3rem] px-8 py-7 font-bold text-primary dark:text-white outline-none focus:ring-4 ring-secondary/5 transition-all resize-none"
                                                placeholder="Provide depth for your inquiry..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary dark:bg-dark-primary text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-3xl flex items-center justify-center gap-4 group active:scale-95"
                                        >
                                            <span>Transmit Inquiry</span>
                                            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <section className="pt-12">
                     <div className="bg-white dark:bg-dark-surface-variant p-4 rounded-[4.5rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-3xl overflow-hidden">
                        <div className="w-full h-80 sm:h-[600px] rounded-[3.5rem] overflow-hidden relative border border-surface-variant/20">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.216654763198!2d77.42875137532057!3d23.235171779024095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268e31ba061%3A0xe2125712f6a73c1c!2sDB%20City%20Mall!5e0!3m2!1sen!2sin!4v1717430000000!5m2!1sen!2sin" 
                                className="w-full h-full grayscale active:grayscale-0 transition-all duration-700"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            <div className="absolute bottom-10 left-10 right-10 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-3xl pointer-events-none hidden md:flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-primary dark:bg-accent rounded-2xl flex items-center justify-center text-white">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-primary/40 dark:text-white/20 tracking-widest">Office HQ</p>
                                        <p className="text-xl font-black text-primary dark:text-white tracking-tight">Main Atrium, DB City Mall, Bhopal, MP 462011</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Status</p>
                                    <p className="text-xl font-black text-primary dark:text-white tracking-tight">Live Operations</p>
                                </div>
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
