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
        { label: 'Assets Managed', val: '₹ 20B+', icon: Star },
        { label: 'Completed Sales', val: '1.2k+', icon: ShieldCheck },
        { label: 'Active Listings', val: '450+', icon: Globe },
        { label: 'Expert Agents', val: '85+', icon: Users }
    ];

    return (
        <div className="bg-[#071B3A] text-white min-h-screen overflow-x-hidden">
            <Navbar />
            
            <main className="pt-32 pb-0">
                {/* Hero Section */}
                <section className="container-responsive text-center space-y-16 relative py-32 section-padding px-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-accent/[0.03] blur-[180px] rounded-full pointer-events-none" />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-12 relative z-10"
                    >
                        <div className="inline-flex items-center gap-4 px-10 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 text-accent rounded-full text-[12px] font-bold uppercase tracking-[0.4em] italic shadow-2xl">
                            <Building2 className="w-5 h-5" />
                            Established 2025
                        </div>
                        <h1 className="hero-heading text-white tracking-tighter leading-[0.85]">
                            Real Estate <br />
                            <span className="text-gold-gradient block lg:inline-block">Excellence</span>
                        </h1>
                    </motion.div>
                    <p className="body-text text-xl sm:text-2xl max-w-4xl mx-auto italic px-6 opacity-60">
                        OPMS is a premier real estate platform dedicated to providing the finest property listings and expert advisory services in Central India.
                    </p>
                </section>

                {/* Mission & Vision — Expansive Focal Points */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-16 section-padding px-6">
                    <motion.div 
                        whileHover={{ y: -15 }}
                        className="bg-white/[0.02] backdrop-blur-3xl p-16 sm:p-24 rounded-[4rem] text-white shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] space-y-12 relative overflow-hidden group border border-white/5 transition-all duration-700"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gold-gradient opacity-20" />
                        <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-accent ring-1 ring-white/10 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                            <Target className="w-12 h-12" />
                        </div>
                        <h2 className="section-heading italic leading-none">Our Mission</h2>
                        <p className="body-text text-xl sm:text-2xl font-medium leading-relaxed opacity-40 group-hover:opacity-60 transition-opacity">
                            To create a transparent and modern real estate ecosystem that empowers clients with direct access to quality properties and certified professional advisors.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -15 }}
                        className="bg-gold-gradient p-16 sm:p-24 rounded-[4rem] text-[#071B3A] shadow-3xl space-y-12 relative overflow-hidden group transition-all duration-700"
                    >
                        <div className="w-24 h-24 bg-[#071B3A]/5 rounded-[2rem] flex items-center justify-center text-[#071B3A] ring-1 ring-[#071B3A]/10 group-hover:-rotate-12 transition-all duration-700 shadow-2xl">
                            <Eye className="w-12 h-12" />
                        </div>
                        <h2 className="section-heading italic leading-none">Our Vision</h2>
                        <p className="text-[#071B3A]/60 text-xl sm:text-2xl font-bold leading-relaxed tracking-tight">
                            To become the definitive standard for high-end real estate service, defined by integrity, innovation, and exceptional customer results.
                        </p>
                    </motion.div>
                </section>

                {/* Focus Areas */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center pt-16">
                    <div className="relative group">
                        <div className="absolute -inset-10 bg-accent/10 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] border border-white/10">
                            <LazyImage 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                                alt="Modern Architecture" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                    
                    <div className="space-y-12 sm:space-y-16">
                        <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-widest text-accent flex items-center gap-4 font-bold">
                                <div className="w-8 h-px bg-accent/40" />
                                Our Focus
                            </span>
                            <h2 className="text-5xl sm:text-7xl font-headline font-bold text-white tracking-widest leading-[0.9] italic uppercase">Core <br/><span className="text-gold-gradient block lg:inline-block">Values</span></h2>
                        </div>
                        
                        <div className="space-y-10 sm:space-y-12">
                            {[
                                { title: 'Trusted Verification', desc: 'Every property on our platform undergoes a rigorous inspection process to ensure quality and documentation accuracy.', icon: ShieldCheck },
                                { title: 'Market Expertise', desc: 'We utilize deep market analysis to provide the most competitive property valuations for our clients.', icon: Zap },
                                { title: 'Client Support', desc: 'Providing dedicated support services for a smooth property search and acquisition experience.', icon: Heart }
                            ].map((v, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                    className="flex gap-6 sm:gap-8 group"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl flex items-center justify-center text-accent shadow-xl group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-500 shrink-0">
                                        <v.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-2xl font-bold text-white tracking-tight uppercase italic group-hover:text-accent transition-colors">{v.title}</h3>
                                        <p className="text-white/30 text-base sm:text-lg font-medium leading-relaxed">{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Metrics */}
                <section className="bg-white/[0.02] backdrop-blur-3xl py-24 sm:py-32 relative overflow-hidden border-y border-white/5 sm:rounded-[4rem]">
                    <div className="container-responsive grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 relative z-10">
                        {milestones.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="text-center space-y-6 sm:space-y-8"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#071B3A] rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto text-accent shadow-xl ring-2 ring-white/10 group hover:ring-accent transition-all">
                                    <m.icon className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <div className="text-4xl sm:text-6xl lg:text-7xl font-headline font-bold text-white tracking-tighter italic leading-none">{m.val}</div>
                                    <div className="text-[9px] sm:text-[10px] text-accent uppercase tracking-widest font-bold">{m.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Roadmap / Journey */}
                <section className="container-responsive py-32 space-y-24 sm:space-y-32 relative">
                    <div className="text-center space-y-6">
                        <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Our Journey</span>
                        <h2 className="text-5xl sm:text-7xl font-headline font-bold text-white tracking-widest leading-[0.9] italic uppercase">Strategic <br/><span className="text-gold-gradient block">Growth</span></h2>
                    </div>

                    <div className="max-w-5xl mx-auto relative px-4">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent -translate-x-1/2 hidden sm:block" />

                        <div className="space-y-24 sm:space-y-32">
                            {[
                                { year: '2023', title: 'Foundation', desc: 'Developing the initial framework with a focus on real estate market expertise and verification.', icon: Rocket },
                                { year: '2024', title: 'Market Launch', desc: 'Launching our verified listing platform across the regional Central Indian markets.', icon: ShieldCheck },
                                { year: '2025', title: 'Expansion', desc: 'Expanding our network and established property partnerships globally.', icon: Sparkles }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`relative flex items-center justify-between gap-12 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 hidden sm:block ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <span className="text-7xl lg:text-9xl font-headline font-bold text-white opacity-[0.03] tracking-tighter italic">{item.year}</span>
                                    </div>
                                    
                                    <div className="relative z-10 w-20 h-20 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 flex items-center justify-center text-accent shadow-xl ring-4 ring-[#071B3A]">
                                        <item.icon className="w-8 h-8" />
                                    </div>

                                    <div className="flex-1 space-y-2 sm:space-y-4">
                                        <div className="flex items-center gap-4 sm:hidden">
                                            <span className="text-3xl font-headline font-bold text-accent/20 italic">{item.year}</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight italic uppercase leading-none">{item.title}</h3>
                                        <p className="text-white/30 text-lg sm:text-xl font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Expert Leadership */}
                <section className="container-responsive py-32 space-y-24">
                    <div className="text-center space-y-6">
                        <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Our Team</span>
                        <h2 className="text-5xl sm:text-7xl font-headline font-bold text-white tracking-widest leading-[0.9] italic uppercase">Expert <br/><span className="text-gold-gradient block">Leadership</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
                        {[
                            { name: 'Vikramaditya Singh', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
                            { name: 'Ananya Iyer', role: 'Director of Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
                            { name: 'Rohan Khanna', role: 'Operations Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="group space-y-8"
                            >
                                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                                    <LazyImage 
                                        src={member.image} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" 
                                        alt={member.name} 
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071B3A] to-transparent opacity-80" />
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase italic group-hover:text-accent transition-colors">{member.name}</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-accent opacity-60 font-bold">{member.role}</p>
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
