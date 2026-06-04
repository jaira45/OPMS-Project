import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, MapPin, Star, Award, ShieldCheck, ChevronRight, Filter, Users2, Sparkles, MessageCircle, Building2, Mail, Phone, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SkeletonCard } from '../components/Skeleton';

export default function Agents() {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users`);
            if (res.ok) {
                const data = await res.json();
                // Filter agents - common logic across the app
                setAgents(data.users.filter(u => u.role === 'agent' || u.email.includes('agent') || u.email === 'admin@opms.com'));
            }
        } catch (err) {
            console.error('Error fetching agents:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredAgents = agents.filter(agent => 
        (agent.name || agent.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (agent.location || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#071B3A] text-white min-h-screen">
            <Navbar />

            <main className="pt-32 pb-40">
                {/* ─ Hero Section ───────────────────────────────────────────── */}
                <section className="container-responsive py-24 text-center space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-accent/10 border border-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg"
                    >
                        <Award className="w-4 h-4" />
                        Elite Partner Network
                    </motion.div>
                    
                    <div className="space-y-6">
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="font-headline font-black text-6xl sm:text-9xl tracking-tighter leading-[0.85] uppercase"
                        >
                            Masters of <br />
                            <span className="font-display italic text-gold-gradient lowercase tracking-normal">Acquisition</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/40 font-medium text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            Connect with Central India's most distinguished consultants. <br />
                            Architects of high-value real estate experiences.
                        </motion.p>
                    </div>

                    {/* Search & Intelligence Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-3xl mx-auto w-full bg-white/5 backdrop-blur-3xl p-2 rounded-full border border-white/10 shadow-2xl flex items-center"
                    >
                        <div className="flex-1 flex items-center px-8">
                            <Search className="w-5 h-5 text-accent mr-4" />
                            <input 
                                type="text" 
                                placeholder="Consultant name or operational sector..."
                                className="bg-transparent border-none focus:ring-0 w-full text-sm font-bold text-white placeholder:text-white/20 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="bg-gold-gradient text-primary p-4 rounded-full shadow-xl hover:scale-105 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </motion.div>
                </section>

                {/* ─ Agents Grid ────────────────────────────────────────────── */}
                <section className="container-responsive pb-40">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse rounded-[4rem]" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
                            {filteredAgents.map((agent, i) => (
                                <motion.div 
                                    key={agent._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    onClick={() => navigate(`/agent/${agent._id}`)}
                                    className="group relative bg-[#0A254D] border border-white/5 rounded-[4rem] p-12 flex flex-col items-center text-center space-y-10 hover:border-accent/40 transition-all duration-700 cursor-pointer overflow-hidden"
                                >
                                    {/* Geometric Background Element */}
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-colors" />

                                    {/* Profile Visual */}
                                    <div className="relative">
                                        <div className="w-40 h-40 rounded-[3rem] border-2 border-accent/20 p-2 group-hover:scale-105 transition-transform duration-700">
                                            <img 
                                                src={agent.profileImage || `https://ui-avatars.com/api/?name=${agent.name}&background=071B3A&color=D4AF37&size=200`} 
                                                className="w-full h-full object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" 
                                                alt={agent.name} 
                                            />
                                        </div>
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#071B3A] border border-white/10 px-4 py-1.5 rounded-xl shadow-2xl flex items-center gap-2">
                                            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Verified</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-headline font-black text-3xl text-white leading-tight tracking-tight uppercase group-hover:text-gold-gradient transition-all">{agent.name}</h3>
                                        <div className="flex items-center justify-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={`w-3 h-3 ${star <= (agent.rating || 5) ? 'text-accent fill-accent' : 'text-white/10'}`} />
                                            ))}
                                            <span className="text-[10px] font-black text-white/30 ml-2 uppercase tracking-wide">Elite Grade</span>
                                        </div>
                                    </div>

                                    {/* Stats Dashboard */}
                                    <div className="grid grid-cols-2 w-full gap-8 py-8 border-y border-white/5">
                                         <div className="text-center space-y-1">
                                             <p className="font-headline font-black text-3xl text-white tracking-widest">{agent.experience || 5}<span className="text-accent text-sm">+</span></p>
                                             <p className="text-[8px] font-black uppercase text-white/30 tracking-[0.2em]">Years Exp.</p>
                                         </div>
                                         <div className="text-center space-y-1 border-l border-white/10">
                                             <p className="font-headline font-black text-3xl text-white tracking-widest">{agent.listedCount || 12}</p>
                                             <p className="text-[8px] font-black uppercase text-white/30 tracking-[0.2em]">Portfolio Items</p>
                                         </div>
                                    </div>

                                    {/* Contact Actions */}
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${agent.phoneNumber}` }}
                                            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500"
                                        >
                                            <Phone className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${agent.email}` }}
                                            className="bg-gold-gradient text-primary p-5 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-accent/40 transition-all duration-500"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <motion.div 
                                        whileHover={{ y: -5 }}
                                        className="flex items-center gap-3 text-accent text-[9px] font-black uppercase tracking-[0.3em] transition-colors"
                                    >
                                        Examine Profile
                                        <ArrowUpRight className="w-4 h-4" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ─ CTA Banner ───────────────────────────────────────────── */}
                <section className="container-responsive">
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gold-gradient p-16 sm:p-32 rounded-[5rem] text-center space-y-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[#071B3A]/10 backdrop-blur-[1px]" />
                        <div className="relative z-10 space-y-8">
                            <h2 className="font-headline font-black text-5xl sm:text-8xl text-primary tracking-tighter leading-none uppercase">
                                Affiliate <br /> 
                                <span className="italic font-display lowercase tracking-normal">With Excellence</span>
                            </h2>
                            <p className="text-primary/70 font-black text-lg max-w-xl mx-auto uppercase tracking-widest text-[11px]">Are you a distinguished real estate professional? <br /> Join our circle of elite acquisition masters.</p>
                            <button className="bg-primary text-white px-16 py-7 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl">Partner Application</button>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
