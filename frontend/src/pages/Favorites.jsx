import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function Favorites() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        if (properties.length > 0) {
            const saved = properties.filter(p => favorites.includes(p._id));
            setSavedProperties(saved);
        }
    }, [favorites, properties]);

    const fetchProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                setProperties(data.properties);
                const saved = data.properties.filter(p => favorites.includes(p._id));
                setSavedProperties(saved);
            }
        } catch (err) {
            console.error('Error fetching properties for favorites:', err);
            getFallbackFavorites();
        } finally {
            setLoading(false);
        }
    };

    const getFallbackFavorites = () => {
        const mock = [
            { _id: '1', title: 'The Glass Pavilion', price: '₹ 4.25 Crore', bhk: '4 BHK', location: 'Arera Colony, Bhopal', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
            { _id: '2', title: 'Skyline Heights', price: '₹ 1.85 Crore', bhk: '3 BHK', location: 'Vijay Nagar, Indore', coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' }
        ];
        setProperties(mock);
        setSavedProperties(mock);
    };

    const removeFavorite = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        const updated = favorites.filter(favId => favId !== id);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-32">
            <Navbar />

            <main className="pt-20 sm:pt-32 container-responsive space-y-12">
                <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-surface-variant pb-8">
                    <div className="space-y-1">
                        <h1 className="font-headline font-black text-4xl text-primary tracking-tight">Curated Collection</h1>
                        <p className="text-on-surface-variant font-bold text-sm uppercase tracking-widest">Your Private Selection of Premium Estates</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                        <span>{savedProperties.length} Properties Saved</span>
                    </div>
                </section>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase text-primary/40">Synchronizing...</span>
                    </div>
                ) : savedProperties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 glass rounded-[3rem]">
                        <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center animate-float">
                            <span className="material-symbols-outlined text-5xl text-primary/20">favorite_border</span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-headline font-black text-2xl text-primary">Nothing saved yet</h3>
                            <p className="text-on-surface-variant font-bold max-w-xs mx-auto text-balance transition-all">Start exploring our curated list of exclusive properties in Madhya Pradesh.</p>
                        </div>
                        <button onClick={() => navigate('/properties')} className="bg-primary text-white px-10 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 active:scale-95 transition-all">Start Exploring</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                        {savedProperties.map((prop) => (
                            <Link key={prop._id} to={`/property/${prop._id}`} className="group relative block transition-all hover:-translate-y-2">
                                <div className="aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                        src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                        alt={prop.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <button 
                                        onClick={(e) => removeFavorite(prop._id, e)} 
                                        className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-xl active:scale-95 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                    </button>
                                </div>
                                
                                <div className="mt-6 space-y-3 px-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="font-headline font-black text-xl text-primary leading-tight line-clamp-1 group-hover:text-secondary transition-colors">{prop.title}</h3>
                                        <span className="font-black text-secondary whitespace-nowrap">₹ {prop.price.replace('₹', '').trim()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        <span className="truncate">{prop.location}</span>
                                    </div>
                                    <div className="pt-4 flex gap-4 text-[10px] font-black uppercase tracking-widest text-primary/40 border-t border-surface-variant">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span> {prop.bhk}</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">square_foot</span> {prop.builtupArea || '2000 ft'}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
