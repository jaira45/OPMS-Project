import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
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
            className="group bg-white dark:bg-dark-surface rounded-[2.5rem] p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 cursor-pointer transition-all duration-700 flex flex-col h-full"
            onClick={() => navigate(`/property/${property._id}`)}
        >
            {/* ─ Media Container ────────────────────────────────────────── */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-2xl shrink-0">
                <LazyImage 
                    src={property.images?.[0] || property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    alt={property.title}
                />
                
                {/* Status Badges */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <div className="bg-[#071B3A]/90 backdrop-blur-xl px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border border-white/5">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        <span className="label-link text-white font-bold opacity-80">Verified</span>
                    </div>
                    {property.isFeatured && (
                        <div className="bg-gold-gradient px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border border-white/10">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="label-link text-primary font-bold">Elite</span>
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
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xl backdrop-blur-xl border border-white/20 ${isFavorite ? 'bg-red-500 text-white border-red-500 scale-110' : 'bg-black/20 text-white hover:bg-red-500'}`}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Valuation Overlay */}
                <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-primary/90 backdrop-blur-2xl text-white px-6 py-4 rounded-2xl border border-white/10 shadow-2xl flex justify-between items-center">
                        <span className="label-link !text-[10px] text-white">View Details</span>
                        <ArrowUpRight className="w-5 h-5 text-accent" />
                    </div>
                </div>
            </div>

            {/* ─ Asset Intelligence ──────────────────────────────────────── */}
            <div className="px-6 pb-6 flex flex-col flex-1">
                <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="card-heading text-primary dark:text-white group-hover:text-accent transition-colors line-clamp-2 flex-1 min-w-0" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                            {property.title}
                        </h3>
                        <p className="font-headline font-bold text-2xl text-primary dark:text-white whitespace-nowrap pt-1">
                            ₹{property.price.toLocaleString()}
                            {property.category === 'rent' && <span className="text-sm font-normal opacity-60 ml-1">/mo</span>}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-white/40">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium truncate">{property.location}</span>
                    </div>
                </div>

                <div className="flex items-center gap-8 pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary dark:text-white">{property.bedrooms || 3}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Beds</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary dark:text-white">{property.bathrooms || 2}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Baths</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary dark:text-white">{property.area || 2400}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Sqft</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
