import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { 
    Target, Eye, Award, Users, 
    Verified, ShieldCheck, Heart, Sparkles,
    Zap, Rocket, Star, Fingerprint
} from 'lucide-react';

export default function About() {
    const values = [
        { title: 'Authenticity', desc: 'Every listing on our platform is verified through a 48-step security audit for 100% transparency.', icon: Fingerprint, color: 'text-primary' },
        { title: 'Innovation', desc: 'We leverage AI-driven valuation models and virtual 3D tours to redefine the browsing experience.', icon: Zap, color: 'text-secondary' },
        { title: 'Custodianship', desc: 'Our agents serve as stewards of your dreams, ensuring institutional-grade legal compliance.', icon: ShieldCheck, color: 'text-green-500' }
    ];

    const milestones = [
        { label: 'Asset Volume', val: '$2.5B+', icon: Star },
        { label: 'Secure Closures', val: '1.8k+', icon: ShieldCheck },
        { label: 'Metros Covered', val: '12', icon: Globe },
        { label: 'Elite Advisors', val: '85+', icon: Users }
    ];

    return (
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen overflow-x-hidden">
            <Navbar />
            
            <main className="pt-32 pb-40 space-y-32">
                {/* Hero Genesis */}
                <section className="container-responsive text-center space-y-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                            <Sparkles className="w-3 h-3" />
                            Our Genesis
                        </span>
                        <h1 className="text-5xl sm:text-8xl md:text-9xl font-black text-primary dark:text-white leading-[0.8] tracking-tighter italic">
                            Redefining <br />
                            <span className="text-secondary">Excellence</span>
                        </h1>
                    </motion.div>
                    <p className="text-on-surface-variant dark:text-white/40 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
                        Online Property Management System (OPMS) emerged in 2012 as a response to the fragmented luxury real estate market in Central India.
                    </p>
                </section>

                {/* Mission & Vision Matrix */}
                <section className="container-responsive grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-primary dark:bg-dark-surface-variant p-12 sm:p-16 rounded-[4rem] text-white shadow-2xl space-y-8 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
                        <Target className="w-12 h-12 text-secondary" />
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase">Our Mission</h2>
                        <p className="text-xl text-white/70 font-medium leading-relaxed">
                            To democratize access to premium living spaces through a transparent, technology-first ecosystem that eliminates the friction of traditional property management.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-dark-surface-variant p-12 sm:p-16 rounded-[4rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-2xl space-y-8 relative overflow-hidden group"
                    >
                        <Eye className="w-12 h-12 text-secondary" />
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-primary dark:text-white">Our Vision</h2>
                        <p className="text-xl text-on-surface-variant dark:text-white/40 font-medium leading-relaxed">
                            To become the global gold standard for automated property intelligence, connecting sophisticated investors with the world's most sought-after architectural marvels.
                        </p>
                    </motion.div>
                </section>

                {/* Values Architecture */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-4">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-[4rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
                        <div className="relative rounded-[4rem] overflow-hidden shadow-3xl aspect-[4/5] sm:aspect-video lg:aspect-square">
                            <img 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&fit=crop" 
                                alt="Modern Architecture" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl sm:text-6xl font-black text-primary dark:text-white tracking-tighter leading-none italic">Strategic <br/><span className="text-secondary">Objectives</span></h2>
                            <div className="w-20 h-1 bg-secondary rounded-full" />
                        </div>
                        
                        <div className="space-y-10">
                            {[
                                { title: 'Market Supremacy', desc: 'Secure 60% of the luxury property inventory across Central India by Q4 2026.', icon: Rocket },
                                { title: 'User Empowerment', desc: 'Deploy proprietary risk-assessment tools for individual buyers by Q2 2027.', icon: Target },
                                { title: 'Zero Friction', desc: 'Automate 100% of the legal documentation workflow through decentralized ledgers.', icon: ShieldCheck }
                            ].map((v, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex gap-8 group"
                                >
                                    <div className="w-16 h-16 bg-white dark:bg-dark-surface-variant rounded-3xl flex items-center justify-center text-primary dark:text-white shadow-xl group-hover:bg-primary group-hover:text-white transition-all ring-1 ring-surface-variant dark:ring-dark-surface-variant/20 shrink-0">
                                        <v.icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-black text-2xl text-primary dark:text-white tracking-tight uppercase italic">{v.title}</h3>
                                        <p className="text-on-surface-variant dark:text-white/40 font-bold leading-relaxed">{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Exponential Metrics */}
                <section className="bg-primary dark:bg-dark-surface-variant py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <div className="container-responsive grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {milestones.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-secondary ring-1 ring-white/20">
                                    <m.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-5xl sm:text-7xl font-black text-white tracking-tighter italic">{m.val}</div>
                                    <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{m.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Evolution Timeline */}
                <section className="container-responsive py-24 space-y-20">
                    <div className="text-center space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Our Evolution</span>
                        <h2 className="text-4xl sm:text-6xl font-black text-primary dark:text-white tracking-tighter italic uppercase">Timeline</h2>
                    </div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 hidden sm:block" />

                        <div className="space-y-16">
                            {[
                                { year: '2025', title: 'Project Started', desc: 'Conceptualization of the Central India Property Management Hub.', icon: Rocket },
                                { year: '2025', title: 'Database Integration', desc: 'Full migration to MongoDB Atlas with synchronized distributed clusters.', icon: ShieldCheck },
                                { year: '2026', title: 'Platform Launch', desc: 'Public release of the OPMS v2.0 premium ecosystem.', icon: Sparkles }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className={`relative flex items-center justify-between gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 hidden sm:block ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <span className="text-6xl font-black text-primary/5 dark:text-white/5 tracking-tighter">{item.year}</span>
                                    </div>
                                    
                                    <div className="relative z-10 w-16 h-16 bg-white dark:bg-dark-surface-variant rounded-full border-4 border-primary/10 flex items-center justify-center text-primary dark:text-white shadow-2xl">
                                        <item.icon className="w-8 h-8" />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-4 sm:hidden">
                                            <span className="text-3xl font-black text-secondary/30">{item.year}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight italic uppercase">{item.title}</h3>
                                        <p className="text-on-surface-variant dark:text-white/40 font-bold">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="container-responsive py-24 space-y-20">
                    <div className="text-center space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">The Architects</span>
                        <h2 className="text-4xl sm:text-6xl font-black text-primary dark:text-white tracking-tighter italic uppercase">Meet Our Team</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: 'Vikramaditya Singh', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop' },
                            { name: 'Ananya Iyer', role: 'Chief Tech Architect', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop' },
                            { name: 'Rohan Khanna', role: 'Lead Strategy Officer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&fit=crop' }
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group space-y-6"
                            >
                                <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl bg-primary/5">
                                    <img 
                                        src={member.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                                        alt={member.name} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                                        <div className="w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </div>
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight italic uppercase">{member.name}</h3>
                                    <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{member.role}</p>
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

function Globe(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}
