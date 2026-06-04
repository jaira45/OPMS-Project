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
    Maximize2, X, Building2
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
        <div className="bg-[#071B3A] min-h-screen">
            <Navbar />
            <div className="pt-24 sm:pt-32 container-responsive pb-40 px-4">
                <SkeletonDetails />
            </div>
            <BottomNav />
        </div>
    );
    
    if (!property) return null;

    const allImages = property.images && property.images.length > 0 ? property.images : [property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'];

    return (
        <div className="bg-[#071B3A] text-white min-h-screen pb-32 overflow-x-hidden px-4">
            <Navbar />

            <main className="pt-24 sm:pt-36 container-responsive">
                {/* Navigation & Basic Actions */}
                <div className="flex flex-wrap justify-between items-center gap-6 mb-12 sm:mb-16">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-4 font-bold uppercase tracking-widest text-[10px] text-white/40 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all shadow-xl">
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        Back to Listings
                    </button>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent transition-all shadow-xl">
                            <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button 
                            onClick={() => toggleFavorite(id)}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/10 flex items-center justify-center transition-all shadow-xl ${isFavorite ? 'bg-red-500 text-white border-red-500' : 'bg-white/5 text-white/40 hover:text-red-500'}`}
                        >
                            <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Property Gallery & Main View */}
                    <div className="lg:col-span-8 space-y-10 sm:space-y-12">
                        <div className="flex bg-white/[0.03] backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-xl w-fit">
                            {['GALLERY', '3D VIEW', 'LOCATION'].map((view) => (
                                <button
                                    key={view}
                                    onClick={() => setActiveView(view === '3D VIEW' ? '3D' : view === 'LOCATION' ? 'MAP' : 'GALLERY')}
                                    className={`px-6 sm:px-10 py-3 rounded-xl text-[10px] font-bold tracking-widest transition-all ${((activeView === 'GALLERY' && view === 'GALLERY') || (activeView === '3D' && view === '3D VIEW') || (activeView === 'MAP' && view === 'LOCATION')) ? 'bg-gold-gradient text-primary shadow-lg' : 'text-white/40 hover:text-white'}`}
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
                                    <div className="relative aspect-[16/10] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 group">
                                        <LazyImage src={allImages[activeImage]} className="w-full h-full object-cover" alt={property.title} />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <button 
                                                onClick={() => setIsLightboxOpen(true)}
                                                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform shadow-3xl pointer-events-auto"
                                            >
                                                <Maximize2 className="w-8 h-8 sm:w-10 sm:h-10" />
                                            </button>
                                        </div>
                                        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex gap-4">
                                            <div className="bg-gold-gradient px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary shadow-2xl flex items-center gap-3">
                                                <ShieldCheck className="w-4 h-4" />
                                                Verified Property
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
                                        {allImages.map((img, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setActiveImage(i)}
                                                className={`w-28 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === i ? 'border-accent shadow-xl scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                            >
                                                <LazyImage src={img} className="w-full h-full object-cover" alt="" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {activeView === '3D' && (
                                <motion.div key="3d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] sm:h-[600px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border border-white/10">
                                    <ThreeDPreview imageUrl={allImages[0]} />
                                </motion.div>
                            )}
                            {activeView === 'MAP' && (
                                <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] sm:h-[600px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border border-white/10">
                                    <InteractiveMap location={property.location} lat={property.latitude} lng={property.longitude} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Property Description Section */}
                        <div className="space-y-8 pt-8">
                            <div className="flex items-center gap-6">
                                <h2 className="text-3xl font-headline font-bold text-white uppercase italic">Description</h2>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            <p className="text-white/50 text-xl leading-relaxed font-medium border-l-2 border-accent/20 pl-6 sm:pl-10">
                                {property.description || "A professional property presentation focused on quality and value. This property offers exceptional features and security in a prime location in Central India."}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Overview */}
                    <div className="lg:col-span-4 space-y-10 sm:space-y-12">
                        <section className="space-y-6">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Exclusive Property</span>
                                <h1 className="text-4xl sm:text-5xl font-headline font-bold text-white leading-[1.1] tracking-tighter uppercase italic">{property.title}</h1>
                                <div className="flex items-center gap-3 text-white/30">
                                    <MapPin className="text-accent/60 w-4 h-4" />
                                    <span className="text-sm font-semibold">{property.location}</span>
                                </div>
                            </div>
                            <div className="bg-gold-gradient p-8 sm:p-10 rounded-[2.5rem] text-primary shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl opacity-40 group-hover:scale-150 transition-transform duration-1000" />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Listing Price</p>
                                <h2 className="text-4xl sm:text-5xl font-headline font-bold tracking-tighter italic">₹ {property.price.toLocaleString()}</h2>
                                {property.category === 'rent' && <span className="text-xs font-bold uppercase tracking-widest">/ Month</span>}
                            </div>
                        </section>

                        <section className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Bedrooms', val: property.bedrooms || '—', icon: BedDouble },
                                { label: 'Baths', val: property.bathrooms || '—', icon: Bath },
                                { label: 'Area (sq.ft)', val: property.area || '—', icon: Square },
                                { label: 'Type', val: property.propertyType || 'Residential', icon: Building2 },
                            ].map((spec, i) => (
                                <div key={i} className="bg-white/[0.02] backdrop-blur-xl p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-3 group hover:bg-white/5 transition-all">
                                    <spec.icon className="w-6 h-6 text-accent opacity-60 group-hover:scale-110 transition-transform" />
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold text-white leading-none">{spec.val}</p>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">{spec.label}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="space-y-4 pt-4">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-white text-primary py-5 sm:py-6 rounded-2xl sm:rounded-3xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl flex items-center justify-center gap-4 group"
                            >
                                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Contact Agent
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp
                                </button>
                                <button className="bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </button>
                            </div>
                        </section>

                        {/* Property Verification Badge Area */}
                        <div className="bg-accent/5 p-8 rounded-3xl border border-accent/10 space-y-4">
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-accent">
                                <ShieldCheck className="w-5 h-5" />
                                Verified Listing
                            </div>
                            <p className="text-xs text-white/30 font-medium leading-relaxed italic">
                                This property has cleared our verification process. All documentation and specifications have been confirmed for accuracy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Similar Properties Discovery */}
                <div className="mt-40 sm:mt-48 space-y-12 sm:space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="space-y-4">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Recommendations</span>
                             <h2 className="text-5xl sm:text-7xl font-headline font-bold text-white tracking-widest uppercase italic leading-[0.9]">Similar <br/><span className="text-gold-gradient block">Listings</span></h2>
                        </div>
                    </div>
                    <Recommendations currentPropertyId={id} category={property.category} />
                </div>
            </main>

            <Footer />
            <BottomNav />

            {/* Media Lightbox Viewer */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 sm:p-20"
                    >
                        <button onClick={() => setIsLightboxOpen(false)} className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors z-10 w-16 h-16 flex items-center justify-center">
                            <X className="w-10 h-10" />
                        </button>
                        <div className="relative w-full max-w-6xl aspect-video rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                            <LazyImage src={allImages[activeImage]} className="w-full h-full object-contain" alt="" />
                            
                            <div className="absolute inset-y-0 inset-x-6 flex justify-between items-center pointer-events-none">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === 0 ? allImages.length - 1 : activeImage - 1); }}
                                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto"
                                >
                                    <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(activeImage === allImages.length - 1 ? 0 : activeImage + 1); }}
                                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto"
                                >
                                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Inquiry Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#071B3A]/60 backdrop-blur-3xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="bg-[#0A254D] w-full max-w-xl rounded-[2.5rem] shadow-2xl p-6 sm:p-12 space-y-8 relative overflow-hidden border border-white/5"
                        >
                            <div className="flex justify-between items-start px-2">
                                <div className="space-y-2">
                                    <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white tracking-tight uppercase italic">Inquiry</h3>
                                    <p className="text-[9px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" />
                                        Premium Advisory
                                    </p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                    <X className="w-5 h-5 text-white/50" />
                                </button>
                            </div>

                            {statusMessage ? (
                                <div className="py-12 text-center space-y-6">
                                    <div className="w-16 h-16 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <p className="text-xl font-bold text-white italic uppercase">{statusMessage}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSendInquiry} className="space-y-5">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 px-4">Contact Number</label>
                                        <input 
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl outline-none font-bold text-white focus:border-accent transition-all text-sm" 
                                            value={inquiryData.phone}
                                            onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                                            placeholder="+91 Mobile"
                                            required 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 px-4">Advisory Notes</label>
                                        <textarea 
                                            className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none h-32 resize-none font-bold text-white focus:border-accent transition-all text-sm" 
                                            placeholder="What would you like to discuss?"
                                            value={inquiryData.message}
                                            onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <button 
                                        className="w-full py-5 bg-gold-gradient text-primary rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Transmitting Request...' : 'Submit Inquiry'}
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
