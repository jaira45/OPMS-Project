import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Globe, Share2, MessageCircle, Info } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "Quick Discovery",
            links: [
                { label: "Home Hub", path: "/home" },
                { label: "Elite Catalog", path: "/properties" },
                { label: "Expert Agents", path: "/agents" },
                { label: "Company Story", path: "/about" },
            ]
        },
        {
            title: "Client Network",
            links: [
                { label: "User Dashboard", path: "/dashboard" },
                { label: "Property Comparison", path: "/compare" },
                { label: "My Favorites", path: "/favorites" },
                { label: "Privacy Protocol", path: "/privacy" },
            ]
        }
    ];

    return (
        <footer className="bg-[#000a16] border-t border-white/5 pt-40 pb-20 relative overflow-hidden text-white/50">
            {/* Premium Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="container-responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 relative z-10">
                {/* Brand Identity */}
                <div className="space-y-12">
                    <div className="flex items-center gap-5 group cursor-pointer no-select" onClick={() => navigate('/home')}>
                        <motion.div 
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center text-primary shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-700"
                        >
                            <Home className="w-8 h-8" />
                        </motion.div>
                        <div className="flex flex-col">
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">OPMS</h2>
                            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mt-1 opacity-80">Metropolis Estates</span>
                        </div>
                    </div>
                    <p className="text-base font-medium leading-[1.8] max-w-xs text-white/30">
                        Curating Central India's most distinguished architectural masterpieces and investment-grade estates since 2025.
                    </p>
                    <div className="flex gap-6">
                        {[Globe, Share2, MessageCircle, Info].map((Icon, i) => (
                            <motion.a 
                                key={i} 
                                href="#" 
                                whileHover={{ y: -8, scale: 1.1 }}
                                className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/60 hover:bg-gold-gradient hover:text-primary transition-all duration-500 border border-white/5 shadow-xl"
                            >
                                <Icon className="w-6 h-6" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Navigation Blocks */}
                {sections.map((section) => (
                    <div key={section.title} className="space-y-12">
                        <h3 className="text-white font-black uppercase tracking-[0.4em] text-[11px] opacity-100">{section.title}</h3>
                        <ul className="space-y-6">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="text-base font-bold hover:text-[#D4AF37] transition-all flex items-center gap-4 group">
                                        <div className="w-2 h-px bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Contact Interface */}
                <div className="space-y-12">
                    <h3 className="text-white font-black uppercase tracking-[0.4em] text-[11px] opacity-100">Official Nexus</h3>
                    <ul className="space-y-10">
                        <li className="flex gap-8 items-start group">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-2xl group-hover:bg-[#D4AF37] group-hover:text-primary transition-all duration-500">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/50 block leading-none">Location Hub</span>
                                <p className="text-base font-bold text-white/90 leading-relaxed italic">DB Mall Metropolis, Arera Hills<br />Bhopal, MP 462011</p>
                            </div>
                        </li>
                        <li className="flex gap-8 items-start group">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-2xl group-hover:bg-[#D4AF37] group-hover:text-primary transition-all duration-500">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/50 block leading-none">Diplomatic Mail</span>
                                <p className="text-base font-bold text-white/90 italic">contact@opms.luxury</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Credits */}
            <div className="container-responsive mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                <p>&copy; {currentYear} OPMS Corporation. Architectural Protocol Alpha.</p>
                <div className="flex gap-16">
                    <a href="#" className="hover:text-[#D4AF37] transition-colors duration-500">Privacy</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors duration-500">Security</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors duration-500">Compliance</a>
                </div>
            </div>
        </footer>
    );
}
