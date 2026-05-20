import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
    const navigate = useNavigate();
    const { profileImage } = useAuth();
    const [properties, setProperties] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('Recently Added');

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
            // Fallback mock properties
            const mock = [
                { _id: '1', title: 'The Glass Pavilion', price: '₹4.25 Crore', bhk: '4 BHK', builtupArea: '4200 ft²', location: 'Arera Colony, Bhopal', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
                { _id: '2', title: 'Skyline Heights', price: '₹1.85 Crore', bhk: '3 BHK', builtupArea: '2100 ft²', location: 'Vijay Nagar, Indore', coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
                { _id: '3', title: 'Oakwood Manor', price: '₹95.00 Lakh', bhk: '3 BHK', builtupArea: '1850 ft²', location: 'Civil Lines, Jabalpur', coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' }
            ];
            setProperties(mock);
            const initialFavs = favorites.length > 0 ? favorites : ['1', '2'];
            if (favorites.length === 0) {
                setFavorites(initialFavs);
                localStorage.setItem('favorites', JSON.stringify(initialFavs));
            }
            const saved = mock.filter(p => initialFavs.includes(p._id));
            setSavedProperties(saved);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        const updated = favorites.filter(favId => favId !== id);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const handleSort = (e) => {
        const value = e.target.value;
        setSortOption(value);
        let sorted = [...savedProperties];
        if (value === 'Price: Low to High') {
            sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (value === 'Price: High to Low') {
            sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        }
        setSavedProperties(sorted);
    };

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        let clean = priceStr.toLowerCase();
        let multiplier = 1;
        if (clean.includes('crore')) {
            multiplier = 10000000;
        } else if (clean.includes('lakh')) {
            multiplier = 100000;
        }
        const numeric = parseFloat(clean.replace(/[^\d.]/g, ''));
        return isNaN(numeric) ? 0 : numeric * multiplier;
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden hover:border-primary transition-all shadow-sm">
                        <img className="w-full h-full object-cover rounded-full" src={profileImage} alt="User" />
                    </button>
                    <span className="font-['Manrope'] font-black text-xl text-primary tracking-tighter">The Editorial Estate</span>
                </div>
                <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100/50 transition-transform active:scale-90 text-primary">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>

            <main className="mt-20 px-6">
                <section className="py-8">
                    <div className="flex justify-between items-end mb-6">
                        <div className="text-left">
                            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-1 block">Curated Collection</span>
                            <h2 className="font-['Manrope'] font-black text-3xl text-primary tracking-tight">My Favorites</h2>
                        </div>
                        <div className="flex items-center gap-2 bg-[#eeedf2] px-4 py-2 rounded-full">
                            <span className="material-symbols-outlined text-sm text-on-surface-variant">sort</span>
                            <select 
                                className="bg-transparent border-none text-xs font-bold font-label text-on-surface-variant focus:ring-0 p-0 pr-6 appearance-none cursor-pointer"
                                value={sortOption}
                                onChange={handleSort}
                            >
                                <option>Recently Added</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
                        </div>
                    ) : savedProperties.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-24 h-24 bg-[#eeedf2] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-5xl text-outline-variant">heart_broken</span>
                            </div>
                            <h3 className="font-headline font-bold text-xl text-primary mb-2">No saved properties yet</h3>
                            <p className="text-on-surface-variant max-w-[240px] mb-8 text-sm">Start exploring the finest estates in Madhya Pradesh and save your top choices here.</p>
                            <button onClick={() => navigate('/properties')} className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform text-sm">
                                Start Exploring
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {savedProperties.map((prop) => (
                                <Link key={prop._id} to={`/property/${prop._id}`} className="relative group block">
                                    <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-xl bg-[#f4f3f8]">
                                        <img 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                            alt={prop.title} 
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 right-4 left-4 bg-white p-5 rounded-xl shadow-2xl border border-blue-50/20 text-left">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-headline font-bold text-lg text-primary leading-tight truncate max-w-[150px]">{prop.title}</h3>
                                                <p className="text-on-surface-variant text-[10px] flex items-center gap-1 mt-1 font-bold">
                                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                                    {prop.location}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={(e) => removeFavorite(prop._id, e)} 
                                                className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center transition-all active:scale-90"
                                            >
                                                <span className="material-symbols-outlined text-red-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </button>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center pt-2 border-t border-gray-50">
                                            <span className="font-headline font-black text-sm text-secondary">
                                                ₹ {prop.price.includes('Crore') || prop.price.includes('Lakh') || prop.price.startsWith('₹') ? prop.price.replace('₹', '').trim() : parseInt(prop.price).toLocaleString('en-IN')}
                                            </span>
                                            <div className="flex gap-2 text-on-surface-variant text-[9px] font-black uppercase tracking-tighter">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs text-primary">bed</span> {prop.bhk || '3BHK'}</span>
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs text-primary">aspect_ratio</span> {prop.builtupArea || prop.carpetArea || '1800'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/home">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Home</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/properties">
                    <span className="material-symbols-outlined">search</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Search</span>
                </Link>
                <div className="relative -top-8">
                    <Link to="/add-property" className="bg-secondary text-white p-4 rounded-full shadow-lg scale-110 active:scale-95 transition-transform flex items-center justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                    </Link>
                </div>
                <Link className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 scale-110 transition-all duration-300" to="/favorites">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Saved</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/dashboard">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Admin</span>
                </Link>
            </nav>
        </div>
    );
}
