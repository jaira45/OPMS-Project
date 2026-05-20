import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function HomeScreen() {
    const navigate = useNavigate();
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
        <div className="bg-background text-on-surface min-h-screen pb-24 overflow-x-hidden">
            <Navbar />

            <main className="pt-16 sm:pt-20 space-y-12 sm:space-y-24">
                {/* Immersive Hero Section */}
                <section className="relative h-[60vh] sm:h-[85vh] min-h-[400px] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&auto=format&fit=crop"
                            className="w-full h-full object-cover scale-105"
                            alt="Luxury Real Estate"
                        />
                        <div className="absolute inset-0 bg-black/50 sm:bg-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/90"></div>
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full max-w-6xl flex flex-col items-center space-y-6 sm:space-y-10 animate-fade-in-up">
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl">
                                Properties to <span className="text-secondary-container">call home</span>
                            </h1>
                            <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md text-balance">
                                Discover Madhya Pradesh's most exclusive estates and heritage residences.
                            </p>
                        </div>

                        {/* Search Container */}
                        <div className="w-full max-w-4xl glass p-1.5 sm:p-2 rounded-2xl sm:rounded-full flex flex-col md:flex-row items-stretch gap-2 shadow-2xl">
                            <div className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                                <div className="flex-1 px-4 py-3 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white/60">location_on</span>
                                    <div className="flex flex-col items-start w-full">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Location</span>
                                        <input
                                            type="text"
                                            placeholder="Indore, Bhopal..."
                                            className="bg-transparent border-none p-0 text-sm font-bold text-white placeholder:text-white/30 focus:ring-0 w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 px-4 py-3 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white/60">home_work</span>
                                    <div className="flex flex-col items-start w-full">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Type</span>
                                        <select className="bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0 w-full appearance-none cursor-pointer">
                                            <option className="text-black">All Properties</option>
                                            <option className="text-black">Luxury Villa</option>
                                            <option className="text-black">Modern Flat</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/properties')}
                                className="bg-primary text-white px-8 py-4 sm:py-0 rounded-xl sm:rounded-full font-bold hover:bg-secondary transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">search</span>
                                <span>Find Property</span>
                            </button>
                        </div>
                    </div>
                </section>

                <div className="container-responsive space-y-16 sm:space-y-32">
                    {/* Browse by City */}
                    <section className="space-y-8 sm:space-y-12">
                        <div className="max-w-xl mx-auto text-center space-y-3 px-4">
                            <h2 className="font-headline font-black text-2xl sm:text-4xl text-primary tracking-tight">Browse by City</h2>
                            <p className="text-on-surface-variant text-sm sm:text-base font-medium">Explore premium estates across MP's most iconic locations.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 px-4">
                            {[
                                { name: 'Indore', img: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&h=500&fit=crop' },
                                { name: 'Bhopal', img: 'https://images.unsplash.com/photo-1615569424368-8a8927ae293b?w=500&h=500&fit=crop' },
                                { name: 'Rewa', img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c2f1?w=500&h=500&fit=crop' },
                                { name: 'Jabalpur', img: 'https://images.unsplash.com/photo-1626014303757-6bc9277f722e?w=500&h=500&fit=crop' },
                                { name: 'Ujjain', img: 'https://images.unsplash.com/photo-1627844718626-4c6b9636402b?w=500&h=500&fit=crop' },
                                { name: 'Gwalior', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a4c7?w=500&h=500&fit=crop' }
                            ].map((city) => (
                                <div key={city.name} onClick={() => navigate('/properties')} className="flex flex-col items-center gap-3 group cursor-pointer">
                                    <div className="w-full aspect-square rounded-3xl overflow-hidden border border-surface-variant shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                                        <img alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={city.img} />
                                    </div>
                                    <span className="text-xs sm:text-sm font-black text-primary uppercase tracking-widest">{city.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Featured Properties */}
                    <section className="space-y-12 px-4">
                        <div className="max-w-xl mx-auto text-center space-y-3">
                            <h2 className="font-headline font-black text-2xl sm:text-4xl text-primary tracking-tight">Featured Properties</h2>
                            <p className="text-on-surface-variant text-sm sm:text-base font-medium">Hand-picked premium listings in the most desirable neighborhoods.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {featured.map((prop) => (
                                <div key={prop._id} onClick={() => navigate(`/property/${prop._id}`)} className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-lg">
                                        <img alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={prop.coverImage} />
                                        <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
                                            <span className="text-primary font-black text-sm">{prop.price}</span>
                                        </div>
                                        <button
                                            onClick={(e) => toggleFavorite(prop._id, e)}
                                            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${favorites.includes(prop._id) ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'glass text-white'}`}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: favorites.includes(prop._id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                                        </button>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <h3 className="font-headline font-bold text-lg sm:text-xl text-primary group-hover:text-secondary transition-colors">{prop.title}</h3>
                                        <div className="flex items-center gap-4 text-on-surface-variant text-xs sm:text-sm font-semibold">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-secondary text-lg">bed</span>
                                                {prop.bhk}
                                            </div>
                                            <div className="flex items-center gap-1.5">
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
                    <section className="px-4">
                        <div className="bg-primary/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                            <div className="relative z-10 flex-1 space-y-6">
                                <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-secondary/20">New Launch</span>
                                <h2 className="text-primary font-headline font-black text-3xl sm:text-5xl leading-tight">The Oasis Heights</h2>
                                <p className="text-on-surface-variant text-base sm:text-lg max-w-lg">Smart living starts at ₹45 Lakh in the heart of the city's new commercial district.</p>
                                <button onClick={() => navigate('/properties')} className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-all">Explore Project</button>
                            </div>
                            <div className="relative flex-1 w-full aspect-video md:aspect-square rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <img alt="Modern Architecture" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop" />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
