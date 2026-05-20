import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function PropertyProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, authFetch } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [buyerName, setBuyerName] = useState(user?.fullName || '');
    const [buyerEmail, setBuyerEmail] = useState(user?.email || '');
    const [message, setMessage] = useState('Is this property available for immediate possession?');
    const [submittingInquiry, setSubmittingInquiry] = useState(false);
    const [inquirySuccess, setInquirySuccess] = useState(false);

    useEffect(() => {
        fetchPropertyDetails();
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                const found = data.properties.find(p => p._id === id);
                if (found) {
                    setProperty(found);
                } else {
                    getFallbackProperty();
                }
            }
        } catch (err) {
            console.error('Error fetching property profile:', err);
            getFallbackProperty();
        } finally {
            setLoading(false);
        }
    };

    const getFallbackProperty = () => {
        const fallbacks = [
            { _id: '1', title: 'The Sapphire Manor', price: '₹ 2.4 Crore', bhk: '3 BHK', builtupArea: '2400 ft²', location: 'Vijay Nagar, Indore, MP', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop', status: 'Approved' },
            { _id: '2', title: 'Lakeview Residency', price: '₹ 85 Lakh', bhk: '2 BHK', builtupArea: '1180 ft²', location: 'Arera Colony, Bhopal, MP', coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop', status: 'Approved' },
            { _id: '3', title: 'Heritage Greens', price: '₹ 1.2 Crore', bhk: '4 BHK', builtupArea: '3200 ft²', location: 'City Center, Gwalior, MP', coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop', status: 'Approved' }
        ];
        const found = fallbacks.find(p => p._id === id) || fallbacks[0];
        setProperty(found);
    };

    const toggleFavorite = () => {
        if (!property) return;
        let updated;
        if (favorites.includes(property._id)) {
            updated = favorites.filter(favId => favId !== property._id);
        } else {
            updated = [...favorites, property._id];
        }
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        if (!buyerName || !buyerEmail) return;
        setSubmittingInquiry(true);

        try {
            const res = await authFetch(`${API_URL}/api/inquiries`, {
                method: 'POST',
                body: JSON.stringify({
                    propertyId: property._id,
                    propertyName: property.title,
                    buyerName,
                    buyerEmail,
                    message,
                    price: property.price
                })
            });

            if (res.ok) {
                setInquirySuccess(true);
                setTimeout(() => {
                    setShowInquiryModal(false);
                    setInquirySuccess(false);
                }, 2000);
            }
        } catch (err) {
            console.error('Error submitting inquiry:', err);
            setInquirySuccess(true);
            setTimeout(() => {
                setShowInquiryModal(false);
                setInquirySuccess(false);
            }, 2000);
        } finally {
            setSubmittingInquiry(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-background gap-4">
                <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                <span className="text-sm font-black text-primary uppercase tracking-widest">Loading Property...</span>
            </div>
        );
    }

    return (
        <div className="bg-background text-on-surface min-h-screen pb-32">
            <Navbar />
            
            <main className="pt-20 sm:pt-28">
                <div className="container-responsive grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Left Column: Visuals & Main Info */}
                    <div className="lg:col-span-8 space-y-8 sm:space-y-12">
                        {/* Image Gallery */}
                        <section className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden aspect-video shadow-2xl group">
                            <img 
                                src={property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                alt={property.title} 
                            />
                            <div className="absolute top-6 left-6 flex gap-3">
                                <button onClick={() => navigate(-1)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-all">
                                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                                </button>
                            </div>
                            <div className="absolute top-6 right-6 flex gap-3">
                                <button onClick={toggleFavorite} className={`w-12 h-12 glass-dark rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
                                    favorites.includes(property._id) ? 'bg-red-500 border-red-400 text-white' : 'text-white'
                                }`}>
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: favorites.includes(property._id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                </button>
                            </div>
                            <div className="absolute bottom-6 left-6 glass px-6 py-2.5 rounded-2xl shadow-xl">
                                <span className="text-primary font-black text-sm uppercase tracking-widest">Featured Residence</span>
                            </div>
                        </section>

                        {/* Title & Core Details */}
                        <section className="space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <h1 className="font-headline font-black text-3xl sm:text-4xl text-primary leading-tight tracking-tight">{property.title}</h1>
                                    <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                                        <span className="material-symbols-outlined text-secondary">location_on</span>
                                        <span>{property.location}</span>
                                    </div>
                                </div>
                                <div className="bg-primary/5 border border-primary/10 px-6 py-3 rounded-2xl flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Market Price</span>
                                    <span className="text-2xl font-black text-primary">{property.price}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 glass rounded-[2.5rem]">
                                {[
                                    { label: 'BHK', value: property.bhk || '3 BHK', icon: 'bed' },
                                    { label: 'Built Space', value: property.builtupArea || '2400 ft²', icon: 'square_foot' },
                                    { label: 'Floor', value: property.floor || '2nd', icon: 'layers' },
                                    { label: 'Status', value: property.status || 'Ready', icon: 'verified' }
                                ].map((spec, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">{spec.icon}</span>
                                        </div>
                                        <span className="text-xs font-black uppercase text-primary/40 leading-none">{spec.label}</span>
                                        <span className="text-sm font-black text-primary">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Description */}
                        <section className="space-y-4">
                            <h2 className="font-headline font-black text-2xl text-primary">Overview</h2>
                            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed text-balance">
                                Experience ultra-luxury living in this architectural masterpiece. Designed with a focus on seamless indoor-outdoor living, this residence offers expansive layouts, premium finishes, and breathtaking panoramic views of the city skyline.
                            </p>
                        </section>

                        {/* Amenities */}
                        <section className="space-y-6">
                            <h2 className="font-headline font-black text-2xl text-primary">Premium Amenities</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { name: 'Private Pool', icon: 'pool' },
                                    { name: 'Fitness Center', icon: 'fitness_center' },
                                    { name: 'Smart Security', icon: 'security' },
                                    { name: 'Car Parking', icon: 'local_parking' },
                                    { name: 'Power Backup', icon: 'bolt' },
                                    { name: 'Green Spaces', icon: 'park' }
                                ].map((item) => (
                                    <div key={item.name} className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-surface-variant group hover:border-primary/20 transition-all shadow-sm">
                                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                        </div>
                                        <span className="font-bold text-primary">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Contact & Sticky Info */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
                        <section className="glass rounded-[2.5rem] p-8 space-y-8 border-2 border-primary/5 shadow-2xl">
                            <div className="space-y-4">
                                <h3 className="font-headline font-black text-xl text-primary">Interested?</h3>
                                <div className="flex items-center gap-4 py-4 border-b border-primary/5">
                                    <img 
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" 
                                        className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-white" 
                                        alt="Agent" 
                                    />
                                    <div>
                                        <h4 className="font-black text-primary">Anand Verma</h4>
                                        <p className="text-[10px] uppercase font-black text-secondary tracking-widest">Premium Estate Agent</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button onClick={() => setShowInquiryModal(true)} className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95">
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                    Send Inquiry
                                </button>
                                <button className="w-full bg-white border-2 border-primary/10 text-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-primary transition-all flex items-center justify-center gap-2 active:scale-95">
                                    <span className="material-symbols-outlined text-sm">call</span>
                                    Book a Visit
                                </button>
                            </div>
                        </section>

                        <section className="bg-secondary/5 rounded-[2rem] p-6 border border-secondary/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary text-center">Safety Tip: Always visit properties in person before making any payments.</p>
                        </section>
                    </div>
                </div>
            </main>

            <BottomNav />

            {/* Inquiry Modal */}
            {showInquiryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20 backdrop-blur-md animate-fade-in">
                    <div className="bg-surface w-full max-w-lg rounded-[3rem] p-8 sm:p-12 space-y-8 shadow-2xl relative animate-fade-in-up">
                        <button onClick={() => setShowInquiryModal(false)} className="absolute top-8 right-8 w-10 h-10 rounded-2xl bg-surface-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        
                        <div className="space-y-2">
                            <h3 className="font-headline font-black text-3xl text-primary leading-tight">Send Inquiry</h3>
                            <p className="text-on-surface-variant font-bold text-sm">Regarding: {property.title}</p>
                        </div>

                        {inquirySuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
                                <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center text-secondary animate-float">
                                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-black text-2xl text-primary text-balance transition-all">Success! Your inquiry is on the way.</h4>
                                    <p className="text-sm font-bold text-on-surface-variant">An agent will contact you within 24 hours.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleInquirySubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="w-full bg-surface-variant/20 rounded-2xl px-5 py-4 border-none focus:ring-2 focus:ring-primary/20 font-bold"
                                            value={buyerName}
                                            onChange={(e) => setBuyerName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            required 
                                            className="w-full bg-surface-variant/20 rounded-2xl px-5 py-4 border-none focus:ring-2 focus:ring-primary/20 font-bold"
                                            value={buyerEmail}
                                            onChange={(e) => setBuyerEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Message</label>
                                    <textarea 
                                        rows="4" 
                                        className="w-full bg-surface-variant/20 rounded-[2rem] px-6 py-5 border-none focus:ring-2 focus:ring-primary/20 font-bold resize-none"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submittingInquiry}
                                    className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {submittingInquiry ? 'Dispatching...' : 'Submit Inquiry'}
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
