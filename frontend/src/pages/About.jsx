import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { 
    Target, Eye, Award, Users, 
    ShieldCheck, Heart, Sparkles,
    Zap, Rocket, Star, Fingerprint, Globe, Building2
} from 'lucide-react';
import LazyImage from '../components/LazyImage';

export default function About() {
    const milestones = [
        { label: 'Sovereign Assets', val: '$2.5B+', icon: Star },
        { label: 'Private Closures', val: '1.8k+', icon: ShieldCheck },
        { label: 'Imperial Hubs', val: '12', icon: Globe },
        { label: 'Elite Advisors', val: '85+', icon: Users }
    ];

    return (
        <div className="bg-[#071B3A] text-white min-h-screen overflow-x-hidden">
            <Navbar />
            
            <main className="pt-48 pb-0 space-y-48">
                {/* ─ Master Genesis ────────────────────────────────────────── */}
                <section className="container-responsive text-center space-y-16 relative">
                    {/* Background Accents */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[180px] rounded-full pointer-events-none" />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="space-y-12 relative z-10"
                    >
                        <span className="inline-flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 text-accent rounded-full text-[11px] font-black uppercase tracking-[0.6em] shadow-3xl italic">
                            <Building2 className="w-5 h-5" />
                            Our Legacy Protocol
                        </span>
                        <h1 className="text-7xl sm:text-[10rem] md:text-[14rem] font-headline font-black text-white leading-[0.75] tracking-tighter uppercase italic">
                            The <br />
                            <span className="text-gold-gradient normal-case italic font-display lowercase tracking-normal">Imperial</span> <br />
                            Standard
                        </h1>
                    </motion.div>
                    <p className="text-white/40 text-2xl sm:text-4xl max-w-5xl mx-auto leading-[1.4] font-medium italic tracking-tight">
                        OPMS stands as the definitive vanguard of ultra-luxury real estate, curating the interface between extraordinary architecture and sovereign global capital.
                    </p>
                </section>

                {/* ─ Mission Architectures ────────────────────────────── */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-16 px-4">
                    <motion.div 
                        whileHover={{ y: -20, scale: 1.02 }}
                        className="bg-white/[0.03] backdrop-blur-3xl p-16 sm:p-32 rounded-[6rem] text-white shadow-3xl space-y-12 relative overflow-hidden group border border-white/10 transition-all duration-1000"
                    >
                        <div className="absolute top-0 right-0 w-full h-1 bg-gold-gradient opacity-30 group-hover:opacity-100 transition-opacity" />
                        <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-accent ring-2 ring-white/10 group-hover:rotate-12 transition-all">
                            <Target className="w-12 h-12" />
                        </div>
                        <h2 className="text-5xl sm:text-7xl font-headline font-black italic tracking-tighter uppercase leading-none">The Mission</h2>
                        <p className="text-2xl text-white/40 font-bold leading-relaxed italic">
                            To curate a high-fidelity ecosystem where absolute transparency meets tactical innovation, enabling seamless transition into the world's most distinguished environments.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -20, scale: 1.02 }}
                        className="bg-[#D4AF37] p-16 sm:p-32 rounded-[6rem] text-[#071B3A] shadow-3xl space-y-12 relative overflow-hidden group transition-all duration-1000"
                    >
                        <div className="w-24 h-24 bg-[#071B3A]/10 rounded-[2.5rem] flex items-center justify-center text-[#071B3A] ring-2 ring-[#071B3A]/20 group-hover:-rotate-12 transition-all">
                            <Eye className="w-12 h-12" />
                        </div>
                        <h2 className="text-5xl sm:text-7xl font-headline font-black italic tracking-tighter uppercase leading-none">The Vision</h2>
                        <p className="text-2xl text-[#071B3A]/60 font-bold leading-relaxed italic">
                            To serve as the sovereign platform for global property intelligence, establishing the permanent gold standard for high-stakes real estate advisory and acquisitions.
                        </p>
                    </motion.div>
                </section>

                {/* ─ Institutional Objectives ───────────────────────────────────── */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-32 items-center px-4">
                    <div className="relative group">
                        <div className="absolute -inset-20 bg-accent/10 rounded-[6rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative rounded-[7rem] overflow-hidden shadow-3xl aspect-[4/5] border border-white/10 ring-4 ring-[#071B3A]">
                            <LazyImage 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                                alt="Modern Architecture" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3s]"
                            />
                            {/* Overlay Lens */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                    
                    <div className="space-y-24">
                        <div className="space-y-10">
                            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-accent flex items-center gap-6">
                                <div className="w-12 h-px bg-accent/40" />
                                Core Assets
                            </span>
                            <h2 className="text-6xl sm:text-8xl font-headline font-black text-white tracking-tighter leading-[0.9] italic uppercase">Strategic <br/><span className="text-gold-gradient normal-case font-display lowercase">Directives</span></h2>
                        </div>
                        
                        <div className="space-y-20">
                            {[
                                { title: 'Sovereign Validation', desc: 'Implementing a definitive 48-step security protocol for every asset in our imperial inventory.', icon: ShieldCheck },
                                { title: 'Predictive Intelligence', desc: 'Deploying high-frequency AI algorithms to master luxury micro-market oscillations.', icon: Zap },
                                { title: 'Strategic Stewardship', desc: 'Providing elite, end-to-end relocation and institutional advisory for global acquisitions.', icon: Heart }
                            ].map((v, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className="flex gap-12 group"
                                >
                                    <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-accent shadow-3xl group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-700 ring-2 ring-white/10 shrink-0">
                                        <v.icon className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-headline font-black text-3xl text-white tracking-tighter uppercase italic group-hover:text-accent transition-colors">{v.title}</h3>
                                        <p className="text-white/30 text-xl font-bold leading-relaxed italic">{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─ Imperial Metrics ────────────────────────────────── */}
                <section className="bg-white/5 backdrop-blur-3xl py-48 relative overflow-hidden border-y border-white/5">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <Building2 className="w-full h-full text-white" />
                    </div>
                    <div className="container-responsive grid grid-cols-2 lg:grid-cols-4 gap-24 relative z-10">
                        {milestones.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="text-center space-y-10"
                            >
                                <div className="w-24 h-24 bg-[#071B3A] rounded-[3rem] flex items-center justify-center mx-auto text-accent shadow-3xl ring-2 ring-white/10 group hover:ring-accent transition-all duration-700">
                                    <m.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="space-y-4">
                                    <div className="text-7xl sm:text-9xl font-headline font-black text-white tracking-tighter italic leading-none">{m.val}</div>
                                    <div className="text-[11px] font-black text-accent uppercase tracking-[0.5em]">{m.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ─ Elite Evolution ─────────────────────────────────── */}
                <section className="container-responsive py-48 space-y-48 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[500px] bg-accent/[0.02] blur-[200px] rounded-full pointer-events-none" />
                    
                    <div className="text-center space-y-10 relative z-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.6em] text-accent italic">The Trajectory</span>
                        <h2 className="text-7xl sm:text-[10rem] font-headline font-black text-white tracking-tighter italic uppercase leading-[0.8]">Strategic <br/><span className="text-gold-gradient font-display lowercase font-normal italic">Succession</span></h2>
                    </div>

                    <div className="max-w-6xl mx-auto relative px-8">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent -translate-x-1/2 hidden sm:block" />

                        <div className="space-y-48">
                            {[
                                { year: '2023', title: 'Conceptual Genesis', desc: 'Architecting the initial OPMS infrastructure with a singular focus on luxury micro-market intelligence.', icon: Rocket },
                                { year: '2024', title: 'Tactical Expansion', desc: 'Full-scale deployment of our proprietary validation protocol across the Central Indian demographic.', icon: ShieldCheck },
                                { year: '2025', title: 'Sovereign Integration', desc: 'Synchronizing with elite global networks to provide unparalleled access to international architectural assets.', icon: Sparkles }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`relative flex items-center justify-between gap-16 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 hidden sm:block ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <span className="text-[12rem] font-headline font-black text-white opacity-[0.03] tracking-tighter italic">{item.year}</span>
                                    </div>
                                    
                                    <div className="relative z-10 w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-[3.5rem] border border-white/10 flex items-center justify-center text-accent shadow-3xl ring-4 ring-[#071B3A]">
                                        <item.icon className="w-14 h-14" />
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center gap-6 sm:hidden">
                                            <span className="text-5xl font-headline font-black text-accent/20 italic">{item.year}</span>
                                        </div>
                                        <h3 className="text-4xl sm:text-5xl font-headline font-black text-white tracking-tighter italic uppercase leading-none">{item.title}</h3>
                                        <p className="text-white/30 text-2xl font-bold leading-relaxed italic">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─ Master Council ──────────────────────────────────── */}
                <section className="container-responsive py-48 space-y-32">
                    <div className="text-center space-y-10">
                        <span className="text-[11px] font-black uppercase tracking-[0.6em] text-accent italic">The Council</span>
                        <h2 className="text-7xl sm:text-[10rem] font-headline font-black text-white tracking-tighter italic uppercase leading-[0.8]">Master <br/><span className="text-gold-gradient font-display lowercase font-normal italic">Architects</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        {[
                            { name: 'Vikramaditya Singh', role: 'Chancellor & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
                            { name: 'Ananya Iyer', role: 'Principal Architect', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
                            { name: 'Rohan Khanna', role: 'Strategic Operations', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className="group space-y-10"
                            >
                                <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden shadow-3xl border border-white/10 bg-white/5 ring-4 ring-[#071B3A]">
                                    <LazyImage 
                                        src={member.image} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" 
                                        alt={member.name} 
                                    />
                                    {/* Imperial Card Decor */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071B3A] to-transparent opacity-80" />
                                    <div className="absolute bottom-10 inset-x-10 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
                                </div>
                                <div className="text-center space-y-4">
                                    <h3 className="text-4xl font-headline font-black text-white tracking-tighter italic uppercase group-hover:text-accent transition-colors">{member.name}</h3>
                                    <p className="text-[12px] font-black text-accent uppercase tracking-[0.5em] opacity-60 italic">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
