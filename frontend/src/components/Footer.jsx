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
            title: "Strategic Discovery",
            links: [
                { label: "Home Hub", path: "/home" },
                { label: "Elite Inventory", path: "/properties" },
                { label: "Imperial Agents", path: "/agents" },
                { label: "Legacy Story", path: "/about" },
            ]
        },
        {
            title: "Private Network",
            links: [
                { label: "Vanguard Dashboard", path: "/dashboard" },
                { label: "Market Intelligence", path: "/news" },
                { label: "Member Favorites", path: "/favorites" },
                { label: "Secure Protocol", path: "/privacy" },
            ]
        }
    ];

    return (
        <footer className="bg-[#000a16] border-t border-white/5 pt-48 pb-24 relative overflow-hidden text-white/40">
            {/* ─ Cinematic Atmosphere ─────────────────────────────────── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container-responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 relative z-10">
                {/* ─ Grand Brand Identity ───────────────────────────────── */}
                <div className="space-y-16">
                    <div className="flex items-center gap-6 group cursor-pointer" onClick={() => navigate('/home')}>
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="w-20 h-20 bg-gold-gradient rounded-[2.5rem] flex items-center justify-center text-primary shadow-3xl transition-all duration-1000 ring-2 ring-white/10"
                        >
                            <Building2 className="w-10 h-10" />
                        </motion.div>
                        <div className="flex flex-col">
                            <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">OPMS</h2>
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mt-2 opacity-60">Metropolis Estates</span>
                        </div>
                    </div>
                    <p className="text-lg font-medium leading-[1.8] max-w-sm text-white/30 italic">
                        Stewards of Central India's most prestigious architectural legacies and sovereign investment assets. Established 2025.
                    </p>
                    <div className="flex gap-8">
                        {[Globe, Share2, MessageCircle, Info].map((Icon, i) => (
                            <motion.a 
                                key={i} 
                                href="#" 
                                whileHover={{ y: -10, scale: 1.1 }}
                                className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold-gradient hover:text-primary transition-all duration-700 border border-white/10 shadow-3xl ring-1 ring-white/0 hover:ring-accent/40"
                            >
                                <Icon className="w-7 h-7" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* ─ Master Nav Architecture ───────────────────────────── */}
                {sections.map((section) => (
                    <div key={section.title} className="space-y-16">
                        <h3 className="text-white font-black uppercase tracking-[0.5em] text-[11px] flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                            {section.title}
                        </h3>
                        <ul className="space-y-8">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="text-lg font-bold hover:text-accent transition-all flex items-center gap-6 group">
                                        <div className="w-3 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* ─ Institutional Nexus ───────────────────────────────── */}
                <div className="space-y-16">
                    <h3 className="text-white font-black uppercase tracking-[0.5em] text-[11px] flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        Diplomatic Hub
                    </h3>
                    <ul className="space-y-12">
                        <li className="flex gap-10 items-start group">
                            <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 shadow-3xl group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-1000">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent/40 block leading-none italic">Metropolis Center</span>
                                <p className="text-xl font-bold text-white/80 leading-relaxed italic uppercase tracking-tighter">DB Mall Metropolis, Arera Hills<br />Bhopal, MP 462011</p>
                            </div>
                        </li>
                        <li className="flex gap-10 items-start group">
                            <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0 shadow-3xl group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-1000">
                                <Mail className="w-8 h-8" />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent/40 block leading-none italic">Encrypted Channel</span>
                                <p className="text-xl font-bold text-white/80 italic lowercase tracking-tight">contact@opms.luxury</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ─ Master Footer Architecture ─────────────────────────── */}
            <div className="container-responsive mt-64 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative">
                <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/10 italic">&copy; {currentYear} OPMS Corporation. Architectural Protocol Alpha 4.0.</p>
                    <div className="flex gap-20 text-[10px] font-black uppercase tracking-[0.4em] text-white/5">
                        <a href="#" className="hover:text-accent transition-colors duration-700">Sovereign Privacy</a>
                        <a href="#" className="hover:text-accent transition-colors duration-700">Digital Security</a>
                        <a href="#" className="hover:text-accent transition-colors duration-700">Legal Compliance</a>
                    </div>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/40 transition-all shadow-3xl group"
                >
                    <ArrowUp className="w-8 h-8 group-hover:-translate-y-2 transition-transform duration-700" />
                </motion.button>
            </div>
        </footer>
    );
}
