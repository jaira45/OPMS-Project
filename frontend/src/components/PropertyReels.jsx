import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, Share2, MapPin, ChevronLeft, ChevronRight, User, ShieldCheck, ImageOff, Building2, ArrowRight, Loader2 } from 'lucide-react';

// ─── Reel data with reliable Mixkit CDN videos + Unsplash thumbnails ────────
const reels = [
    {
        id: 1,
        video: "https://assets.mixkit.co/videos/preview/mixkit-house-with-a-big-pool-and-a-terrace-4073-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        title: "The Glass Pavilion",
        location: "Vijay Nagar, Indore",
        price: "₹12.5 Cr",
        agent: "Arya Khan",
        tag: "VERIFIED",
    },
    {
        id: 2,
        video: "https://assets.mixkit.co/videos/preview/mixkit-white-couch-and-a-pool-view-of-a-beach-apartment-3-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        title: "Azure Infinity Estate",
        location: "Arera Colony, Bhopal",
        price: "₹18.2 Cr",
        agent: "Vikram Malhotra",
        tag: "EXCLUSIVE",
    },
    {
        id: 3,
        video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-house-with-big-pool-4071-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80",
        title: "Skyline Citadel",
        location: "City Center, Gwalior",
        price: "₹9.5 Cr",
        agent: "Sana Kapoor",
        tag: "NEW",
    },
    {
        id: 4,
        video: "https://assets.mixkit.co/videos/preview/mixkit-stylish-hotel-room-with-a-pool-view-4882-small.mp4",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        title: "The Sapphire Manor",
        location: "New Market, Bhopal",
        price: "₹24 Cr",
        agent: "Rohan Dev",
        tag: "BEST VALUE",
    },
];

// ─── Small inline Skeleton for reel loading state ────────────────────────────
const ReelSkeleton = () => (
    <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            Loading property preview...
        </span>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PropertyReels() {
    const [current, setCurrent] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [progress, setProgress] = useState(0);
    const [liked, setLiked] = useState({});

    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const rafRef = useRef(null);

    const reel = reels[current];

    // ── Navigation ──────────────────────────────────────────────────────
    const goTo = useCallback((idx) => {
        setCurrent((idx + reels.length) % reels.length);
        setIsLoading(true);
        setHasError(false);
        setProgress(0);
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
    }, []);

    const handlePrev = () => goTo(current - 1);
    const handleNext = () => goTo(current + 1);

    // ── RAF-based smooth progress ────────────────────────────────────────
    const tickProgress = useCallback(() => {
        const v = videoRef.current;
        if (!v || !v.duration) return;
        setProgress((v.currentTime / v.duration) * 100);
        rafRef.current = requestAnimationFrame(tickProgress);
    }, []);

    // ── Intersection Observer — pause when scrolled away ────────────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const v = videoRef.current;
                if (!v || hasError) return;
                if (entry.isIntersecting) {
                    v.play().then(() => setIsPlaying(true)).catch(() => {});
                } else {
                    v.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.5 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [current, hasError]);

    // ── Sync muted state ────────────────────────────────────────────────
    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = isMuted;
    }, [isMuted]);

    // ── Cleanup RAF on unmount ───────────────────────────────────────────
    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    // ── Video event handlers ─────────────────────────────────────────────
    const handleCanPlay = () => {
        setIsLoading(false);
        const v = videoRef.current;
        if (!v) return;
        v.play()
            .then(() => {
                setIsPlaying(true);
                rafRef.current = requestAnimationFrame(tickProgress);
            })
            .catch(() => setIsPlaying(false));
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
    };

    const handleEnded = () => {
        cancelAnimationFrame(rafRef.current);
        setProgress(100);
        setTimeout(() => goTo(current + 1), 600);
    };

    const handleTimeUpdate = () => {
        const v = videoRef.current;
        if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
    };

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v || hasError) return;
        if (isPlaying) {
            v.pause();
            setIsPlaying(false);
            cancelAnimationFrame(rafRef.current);
        } else {
            v.play().then(() => {
                setIsPlaying(true);
                rafRef.current = requestAnimationFrame(tickProgress);
            }).catch(() => {});
        }
    };

    // ── Keyboard navigation ──────────────────────────────────────────────
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === ' ') { e.preventDefault(); togglePlay(); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [current, isPlaying]);

    return (
        <section ref={sectionRef} className="container-responsive py-24 space-y-12 overflow-hidden bg-[#071B3A]">
            {/* ─ Section Header ───────────────────────────────────────────── */}
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shadow-lg">
                        <Play className="text-primary w-5 h-5 fill-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white tracking-tight uppercase flex items-center gap-3 italic">
                        Property <span className="text-accent italic font-bold">Highlights</span>
                    </h2>
                </div>
                <button className="flex items-center gap-3 text-white/60 hover:text-accent transition-all group">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Explore All Videos</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>

            {/* ─ Player + Sidebar layout ──────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row gap-10 items-center justify-center pt-4 px-4">

                {/* ── Reel Player ──────────────────────────────────────────── */}
                <div className="relative group/player w-full flex justify-center">
                    {/* Phone frame */}
                    <div className="relative w-[min(90vw,340px)] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_64px_128px_-24px_rgba(0,0,0,0.7)] bg-black ring-1 ring-white/10">

                        {/* ── Progress Bar ──────────────────────────────────── */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-50">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F9E076] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: 'linear', duration: 0.1 }}
                            />
                        </div>

                        {/* ── Loading Skeleton ──────────────────────────────── */}
                        {isLoading && !hasError && <ReelSkeleton />}

                        {/* ── Error / Thumbnail Fallback ────────────────────── */}
                        {hasError && (
                            <div className="absolute inset-0 z-10">
                                <img
                                    src={reel.thumbnail}
                                    alt={reel.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 px-6 text-center backdrop-blur-sm">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                                        <ImageOff className="w-8 h-8 text-accent/40" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-gradient">
                                        Preview Restricted
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* ── Video Element ─────────────────────────────────── */}
                        <AnimatePresence mode="wait">
                            <motion.video
                                key={reel.id}
                                ref={videoRef}
                                src={reel.video}
                                poster={reel.thumbnail}
                                muted={isMuted}
                                playsInline
                                loop={false}
                                preload="metadata"
                                onLoadStart={() => { setIsLoading(true); setHasError(false); }}
                                onCanPlay={handleCanPlay}
                                onError={handleError}
                                onEnded={handleEnded}
                                onTimeUpdate={handleTimeUpdate}
                                onClick={togglePlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover cursor-pointer select-none"
                            />
                        </AnimatePresence>

                        {/* ── Overlay Gradient ──────────────────────────────── */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95 pointer-events-none z-20" />

                        {/* ── Top Controls ──────────────────────────────────── */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-30 pointer-events-none">
                            {/* Tag badge */}
                            <div className="bg-[#D4AF37] backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xl">
                                {reel.tag}
                            </div>
                            {/* Mute button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                className="pointer-events-auto w-11 h-11 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </motion.button>
                        </div>

                        {/* ── Side Action Buttons ───────────────────────────── */}
                        <div className="absolute right-6 bottom-36 z-30 flex flex-col gap-6 items-center">
                            {[
                                {
                                    icon: Heart,
                                    label: liked[current] ? "Saved" : "Save",
                                    active: liked[current],
                                    action: () => setLiked(prev => ({ ...prev, [current]: !prev[current] })),
                                    activeClass: "bg-red-500 border-red-500",
                                },
                                {
                                    icon: Share2,
                                    label: "Share",
                                    active: false,
                                    action: () => {},
                                    activeClass: "bg-[#D4AF37] border-[#D4AF37] text-primary",
                                },
                            ].map((btn, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); btn.action(); }}
                                    className={`flex flex-col items-center gap-1.5 group/btn`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl border backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-2xl ${btn.active ? btn.activeClass : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
                                        <btn.icon className={`w-5 h-5 ${btn.active && btn.icon === Heart ? 'fill-white' : ''}`} />
                                    </div>
                                    <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{btn.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* ── Property Info Overlay ─────────────────────────── */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`info-${current}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="absolute bottom-10 left-8 right-20 z-30 space-y-4 pointer-events-none"
                            >
                                {/* Location + Price pills */}
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37] text-primary shadow-lg backdrop-blur-md">
                                        <MapPin className="w-3 h-3" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">{reel.location}</span>
                                    </div>
                                    <div className="flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                                        <span className="text-[9px] font-bold uppercase tracking-wider">{reel.price}</span>
                                    </div>
                                </div>

                                {/* Property name */}
                                <h3 className="text-3xl sm:text-4xl font-headline font-bold text-white leading-tight tracking-tighter drop-shadow-2xl italic uppercase">
                                    {reel.title}
                                </h3>

                                {/* Agent */}
                                <div className="flex items-center gap-2 text-white/70">
                                    <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                        <User className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{reel.agent}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* ── Play/Pause Indicator ──────────────────────────── */}
                        <AnimatePresence>
                            {!isPlaying && !isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.3 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                                >
                                    <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                                        <Play className="w-9 h-9 text-white fill-white ml-1" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>{/* end phone frame */}

                    {/* ── Desktop Prev/Next Arrows ──────────────────────────── */}
                    <div className="hidden lg:flex flex-col gap-4 absolute -right-16 top-1/2 -translate-y-1/2">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-2xl bg-primary/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-primary transition-all shadow-2xl"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, y: 2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNext}
                            className="w-12 h-12 rounded-2xl bg-primary/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-primary transition-all shadow-2xl"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* ── Reel Dots ─────────────────────────────────────────── */}
                    <div className="flex justify-center gap-3 mt-8">
                        {reels.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`transition-all duration-500 rounded-full ${i === current ? 'w-8 h-2.5 bg-[#D4AF37]' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>

                    {/* ── Mobile Prev/Next Buttons ──────────────────────────── */}
                    <div className="flex justify-center gap-4 mt-6 lg:hidden">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrev}
                            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest shadow-xl"
                        >
                            <ChevronLeft className="w-5 h-5" /> Prev
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNext}
                            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-gold-gradient text-primary font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-[#D4AF37]/30"
                        >
                            Next <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* ── Desktop Sidebar Thumbnails ────────────────────────────── */}
                <div className="hidden lg:flex flex-col gap-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-2 pl-2">
                        Discover more
                    </p>
                    {reels.map((r, i) => (
                        <motion.button
                            key={r.id}
                            whileHover={{ scale: 1.08, x: -8 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => goTo(i)}
                            className={`group relative w-[110px] h-[145px] rounded-[2rem] overflow-hidden border-2 transition-all duration-700 shadow-2xl ${
                                i === current
                                    ? 'border-accent shadow-[0_32px_64px_-16px_rgba(212,175,55,0.4)] scale-110 z-10'
                                    : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                            }`}
                        >
                            <img
                                src={r.thumbnail}
                                alt={r.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                            />
                            <div className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-500 ${i === current ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                <p className="text-[9px] font-headline font-bold text-white leading-tight uppercase tracking-tight italic">{r.title}</p>
                                <p className="text-[8px] font-bold text-accent uppercase tracking-widest mt-1">{r.price}</p>
                            </div>
                            {i === current && (
                                <div className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-accent flex items-center justify-center shadow-xl ring-4 ring-accent/20">
                                    <Play className="w-3 h-3 text-primary fill-primary" />
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}
