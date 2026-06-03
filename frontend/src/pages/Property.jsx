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
        if (maxPrice) results = results.filter(p => p.price <= Number(maxPrice));

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
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-32 pb-40 container-responsive space-y-20">
                {/* Advanced Search Hub */}
                <section className="space-y-12">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <div className="flex gap-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex-1 bg-white dark:bg-dark-surface-variant rounded-[2.5rem] px-10 py-6 flex items-center gap-5 shadow-2xl border border-surface-variant dark:border-dark-surface-variant/20"
                            >
                                <Search className="w-6 h-6 text-primary/40 dark:text-white/40" />
                                <input 
                                    className="bg-transparent border-none focus:ring-0 w-full text-primary dark:text-white placeholder:text-primary/20 dark:placeholder:text-white/20 font-black text-xl" 
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
                                className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all shadow-2xl ${isFilterOpen ? 'bg-secondary text-white' : 'bg-white dark:bg-dark-surface text-primary dark:text-white border border-surface-variant dark:border-dark-surface-variant/20'}`}
                            >
                                {isFilterOpen ? <X className="w-7 h-7" /> : <SlidersHorizontal className="w-7 h-7" />}
                            </motion.button>
                        </div>

                        {/* Expandable Filter Grid */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-white dark:bg-dark-surface-variant border border-surface-variant dark:border-dark-surface-variant/20 rounded-[3rem] p-10 shadow-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 dark:text-dark-on-surface-variant/40 px-2 text-center block">Price (₹)</label>
                                            <div className="flex gap-2">
                                                <input type="number" placeholder="Min" className="w-full bg-primary/5 dark:bg-white/5 rounded-2xl px-4 py-4 border-none font-bold text-sm text-primary dark:text-white" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                                <input type="number" placeholder="Max" className="w-full bg-primary/5 dark:bg-white/5 rounded-2xl px-4 py-4 border-none font-bold text-sm text-primary dark:text-white" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 dark:text-dark-on-surface-variant/40 px-2 text-center block">Minimum Beds</label>
                                            <div className="flex gap-1 overflow-x-auto pb-2">
                                                {['Any', '1+', '2+', '3+', '4+'].map(val => (
                                                    <button key={val} onClick={() => setBedrooms(val)} className={`px-4 py-4 rounded-xl font-black text-[10px] transition-all border ${bedrooms === val ? 'bg-primary dark:bg-dark-primary text-white border-primary' : 'bg-primary/5 dark:bg-white/5 text-primary dark:text-white border-transparent'}`}>
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 dark:text-dark-on-surface-variant/40 px-2 text-center block">City</label>
                                            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-primary/5 dark:bg-white/5 rounded-2xl px-6 py-4 border-none font-bold text-sm text-primary dark:text-white appearance-none">
                                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 dark:text-dark-on-surface-variant/40 px-2 text-center block">Property Type</label>
                                            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full bg-primary/5 dark:bg-white/5 rounded-2xl px-6 py-4 border-none font-bold text-sm text-primary dark:text-white appearance-none">
                                                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>

                                        <div className="lg:col-span-4 flex items-center justify-between border-t border-surface-variant/20 pt-8 mt-4">
                                            <button onClick={resetFilters} className="flex items-center gap-3 text-error font-black uppercase tracking-widest text-[10px] hover:underline">
                                                <RotateCcw className="w-4 h-4" /> Purge Filters
                                            </button>
                                            <button onClick={() => setIsFilterOpen(false)} className="bg-primary dark:bg-dark-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl">Apply Parameters</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Quick Tabs */}
                        <div className="flex justify-center flex-wrap gap-4">
                            {['all', 'buy', 'rent'].map((cat) => (
                                <button 
                                    key={cat} 
                                    onClick={() => setCategory(cat)}
                                    className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl ${category === cat ? 'bg-primary dark:bg-dark-primary text-white' : 'bg-white dark:bg-dark-surface-variant text-primary dark:text-white border border-surface-variant dark:border-dark-surface-variant/20'}`}
                                >
                                    {cat === 'all' ? 'Universal Catalog' : cat === 'buy' ? 'Acquisition' : 'Leasing'}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="space-y-12">
                    <div className="flex justify-between items-end gap-6 border-b border-surface-variant dark:border-dark-surface-variant/20 pb-8">
                        <div>
                            <h2 className="font-headline font-black text-5xl text-primary dark:text-white tracking-tighter uppercase italic">The Collection</h2>
                            <p className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-2 mt-2">
                                <Sparkles className="w-4 h-4" />
                                {filteredProperties.length} Verified High-Value Assets
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-40 bg-white dark:bg-dark-surface-variant rounded-[4rem] space-y-8 border border-surface-variant dark:border-dark-surface-variant/20 shadow-2xl">
                             <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                                <Search className="w-10 h-10 text-primary/20" />
                             </div>
                             <div className="space-y-4">
                                <h3 className="font-black text-3xl text-primary dark:text-white">No Matching Estates</h3>
                                <p className="text-on-surface-variant dark:text-dark-on-surface-variant font-bold max-w-sm mx-auto">Try broadening your search parameters to discover our elite holdings.</p>
                             </div>
                             <button onClick={resetFilters} className="text-secondary font-black underline uppercase tracking-widest text-[10px]">Reset All Parameters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
