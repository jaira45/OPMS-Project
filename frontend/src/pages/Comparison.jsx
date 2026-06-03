import { motion, AnimatePresence } from 'framer-motion';
import { useComparison } from '../context/ComparisonContext';
import { useTheme } from '../context/ThemeContext';
import { X, Scale, ArrowRight, Minus, Sparkles, LayoutGrid, Zap, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

export default function Comparison() {
    const { compareList, removeFromCompare, clearCompare } = useComparison();
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const specs = [
        { key: 'price', label: 'Valuation', icon: Zap, format: (v) => `₹ ${v.toLocaleString()}` },
        { key: 'area', label: 'Total Area', icon: LayoutGrid, format: (v) => `${v || 2400} SQFT` },
        { key: 'bedrooms', label: 'Bedrooms', icon: Sparkles, format: (v) => `${v || 3} BHK` },
        { key: 'bathrooms', label: 'Bathrooms', icon: ShieldCheck, format: (v) => v || 2 },
        { key: 'location', label: 'Global Position', icon: Scale },
        { key: 'category', label: 'Asset Class', icon: Scale },
    ];

    return (
        <div className="bg-background dark:bg-dark-bg min-h-screen text-on-surface dark:text-dark-on-surface">
            <Navbar />

            <main className="pt-32 pb-40 container-responsive space-y-20">
                {/* Header Welcome */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-surface-variant dark:border-dark-surface-variant/20">
                    <div className="space-y-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest"
                        >
                            <Scale className="w-3 h-3" />
                            Side-by-Side Asset Intelligence
                        </motion.div>
                        <h1 className="font-headline font-black text-5xl sm:text-7xl text-primary dark:text-white tracking-tighter leading-tight italic">
                            Estate <span className="text-secondary">Comparator</span>
                        </h1>
                    </div>
                    
                    {compareList.length > 0 && (
                        <button 
                            onClick={clearCompare}
                            className="bg-error/5 text-error px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-error hover:text-white transition-all shadow-xl shadow-error/5 flex items-center gap-3"
                        >
                            <X className="w-4 h-4" />
                            Flush Dataset
                        </button>
                    )}
                </div>

                {compareList.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-40 text-center space-y-10 bg-white dark:bg-dark-surface-variant rounded-[4rem] border-2 border-dashed border-primary/20 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
                        <div className="w-24 h-24 rounded-[2rem] bg-primary/5 flex items-center justify-center mx-auto scale-110">
                            <Scale className="w-12 h-12 text-primary/20" />
                        </div>
                        <div className="space-y-2 max-w-md mx-auto">
                            <h3 className="font-headline font-black text-3xl text-primary dark:text-white leading-tight">No Estates Identified</h3>
                            <p className="text-on-surface-variant/60 dark:text-white/40 font-bold">Add up to 4 ultra-luxury holdings from the portfolio to run a comparative resonance analysis.</p>
                        </div>
                        <button 
                            onClick={() => navigate('/properties')}
                            className="bg-primary dark:bg-dark-primary text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all"
                        >
                            Explore Catalog
                        </button>
                    </motion.div>
                ) : (
                    <div className="overflow-x-auto no-scrollbar pb-10">
                        <div className="min-w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence mode="popLayout">
                                {compareList.map((prop, i) => (
                                    <motion.div 
                                        key={prop._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col gap-10 group"
                                    >
                                        <div className="relative aspect-[10/14] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-surface-variant dark:border-dark-surface-variant/20 hover:-translate-y-4 transition-all duration-700">
                                            <img src={prop.images?.[0] || prop.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                                            <div className="absolute inset-x-0 bottom-0 p-10 pt-24 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
                                                <h4 className="text-2xl font-black text-white italic tracking-tight mb-6 truncate">{prop.title}</h4>
                                                <button 
                                                    onClick={() => removeFromCompare(prop._id)}
                                                    className="w-full py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl font-black uppercase tracking-widest text-[9px] hover:bg-error hover:border-error transition-all"
                                                >
                                                    Discard Analysis
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2 px-4">
                                            {specs.map((spec) => (
                                                <div key={spec.key} className="p-8 bg-white dark:bg-dark-surface-variant rounded-[3rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl space-y-4 hover:shadow-2xl transition-all group/spec">
                                                    <div className="flex items-center gap-3">
                                                        <spec.icon className="w-4 h-4 text-secondary opacity-60 group-hover/spec:scale-110 transition-transform" />
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/20">{spec.label}</p>
                                                    </div>
                                                    <p className="text-xl font-black text-primary dark:text-white tracking-tighter">
                                                        {spec.format ? spec.format(prop[spec.key]) : prop[spec.key]}
                                                    </p>
                                                </div>
                                            ))}
                                            
                                            <div className="pt-6">
                                                <button 
                                                    onClick={() => navigate(`/property/${prop._id}`)}
                                                    className="w-full py-6 bg-primary dark:bg-dark-primary text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-secondary transition-all shadow-3xl flex items-center justify-center gap-4 group/btn"
                                                >
                                                    Access Dossier
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
