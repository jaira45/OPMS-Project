import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

export default function LazyImage({ src, alt, className, ...props }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) setHasError(true);
    }, [src]);

    const placeholder = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80";

    if (hasError || !src) {
        return (
            <div className={`bg-slate-100 dark:bg-dark-surface/50 flex flex-col items-center justify-center gap-3 ${className}`}>
                <ImageOff className="w-8 h-8 text-slate-300 dark:text-white/20" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-50">Image Unavailable</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-slate-200 dark:bg-dark-surface animate-pulse z-10" />
            )}
            <img
                src={src || placeholder}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
                className={`w-full h-full object-cover transition-all duration-1000 ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
                {...props}
            />
        </div>
    );
}
