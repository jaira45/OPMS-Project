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

import PropertyCard from '../components/PropertyCard';

export default function HomeScreen() {
    const navigate = useNavigate();
    const { user } = useAuth();
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
                setFeatured(approved.length > 0 ? approved.slice(0, 4) : fallbackData);
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
        { _id: '4', title: 'Lakeview Residences', price: 16500000, bedrooms: 3, bathrooms: 3, area: 2200, location: 'Bhopal, MP', images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop'], category: 'BUY' }
    ];

    return (
        <div className="bg-[#071B3A] text-white min-h-screen pb-0 overflow-x-hidden">
            <Navbar />

            <main>
                {/* ─ Cinematic Hero Terminal ──────────────────────────────── */}
                <Hero />

                {/* ─ Viral Property Reels ─────────────────────────────────── */}
                <PropertyReels />

                {/* ─ The Imperial Gallery ─────────────────────────────────── */}
                <section className="relative py-48 overflow-hidden">
                    {/* Background Decorative */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/[0.03] blur-[180px] rounded-full -mr-96 -mt-96" />
                    
                    <div className="container-responsive space-y-24">
                        {/* Section Intel */}
                        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-white/10 pb-16">
                            <div className="space-y-8">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl"
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                    Elite Acquisitions
                                </motion.div>
                                <h2 className="font-headline font-black text-6xl sm:text-8xl md:text-[9.5rem] text-white tracking-tighter uppercase leading-[0.8] italic">
                                    Imperial <span className="text-gold-gradient italic font-display lowercase tracking-normal block lg:inline">Gallery</span>
                                </h2>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/10 shadow-3xl overflow-x-auto no-scrollbar">
                                    {['ALL PROPERTIES', 'BUY', 'RENT', 'LUXURY'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCollection(cat)}
                                            className={`px-10 py-5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase whitespace-nowrap transition-all duration-700 ${activeCollection === cat ? 'bg-gold-gradient text-primary shadow-2xl' : 'text-white/30 hover:text-white'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                
                                <button className="flex items-center gap-6 font-black text-white/40 hover:text-white uppercase tracking-[0.5em] text-[11px] group transition-all" onClick={() => navigate('/property')}>
                                    Full Inventory
                                    <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-700">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Gallery Flux */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                {featured.map((prop, i) => (
                                    <motion.div
                                        key={prop._id}
                                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                                    >
                                        <PropertyCard property={prop} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ─ Performance Audit (Stats) ───────────────────────────── */}
                <StatsSection />

                {/* ─ Global Insights (News) ─────────────────────────────── */}
                <NewsSection />

                {/* ─ Vanguard Community (Testimonials) ───────────────────── */}
                <Testimonials />
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
