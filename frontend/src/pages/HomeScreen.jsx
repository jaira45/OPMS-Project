import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';
import { useAuth } from '../context/AuthContext';
import { useComparison } from '../context/ComparisonContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Scale, LayoutGrid, List, SlidersHorizontal, ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Hero from '../components/Hero';
import PropertyReels from '../components/PropertyReels';
import StatsSection from '../components/StatsSection';
import NewsSection from '../components/NewsSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { SkeletonCard } from '../components/Skeleton';

export default function HomeScreen() {
    const navigate = useNavigate();
    const { user, toggleFavorite } = useAuth();
    const { addToCompare, compareList } = useComparison();
    const favorites = user?.favorites || [];
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCollection, setActiveCollection] = useState('ALL PROPERTIES');

    useEffect(() => {
        fetchProperties();
    }, [activeCollection]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const sort = activeCollection.toLowerCase() === 'all properties' ? 'latest' : activeCollection.toLowerCase();
            const res = await fetch(`${API_URL}/api/properties?sort=${sort}`);
            if (res.ok) {
                const data = await res.json();
                const approved = data.properties.filter(p => p.status === 'Approved');
                setFeatured(approved.length > 0 ? approved.slice(0, 5) : fallbackData);
            } else {
                setFeatured(fallbackData);
            }
        } catch (err) {
            setFeatured(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    const fallbackData = [
        { _id: '1', title: 'The Sapphire Manor', price: 24000000, bedrooms: 4, bathrooms: 3, area: 2400, location: 'Indore, MP', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop'], category: 'BUY' },
        { _id: '2', title: 'Heritage Greens', price: 12000000, bedrooms: 4, bathrooms: 3, area: 2400, location: 'Indore, MP', images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'], category: 'BUY' },
        { _id: '3', title: 'Elite Heights', price: 8500000, bedrooms: 3, bathrooms: 2, area: 1800, location: 'Bhopal, MP', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'], category: 'BUY' },
        { _id: '4', title: 'Lakeview Residences', price: 16500000, bedrooms: 3, bathrooms: 3, area: 2200, location: 'Bhopal, MP', images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop'], category: 'BUY' },
        { _id: '5', title: 'Urban Nest', price: 95000000, bedrooms: 2, bathrooms: 2, area: 1200, location: 'Indore, MP', images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop'], category: 'BUY' }
    ];

    return (
        <div className="bg-white dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen pb-0 overflow-x-hidden">
            <Navbar />

            <main>
                {/* Premium Animated Hero */}
                <Hero />

                {/* Property Reels */}
                <PropertyReels />

                {/* Featured Collection Section */}
                <section className="bg-[#F8FAFC] dark:bg-dark-surface/30">
                    <div className="container-responsive py-20">
                        {/* Header Area */}
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">
                            <h2 className="font-headline font-black text-4xl text-primary dark:text-white tracking-tight uppercase">
                                Featured <span className="text-gold-gradient italic font-display lowercase tracking-normal">Holdings</span>
                            </h2>

                            <div className="flex bg-white dark:bg-dark-surface p-1.5 rounded-full border border-slate-200 dark:border-white/5 shadow-sm overflow-x-auto no-scrollbar">
                                {['ALL PROPERTIES', 'BUY', 'RENT', 'LUXURY', 'COMMERCIAL'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCollection(cat)}
                                        className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-500 ${activeCollection === cat ? 'bg-[#071B3A] text-white shadow-lg' : 'text-slate-400 hover:text-primary dark:hover:text-accent'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest">
                                    View All <ArrowRight className="w-4 h-4 ml-1" />
                                </button>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-lg transition-all">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-lg transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Grid Content */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {featured.map((prop, i) => (
                                    <motion.div
                                        key={prop._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.8 }}
                                        className="bg-white dark:bg-dark-surface rounded-3xl p-3 shadow-xl border border-slate-100 dark:border-white/5 cursor-pointer group"
                                        onClick={() => navigate(`/property/${prop._id}`)}
                                    >
                                        {/* Image Box */}
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                                            <img
                                                alt={prop.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                src={(prop.images && prop.images[0]) || prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'}
                                            />
                                            {/* ACTIVE Badge */}
                                            <div className="absolute top-4 left-4">
                                                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    <span className="text-[8px] font-bold text-slate-800 uppercase tracking-widest">Active</span>
                                                </div>
                                            </div>
                                            {/* Heart Button */}
                                            <div className="absolute top-4 right-4">
                                                <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {/* Price Tag */}
                                            <div className="absolute bottom-4 left-4">
                                                <div className="bg-[#071B3A]/80 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-xs ring-1 ring-white/20">
                                                    ₹ {prop.price.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Box */}
                                        <div className="px-2 pb-4 space-y-4">
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight truncate">{prop.title}</h3>
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">{prop.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-white/5">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{prop.bedrooms} <span className="text-slate-400 font-medium">Beds</span></div>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{prop.bathrooms} <span className="text-slate-400 font-medium">Baths</span></div>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <div className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{prop.area} <span className="text-slate-400 font-medium">Sq.ft</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* News & Intelligence */}
                <NewsSection />

                {/* Member Testimonials */}
                <Testimonials />

                {/* Footer and BottomNav */}
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
