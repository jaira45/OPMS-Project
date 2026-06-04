import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PropertyCard({ property }) {
    const navigate = useNavigate();
    const { user, toggleFavorite } = useAuth();
    const isFavorite = user?.favorites?.includes(property._id);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group bg-white dark:bg-dark-surface rounded-3xl p-3 shadow-2xl border border-slate-100 dark:border-white/5 cursor-pointer transition-all duration-700"
            onClick={() => navigate(`/property/${property._id}`)}
        >
            {/* Image Box */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img 
                    src={property.images?.[0] || property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    alt={property.title}
                />
                
                {/* ACTIVE Badge */}
                <div className="absolute top-4 left-4">
                    <div className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-[#071B3A] dark:text-white uppercase tracking-widest">Active</span>
                    </div>
                </div>

                {/* Heart Button */}
                <div className="absolute top-4 right-4">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(property._id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xl ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-400 hover:text-red-500'}`}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                    <div className="bg-[#071B3A]/80 backdrop-blur-md text-white px-5 py-2.5 rounded-xl font-bold text-sm ring-1 ring-white/10 shadow-2xl">
                        ₹ {property.price.toLocaleString()}
                        {property.category === 'rent' && <span className="text-[10px] opacity-60 ml-1">/ mo</span>}
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="px-3 pb-4 space-y-5">
                <div className="space-y-1.5">
                    <h3 className="font-headline font-black text-xl text-primary dark:text-white tracking-tight leading-tight truncate uppercase italic group-hover:text-accent transition-colors">
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest truncate">{property.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-white/5">
                    <div className="text-center">
                        <p className="text-[11px] font-black text-primary dark:text-white leading-none mb-1">{property.bedrooms || 3}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Beds</p>
                    </div>
                    <div className="w-px h-6 bg-slate-100 dark:bg-white/10" />
                    <div className="text-center">
                        <p className="text-[11px] font-black text-primary dark:text-white leading-none mb-1">{property.bathrooms || 2}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Baths</p>
                    </div>
                    <div className="w-px h-6 bg-slate-100 dark:bg-white/10" />
                    <div className="text-center">
                        <p className="text-[11px] font-black text-primary dark:text-white leading-none mb-1">{property.area || 2400}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Sq.ft</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
