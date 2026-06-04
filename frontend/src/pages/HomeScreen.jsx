import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Hero from '../components/Hero';
import PropertyReels from '../components/PropertyReels';
import StatsSection from '../components/StatsSection';
import TrustSection from '../components/TrustSection';
import NewsSection from '../components/NewsSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { SkeletonCard } from '../components/Skeleton';
import PropertyCard from '../components/PropertyCard';

export default function HomeScreen() {
    const navigate = useNavigate();
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
                {/* Hero Section */}
                <Hero />

                {/* Featured Property Reels - Uses its own internal spacing */}
                <PropertyReels />

                {/* Property Showcase */}
                <section className="section-padding relative overflow-hidden px-4">
                    {/* Background Decorative */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.02] blur-[120px] rounded-full -mr-48 -mt-48" />

                    <div className="container-responsive space-y-12 sm:space-y-16">
                        {/* Section Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-white/5 pb-12">
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 text-accent rounded-full text-[11px] font-bold uppercase tracking-widest"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                                    Premier Selections
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="section-heading text-white"
                                >
                                    Featured <span className="text-gold-gradient italic">Properties</span>
                                </motion.h2>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full lg:w-auto">
                                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-xl overflow-x-auto no-scrollbar w-full md:w-auto">
                                    {['All Properties', 'Buy', 'Rent', 'Luxury'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCollection(cat.toUpperCase() === 'ALL PROPERTIES' ? 'ALL PROPERTIES' : cat.toUpperCase())}
                                            className={`px-6 sm:px-10 py-3.5 rounded-xl text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-500 ${activeCollection === cat.toUpperCase() || activeCollection === 'ALL PROPERTIES' && cat === 'All Properties' ? 'bg-gold-gradient text-primary shadow-lg' : 'text-white/40 hover:text-white'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <button className="flex items-center gap-4 text-white/50 hover:text-white transition-all group" onClick={() => navigate('/property')}>
                                    <span className="label-link">View All</span>
                                    <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Property Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 content-gap">
                                {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 content-gap">
                                {featured.map((prop, i) => (
                                    <motion.div
                                        key={prop._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.6 }}
                                    >
                                        <PropertyCard property={prop} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <StatsSection />
                <TrustSection />
                <NewsSection />
                <Testimonials />
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
