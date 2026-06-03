import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';
import { useAuth } from '../context/AuthContext';
import { useComparison } from '../context/ComparisonContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Scale, LayoutGrid, List, SlidersHorizontal, ArrowRight } from 'lucide-react';
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
    const [activeCollection, setActiveCollection] = useState('LATEST'); // LATEST | POPULAR | LUXURY | RECENT
    const collections = [
        { id: 'LATEST', label: 'Latest Properties', sort: 'latest' },
        { id: 'POPULAR', label: 'Popular Properties', sort: 'popular' },
        { id: 'LUXURY', label: 'Luxury Properties', sort: 'luxury' },
        { id: 'RECENT', label: 'Recently Added', sort: 'recent' },
    ];

    useEffect(() => {
        fetchProperties();
    }, [activeCollection]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const sort = collections.find(c => c.id === activeCollection)?.sort || 'latest';
            const res = await fetch(`${API_URL}/api/properties?sort=${sort}`);
            if (res.ok) {
                const data = await res.json();
                const approved = data.properties.filter(p => p.status === 'Approved');
                setFeatured(approved.length > 0 ? approved.slice(0, 6) : fallbackData);
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
        { _id: '1', title: 'The Sapphire Manor', price: 24000000, bedrooms: 3, bathrooms: 2, location: 'Vijay Nagar, Indore', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop'], category: 'BUY' },
        { _id: '2', title: 'Lakeview Residency', price: 8500000, bedrooms: 2, bathrooms: 2, location: 'Arera Colony, Bhopal', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'], category: 'RENT' },
        { _id: '3', title: 'Heritage Greens', price: 12000000, bedrooms: 4, bathrooms: 3, location: 'City Center, Gwalior', images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop'], category: 'BUY' }
    ];

    return (
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen pb-0 overflow-x-hidden">
            <Navbar />

            <main>
                {/* Premium Animated Hero */}
                <Hero />

                {/* Platform Growth Metrics */}
                <StatsSection />

                {/* Property Reels */}
                <PropertyReels />

                {/* Featured Collection */}
                <section className="container-responsive py-40 space-y-24">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="space-y-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/5 dark:bg-dark-primary/10 border border-primary/10 text-primary dark:text-dark-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em]"
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Exclusive Inventory
                            </motion.div>
                            <h2 className="font-headline font-black text-6xl sm:text-8xl text-primary dark:text-dark-on-surface tracking-tighter uppercase leading-[0.85]">
                                Featured <span className="text-gold-gradient italic font-display lowercase tracking-normal">Holdings</span>
                            </h2>
                        </div>
                        
                        <div className="flex bg-white dark:bg-dark-surface p-2 rounded-[3rem] border border-surface-variant dark:border-dark-surface-variant shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-x-auto no-scrollbar max-w-full">
                            {collections.map((col) => (
                                <button
                                    key={col.id}
                                    onClick={() => setActiveCollection(col.id)}
                                    className={`px-10 py-5 rounded-[2.5rem] text-[10px] font-black tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-500 ${activeCollection === col.id ? 'bg-gold-gradient text-primary shadow-xl' : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary'}`}
                                >
                                    {col.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                            {featured.map((prop, i) => (
                                <motion.div 
                                    key={prop._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="group cursor-pointer flex flex-col gap-10"
                                    onClick={() => navigate(`/property/${prop._id}`)}
                                >
                                    <div className="relative overflow-hidden rounded-[4rem] aspect-[4/5] shadow-[0_48px_80px_-20px_rgba(0,0,0,0.15)] bg-slate-200 dark:bg-dark-surface group-hover:-translate-y-4 transition-all duration-700">
                                        <img 
                                            alt={prop.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                                            src={(prop.images && prop.images[0]) || prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                        />
                                        
                                        {/* Status & Price Tags */}
                                        <div className="absolute top-10 left-10 flex flex-col gap-3">
                                            <div className="bg-white/10 backdrop-blur-2xl px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3">
                                                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                                                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Verified Asset</span>
                                            </div>
                                            <div className="bg-gold-gradient text-primary px-8 py-3.5 rounded-2xl shadow-2xl font-black text-xl tracking-tighter">
                                                ₹ {typeof prop.price === 'number' ? prop.price.toLocaleString() : prop.price}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="absolute top-10 right-10 flex flex-col gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => { e.stopPropagation(); toggleFavorite(prop._id); }}
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${favorites.includes(prop._id) ? 'bg-red-500 text-white shadow-red-500/40' : 'bg-white/10 backdrop-blur-2xl border border-white/20 text-white hover:bg-white hover:text-primary'}`}
                                            >
                                                <Heart className="w-6 h-6" fill={favorites.includes(prop._id) ? "currentColor" : "none"} />
                                            </motion.button>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white"
                                            >
                                                <ArrowRight className="w-8 h-8" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 px-4">
                                        <div className="flex justify-between items-start gap-6">
                                            <h3 className="font-headline font-black text-4xl text-primary dark:text-dark-on-surface leading-[0.9] tracking-tighter uppercase italic group-hover:text-[#D4AF37] transition-colors">{prop.title}</h3>
                                            <div className="flex flex-col items-end shrink-0">
                                                <span className="text-[#D4AF37] font-display text-xl lowercase italic leading-none">{prop.location?.split(',')[0] || 'Exclusive'}</span>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-primary/30 dark:text-white/20 mt-1">Domain</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-8 border-t border-primary/5 dark:border-white/5">
                                            <div className="flex flex-col gap-1 items-center">
                                                <span className="text-2xl font-black text-primary dark:text-dark-on-surface leading-none tabular-nums">{prop.bedrooms || 3}</span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Beds</span>
                                            </div>
                                            <div className="w-px h-8 bg-primary/10 dark:bg-white/10" />
                                            <div className="flex flex-col gap-1 items-center">
                                                <span className="text-2xl font-black text-primary dark:text-dark-on-surface leading-none tabular-nums">{prop.bathrooms || 2}</span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Baths</span>
                                            </div>
                                            <div className="w-px h-8 bg-primary/10 dark:bg-white/10" />
                                            <div className="flex flex-col gap-1 items-center">
                                                <span className="text-2xl font-black text-primary dark:text-dark-on-surface leading-none tabular-nums">{prop.area || 2400}</span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-40 text-center">SQFT Area</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="text-center pt-24">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/properties')} 
                            className="inline-flex items-center gap-10 bg-primary dark:bg-dark-surface text-white px-20 py-8 rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_40px_80px_-20px_rgba(0,30,60,0.3)] active:scale-95 group border border-white/5"
                        >
                            Explore Universal Catalog
                            <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-primary group-hover:translate-x-3 transition-transform shadow-lg shadow-accent/20">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </motion.button>
                    </div>
                </section>

                {/* News & Intelligence */}
                <NewsSection />

                {/* Testimonials */}
                <Testimonials />

                {/* Call to Action */}
                <section className="container-responsive py-40">
                    <div className="bg-primary dark:bg-dark-surface rounded-[5rem] p-16 sm:p-32 relative overflow-hidden flex flex-col items-center text-center space-y-16 group shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
                        
                        <div className="relative z-10 space-y-10 max-w-4xl">
                            <h2 className="font-headline font-black text-6xl sm:text-9xl text-white tracking-tighter leading-[0.85] uppercase">
                                Reserve your <br />
                                <span className="text-gold-gradient italic font-display lowercase tracking-normal">Legacy</span>
                            </h2>
                            <p className="text-white/50 font-medium text-lg sm:text-2xl tracking-wide max-w-2xl mx-auto">Join Central India's most exclusive network of elite homeowners and investors.</p>
                        </div>
                        
                        <div className="relative z-10 w-full max-w-2xl flex flex-col sm:flex-row gap-6">
                            <input
                                type="email"
                                placeholder="Corporate Email Address..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-12 py-7 text-white placeholder:text-white/20 focus:border-[#D4AF37] outline-none font-black transition-all text-[11px] uppercase tracking-[0.3em]"
                            />
                            <button className="bg-gold-gradient text-primary px-16 py-7 rounded-full font-black uppercase tracking-[0.4em] text-[11px] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all active:scale-95 whitespace-nowrap">
                                Join Network
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
