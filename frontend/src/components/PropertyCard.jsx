import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Move, Heart, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PropertyCard({ property }) {
    const navigate = useNavigate();
    const { user, toggleFavorite } = useAuth();
    const isFavorite = user?.favorites?.includes(property._id);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-dark-surface-variant rounded-[2.5rem] overflow-hidden border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl hover:shadow-2xl transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                    src={property.images?.[0] || property.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={property.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-5 py-2 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary dark:text-white shadow-lg">
                        {property.category === 'buy' ? 'For Sale' : 'For Rent'}
                    </span>
                    {property.propertyType && (
                        <span className="px-5 py-2 bg-secondary/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                            {property.propertyType}
                        </span>
                    )}
                </div>

                {/* Favorite Toggle */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property._id);
                    }}
                    className={`absolute top-6 right-6 w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all ${isFavorite ? 'bg-error text-white' : 'bg-white/20 text-white border border-white/20 hover:bg-white hover:text-primary'}`}
                >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                {/* Price Label (Floating) */}
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-black text-2xl tracking-tighter">
                        ₹ {property.price.toLocaleString()}
                        <span className="text-xs font-bold opacity-60 ml-2 uppercase tracking-widest">
                            {property.category === 'rent' ? '/ Month' : ''}
                        </span>
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary/40 dark:text-dark-on-surface-variant/40">
                        <MapPin className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{property.location}</span>
                    </div>
                    <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight leading-tight group-hover:text-secondary transition-colors duration-300 truncate">
                        {property.title}
                    </h3>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-variant dark:border-dark-surface-variant/20">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary/40 dark:text-dark-on-surface-variant/40">
                            <Bed className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Beds</span>
                        </div>
                        <p className="text-sm font-black text-primary dark:text-white">{property.bedrooms || 3}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary/40 dark:text-dark-on-surface-variant/40">
                            <Bath className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Baths</span>
                        </div>
                        <p className="text-sm font-black text-primary dark:text-white">{property.bathrooms || 2}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary/40 dark:text-dark-on-surface-variant/40">
                            <Move className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Area</span>
                        </div>
                        <p className="text-sm font-black text-primary dark:text-white">{property.area || 2400} <span className="opacity-40 text-[8px]">SQFT</span></p>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button 
                        onClick={() => navigate(`/property/${property._id}`)}
                        className="flex-1 py-4 bg-primary dark:bg-dark-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
