import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, MapPin, Star, Award, ShieldCheck, ChevronRight, Filter, Users2, MessageCircle, Building2, Mail, Phone, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SkeletonCard } from '../components/Skeleton';
import LazyImage from '../components/LazyImage';

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
                {/* ─ Elite Advisory Hero ───────────────────────────────────── */}
                <section className="container-responsive py-24 text-center space-y-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 px-8 py-3 bg-accent/10 border border-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl"
                    >
                        <Award className="w-5 h-5" />
                        Imperial Trust Network
                    </motion.div>
                    
                    <div className="space-y-8">
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="font-headline font-black text-6xl sm:text-8xl md:text-[10rem] tracking-tighter leading-tight sm:leading-[0.8] uppercase italic"
                        >
                            Curators of <br />
                            <span className="font-display italic text-gold-gradient normal-case tracking-normal block -mt-4">Succession</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-white/40 font-medium text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed"
                        >
                            Navigating the complexities of high-value acquisitions with unparalleled discretion and expertise.
                        </motion.p>
                    </div>

                    {/* Master Search Hub */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto w-full bg-white/5 backdrop-blur-3xl p-3 rounded-[3rem] border border-white/10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] flex items-center group focus-within:ring-2 ring-accent/30 transition-all"
                    >
                        <div className="flex-1 flex items-center px-10">
                            <Search className="w-7 h-7 text-accent mr-6" />
                            <input 
                                type="text" 
                                placeholder="Search by name, expertise, or metropolitan sector..."
                                className="bg-transparent border-none focus:ring-0 w-full text-lg font-bold text-white placeholder:text-white/20 outline-none italic"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="bg-gold-gradient text-primary p-6 rounded-[2rem] shadow-2xl hover:rotate-90 transition-all duration-700">
                            <Filter className="w-6 h-6" />
                        </button>
                    </motion.div>
                </section>

                {/* ─ Master Advisor Portfolio ──────────────────────────────── */}
                <section className="container-responsive pb-48">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-[4rem]" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
                            {filteredAgents.map((agent, i) => (
                                <motion.div 
                                    key={agent._id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    onClick={() => navigate(`/agent/${agent._id}`)}
                                    className="group relative bg-[#0A254D] border border-white/5 rounded-[5rem] p-12 flex flex-col items-center text-center space-y-12 hover:border-accent/40 transition-all duration-1000 cursor-pointer overflow-hidden shadow-2xl"
                                >
                                    {/* Abstract Texture */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
                                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors" />

                                    {/* Professional Visual Domain */}
                                    <div className="relative">
                                        <div className="w-48 h-48 rounded-[4rem] border border-white/10 p-2.5 bg-white/5 shadow-3xl group-hover:scale-105 transition-transform duration-1000 ring-2 ring-accent/0 group-hover:ring-accent/20">
                                            <LazyImage 
                                                src={agent.profileImage || `https://ui-avatars.com/api/?name=${agent.name}&background=071B3A&color=D4AF37&size=200`} 
                                                className="w-full h-full object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl" 
                                                alt={agent.name} 
                                            />
                                        </div>
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary border border-white/10 px-6 py-2.5 rounded-2xl shadow-3xl flex items-center gap-3">
                                            <ShieldCheck className="w-5 h-5 text-accent" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Verified Advisor</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <h3 className="font-headline font-black text-4xl text-white leading-tight tracking-tighter uppercase italic group-hover:text-accent transition-all">{agent.name}</h3>
                                        <div className="flex items-center justify-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={`w-4 h-4 ${star <= (agent.rating || 5) ? 'text-accent fill-accent' : 'text-white/5'}`} />
                                            ))}
                                            <span className="text-[10px] font-black text-white/20 ml-3 uppercase tracking-widest">Master Category I</span>
                                        </div>
                                    </div>

                                    {/* Operational Performance */}
                                    <div className="grid grid-cols-2 w-full gap-10 py-10 border-y border-white/10">
                                         <div className="text-center space-y-2">
                                             <p className="font-headline font-black text-4xl text-white tracking-tighter uppercase italic">{agent.experience || 5}<span className="text-gold-gradient text-xl not-italic ml-1">+</span></p>
                                             <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em]">Tenure (Years)</p>
                                         </div>
                                         <div className="text-center space-y-2 border-l border-white/10">
                                             <p className="font-headline font-black text-4xl text-white tracking-tighter uppercase italic">{agent.listedCount || 12}</p>
                                             <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.3em]">Managed Assets</p>
                                         </div>
                                    </div>

                                    {/* Secure Links */}
                                    <div className="grid grid-cols-2 gap-6 w-full pt-4">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${agent.phoneNumber}` }}
                                            className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-700 shadow-2xl"
                                        >
                                            <Phone className="w-6 h-6" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${agent.email}` }}
                                            className="bg-gold-gradient text-primary p-6 rounded-[2rem] flex items-center justify-center shadow-[0_16px_32px_-12px_rgba(212,175,55,0.4)] hover:shadow-accent/60 transition-all duration-700"
                                        >
                                            <Mail className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <motion.div 
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 text-accent text-[10px] font-black uppercase tracking-[0.4em] transition-all pt-4"
                                    >
                                        Enter Private Portfolio
                                        <ArrowUpRight className="w-5 h-5" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ─ Imperial Partnership Banner ─────────────────────────── */}
                <section className="container-responsive pb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="bg-gold-gradient p-20 sm:p-40 rounded-[6rem] text-center space-y-12 relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(212,175,55,0.3)]"
                    >
                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
                        <div className="relative z-10 space-y-10">
                            <h2 className="font-headline font-black text-6xl sm:text-9xl text-primary tracking-tighter leading-[0.8] uppercase italic">
                                Syndicate <br /> 
                                <span className="font-display italic lowercase tracking-normal">with excellence</span>
                            </h2>
                            <p className="text-primary/70 font-black text-lg max-w-2xl mx-auto uppercase tracking-widest text-[11px] leading-relaxed">
                                Are you a distinguished real estate professional with a track record of high-stakes acquisitions? <br /> Apply to join our inner circle of master consultants.
                            </p>
                            <button className="bg-primary text-white px-20 py-8 rounded-full font-black uppercase tracking-[0.4em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-3xl">Strategic Partnership Application</button>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
