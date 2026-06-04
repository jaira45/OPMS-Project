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
            
            <main className="pt-24 sm:pt-32 pb-0 space-y-24 sm:space-y-32 px-4">
                {/* Hero Section */}
                <section className="container-responsive text-center space-y-12 relative py-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="space-y-10 relative z-10"
                    >
                        <span className="inline-flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest italic">
                            <Building2 className="w-4 h-4" />
                            Founded in 2025
                        </span>
                        <h1 className="text-6xl sm:text-8xl md:text-9xl font-headline font-bold text-white tracking-widest leading-[0.9] uppercase italic">
                            Real Estate <br />
                            <span className="text-gold-gradient block lg:inline-block">Excellence</span>
                        </h1>
                    </motion.div>
                    <p className="text-white/50 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium italic px-4">
                        OPMS is a premium real estate platform dedicated to providing the finest property listings and expert advisory services in Central India.
                    </p>
                </section>

                {/* Mission & Vision */}
                <section className="container-responsive grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white/[0.03] backdrop-blur-3xl p-10 sm:p-16 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden group border border-white/10 transition-all duration-500"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient opacity-20" />
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-accent ring-2 ring-white/10 group-hover:rotate-6 transition-all">
                            <Target className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-headline font-bold italic tracking-tight uppercase leading-none">Our Mission</h2>
                        <p className="text-base sm:text-lg text-white/40 font-bold leading-relaxed">
                            To create a transparent and modern real estate ecosystem that empowers clients with direct access to quality properties and certified professional advisors.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-gold-gradient p-10 sm:p-16 rounded-[3rem] text-[#071B3A] shadow-2xl space-y-8 relative overflow-hidden group transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-[#071B3A]/10 rounded-2xl flex items-center justify-center text-[#071B3A] ring-2 ring-[#071B3A]/20 group-hover:-rotate-6 transition-all">
                            <Eye className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-headline font-bold italic tracking-tight uppercase leading-none">Our Vision</h2>
                        <p className="text-base sm:text-lg text-[#071B3A]/60 font-bold leading-relaxed">
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
