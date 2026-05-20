import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
    const navigate = useNavigate();
    const { token, profileImage, logout } = useAuth();
    const [featured, setFeatured] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                // Filter approved properties
                const approved = data.properties.filter(p => p.status === 'Approved');
                if (approved.length > 0) {
                    setFeatured(approved.slice(0, 3));
                } else {
                    getFallbackProperties();
                }
            } else {
                getFallbackProperties();
            }
        } catch (err) {
            console.error('Error fetching featured properties:', err);
            getFallbackProperties();
        }
    };

    const getFallbackProperties = () => {
        setFeatured([
            { _id: '1', title: 'The Sapphire Manor', price: '₹ 2.4 Crore', bhk: '3 BHK', location: 'Vijay Nagar, Indore', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop' },
            { _id: '2', title: 'Lakeview Residency', price: '₹ 85 Lakh', bhk: '2 BHK', location: 'Arera Colony, Bhopal', coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop' },
            { _id: '3', title: 'Heritage Greens', price: '₹ 1.2 Crore', bhk: '4 BHK', location: 'City Center, Gwalior', coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop' }
        ]);
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

    return (
        <div className="bg-surface font-['Manrope'] text-on-surface min-h-screen pb-24 overflow-x-hidden">
            {/* Premium Modern Navbar */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/home')}>
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                            <span className="material-symbols-outlined text-white">apartment</span>
                        </div>
                        <span className="font-black text-xl text-primary tracking-tighter">OPMS</span>
                    </div>

                    {/* Navigation Menu (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Home', 'Properties', 'About', 'Agents'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/home' : item === 'Properties' ? '/properties' : '#'}
                                className="text-sm font-bold text-gray-600 hover:text-primary transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth CTA */}
                    <div className="flex items-center gap-3">
                        {token ? (
                            <>
                                {/* Avatar → go to dashboard */}
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden hover:border-primary transition-all shadow-sm"
                                    title="My Dashboard"
                                >
                                    <img alt="Profile" src={profileImage} className="w-full h-full object-cover rounded-full" />
                                </button>

                                {/* Dashboard shortcut (desktop) */}
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="hidden sm:block bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-md shadow-primary/20"
                                >
                                    Dashboard
                                </button>

                                {/* Logout */}
                                <button
                                    onClick={() => { logout(); navigate('/login'); }}
                                    className="hidden sm:flex items-center gap-1.5 border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all"
                                    title="Logout"
                                >
                                    <span className="material-symbols-outlined text-base">logout</span>
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login */}
                                <button
                                    onClick={() => navigate('/login')}
                                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
                                >
                                    Login
                                </button>

                                {/* Get Started */}
                                <button
                                    onClick={() => navigate('/login')}
                                    className="hidden sm:block bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-primary/20"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="space-y-24">
                {/* Immersive Hero Section */}
                <section className="relative h-[85vh] min-h-[600px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&auto=format&fit=crop"
                            className="w-full h-full object-cover scale-105 animate-[pulse_30s_infinite]"
                            alt="Luxury Real Estate"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-surface/90"></div>
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full max-w-5xl flex flex-col items-center space-y-8 mt-12">
                        <div className="space-y-4 animate-fade-in-up">
                            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-xl">
                                Properties to call home
                            </h1>
                            <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                                Discover Madhya Pradesh's most exclusive estates and heritage residences.
                            </p>
                        </div>

                        {/* Modern White Search UI Container */}
                        <div className="w-full max-w-3xl space-y-0 animate-fade-in-up delay-200">
                            {/* Tabs */}
                            <div className="flex justify-center">
                                <div className="bg-white/95 backdrop-blur-md rounded-t-2xl px-2 py-1 flex items-center gap-1 shadow-2xl">
                                    {['Buy', 'Rent', 'Sold', 'Agents'].map((tab, i) => (
                                        <button
                                            key={tab}
                                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary text-white shadow-lg' : 'text-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rounded Search Box */}
                            <div className="bg-white rounded-[2.5rem] md:rounded-full p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-2 border border-blue-50/10">
                                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                                    <div className="px-6 py-3 flex items-center gap-4 group transition-colors hover:bg-gray-50/80 rounded-full md:rounded-l-full">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">location_on</span>
                                        <div className="flex flex-col items-start w-full">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Search Area</span>
                                            <input
                                                type="text"
                                                placeholder="Bhopal, Indore..."
                                                className="bg-transparent border-none p-0 text-sm font-bold text-primary placeholder:text-gray-300 focus:ring-0 w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-6 py-3 flex items-center gap-4 group transition-colors hover:bg-gray-50/80 rounded-full md:rounded-none">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">home_work</span>
                                        <div className="flex flex-col items-start w-full">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Estate Type</span>
                                            <select className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 w-full appearance-none cursor-pointer">
                                                <option>All Properties</option>
                                                <option>Luxury Villa</option>
                                                <option>Heritage Home</option>
                                                <option>Modern Flat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/properties')}
                                    className="w-full md:w-auto bg-primary hover:bg-secondary text-white px-10 h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-bold shadow-lg shadow-primary/20 active:scale-95 group"
                                >
                                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">search</span>
                                    <span>Find Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 space-y-24">
                    {/* Browse by City */}
                    <section className="space-y-12">
                        <div className="max-w-xl mx-auto text-center space-y-3">
                            <h2 className="font-['Manrope'] font-black text-4xl text-primary tracking-tight">Browse by City</h2>
                            <p className="text-on-surface-variant text-sm font-medium">Explore premium estates across Madhya Pradesh's most iconic locations.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
                            {[
                                { name: 'Indore', img: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&h=500&fit=crop' },
                                { name: 'Bhopal', img: 'https://images.unsplash.com/photo-1599661046289-e31887846eac?w=500&h=500&fit=crop' },
                                { name: 'Rewa', img: 'https://images.unsplash.com/photo-1616016147414-972d3fccdd30?w=500&h=500&fit=crop' },
                                { name: 'Jabalpur', img: 'https://images.unsplash.com/photo-1626014303757-6bc9277f722e?w=500&h=500&fit=crop' },
                                { name: 'Ujjain', img: 'https://images.unsplash.com/photo-1627844718626-4c6b9636402b?w=500&h=500&fit=crop' },
                                { name: 'Gwalior', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a4c7?w=500&h=500&fit=crop' }
                            ].map((city) => (
                                <div key={city.name} onClick={() => navigate('/properties')} className="flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 hover:-translate-y-2">
                                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2.5rem] bg-white p-2 border border-blue-50/20 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:bg-[#ffddb8]/10 transition-all duration-500">
                                        <img alt={city.name} className="w-full h-full rounded-[2rem] object-cover" src={city.img} />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-black text-primary uppercase tracking-widest group-hover:text-secondary transition-colors">{city.name}</span>
                                        <div className="w-0 h-0.5 bg-secondary mx-auto group-hover:w-full transition-all duration-300 mt-1"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Featured Properties */}
                    <section className="space-y-12">
                        <div className="max-w-xl mx-auto text-center space-y-3">
                            <h2 className="font-['Manrope'] font-black text-4xl text-primary tracking-tight">Featured Properties</h2>
                            <p className="text-on-surface-variant text-sm font-medium">Hand-picked premium listings in the most desirable neighborhoods.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featured.map((prop) => (
                                <div key={prop._id} onClick={() => navigate(`/property/${prop._id}`)} className="group cursor-pointer text-left">
                                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                                        <img
                                            alt={prop.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'}
                                        />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                            <span className="text-secondary font-headline font-black text-sm">
                                                ₹ {prop.price.includes('Crore') || prop.price.includes('Lakh') || prop.price.startsWith('₹') ? prop.price.replace('₹', '').trim() : parseInt(prop.price).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <button
                                            onClick={(e) => toggleFavorite(prop._id, e)}
                                            className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all ${favorites.includes(prop._id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: favorites.includes(prop._id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                        </button>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <h3 className="font-headline font-bold text-xl text-primary group-hover:text-secondary transition-colors underline-offset-4 decoration-secondary">{prop.title}</h3>
                                        <div className="flex items-center gap-6 text-on-surface-variant text-sm font-semibold">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-secondary text-lg">bed</span>
                                                {prop.bhk || '3 BHK'}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                                                {prop.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* New Launch Banner */}
                    <section className="bg-primary/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group text-left">
                        <div className="relative z-10 max-w-md space-y-6">
                            <span className="bg-secondary/20 text-secondary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-secondary/20">New Launch</span>
                            <h2 className="text-primary font-['Manrope'] font-black text-3xl md:text-5xl leading-tight text-left">The Oasis Heights</h2>
                            <p className="text-primary/70 text-base md:text-lg text-left">Smart living starts at just ₹45 Lakh in the heart of Rewa.</p>
                            <button onClick={() => navigate('/properties')} className="bg-primary hover:bg-secondary text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-xl shadow-primary/20">Explore Now</button>
                        </div>
                        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 md:opacity-100 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                            <img alt="Commercial Property" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop" />
                        </div>
                    </section>
                </div>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <Link className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 scale-110 transition-all duration-300" to="/home">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
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
                <Link className="flex flex-col items-center justify-center text-gray-400" to="/favorites">
                    <span className="material-symbols-outlined">favorite</span>
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
