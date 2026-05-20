import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function Property() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');

    const cities = ['All', 'Indore', 'Bhopal', 'Gwalior', 'Rewa', 'Jabalpur', 'Ujjain'];

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                setProperties(data.properties);
                setFilteredProperties(data.properties.filter(p => p.status === 'Approved' || p.status === 'Pending'));
            }
        } catch (err) {
            console.error('Error fetching properties:', err);
            getFallbackProperties();
        } finally {
            setLoading(false);
        }
    };

    const getFallbackProperties = () => {
        const mock = [
            { _id: '1', title: 'The Sapphire Manor', price: '₹ 2.4 Crore', bhk: '3 BHK', location: 'Vijay Nagar, Indore', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop' },
            { _id: '2', title: 'Lakeview Residency', price: '₹ 85 Lakh', bhk: '2 BHK', location: 'Arera Colony, Bhopal', coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop' },
            { _id: '3', title: 'Heritage Greens', price: '₹ 1.2 Crore', bhk: '4 BHK', location: 'City Center, Gwalior', coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop' }
        ];
        setProperties(mock);
        setFilteredProperties(mock);
    };

    const toggleFavorite = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        let updated;
        if (favorites.includes(id)) {
            updated = favorites.filter(favId => favId !== id);
        } else {
            updated = [...favorites, id];
        }
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterResults(value, selectedCity);
    };

    const filterResults = (search, city) => {
        let results = properties;
        if (search) {
            results = results.filter(p => 
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.location.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (city !== 'All') {
            results = results.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
        }
        setFilteredProperties(results);
    };

    const selectCityFilter = (city) => {
        setSelectedCity(city);
        filterResults(searchTerm, city);
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-24 overflow-x-hidden">
            <Navbar />

            <main className="pt-20 sm:pt-28 container-responsive space-y-8 sm:space-y-12">
                {/* Search & Filters */}
                <section className="space-y-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="glass rounded-2xl sm:rounded-full px-6 py-4 sm:py-5 flex items-center gap-4 transition-all focus-within:ring-2 focus-within:ring-primary/20 shadow-xl">
                            <span className="material-symbols-outlined text-on-surface-variant">search</span>
                            <input 
                                className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-on-surface-variant font-bold text-base sm:text-lg" 
                                placeholder="Search premium estates..." 
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full text-sm font-bold">
                                <span className="material-symbols-outlined text-sm">tune</span>
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3 overflow-x-auto py-2 scroll-smooth no-scrollbar">
                        {cities.map((city) => (
                            <button 
                                key={city} 
                                onClick={() => selectCityFilter(city)}
                                className={`px-6 py-2.5 rounded-full font-black text-xs sm:text-sm whitespace-nowrap transition-all border-2 ${
                                    selectedCity === city 
                                    ? 'bg-primary text-white border-primary shadow-lg' 
                                    : 'bg-surface border-surface-variant text-on-surface-variant hover:border-primary/30'
                                }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Listings Grid */}
                <section className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                        <div>
                            <h2 className="font-headline font-black text-2xl sm:text-3xl text-primary tracking-tight">Curated Estates</h2>
                            <p className="text-on-surface-variant text-sm font-bold">{filteredProperties.length} active listings</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-black text-primary uppercase tracking-widest cursor-pointer group">
                            <span>Sort By Default</span>
                            <span className="material-symbols-outlined group-hover:translate-y-0.5 transition-transform">expand_more</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-32 gap-4">
                            <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                            <span className="text-sm font-black text-primary uppercase tracking-tighter">Fetching Properties...</span>
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-32 space-y-4 glass rounded-[2rem]">
                            <span className="material-symbols-outlined text-6xl text-primary/20">search_off</span>
                            <p className="text-on-surface-variant font-bold text-lg">No properties found in this location.</p>
                            <button onClick={() => selectCityFilter('All')} className="text-primary font-black underline uppercase tracking-widest text-sm">Clear Filters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                            {filteredProperties.map((prop) => (
                                <Link 
                                    key={prop._id} 
                                    to={`/property/${prop._id}`} 
                                    className="group flex flex-col bg-surface rounded-[2.5rem] overflow-hidden border border-surface-variant hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img 
                                            alt={prop.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                            src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                        />
                                        <div className="absolute top-5 left-5 glass px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-lg">
                                            <span className="text-primary font-black text-sm">₹ {prop.price.replace('₹', '').trim()}</span>
                                        </div>
                                        <button 
                                            onClick={(e) => toggleFavorite(prop._id, e)} 
                                            className={`absolute top-5 right-5 w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                                                favorites.includes(prop._id) 
                                                ? 'bg-red-500 text-white' 
                                                : 'glass text-white hover:scale-110'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: favorites.includes(prop._id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                        </button>
                                    </div>

                                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="font-headline font-black text-xl sm:text-2xl text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-1">{prop.title}</h3>
                                            <div className="flex items-center gap-2 text-on-surface-variant">
                                                <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                                                <span className="text-sm font-bold truncate">{prop.location}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-surface-variant/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-lg">bed</span>
                                                </div>
                                                <span className="text-xs font-black text-primary uppercase">{prop.bhk || '3 BHK'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-lg">square_foot</span>
                                                </div>
                                                <span className="text-xs font-black text-primary uppercase">{prop.carpetArea || prop.builtupArea || '1200 sqft'}</span>
                                            </div>
                                        </div>
                                        
                                        <button className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95">View Details</button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
