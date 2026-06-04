import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, Share2, MapPin, BedDouble, Bath, Square, 
    CheckCircle, Mail, Phone, ShieldCheck, 
    ArrowLeft, ChevronRight, Sparkles, MessageCircle,
    Maximize2, X
} from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import ThreeDPreview from '../components/ThreeDPreview';
import Recommendations from '../components/Recommendations';
import { SkeletonDetails } from '../components/Skeleton';
import LazyImage from '../components/LazyImage';

export default function PropertyProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, toggleFavorite, authFetch } = useAuth();
    const { darkMode } = useTheme();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [activeView, setActiveView] = useState('GALLERY');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        fetchPropertyData();
        if (user) {
            setInquiryData(prev => ({
                ...prev,
                name: user.name || user.fullName || '',
                email: user.email || ''
            }));
        }
    }, [id, user]);

    const fetchPropertyData = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                const found = data.properties.find(p => p._id === id);
                if (found) {
                    setProperty(found);
                    await fetch(`${API_URL}/api/properties/${id}/view`, { method: 'POST' }).catch(() => {});
                } else {
                    navigate('/home');
                }
            }
        } catch (err) {
            console.error('Error fetching property:', err);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };

    const isFavorite = user?.favorites?.includes(id);

    const handleSendInquiry = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await authFetch(`${API_URL}/api/inquiries`, {
                method: 'POST',
                body: JSON.stringify({
                    propertyId: id,
                    propertyName: property.title,
                    buyerName: inquiryData.name,
                    buyerEmail: inquiryData.email,
                    buyerPhone: inquiryData.phone,
                    message: inquiryData.message,
                    price: property.price
                })
            });

            if (res.ok) {
                setStatusMessage('Inquiry sent successfully!');
                setTimeout(() => {
                    setIsModalOpen(false);
                    setStatusMessage('');
                }, 2000);
            }
        } catch (err) {
            setStatusMessage('Failed to send inquiry.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="bg-background dark:bg-dark-bg min-h-screen">
            <Navbar />
            <div className="pt-32 container-responsive pb-40">
                <SkeletonDetails />
            </div>
            <BottomNav />
        </div>
    );
    
    if (!property) return null;

    const allImages = property.images && property.images.length > 0 ? property.images : [property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'];

    return (
        <div className="bg-[#071B3A] text-white min-h-screen pb-32 overflow-x-hidden">
            <Navbar />

            <main className="pt-24 sm:pt-40 container-responsive">
                {/* ─ Navigation & Actions ───────────────────────────────────── */}
                <div className="flex flex-wrap justify-between items-center gap-8 mb-16">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-4 font-black uppercase tracking-[0.4em] text-[10px] text-white/40 group">
                        <div className="w-12 h-12 rounded-[1.5rem] border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all shadow-2xl">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                        Back to Inventory
                    </button>
                    <div className="flex gap-4">
                        <button className="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent transition-all shadow-2xl">
                            <Share2 className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => toggleFavorite(id)}
                            className={`w-14 h-14 rounded-[1.5rem] border border-white/10 flex items-center justify-center transition-all shadow-2xl ${isFavorite ? 'bg-red-500 text-white border-red-500' : 'bg-white/5 text-white/40 hover:text-red-500'}`}
                        >
                            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* ─ Main Visual Nexus ───────────────────────────────────────── */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-3xl w-fit">
                            {['GALLERY', '3D', 'MAP'].map((view) => (
                                <button
                                    key={view}
                                    onClick={() => setActiveView(view)}
                                    className={`px-10 py-4 rounded-[1.5rem] text-[10px] font-black tracking-widest transition-all ${activeView === view ? 'bg-gold-gradient text-primary shadow-2xl' : 'text-white/40 hover:text-white'}`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeView === 'GALLERY' && (
                                <motion.div 
                                    key="gallery"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    className="space-y-8"
                                >
                                    <div className="relative aspect-[16/10] rounded-[4rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] border border-white/5 group">
                                        <LazyImage src={allImages[activeImage]} className="w-full h-full object-cover" alt={property.title} />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button 
                                                onClick={() => setIsLightboxOpen(true)}
                                                className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform shadow-2xl"
                                            >
                                                <Maximize2 className="w-10 h-10" />
                                            </button>
                                        </div>
                                        <div className="absolute top-10 left-10 flex gap-4">
                                            <div className="bg-gold-gradient px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary shadow-2xl flex items-center gap-3">
                                                <ShieldCheck className="w-4 h-4" />
                                                Verified Asset
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2">
                                        {allImages.map((img, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setActiveImage(i)}
                                                className={`w-32 h-24 rounded-[1.5rem] overflow-hidden shrink-0 border-2 transition-all ${activeImage === i ? 'border-accent shadow-2xl scale-105' : 'border-transparent opacity-30 hover:opacity-100'}`}
                                            >
                                                <LazyImage src={img} className="w-full h-full object-cover" alt="" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {activeView === '3D' && (
                                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[600px] rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
                                    <ThreeDPreview imageUrl={allImages[0]} />
                                </motion.div>
                            )}
                            {activeView === 'MAP' && (
                                <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[600px] rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
                                    <InteractiveMap location={property.location} lat={property.latitude} lng={property.longitude} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ─ Narrative Section ───────────────────────────────────── */}
                        <div className="space-y-10 pt-8">
                            <div className="flex items-center gap-6">
                                <h2 className="font-headline font-black text-4xl text-white tracking-tighter italic uppercase">The Genesis</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <p className="text-white/50 text-2xl leading-relaxed font-medium italic font-display">
                                "{property.description || "An architectural masterpiece redefining the skyline. This holding offers uncompromised luxury and absolute security for those who command the highest tier of living standards."}"
                            </p>
                        </div>
                    </div>

                    {/* ─ Intelligence Sidebar ─────────────────────────────────────── */}
                    <div className="lg:col-span-4 space-y-16">
                        <section className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Private Holding</span>
                                <h1 className="font-headline font-black text-6xl text-white leading-tight tracking-tighter italic uppercase">{property.title}</h1>
                                <p className="text-white/40 font-black text-[11px] uppercase tracking-widest flex items-center gap-4">
                                    <MapPin className="text-accent w-5 h-5" />
                                    {property.location}
                                </p>
                            </div>
                            <div className="bg-gold-gradient p-12 rounded-[3.5rem] text-primary shadow-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Market Valuation</p>
                                <h2 className="text-5xl font-headline font-black tracking-tighter">₹ {property.price.toLocaleString()}</h2>
                                {property.category === 'rent' && <span className="text-sm font-black uppercase tracking-widest ml-1">/ Monthly</span>}
                            </div>
                        </section>

                        <section className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'Suites', val: property.bedrooms || 3, icon: BedDouble },
                                { label: 'Imperial Baths', val: property.bathrooms || 2, icon: Bath },
                                { label: 'Extent (sq.ft)', val: property.area || '2,400', icon: Square },
                                { label: 'Category', val: property.propertyType || 'Villa', icon: CheckCircle },
                            ].map((spec, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-all">
                                    <spec.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                                    <div className="space-y-1">
                                        <p className="text-xl font-black text-white leading-none tracking-tight">{spec.val}</p>
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{spec.label}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="space-y-6 pt-6">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-white text-primary py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-accent transition-all shadow-3xl flex items-center justify-center gap-6 group"
                            >
                                <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                Initiate Inquiry
                            </button>
                            <div className="grid grid-cols-2 gap-6">
                                <button className="bg-[#25D366] text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:opacity-90 transition-all shadow-2xl flex items-center justify-center gap-4">
                                    <MessageCircle className="w-5 h-5" />
                                    Secure WhatsApp
                                </button>
                                <button className="bg-white/5 border border-white/10 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-4">
                                    <Phone className="w-5 h-5" />
                                    Secure Line
                                </button>
                            </div>
                        </section>

                        {/* ─ Authenticity Protocol ────────────────────────────── */}
                        <div className="bg-accent/5 p-10 rounded-[3rem] border border-accent/20 space-y-6">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-accent">
                                <ShieldCheck className="w-6 h-6" />
                                Security Status: ACTIVE
                            </div>
                            <p className="text-[11px] text-white/30 font-black uppercase tracking-widest leading-relaxed italic">
                                This holding has cleared the OPMS 48-point verification protocol. All documentation is secure and ready for immediate transition.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─ Discovery Engine ─────────────────────────────────────── */}
                <div className="mt-48 space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="space-y-6">
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Discovery Engine</span>
                             <h2 className="font-headline font-black text-5xl sm:text-7xl text-white tracking-tighter uppercase italic">Comparable <br/><span className="text-gold-gradient normal-case font-display">holdings</span></h2>
                        </div>
                    </div>
                    <Recommendations currentPropertyId={id} category={property.category} />
                </div>
            </main>

            <Footer />
            <BottomNav />

            {/* ─ Media Lightbox ────────────────────────────────────────── */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-8 sm:p-24"
                    >
                        <button onClick={() => setIsLightboxOpen(false)} className="absolute top-12 right-12 text-white/20 hover:text-white transition-colors z-10 w-20 h-20 flex items-center justify-center">
                            <X className="w-12 h-12" />
                        </button>
                        <div className="relative w-full max-w-7xl aspect-video rounded-[4rem] overflow-hidden shadow-[0_0_128px_rgba(0,0,0,1)] ring-1 ring-white/10">
                            <LazyImage src={allImages[activeImage]} className="w-full h-full object-contain" alt="" />
                            
                            <div className="absolute inset-y-0 inset-x-12 flex justify-between items-center pointer-events-none">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === 0 ? allImages.length - 1 : activeImage - 1); }}
                                    className="w-20 h-20 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto"
                                >
                                    <ArrowLeft className="w-8 h-8" />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === allImages.length - 1 ? 0 : activeImage + 1); }}
                                    className="w-20 h-20 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─ Inquiry Terminal ─────────────────────────────────────── */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary/40 backdrop-blur-3xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.9 }}
                            className="bg-primary dark:bg-dark-surface w-full max-w-2xl rounded-[5rem] shadow-3xl p-16 space-y-12 relative overflow-hidden border border-white/10"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-headline font-black text-white tracking-tighter uppercase italic">Initiate Protocol</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent flex items-center gap-3">
                                        <Sparkles className="w-4 h-4" />
                                        Elite Consultation Channel
                                    </p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-all">
                                    <X className="w-8 h-8 text-white" />
                                </button>
                            </div>

                            {statusMessage ? (
                                <div className="py-24 text-center space-y-8">
                                    <div className="w-24 h-24 bg-accent/20 text-accent rounded-[2.5rem] flex items-center justify-center mx-auto scale-110 shadow-2xl">
                                        <CheckCircle className="w-12 h-12" />
                                    </div>
                                    <p className="font-headline font-black text-white text-3xl tracking-tight uppercase italic">{statusMessage}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSendInquiry} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-6">Secure Contact Link</label>
                                        <input 
                                            className="w-full px-10 py-7 bg-white/5 border border-white/10 rounded-full outline-none font-bold text-white focus:border-accent transition-all" 
                                            value={inquiryData.phone}
                                            onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                                            placeholder="+91 MOBILE / WHATSAPP"
                                            required 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-6">Briefing Detail</label>
                                        <textarea 
                                            className="w-full px-10 py-8 bg-white/5 border border-white/10 rounded-[3rem] outline-none h-48 resize-none font-bold text-white focus:border-accent transition-all" 
                                            placeholder="SPECIFY ASSET INTERESTS OR PARTNERSHIP DETAILS..."
                                            value={inquiryData.message}
                                            onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <button 
                                        className="w-full py-8 bg-gold-gradient text-primary rounded-full font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Transmitting...' : 'Transmit Dossier'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
