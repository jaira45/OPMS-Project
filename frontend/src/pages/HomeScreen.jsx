import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function HomeScreen() {
    const navigate = useNavigate();
    const [featured, setFeatured] = useState([]);
    const [activeTab, setActiveTab] = useState('BUY');
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
                {/* Modern Hero Section */}
                <section className="relative h-[70vh] sm:h-[90vh] min-h-[500px] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Modern Luxury Home"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/100"></div>
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 w-full max-w-5xl flex flex-col items-center space-y-8 animate-fade-in-up">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                                Properties to <span className="text-secondary underline decoration-secondary/40 italic">call home</span>
                            </h1>
                            <p className="text-sm sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md text-balance">
                                Discover Madhya Pradesh's most exclusive estates and heritage residences with ease.
                            </p>
                        </div>

                        {/* Search Component Container */}
                        <div className="w-full max-w-4xl space-y-5">
                            {/* Tabs Row */}
                            <div className="flex justify-center">
                                <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-2xl border border-white/20">
                                    {['BUY', 'RENT', 'SOLD', 'AGENTS'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 tracking-widest ${
                                                activeTab === tab 
                                                ? 'bg-primary text-white shadow-lg shadow-primary/40' 
                                                : 'text-primary hover:bg-primary/5'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Search Bar Row */}
                            <div className="bg-white rounded-3xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-3 border border-surface-variant/50">
                                <div className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-surface-variant">
                                    {/* Location Input */}
                                    <div className="flex-1 px-6 py-3 flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">location_on</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Location</span>
                                            <input
                                                type="text"
                                                placeholder="Where are you looking?"
                                                className="bg-transparent border-none p-0 text-sm sm:text-base font-bold text-primary placeholder:text-on-surface-variant/20 focus:ring-0 w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Type Dropdown */}
                                    <div className="flex-1 px-6 py-3 flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">home_work</span>
                                        </div>
                                        <div className="flex flex-col items-start w-full">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Property Type</span>
                                            <select className="bg-transparent border-none p-0 text-sm sm:text-base font-bold text-primary focus:ring-0 w-full appearance-none cursor-pointer">
                                                <option>All Properties</option>
                                                <option>Luxury Villa</option>
                                                <option>Modern Flat</option>
                                                <option>Commercial</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Find Now Button */}
                                <button
                                    onClick={() => navigate(activeTab === 'AGENTS' ? '/agents' : '/properties')}
                                    className="bg-secondary hover:bg-primary text-white px-10 py-5 sm:py-0 rounded-2xl sm:rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-secondary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
                                >
                                    <span className="material-symbols-outlined font-bold">search</span>
                                    <span>Find Now</span>
                                </button>
                            </div>
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
                                { name: 'Indore', img: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&auto=format&fit=crop' },
                                { name: 'Bhopal', img: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=500&auto=format&fit=crop' },
                                { name: 'Rewa', img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c2f1?w=500&auto=format&fit=crop' },
                                { name: 'Jabalpur', img: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=500&auto=format&fit=crop' },
                                { name: 'Ujjain', img: 'https://images.unsplash.com/photo-1627844718626-4c6b9636402b?w=500&auto=format&fit=crop' },
                                { name: 'Gwalior', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a4c7?w=500&auto=format&fit=crop' }
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

                    {/* Trust Section */}
                    <section className="bg-primary text-white rounded-[3rem] p-8 sm:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl sm:text-6xl font-black leading-tight tracking-tighter text-balance">The most trusted name in MP Real Estate.</h2>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <div className="text-3xl sm:text-4xl font-black text-secondary-container">100%</div>
                                        <p className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest">Verified Listings</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-3xl sm:text-4xl font-black text-secondary-container">24/7</div>
                                        <p className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest">Agent Support</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 lg:pl-12 border-l border-white/10">
                                <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                                    We don't just sell houses; we build communities. Our platform is designed to give you peace of mind throughout the entire buying or renting process.
                                </p>
                                <button onClick={() => navigate('/about')} className="flex items-center gap-3 text-secondary-container font-black hover:gap-5 transition-all">
                                    <span>Learn more about our mission</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Final Contact CTA */}
                    <section className="text-center space-y-10 pb-12">
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-3xl sm:text-5xl font-black text-primary tracking-tighter">Ready to find your dream home?</h2>
                            <p className="text-on-surface-variant font-medium text-base sm:text-lg">Our experts are standing by to help you find the perfect property in Madhya Pradesh.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => navigate('/properties')} className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full font-black text-lg hover:bg-secondary transition-all shadow-xl shadow-primary/20">Browse Properties</button>
                            <button onClick={() => navigate('/contact')} className="w-full sm:w-auto glass text-primary px-10 py-5 rounded-full font-black text-lg hover:border-primary transition-all">Contact Us</button>
                        </div>
                    </section>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
