import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Mail, Phone, MapPin, Globe, Share2, MessageCircle, Info, ArrowUp, Sparkles, Building2 } from 'lucide-react';

export default function Footer() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const sections = [
        {
            title: "Explore",
            links: [
                { label: "Home", path: "/home" },
                { label: "Search Properties", path: "/properties" },
                { label: "Meet Our Team", path: "/agents" },
                { label: "About Our Company", path: "/about" },
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "User Dashboard", path: "/dashboard" },
                { label: "Market News", path: "/news" },
                { label: "My Favorites", path: "/favorites" },
                { label: "Privacy Policy", path: "/privacy" },
            ]
        }
    ];

    return (
        <footer className="bg-[#000a16] border-t border-white/5 pt-24 sm:pt-32 pb-16 relative overflow-hidden text-white/40 px-4">
            {/* ─ Master Decorative Context ──────────────────────────────── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />
            
            <div className="container-responsive grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 relative z-10">
                {/* ─ Brand Identity Sector ───────────────────────────────── */}
                <div className="space-y-10">
                    <div className="flex items-center gap-5 group cursor-pointer" onClick={() => navigate('/home')}>
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="w-16 h-16 bg-gold-gradient rounded-3xl flex items-center justify-center text-primary shadow-2xl transition-all duration-700 ring-2 ring-white/10"
                        >
                            <Building2 className="w-8 h-8" />
                        </motion.div>
                        <div className="flex flex-col leading-tight">
                            <h2 className="text-4xl font-bold text-white tracking-tighter uppercase italic">OPMS</h2>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-accent mt-1 opacity-60 flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                Real Estate Excellence
                            </span>
                        </div>
                    </div>
                    <p className="text-base font-medium leading-relaxed max-w-sm text-white/30 italic">
                        The ultimate destination for central India’s most prestigious residential and commercial properties. Professional, transparent, and trusted.
                    </p>
                    <div className="flex gap-4 sm:gap-6">
                        {[Globe, Share2, MessageCircle, Info].map((Icon, i) => (
                            <motion.a 
                                key={i} 
                                href="#" 
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold-gradient hover:text-primary transition-all duration-500 border border-white/10"
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* ─ Quick Navigation Links ───────────────────────────── */}
                {sections.map((section) => (
                    <div key={section.title} className="space-y-8 sm:space-y-10">
                        <h3 className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-3">
                            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                            {section.title}
                        </h3>
                        <ul className="space-y-5 sm:space-y-6">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="text-base font-medium hover:text-accent transition-all flex items-center gap-4 group">
                                        <div className="w-2 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* ─ Office Contact Information ───────────────────────────────── */}
                <div className="space-y-8 sm:space-y-10">
                    <h3 className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-3">
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        Connect With Us
                    </h3>
                    <ul className="space-y-8 sm:space-y-10">
                        <li className="flex gap-6 items-start group">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 shadow-xl group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-700">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-accent/40 block leading-none italic">Bhopal Headquarters</span>
                                <p className="text-lg font-bold text-white/80 leading-snug tracking-tight">DB Mall Arera Hills<br />Bhopal, MP 462011</p>
                            </div>
                        </li>
                        <li className="flex gap-6 items-start group">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 shadow-xl group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-700">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-accent/40 block leading-none italic">Email Support</span>
                                <p className="text-lg font-bold text-white/80 lowercase tracking-tight">contact@opms.com</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ─ Legal Notice & Ownership ─────────────────────────── */}
            <div className="container-responsive mt-24 sm:mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 relative">
                <div className="space-y-3 text-center md:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 italic">&copy; {currentYear} OPMS Real Estate. Built for Professionalism.</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-10 text-[9px] font-bold uppercase tracking-widest text-white/10">
                        <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-accent transition-colors">Safety & Security</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                    </div>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/40 transition-all shadow-xl group"
                >
                    <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-500" />
                </motion.button>
            </div>
        </footer>
    );
}
