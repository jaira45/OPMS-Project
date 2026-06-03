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
                    // Increment view count via separate fetch if backend supports it
                    // For now, we'll assume the backend handles basic fetch tracking or we add it
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
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen pb-32 overflow-x-hidden">
            <Navbar />

            <main className="pt-24 sm:pt-32 container-responsive">
                {/* Back Button & Actions */}
                <div className="flex flex-wrap justify-between items-center gap-6 mb-12">
                    <button onClick={() => navigate('/properties')} className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] text-primary/40 dark:text-dark-on-surface-variant group">
                        <div className="w-10 h-10 rounded-full border border-surface-variant dark:border-dark-surface-variant flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-dark-primary group-hover:text-white transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        Return to Catalog
                    </button>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 rounded-2xl border border-surface-variant dark:border-dark-surface-variant flex items-center justify-center text-primary/40 dark:text-dark-on-surface-variant hover:bg-secondary hover:text-white transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => toggleFavorite(id)}
                            className={`w-12 h-12 rounded-2xl border border-surface-variant dark:border-dark-surface-variant flex items-center justify-center transition-all ${isFavorite ? 'bg-error text-white border-error shadow-xl shadow-error/20' : 'text-primary/40 dark:text-dark-on-surface-variant hover:text-error'}`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Media Display Area */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Interactive Toggle */}
                        <div className="flex bg-white dark:bg-dark-surface-variant p-2 rounded-3xl border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl w-fit">
                            {['GALLERY', '3D', 'MAP'].map((view) => (
                                <button
                                    key={view}
                                    onClick={() => setActiveView(view)}
                                    className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${activeView === view ? 'bg-primary dark:bg-dark-primary text-white shadow-lg' : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary'}`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeView === 'GALLERY' && (
                                <motion.div 
                                    key="gallery"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    <div className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden shadow-2xl border border-surface-variant dark:border-dark-surface-variant/20 group">
                                        <img src={allImages[activeImage]} className="w-full h-full object-cover" alt="" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button 
                                                onClick={() => setIsLightboxOpen(true)}
                                                className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform"
                                            >
                                                <Maximize2 className="w-8 h-8" />
                                            </button>
                                        </div>
                                        <div className="absolute top-8 left-8 flex gap-3">
                                            <div className="bg-secondary/90 backdrop-blur-md px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" />
                                                Verified Asset
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                                        {allImages.map((img, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setActiveImage(i)}
                                                className={`w-28 h-24 rounded-2xl overflow-hidden shrink-0 border-4 transition-all ${activeImage === i ? 'border-secondary shadow-xl scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" alt="" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {activeView === '3D' && (
                                <motion.div 
                                    key="3d"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                >
                                    <ThreeDPreview imageUrl={allImages[0]} />
                                </motion.div>
                            )}
                            {activeView === 'MAP' && (
                                <motion.div 
                                    key="map"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <InteractiveMap 
                                        location={property.location} 
                                        lat={property.latitude} 
                                        lng={property.longitude} 
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Description Section */}
                        <div className="space-y-8 pt-6">
                            <div className="flex items-center gap-4">
                                <h2 className="font-headline font-black text-3xl text-primary dark:text-white tracking-tight italic uppercase">The Narrative</h2>
                                <div className="h-px flex-1 bg-surface-variant dark:bg-dark-surface-variant/20" />
                            </div>
                            <p className="text-on-surface-variant dark:text-dark-on-surface-variant text-xl leading-relaxed font-medium">
                                {property.description || "Experience unprecedented luxury in this masterfully designed estate. Every corner reflecting architectural finesse, this property is poised for those who seek the extraordinary in Central India's premier districts."}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-12">
                        <section className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="font-headline font-black text-5xl text-primary dark:text-white leading-tight tracking-tighter italic">{property.title}</h1>
                                <p className="text-on-surface-variant dark:text-dark-on-surface-variant font-bold text-lg flex items-center gap-3">
                                    <MapPin className="text-secondary w-5 h-5" />
                                    {property.location}
                                </p>
                            </div>
                            <div className="bg-primary space-y-1 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Elite Valuation</p>
                                <h2 className="text-4xl font-black tracking-tighter">₹ {property.price.toLocaleString()}</h2>
                            </div>
                        </section>

                        <section className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Suites', val: property.bedrooms || 3, icon: BedDouble },
                                { label: 'Baths', val: property.bathrooms || 2, icon: Bath },
                                { label: 'Extent', val: `${property.area || '2k'} SQFT`, icon: Square },
                                { label: 'Type', val: property.propertyType || 'Villa', icon: CheckCircle },
                            ].map((spec, i) => (
                                <div key={i} className="bg-white dark:bg-dark-surface-variant p-6 rounded-[2.5rem] flex flex-col items-center text-center gap-3 border border-surface-variant dark:border-dark-surface-variant/20 group hover:-translate-y-1 transition-all">
                                    <spec.icon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black text-primary dark:text-white leading-none tracking-tight">{spec.val}</p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary/30 dark:text-white/20">{spec.label}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="space-y-4 pt-4">
                             <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-primary dark:bg-dark-primary text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-2xl flex items-center justify-center gap-4 group"
                            >
                                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Initiate Inquiry
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-[#25D366] text-white py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-[9px] hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/10">
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </button>
                                <button className="bg-white dark:bg-dark-surface-variant border border-surface-variant dark:border-dark-surface-variant/20 text-primary dark:text-white py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-[9px] hover:border-primary transition-all flex items-center justify-center gap-3">
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </button>
                            </div>
                        </section>

                        {/* Security Feature */}
                        <div className="bg-primary/5 dark:bg-white/5 p-8 rounded-[3rem] border border-primary/10 dark:border-white/10 space-y-4">
                            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-secondary">
                                <ShieldCheck className="w-5 h-5" />
                                Secure Nexus
                            </div>
                            <p className="text-[10px] text-on-surface-variant/60 dark:text-white/40 font-bold leading-relaxed">
                                This listing is protected by our elite verification protocols. Estate audited by OPMS Central Intelligence.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-32">
                    <Recommendations currentPropertyId={id} category={property.category} />
                </div>
            </main>

            <Footer />
            <BottomNav />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-12"
                    >
                        <button onClick={() => setIsLightboxOpen(false)} className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors z-10 w-16 h-16 flex items-center justify-center">
                            <X className="w-10 h-10" />
                        </button>
                        <div className="relative w-full max-w-7xl aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                            <img src={allImages[activeImage]} className="w-full h-full object-contain" alt="" />
                            
                            {/* Navigation inside lightbox */}
                            <div className="absolute inset-y-0 inset-x-8 flex justify-between items-center pointer-events-none">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === 0 ? allImages.length - 1 : activeImage - 1); }}
                                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto"
                                >
                                    <ArrowLeft className="w-8 h-8 -rotate-0" />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === allImages.length - 1 ? 0 : activeImage + 1); }}
                                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Inquiry Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-primary/20 dark:bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="bg-white dark:bg-dark-surface-variant w-full max-w-xl rounded-[4rem] shadow-3xl p-12 space-y-10 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-primary dark:text-white tracking-tighter">Initiate Request</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" />
                                        Elite Consultation Line
                                    </p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/5 hover:bg-primary/10 transition-all">
                                    <X className="w-6 h-6 text-primary dark:text-white" />
                                </button>
                            </div>

                            {statusMessage ? (
                                <div className="py-20 text-center space-y-6">
                                    <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-[2rem] flex items-center justify-center mx-auto scale-110">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <p className="font-black text-primary dark:text-white text-2xl tracking-tight uppercase tracking-widest">{statusMessage}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSendInquiry} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 dark:text-white/20 px-4">Contact Protocol</label>
                                        <input 
                                            className="w-full px-8 py-5 bg-primary/5 dark:bg-white/5 border-none rounded-3xl outline-none font-bold text-primary dark:text-white" 
                                            value={inquiryData.phone}
                                            onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                                            placeholder="Mobile Number / WhatsApp"
                                            required 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 dark:text-white/20 px-4">Briefing</label>
                                        <textarea 
                                            className="w-full px-8 py-6 bg-primary/5 dark:bg-white/5 border-none rounded-[2.5rem] outline-none h-40 resize-none font-bold text-primary dark:text-white" 
                                            placeholder="What would you like to discuss regarding this holding?"
                                            value={inquiryData.message}
                                            onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <button 
                                        className="w-full py-6 bg-primary dark:bg-dark-primary text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-secondary transition-all shadow-xl disabled:opacity-50"
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
