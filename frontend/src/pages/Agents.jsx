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

            <main className="pt-24 sm:pt-32 pb-40">
                {/* Agent Advisory Hero */}
                <section className="container-responsive pt-16 pb-20 text-center space-y-12 px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 text-accent rounded-full text-[11px] font-bold uppercase tracking-widest shadow-xl"
                    >
                        <Award className="w-4 h-4" />
                        Certified Agent Network
                    </motion.div>
                    
                    <div className="space-y-6">
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hero-heading text-white tracking-tighter"
                        >
                            Expert <br />
                            <span className="text-gold-gradient block lg:inline-block italic">Advisors</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="body-text text-xl max-w-2xl mx-auto opacity-60"
                        >
                            Our team of certified professionals provides unparalleled expertise and local market knowledge for every transaction.
                        </motion.p>
                    </div>

                    {/* Agent Search Hub */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto w-full bg-white/5 backdrop-blur-3xl p-3 rounded-[3rem] border border-white/10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] flex items-center group focus-within:ring-2 ring-accent/30 transition-all"
                    >
                        <div className="flex-1 flex items-center px-4 sm:px-10">
                            <Search className="w-6 h-6 sm:w-7 sm:h-7 text-accent mr-4 sm:mr-6" />
                            <input 
                                type="text" 
                                placeholder="Search by name, area, or expertise..."
                                className="bg-transparent border-none focus:ring-0 w-full text-base sm:text-lg font-bold text-white placeholder:text-white/20 outline-none italic"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="bg-gold-gradient text-primary p-5 sm:p-6 rounded-[2rem] shadow-2xl hover:rotate-90 transition-all duration-700">
                            <Filter className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </motion.div>
                </section>

                {/* Expert Advisor Grid */}
                <section className="container-responsive pb-48 px-4">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-[3rem]" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
                            {filteredAgents.map((agent, i) => (
                                <motion.div 
                                    key={agent._id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                                    onClick={() => navigate(`/agent/${agent._id}`)}
                                    className="group relative bg-[#0A254D] border border-white/5 rounded-[4rem] p-10 flex flex-col items-center text-center space-y-10 hover:border-accent/40 transition-all duration-700 cursor-pointer overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute top-0 right-0 w-full h-1 bg-gold-gradient opacity-20" />
                                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors" />

                                    {/* Professional Agent Portrait */}
                                    <div className="relative">
                                        <div className="w-40 h-40 rounded-[2.5rem] border border-white/10 p-2.5 bg-white/5 shadow-3xl group-hover:scale-105 transition-transform duration-700">
                                            <LazyImage 
                                                src={agent.profileImage || `https://ui-avatars.com/api/?name=${agent.name}&background=071B3A&color=D4AF37&size=200`} 
                                                className="w-full h-full object-cover rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" 
                                                alt={agent.name} 
                                            />
                                        </div>
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#071B3A] border border-white/10 px-6 py-2 rounded-2xl shadow-3xl flex items-center gap-3">
                                            <ShieldCheck className="w-4 h-4 text-accent" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white whitespace-nowrap">Certified Agent</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4">
                                        <h3 className="text-3xl font-headline font-bold text-white tracking-tighter uppercase italic group-hover:text-gold-gradient transition-all">{agent.name}</h3>
                                        <div className="flex items-center justify-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={`w-3 h-3 ${star <= (agent.rating || 5) ? 'text-accent fill-accent' : 'text-white/5'}`} />
                                            ))}
                                            <span className="text-[8px] font-bold text-white/40 ml-3 uppercase tracking-widest">Industry Expert</span>
                                        </div>
                                    </div>

                                    {/* Professional Impact Metrics */}
                                    <div className="grid grid-cols-2 w-full gap-8 py-8 border-y border-white/10">
                                         <div className="text-center space-y-1">
                                             <p className="text-3xl font-headline font-bold text-white tracking-tighter uppercase italic leading-none">{agent.experience || 5}<span className="text-gold-gradient text-lg not-italic ml-0.5">+</span></p>
                                             <p className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Exp. Years</p>
                                         </div>
                                         <div className="text-center space-y-1 border-l border-white/10">
                                             <p className="text-3xl font-headline font-bold text-white tracking-tighter uppercase italic leading-none">{agent.listedCount || 12}</p>
                                             <p className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Properties</p>
                                         </div>
                                    </div>

                                    {/* Action Connect Points */}
                                    <div className="grid grid-cols-2 gap-4 w-full pt-4">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${agent.phoneNumber}` }}
                                            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500"
                                        >
                                            <Phone className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${agent.email}` }}
                                            className="bg-gold-gradient text-primary p-5 rounded-2xl flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-500"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <motion.div 
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-3 text-accent text-[10px] font-bold uppercase tracking-widest transition-all pt-4"
                                    >
                                        View Agent Profile
                                        <ArrowUpRight className="w-5 h-5" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Professional Agent Partnership Banner */}
                <section className="container-responsive pb-24 px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-gold-gradient p-12 sm:p-24 rounded-[4rem] text-center space-y-12 relative overflow-hidden shadow-3xl text-primary"
                    >
                        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px]" />
                        <div className="relative z-10 space-y-10">
                            <h2 className="text-5xl sm:text-8xl font-headline font-bold tracking-tighter leading-[0.9] uppercase italic">
                                Partner <br /> 
                                <span className="block lg:inline-block">With Excellence</span>
                            </h2>
                            <p className="text-primary/70 font-bold text-base sm:text-lg max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                                Are you a professional real estate agent looking to grow your portfolio? Join our team of experts and access exclusive property listings.
                            </p>
                            <button 
                                onClick={() => navigate('/contact')}
                                className="bg-primary text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 active:scale-95 transition-all shadow-3xl"
                            >
                                Apply to Join Our Team
                            </button>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
