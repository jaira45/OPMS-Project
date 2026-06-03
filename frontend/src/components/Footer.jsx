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
        <footer className="bg-primary dark:bg-dark-surface border-t border-white/5 pt-24 pb-32 sm:pb-32 lg:pb-12 mt-20 relative overflow-hidden text-white/60">
            {/* Background Grain/Texture would go here */}
            
            <div className="container-responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
                {/* Brand Identity */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform duration-500">
                            <Home className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">OPMS</h2>
                    </div>
                    <p className="text-sm font-medium leading-relaxed max-w-xs">
                        Defining premium real estate in Central India with data-driven precision and architectural excellence. Join our elite community today.
                    </p>
                    <div className="flex gap-4">
                        {[Globe, Share2, MessageCircle, Info].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-secondary hover:-translate-y-1 transition-all">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation Blocks */}
                {sections.map((section) => (
                    <div key={section.title} className="space-y-8">
                        <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs">{section.title}</h3>
                        <ul className="space-y-4">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="text-sm font-bold hover:text-secondary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Contact Interface */}
                <div className="space-y-8">
                    <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs">Official Nexus</h3>
                    <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary block leading-none">Location</span>
                                <p className="text-sm font-bold text-white">DB Mall, Arera Hills, Bhopal, MP</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary block leading-none">Email</span>
                                <p className="text-sm font-bold text-white">contact@opms.com</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary block leading-none">Phone</span>
                                <p className="text-sm font-bold text-white">+91 98765 43210</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Credits */}
            <div className="container-responsive mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <p>&copy; {currentYear} OPMS Corporation. Architectural Rights Reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-secondary transition-colors">Compliance</a>
                    <a href="#" className="hover:text-secondary transition-colors">Security</a>
                    <a href="#" className="hover:text-secondary transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
}
