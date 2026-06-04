import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Heart, MapPin, Bed, Bath, X, Search, Sparkles, Loader2 } from 'lucide-react';

export default function Favorites() {
    const navigate = useNavigate();
    const { user, toggleFavorite } = useAuth();
    const [savedProperties, setSavedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.favorites?.length > 0) {
            fetchSavedProperties();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchSavedProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                const saved = data.properties.filter(p => user.favorites.includes(p._id));
                setSavedProperties(saved);
            }
        } catch (err) {
            console.error('Error fetching saved properties:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-32 overflow-x-hidden">
            <Navbar />

            <main className="pt-24 sm:pt-36 container-responsive space-y-12">
                <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-surface-variant pb-8 px-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            Personal Shortlist
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary tracking-tight uppercase italic">Saved Properties</h1>
                        <p className="text-on-surface-variant font-medium text-sm">Review your favorite picks from our collection.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-2xl shadow-xl shadow-primary/20">
                        <Heart className="w-4 h-4 fill-white" />
                        <span className="font-bold text-sm tracking-tight">{savedProperties.length} Saved</span>
                    </div>
                </section>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Syncing collection...</span>
                    </div>
                ) : savedProperties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-primary/5 rounded-[3rem] px-8 mx-4 border-2 border-dashed border-primary/10">
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center">
                            <Heart className="w-10 h-10 text-primary/20" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl sm:text-3xl font-bold text-primary italic uppercase">No Saved Properties</h3>
                            <p className="text-on-surface-variant font-medium max-w-xs mx-auto text-sm leading-relaxed">
                                Save your favorite properties to compare them and make an informed decision.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/properties')}
                            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-bold uppercase tracking-widest text-[10px] shadow-xl hover:bg-secondary transition-all active:scale-95 flex items-center gap-2"
                        >
                            <Search className="w-3 h-3" />
                            Start Browsing
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-4">
                        {savedProperties.map((prop) => (
                            <div key={prop._id} className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-surface-variant hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div
                                    className="aspect-[16/10] overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/property/${prop._id}`)}
                                >
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={(prop.images && prop.images[0]) || prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'}
                                        alt={prop.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>

                                {/* Remove button */}
                                <button
                                    onClick={() => toggleFavorite(prop._id)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10 hover:bg-red-600"
                                    title="Remove from saved"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div
                                    className="p-6 sm:p-8 space-y-4 cursor-pointer"
                                    onClick={() => navigate(`/property/${prop._id}`)}
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-primary leading-tight line-clamp-1 group-hover:text-secondary transition-colors mb-1">
                                            {prop.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-on-surface-variant font-medium text-xs">
                                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                                            <span className="truncate">{prop.location}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-surface-variant/50">
                                        <span className="font-bold text-secondary text-lg">
                                            ₹ {typeof prop.price === 'number' ? prop.price.toLocaleString() : prop.price}
                                        </span>
                                        <div className="flex gap-4 text-[10px] font-bold uppercase text-primary/40">
                                            <span className="flex items-center gap-1.5">
                                                <Bed className="w-4 h-4" />
                                                {prop.bedrooms || 3}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Bath className="w-4 h-4" />
                                                {prop.bathrooms || 2}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
