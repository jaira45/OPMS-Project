import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LazyImage from './LazyImage';

export default function PropertyCard({ property }) {
    const navigate = useNavigate();
    const { user, toggleFavorite } = useAuth();
    const isFavorite = user?.favorites?.includes(property._id);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="group bg-white dark:bg-dark-surface rounded-[2.5rem] p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 cursor-pointer transition-all duration-700"
            onClick={() => navigate(`/property/${property._id}`)}
        >
            {/* ─ Media Container ────────────────────────────────────────── */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                <LazyImage 
                    src={property.images?.[0] || property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    alt={property.title}
                />
                
                {/* Status Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <div className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl ring-1 ring-black/5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-primary dark:text-white uppercase tracking-widest">Active Holding</span>
                    </div>
                    {property.isFeatured && (
                        <div className="bg-gold-gradient px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
                            <ShieldCheck className="w-3 h-3 text-primary" />
                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">Elite Collection</span>
                        </div>
                    )}
                </div>

                {/* Interaction Cluster */}
                <div className="absolute top-5 right-5">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(property._id);
                        }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-2xl backdrop-blur-xl border border-white/20 ${isFavorite ? 'bg-red-500 text-white border-red-500 scale-110' : 'bg-white/10 text-white hover:bg-red-500'}`}
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Valuation Overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-primary/80 backdrop-blur-2xl text-white p-5 rounded-2xl border border-white/10 shadow-2xl flex justify-between items-center group/price">
                        <div className="space-y-0.5">
                            <p className="text-[9px] font-black text-accent uppercase tracking-widest opacity-60">Listing Price</p>
                            <h4 className="text-xl font-headline font-black tracking-tight italic">
                                ₹ {property.price.toLocaleString()}
                                {property.category === 'rent' && <span className="text-xs opacity-50 ml-1">/mo</span>}
                            </h4>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center group-hover/price:rotate-45 transition-transform duration-500">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ─ Asset Intelligence ──────────────────────────────────────── */}
            <div className="px-5 pb-6 space-y-6">
                <div className="space-y-2">
                    <h3 className="font-headline font-black text-2xl text-primary dark:text-white tracking-tighter leading-tight truncate uppercase italic group-hover:text-accent transition-colors">
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-400 dark:text-white/30">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] truncate">{property.location}</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Suites</p>
                        <p className="text-sm font-black text-primary dark:text-white">{property.bedrooms || 3}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Baths</p>
                        <p className="text-sm font-black text-primary dark:text-white">{property.bathrooms || 2}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Extent</p>
                        <p className="text-sm font-black text-primary dark:text-white">{property.area || 2400} <span className="text-[9px] opacity-40">SQFT</span></p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
