import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import PropertyCard from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, SlidersHorizontal, X, RotateCcw, Sparkles
} from 'lucide-react';
import { SkeletonCard } from '../components/Skeleton';

export default function Property() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Advanced Filters State
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [city, setCity] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('Any');
    const [propertyType, setPropertyType] = useState('All');

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const cities = ['All', 'Indore', 'Bhopal', 'Gwalior', 'Rewa', 'Jabalpur', 'Ujjain'];
    const propertyTypes = ['All', 'Apartment', 'Villa', 'Office', 'Plot', 'Penthouse'];

    useEffect(() => {
        fetchProperties();
        // Check for search params from home page
        const params = new URLSearchParams(window.location.search);
        if (params.get('search')) setSearchTerm(params.get('search'));
        if (params.get('city')) setCity(params.get('city'));
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, category, city, minPrice, maxPrice, bedrooms, propertyType, properties]);

    const fetchProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                const approvedData = data.properties.filter(p => p.status === 'Approved');
                setProperties(approvedData);
            }
        } catch (err) {
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let results = [...properties];

        if (searchTerm) {
            results = results.filter(p => 
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category !== 'all') {
            results = results.filter(p => p.category === category);
        }

        if (city !== 'All') {
            results = results.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
        }

        if (minPrice) results = results.filter(p => p.price >= Number(minPrice));
        if (maxPrice) results = results.filter(p => p.maxPrice ? p.maxPrice <= Number(maxPrice) : p.price <= Number(maxPrice));

        if (bedrooms !== 'Any') {
            const count = parseInt(bedrooms);
            results = results.filter(p => p.bedrooms >= count);
        }

        if (propertyType !== 'All') {
            results = results.filter(p => p.propertyType === propertyType);
        }

        setFilteredProperties(results);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setCategory('all');
        setCity('All');
        setMinPrice('');
        setMaxPrice('');
        setBedrooms('Any');
        setPropertyType('All');
    };

    return (
        <div className="bg-[#071B3A] text-white min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-32 pb-40 container-responsive space-y-24">
                {/* ─ Master Search Terminal ───────────────────────────── */}
                <section className="space-y-12">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 bg-white/5 backdrop-blur-3xl rounded-[3rem] px-10 py-7 flex items-center gap-6 shadow-3xl border border-white/10 group focus-within:ring-2 ring-accent/30 transition-all"
                            >
                                <Search className="w-8 h-8 text-accent group-focus-within:scale-110 transition-transform" />
                                <input 
                                    className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-white/20 font-display italic text-2xl outline-none" 
                                    placeholder="Search by location, title, or keywords..." 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </motion.div>
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all shadow-3xl backdrop-blur-xl border ${isFilterOpen ? 'bg-accent text-primary border-accent' : 'bg-white/5 text-white border-white/10'}`}
                            >
                                {isFilterOpen ? <X className="w-8 h-8" /> : <SlidersHorizontal className="w-8 h-8" />}
                            </motion.button>
                        </div>

                        {/* Sophisticated Filter Matrix */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0, y: -20 }}
                                    animate={{ height: "auto", opacity: 1, y: 0 }}
                                    exit={{ height: 0, opacity: 0, y: -20 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 shadow-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                        <div className="space-y-5">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent px-4 block">Valuation Range (₹)</label>
                                            <div className="flex gap-4">
                                                <input type="number" placeholder="Min" className="w-full bg-white/5 rounded-2xl px-6 py-5 border border-white/5 font-black text-sm text-white focus:border-accent outline-none transition-all" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                                <input type="number" placeholder="Max" className="w-full bg-white/5 rounded-2xl px-6 py-5 border border-white/5 font-black text-sm text-white focus:border-accent outline-none transition-all" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent px-4 block">Living Quarters</label>
                                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                                {['Any', '1+', '2+', '3+', '4+'].map(val => (
                                                    <button key={val} onClick={() => setBedrooms(val)} className={`px-5 py-5 rounded-2xl font-black text-[10px] transition-all border whitespace-nowrap ${bedrooms === val ? 'bg-accent text-primary border-accent shadow-2xl' : 'bg-white/5 text-white border-white/5 hover:bg-white/10'}`}>
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent px-4 block">Metropolitan Area</label>
                                            <div className="relative">
                                                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-white/5 rounded-2xl px-8 py-5 border border-white/5 font-black text-sm text-white appearance-none outline-none focus:border-accent transition-all cursor-pointer">
                                                    {cities.map(c => <option key={c} value={c} className="bg-primary text-white">{c}</option>)}
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                    <SlidersHorizontal className="w-4 h-4 rotate-90" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent px-4 block">Asset Classification</label>
                                            <div className="relative">
                                                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full bg-white/5 rounded-2xl px-8 py-5 border border-white/5 font-black text-sm text-white appearance-none outline-none focus:border-accent transition-all cursor-pointer">
                                                    {propertyTypes.map(t => <option key={t} value={t} className="bg-primary text-white">{t}</option>)}
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                    <SlidersHorizontal className="w-4 h-4 rotate-90" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-4 flex items-center justify-between border-t border-white/10 pt-10 mt-6">
                                            <button onClick={resetFilters} className="flex items-center gap-4 text-white/40 hover:text-red-400 font-black uppercase tracking-[0.3em] text-[10px] transition-colors">
                                                <RotateCcw className="w-5 h-5" /> Purge Parameters
                                            </button>
                                            <button onClick={() => setIsFilterOpen(false)} className="bg-white text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-3xl hover:bg-accent transition-all">Synchronize Results</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Intent Switcher */}
                        <div className="flex justify-center flex-wrap gap-6">
                            {[
                                { id: 'all', label: 'Universal Catalog' },
                                { id: 'buy', label: 'Acquisition' },
                                { id: 'rent', label: 'Leasing' }
                            ].map((cat) => (
                                <button 
                                    key={cat.id} 
                                    onClick={() => setCategory(cat.id)}
                                    className={`px-12 py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-3xl border ${category === cat.id ? 'bg-gold-gradient text-primary border-accent' : 'bg-white/5 text-white/40 border-white/10 hover:text-white'}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─ Asset Inventory ──────────────────────────────────── */}
                <section className="space-y-16">
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-10 border-b border-white/10 pb-12">
                        <div className="space-y-4">
                            <h2 className="font-headline font-black text-6xl text-white tracking-tighter uppercase italic">The Collection</h2>
                            <p className="text-accent font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-4">
                                <Sparkles className="w-5 h-5" />
                                {filteredProperties.length} Verified High-Value Assets Identified
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-48 bg-white/5 backdrop-blur-3xl rounded-[5rem] space-y-10 border border-white/10 shadow-3xl">
                             <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/10">
                                <Search className="w-12 h-12 text-accent opacity-20" />
                             </div>
                             <div className="space-y-4">
                                <h3 className="font-headline font-black text-4xl text-white uppercase italic tracking-tighter">No Comparable Holdings</h3>
                                <p className="text-white/30 font-black uppercase text-[10px] tracking-widest max-w-sm mx-auto">Broaden your search protocols to discover our elite inventory.</p>
                             </div>
                             <button onClick={resetFilters} className="text-accent font-black underline uppercase tracking-[0.3em] text-[11px] hover:text-white transition-colors">Reset Global Parameters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                             {filteredProperties.map((prop) => (
                                <PropertyCard key={prop._id} property={prop} />
                             ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
