import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import PropertyCard from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, SlidersHorizontal, X, RotateCcw, Sparkles, Home, Building2, MapPin
} from 'lucide-react';
import { SkeletonCard } from '../components/Skeleton';

export default function Property() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Search & Filter State
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
        // Check for search params
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
        <div className="bg-[#071B3A] text-white min-h-screen">
            <Navbar />

            <main className="pt-24 sm:pt-32 pb-40 container-responsive space-y-16 sm:space-y-24 px-4">
                {/* Property Search Area */}
                <section className="space-y-12">
                    <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 bg-white/[0.03] backdrop-blur-3xl rounded-3xl px-6 sm:px-10 py-5 sm:py-7 flex items-center gap-4 sm:gap-6 border border-white/10 group focus-within:ring-2 ring-accent/30 transition-all"
                            >
                                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-60" />
                                <input 
                                    className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-white/20 font-bold italic text-lg sm:text-2xl outline-none" 
                                    placeholder="Search by location, title, or keywords..." 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </motion.div>
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`h-16 sm:h-24 px-6 sm:px-10 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all border ${isFilterOpen ? 'bg-accent text-primary border-accent' : 'bg-white/5 text-white border-white/10'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {isFilterOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />}
                                    <span className="hidden sm:inline font-bold uppercase tracking-widest text-[10px]">Filter Suite</span>
                                </div>
                            </motion.button>
                        </div>

                        {/* Advanced Filters Grid */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0, y: -10 }}
                                    animate={{ height: "auto", opacity: 1, y: 0 }}
                                    exit={{ height: 0, opacity: 0, y: -10 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-[#0A254D] border border-white/5 rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-12 shadow-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-accent/60 px-4 block">Price Range (₹)</label>
                                            <div className="flex gap-3">
                                                <input type="number" placeholder="Min" className="w-full bg-white/5 rounded-xl px-5 py-4 border border-white/5 font-bold text-sm text-white focus:border-accent outline-none" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                                <input type="number" placeholder="Max" className="w-full bg-white/5 rounded-xl px-5 py-4 border border-white/5 font-bold text-sm text-white focus:border-accent outline-none" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-accent/60 px-4 block">Bedrooms</label>
                                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                                {['Any', '1+', '2+', '3+', '4+'].map(val => (
                                                    <button key={val} onClick={() => setBedrooms(val)} className={`px-5 py-4 rounded-xl font-bold text-[10px] transition-all border whitespace-nowrap ${bedrooms === val ? 'bg-gold-gradient text-primary border-accent' : 'bg-white/5 text-white border-white/5 hover:bg-white/10'}`}>
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-accent/60 px-4 block">City</label>
                                            <div className="relative">
                                                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-white/5 rounded-xl px-6 py-4 border border-white/5 font-bold text-sm text-white appearance-none outline-none focus:border-accent transition-all cursor-pointer">
                                                    {cities.map(c => <option key={c} value={c} className="bg-[#0A254D] text-white">{c}</option>)}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-accent/60 px-4 block">Property Type</label>
                                            <div className="relative">
                                                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full bg-white/5 rounded-xl px-6 py-4 border border-white/5 font-bold text-sm text-white appearance-none outline-none focus:border-accent transition-all cursor-pointer">
                                                    {propertyTypes.map(t => <option key={t} value={t} className="bg-[#0A254D] text-white">{t}</option>)}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-4 flex items-center justify-between border-t border-white/5 pt-8 mt-4">
                                            <button onClick={resetFilters} className="flex items-center gap-3 text-white/40 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]">
                                                <RotateCcw className="w-4 h-4" /> Reset Filters
                                            </button>
                                            <button onClick={() => setIsFilterOpen(false)} className="bg-white text-primary px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-accent transition-all">Apply Filters</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Status Type Filter */}
                        <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
                            {[
                                { id: 'all', label: 'All Properties' },
                                { id: 'buy', label: 'For Sale' },
                                { id: 'rent', label: 'For Rent' }
                            ].map((cat) => (
                                <button 
                                    key={cat.id} 
                                    onClick={() => setCategory(cat.id)}
                                    className={`px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border ${category === cat.id ? 'bg-gold-gradient text-primary border-accent shadow-xl' : 'bg-white/5 text-white/40 border-white/5 hover:text-white'}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Property Results Grid */}
                <section className="space-y-12">
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
                        <div className="space-y-3">
                            <h2 className="text-4xl sm:text-6xl font-headline font-bold text-white tracking-widest uppercase italic leading-none">Property <br /> <span className="text-gold-gradient block lg:inline-block">Listings</span></h2>
                            <p className="text-accent font-bold text-[10px] uppercase tracking-widest flex items-center gap-3">
                                <Sparkles className="w-4 h-4" />
                                {filteredProperties.length} Verified Properties Found
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16">
                            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="text-center py-32 sm:py-48 bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] sm:rounded-[5rem] space-y-8 border border-white/5 shadow-2xl">
                             <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/10">
                                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-accent/20" />
                             </div>
                             <div className="space-y-3">
                                <h3 className="text-3xl sm:text-4xl font-headline font-bold text-white uppercase italic tracking-tighter">No Properties Found</h3>
                                <p className="text-white/20 font-bold uppercase text-[9px] sm:text-[10px] tracking-widest max-w-sm mx-auto">Try adjusting your filters to discover our elite property inventory.</p>
                             </div>
                             <button onClick={resetFilters} className="text-accent font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">Clear All Filters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16">
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
