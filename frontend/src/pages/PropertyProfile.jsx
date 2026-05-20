import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function PropertyProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, authFetch } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    
    // Inquiry Form States — pre-filled from logged-in user
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
                    // Fallback search or mock
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
            { _id: '1', title: 'The Sapphire Manor', price: '₹ 2.4 Crore', bhk: '3 BHK', builtupArea: '2400 ft²', location: 'Vijay Nagar, Indore, Madhya Pradesh', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop', status: 'Approved' },
            { _id: '2', title: 'Lakeview Residency', price: '₹ 85 Lakh', bhk: '2 BHK', builtupArea: '1180 ft²', location: 'Arera Colony, Bhopal, Madhya Pradesh', coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop', status: 'Approved' },
            { _id: '3', title: 'Heritage Greens', price: '₹ 1.2 Crore', bhk: '4 BHK', builtupArea: '3200 ft²', location: 'City Center, Gwalior, Madhya Pradesh', coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop', status: 'Approved' }
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
                    setBuyerName(user?.fullName || '');
                    setBuyerEmail(user?.email || '');
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
            <div className="flex justify-center items-center h-screen bg-surface">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-surface p-6 text-center">
                <p className="text-on-surface-variant mb-4">Property details could not be found.</p>
                <button onClick={() => navigate('/properties')} className="bg-primary text-white px-6 py-2.5 rounded-full font-bold">Go Back</button>
            </div>
        );
    }

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pb-24 relative">
            {/* Overlay Header */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 z-40">
                <button onClick={() => navigate(-1)} className="w-10 h-10 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg active:scale-90 transition-all">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <button onClick={toggleFavorite} className={`w-10 h-10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-all active:scale-90 ${
                    favorites.includes(property._id) ? 'bg-red-500 text-white border-red-400' : 'bg-black/40 text-white'
                }`}>
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: favorites.includes(property._id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
            </header>

            {/* Main Content */}
            <main>
                {/* Image Hero */}
                <section className="h-[45vh] relative overflow-hidden">
                    <img 
                        src={property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                        className="w-full h-full object-cover" 
                        alt="Property Image" 
                    />
                    <div className="absolute bottom-6 right-6 bg-primary/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                        <span className="text-white font-headline font-bold text-sm">1 / 12 Photos</span>
                    </div>
                </section>

                {/* Information Card */}
                <section className="relative -mt-10 bg-white rounded-t-[3rem] px-8 pt-10 space-y-8 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
                    {/* Header Info */}
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="font-headline font-extrabold text-3xl text-primary tracking-tight leading-tight max-w-[80%]">{property.title}</h1>
                            <span className="bg-[#006a63]/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                            <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                            <span>{property.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-8 p-4 bg-surface rounded-2xl border border-outline-variant/10">
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="material-symbols-outlined text-secondary">bed</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-outline">{property.bhk || '3 BHK'}</span>
                            </div>
                            <div className="w-px h-8 bg-outline/10"></div>
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="material-symbols-outlined text-secondary">bathtub</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-outline">{property.floor || '2'} Baths</span>
                            </div>
                            <div className="w-px h-8 bg-outline/10"></div>
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="material-symbols-outlined text-secondary">square_foot</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-outline">{property.builtupArea || property.carpetArea || '2400 ft²'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h2 className="font-headline font-bold text-xl text-primary">About this Property</h2>
                        <p className="text-on-surface-variant leading-relaxed text-sm">
                            Exquisite luxury estate nestled in the most sought-after neighborhood. This editorial-grade estate features high ceilings, floor-to-ceiling glass pavilions, and private landscaped layouts designed for upscale living.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline/5">
                                <span className="material-symbols-outlined text-secondary">local_parking</span>
                                <span className="text-xs font-bold">2 Car Parking</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline/5">
                                <span className="material-symbols-outlined text-secondary">pool</span>
                                <span className="text-xs font-bold">Swimming Pool</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline/5">
                                <span className="material-symbols-outlined text-secondary">security</span>
                                <span className="text-xs font-bold">24/7 Security</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline/5">
                                <span className="material-symbols-outlined text-secondary">power</span>
                                <span className="text-xs font-bold">Full Backup</span>
                            </div>
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="p-6 bg-primary-container/5 rounded-[2.5rem] flex items-center justify-between border border-primary/5">
                        <div className="flex items-center gap-4">
                            <img 
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" 
                                className="w-14 h-14 rounded-full object-cover ring-4 ring-white" 
                                alt="Owner" 
                            />
                            <div>
                                <h4 className="font-bold text-primary">Anand Verma</h4>
                                <p className="text-[10px] uppercase font-black text-secondary tracking-widest">Premium Seller</p>
                            </div>
                        </div>
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg scale-95 active:scale-90 transition-transform">
                            <span className="material-symbols-outlined">call</span>
                        </button>
                    </div>
                    
                    <div className="pb-10 h-10"></div>
                </section>
            </main>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 w-full p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-white/20 flex items-center gap-4 z-30 shadow-[0_-15px_40px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Valuation</span>
                    <span className="font-['Manrope'] font-black text-2xl text-secondary leading-tight">
                        ₹ {property.price.includes('Crore') || property.price.includes('Lakh') || property.price.startsWith('₹') ? property.price.replace('₹', '').trim() : parseInt(property.price).toLocaleString('en-IN')}
                    </span>
                </div>
                <button onClick={() => setShowInquiryModal(true)} className="flex-1 py-4 bg-primary hover:bg-secondary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                    Inquire Now
                    <span className="material-symbols-outlined text-sm">send</span>
                </button>
            </div>

            {/* Inquiry Form Modal Sheet */}
            {showInquiryModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white w-full max-w-md rounded-t-[3rem] p-8 space-y-6 shadow-2xl animate-[slideUp_0.3s_ease-out] relative">
                        <button onClick={() => setShowInquiryModal(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                        
                        <div className="text-center">
                            <h3 className="font-headline font-extrabold text-2xl text-primary">Submit Inquiry</h3>
                            <p className="text-on-surface-variant text-sm mt-1">Interactions for {property.title}</p>
                        </div>

                        {inquirySuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-[bounce_1s_infinite]">
                                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                                </div>
                                <h4 className="font-bold text-lg text-primary">Inquiry Sent Successfully!</h4>
                                <p className="text-xs text-on-surface-variant">The premium consultant will contact you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleInquirySubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Full Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        className="w-full bg-[#eeedf2] rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                        placeholder="Enter your name"
                                        value={buyerName}
                                        onChange={(e) => setBuyerName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Email Address</label>
                                    <input 
                                        type="email" 
                                        required 
                                        className="w-full bg-[#eeedf2] rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                        placeholder="Enter your email"
                                        value={buyerEmail}
                                        onChange={(e) => setBuyerEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline">Message</label>
                                    <textarea 
                                        rows="3" 
                                        className="w-full bg-[#eeedf2] rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium resize-none"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submittingInquiry}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
                                >
                                    {submittingInquiry ? 'Sending...' : 'Send Inquiry'}
                                    <span className="material-symbols-outlined text-sm">send</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
