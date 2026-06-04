import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, Mail, Phone, MapPin, Award, ShieldCheck, 
    Globe, ArrowLeft, Star, 
    CheckCircle, TrendingUp, Building2, Briefcase
} from 'lucide-react';
import { SkeletonProfile } from '../components/Skeleton';

export default function AgentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { darkMode } = useTheme();
    const [agent, setAgent] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgentData();
    }, [id]);

    const fetchAgentData = async () => {
        try {
            const userRes = await fetch(`${API_URL}/api/users`);
            if (userRes.ok) {
                const userData = await userRes.json();
                const foundAgent = userData.users.find(u => u._id === id);
                if (foundAgent) {
                    setAgent(foundAgent);
                    const propRes = await fetch(`${API_URL}/api/properties`);
                    if (propRes.ok) {
                        const propData = await propRes.json();
                        setProperties(propData.properties.filter(p => p.owner === id || p.location.includes(foundAgent.location || '')));
                    }
                } else {
                    navigate('/home');
                }
            }
        } catch (err) {
            console.error('Agent Load Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="bg-[#071B3A] min-h-screen">
            <Navbar />
            <div className="pt-24 sm:pt-32 container-responsive pb-40 px-4">
                <SkeletonProfile />
            </div>
            <BottomNav />
        </div>
    );
    
    if (!agent) return null;

    return (
        <div className="bg-[#071B3A] text-white min-h-screen pb-32">
            <Navbar />

            <main className="pt-24 sm:pt-32 container-responsive px-4">
                {/* Header Section */}
                <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] text-white/40 mb-10 group"
                >
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Agent Directory
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    {/* Left: Identity Card */}
                    <aside className="lg:col-span-4 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0A254D] border border-white/5 rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 text-center space-y-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient opacity-30" />
                            
                            <div className="relative mx-auto w-fit">
                                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-[2rem] sm:rounded-[3rem] border-4 sm:border-8 border-white/5 p-2 overflow-hidden shadow-2xl group transition-transform duration-700">
                                    <img src={agent.profileImage || `https://ui-avatars.com/api/?name=${agent.fullName || agent.name}&background=071B3A&color=D4AF37&size=200`} className="w-full h-full object-cover rounded-[1.5rem] sm:rounded-[2.5rem]" alt="" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-accent text-primary px-4 py-1.5 rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-widest shadow-xl border-4 border-[#0A254D]">
                                    Top Rated
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h1 className="font-headline font-bold text-3xl sm:text-4xl text-white tracking-tighter uppercase italic">{agent.fullName || agent.name}</h1>
                                <p className="text-accent font-bold text-[9px] sm:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-accent/60" />
                                    Certified Expert
                                </p>
                            </div>

                            <div className="flex justify-center gap-3 sm:gap-4">
                                { [
                                    { label: 'LI', link: '#', color: 'bg-white/5 text-white/40 shadow-lg' },
                                    { label: 'TW', link: '#', color: 'bg-white/5 text-white/40 shadow-lg' },
                                    { icon: Globe, link: '#', color: 'bg-white/5 text-white/40 shadow-lg' }
                                ].map((social, i) => (
                                    <a key={i} href={social.link} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all hover:bg-gold-gradient hover:text-primary ${social.color}`}>
                                        {social.icon ? (
                                            <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <span className="text-[9px] sm:text-[10px] font-bold">{social.label}</span>
                                        )}
                                    </a>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-2xl sm:text-3xl font-headline font-bold text-white italic">{agent.experience || 8}+</p>
                                    <p className="text-[8px] sm:text-[9px] font-bold uppercase text-white/20 tracking-widest">Experience</p>
                                </div>
                                <div className="space-y-1 border-l border-white/5">
                                    <p className="text-2xl sm:text-3xl font-headline font-bold text-white italic">{properties.length}</p>
                                    <p className="text-[8px] sm:text-[9px] font-bold uppercase text-white/20 tracking-widest">Listings</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#0A254D] p-8 sm:p-10 rounded-[2.5rem] text-white border border-white/5 shadow-2xl relative overflow-hidden"
                        >
                             <div className="relative z-10 space-y-8">
                                 <h3 className="text-lg sm:text-xl font-headline font-bold flex items-center gap-3 uppercase italic">
                                    <TrendingUp className="w-5 h-5 text-accent" />
                                    Expertise
                                 </h3>
                                 <ul className="space-y-4">
                                     {[
                                        { label: 'Management', icon: Briefcase },
                                        { label: 'Valuation', icon: TrendingUp },
                                        { label: 'Residential', icon: Building2 },
                                        { label: 'Leasing', icon: Star }
                                     ].map((skill, i) => (
                                         <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors cursor-default">
                                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                                <skill.icon className="w-4 h-4 text-accent/60" />
                                             </div>
                                             {skill.label}
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                        </motion.div>
                    </aside>

                    {/* Right: Portfolio Content */}
                    <div className="lg:col-span-8 space-y-12 sm:space-y-20">
                        <motion.section 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                             <div className="flex items-end gap-6 border-b border-white/5 pb-8">
                                <h2 className="font-headline font-bold text-4xl sm:text-6xl text-white tracking-tighter uppercase italic leading-none">Profile</h2>
                                <span className="text-accent font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mb-1 shadow-glow sm:mb-2">Advisory</span>
                             </div>
                             <p className="text-lg sm:text-2xl font-medium text-white/40 leading-relaxed italic border-l-2 border-accent/20 pl-6 sm:pl-10">
                                 {agent.about || `${agent.fullName || agent.name} acts as a professional advisor within the OPMS network, specializing in high-quality residential and commercial transactions. With a deep understanding of local market trends and property valuations, they ensure every client receives expert guidance.`}
                             </p>

                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                 <button 
                                    onClick={() => window.location.href = `tel:${agent.phoneNumber}`}
                                    className="flex items-center justify-center gap-3 bg-gold-gradient text-primary h-14 sm:h-16 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                                 >
                                    <Phone className="w-4 h-4" />
                                    Speak with Agent
                                 </button>
                                 <button 
                                    onClick={() => window.location.href = `mailto:${agent.email}`}
                                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white h-14 sm:h-16 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                                 >
                                    <Mail className="w-4 h-4" />
                                    Email
                                 </button>
                             </div>
                        </motion.section>

                        <motion.section 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-10"
                        >
                            <div className="flex justify-between items-end gap-4 border-b border-white/5 pb-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white tracking-tight uppercase italic">Active Inventory</h2>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-accent/60 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-accent/40" />
                                        {properties.length} Listings
                                    </p>
                                </div>
                                <Link to="/properties" className="flex items-center gap-2 text-white/20 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                                    All Listings
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                                {properties.map((prop, i) => (
                                    <motion.div
                                        key={prop._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.8 }}
                                        onClick={() => navigate(`/property/${prop._id}`)}
                                        className="group cursor-pointer flex flex-col gap-6"
                                    >
                                        <div className="relative aspect-[4/5] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl bg-white/5 border border-white/5">
                                            <img src={(prop.images && prop.images[0]) || prop.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                                            <div className="absolute top-6 left-6 bg-[#071B3A]/80 backdrop-blur-xl px-5 py-2 rounded-xl border border-white/10 shadow-2xl">
                                                <span className="text-[9px] font-bold text-accent uppercase tracking-widest italic">₹ {prop.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="px-4 space-y-2">
                                            <h4 className="font-headline font-bold text-white text-xl sm:text-2xl truncate group-hover:text-accent transition-colors uppercase italic">{prop.title}</h4>
                                            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/20 truncate">
                                                <MapPin className="w-4 h-4 text-accent/60" />
                                                {prop.location}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
