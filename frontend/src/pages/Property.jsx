import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';

export default function Property() {
    const navigate = useNavigate();
    const { profileImage } = useAuth();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('Indore');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                // Filter only approved properties or fallback if empty
                const approvedOnly = data.properties.filter(p => p.status === 'Approved');
                setProperties(data.properties); // Keep all for references
                setFilteredProperties(approvedOnly.length > 0 ? approvedOnly : data.properties);
            }
        } catch (err) {
            console.error('Error fetching properties:', err);
            // Fallback mock properties if API fails
            const mock = [
                { _id: '1', title: '2BHK Flat in Vijay Nagar', price: '45,00,000', bhk: '2BHK', builtupArea: '1050 sq.ft', location: 'Vijay Nagar, Indore', status: 'Approved', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzSO4vGYQ8jvPNOwqXF7TjHUcoy8XAM4LkRFmvfW8D_vcuYpDmdYkggSk_IY2VmOwS1vDUi_MeChJP9CyFITX-PJ_Ed1TwaCrutbnyt2ehVi7J_5x8v6aVkJKCK1W9rHlwdZMSY432X4v2S2KKNrDXPP5BWjC-udFCR3qDat9fx3g6PwT1qPU46gM-JvSNv3BxOgO6E5bZwWlTa5QCv8yxP_vJ7tKZopTUC8iT1hTorVNA21Md5K3SuHWrbGesYUeE_QqdI8Gtcg' },
                { _id: '2', title: 'Emerald Heights Residency', price: '58,75,000', bhk: '3BHK', builtupArea: '1180 sq.ft', location: 'Bypass Road, Indore', status: 'Approved', coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGdlbMHbnvdXuFjfwxR5fdSY-Lht5o5ECbTBYuw3yViehH8JeewEMddn-E1_F7Bisowv_fxnMMhPZ39aofUF82g3mtJr6qbW7RM7afCMkNOIMikA7PKPpyZjyJskpUr6KDCtqyBKLSJFfNvlOPzYSvHLwAUTKVRzL0DjZM6kJgNyh5wH3wovlPiPniVyk0jcQeDMg24vnizud4TfTxDCHDH8d4JVfFdPLGq1E5PD-Fn1kdTe3KjCYW0oNdJZJoNBqnC_OG2qDp0w' }
            ];
            setProperties(mock);
            setFilteredProperties(mock);
        } finally {
            setLoading(false);
        }
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
        // Filter by approved
        const approved = results.filter(p => p.status === 'Approved');
        if (approved.length > 0) results = approved;

        if (search) {
            results = results.filter(p => 
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.location.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (city) {
            results = results.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
        }
        setFilteredProperties(results);
    };

    const selectCityFilter = (city) => {
        setSelectedCity(city);
        filterResults(searchTerm, city);
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden hover:border-primary transition-all shadow-sm">
                        <img alt="User Profile" className="w-full h-full object-cover rounded-full" src={profileImage} />
                    </button>
                    <span className="font-['Manrope'] font-black text-xl text-primary tracking-tighter">Properties</span>
                </div>
                <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100/50 transition-transform active:scale-90 text-primary">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>

            <main className="pt-20 px-4 space-y-6">
                {/* Search Section */}
                <section className="mt-4">
                    <div className="relative group">
                        <div className="bg-[#eeedf2] rounded-full px-6 py-4 flex items-center gap-4 transition-all focus-within:ring-2 focus-within:ring-[#002452]/20">
                            <span className="material-symbols-outlined text-outline">search</span>
                            <input 
                                className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline font-medium" 
                                placeholder="Search premium estates..." 
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <span className="material-symbols-outlined text-primary">tune</span>
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
                        {['Indore', 'Bhopal', 'Gwalior', 'Rewa'].map((city) => (
                            <button 
                                key={city} 
                                onClick={() => selectCityFilter(city)}
                                className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                                    selectedCity === city 
                                    ? 'bg-[#ffddb8] text-[#2a1700] border border-[#ffb95f]/20 shadow-sm' 
                                    : 'bg-[#eeedf2] text-on-surface-variant'
                                }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Listings Section */}
                <section className="space-y-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="font-headline font-bold text-2xl text-primary tracking-tight">Curated Estates</h2>
                            <p className="text-on-surface-variant text-sm">{filteredProperties.length} properties found</p>
                        </div>
                        <button className="text-secondary font-bold text-sm flex items-center gap-1">
                            Sort by <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-on-surface-variant">No matching properties found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {filteredProperties.map((prop) => (
                                <Link 
                                    key={prop._id} 
                                    to={`/property/${prop._id}`} 
                                    className="group relative bg-[#ffffff] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block"
                                >
                                    <div className="relative h-64 w-full">
                                        <img 
                                            alt={prop.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                            src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                        />
                                        {/* Floating Price */}
                                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg transform -rotate-1">
                                            <span className="font-headline font-extrabold text-secondary text-lg tracking-tight">
                                                ₹ {prop.price.includes('Crore') || prop.price.includes('Lakh') || prop.price.startsWith('₹') ? prop.price.replace('₹', '').trim() : parseInt(prop.price).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        {/* Verified Badge */}
                                        <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                            Verified
                                        </div>
                                    </div>

                                    <div className="p-6 pt-8">
                                        <h3 className="font-headline font-bold text-xl text-primary leading-tight mb-2">{prop.title}</h3>
                                        <div className="flex items-center gap-4 text-on-surface-variant text-sm font-medium">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-lg">square_foot</span>
                                                {prop.builtupArea || prop.carpetArea || '1200 sq.ft'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-lg">location_on</span>
                                                {prop.location}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex gap-2">
                                            <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold transition-transform active:scale-95">Contact Seller</button>
                                            <button 
                                                onClick={(e) => toggleFavorite(prop._id, e)} 
                                                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                                                    favorites.includes(prop._id) 
                                                    ? 'bg-red-50 text-red-500 shadow-sm border border-red-100' 
                                                    : 'bg-[#eeedf2] text-primary'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: favorites.includes(prop._id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/home">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Home</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 scale-110 transition-all duration-300" to="/properties">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Search</span>
                </Link>
                <div className="relative -top-8">
                    <Link to="/add-property" className="bg-secondary text-white p-4 rounded-full shadow-lg scale-110 active:scale-95 transition-transform flex items-center justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                    </Link>
                </div>
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/favorites">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Saved</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/admin">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Admin</span>
                </Link>
            </nav>
        </div>
    );
}
