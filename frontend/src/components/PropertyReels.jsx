import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, Volume2, VolumeX, Heart, 
    MessageCircle, Share2, MapPin, ChevronUp, 
    ChevronDown, DollarSign, User, ShieldCheck 
} from 'lucide-react';
import { SkeletonReel } from './Skeleton';

const reels = [
    {
        id: 1,
        video: "https://player.vimeo.com/external/494163956.sd.mp4?s=63de7c82c3374944f2d7183e20e8902506b3a0df&profile_id=165&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        title: "The Glass Pavilion",
        location: "Vijay Nagar, Indore",
        price: "₹12.5 Cr",
        agent: "Arya Khan",
        likes: "4.8k",
        comments: "156"
    },
    {
        id: 2,
        video: "https://player.vimeo.com/external/454503827.sd.mp4?s=72fd290dfc10976159c65636f1c422c5443de7a1&profile_id=165&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        title: "Azure Infinity Estate",
        location: "Arera Colony, Bhopal",
        price: "₹18.2 Cr",
        agent: "Vikram Malhotra",
        likes: "12.5k",
        comments: "482"
    },
    {
        id: 3,
        video: "https://player.vimeo.com/external/371433843.sd.mp4?s=236307498247f117f397223296c098939c36c726&profile_id=165&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80",
        title: "Skyline Citadel",
        location: "City Center, Gwalior",
        price: "₹9.5 Cr",
        agent: "Sana Kapoor",
        likes: "3.2k",
        comments: "94"
    }
];

export default function PropertyReels() {
    const [currentReel, setCurrentReel] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    const handleNext = () => {
        setCurrentReel((prev) => (prev + 1) % reels.length);
        setIsLoading(true);
    };

    const handlePrev = () => {
        setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);
        setIsLoading(true);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (video.duration) {
                const p = (video.currentTime / video.duration) * 100;
                setProgress(p);
            }
        };

        const handleEnded = () => handleNext();

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('ended', handleEnded);
        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('ended', handleEnded);
        };
    }, [currentReel]);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(() => setIsPlaying(false));
            } else {
                videoRef.current.pause();
            }
        }
    }, [currentReel, isPlaying]);

    return (
        <section className="container-responsive py-32 space-y-16 overflow-hidden">
            <div className="text-center space-y-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-6 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg"
                >
                    <ShieldCheck className="w-4 h-4" />
                    Cinematic Experiences
                </motion.div>
                <h2 className="font-headline font-black text-6xl sm:text-8xl text-primary dark:text-dark-on-surface tracking-tighter uppercase leading-[0.85]">
                    Estate <span className="text-gold-gradient italic font-display lowercase tracking-normal">Dossiers</span>
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-center justify-center pt-10">
                {/* Reel Player Container */}
                <div className="relative group/player scale-110">
                    {/* Navigation Buttons (Desktop) */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col gap-6 hidden lg:flex opacity-0 group-hover/player:opacity-100 transition-all duration-500">
                        <button onClick={handlePrev} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:scale-110 transition-all shadow-2xl">
                            <ChevronUp className="w-7 h-7" />
                        </button>
                        <button onClick={handleNext} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:scale-110 transition-all shadow-2xl">
                            <ChevronDown className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="relative w-[340px] sm:w-[400px] aspect-[9/16] rounded-[4.5rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.7)] bg-black ring-1 ring-white/10">
                        
                        {/* Loading State */}
                        {isLoading && (
                            <div className="absolute inset-0 z-50 bg-black">
                                <SkeletonReel />
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            key={reels[currentReel].id}
                            src={reels[currentReel].video}
                            poster={reels[currentReel].thumbnail}
                            muted={isMuted}
                            autoPlay
                            playsInline
                            onLoadStart={() => setIsLoading(true)}
                            onCanPlay={() => setIsLoading(false)}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={togglePlay}
                        />

                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-40">
                            <motion.div 
                                className="h-full bg-gold-gradient shadow-[0_0_15px_#D4AF37]"
                                style={{ width: `${progress}%` }}
                                transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                            />
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
                        
                        {/* Mute Toggle */}
                        <div className="absolute top-10 right-8 z-40">
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-2xl"
                            >
                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </motion.button>
                        </div>

                        {/* Interaction Bar */}
                        <div className="absolute right-8 bottom-32 flex flex-col gap-8 items-center z-40">
                            {[
                                { icon: Heart, value: reels[currentReel].likes, color: 'hover:bg-red-500 hover:border-red-500' },
                                { icon: Share2, value: 'Share', color: 'hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-primary' },
                                { icon: ShieldCheck, value: 'Verify', color: 'hover:bg-blue-500 hover:border-blue-500' }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx} 
                                    whileHover={{ y: -5 }}
                                    className="flex flex-col items-center gap-2 group/btn cursor-pointer"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-3xl flex items-center justify-center text-white border border-white/10 transition-all duration-500 ${item.color} shadow-2xl`}>
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{item.value}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Property Details Info */}
                        <div className="absolute bottom-12 left-10 right-24 z-40 pointer-events-none">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={`info-${currentReel}`}
                                className="space-y-6"
                            >
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient text-primary border border-white/20 shadow-xl">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span className="text-[9px] font-black uppercase tracking-wider">{reels[currentReel].location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 text-white shadow-xl">
                                        <span className="text-[9px] font-black uppercase tracking-wider">{reels[currentReel].price}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl italic uppercase">{reels[currentReel].title}</h3>
                                    <div className="flex items-center gap-3 text-white/60">
                                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase">{reels[currentReel].agent}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Playback Indicator */}
                        <AnimatePresence>
                            {!isPlaying && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                                >
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                        <Play className="w-12 h-12 text-white fill-current translate-xl ml-1" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex justify-center gap-6 mt-12 lg:hidden">
                        <button onClick={handlePrev} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl">
                            <ChevronUp className="w-5 h-5" /> Prev
                        </button>
                        <button onClick={handleNext} className="px-8 py-4 rounded-2xl bg-gold-gradient text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-[#D4AF37]/30">
                            Next <ChevronDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Sidebar Preview (Desktop) */}
                <div className="hidden lg:flex flex-col gap-6">
                    {reels.map((reel, i) => (
                        <motion.button
                            key={reel.id}
                            whileHover={{ scale: 1.05, x: -10 }}
                            onClick={() => { setCurrentReel(i); setIsPlaying(true); }}
                            className={`group relative w-24 h-24 rounded-[2rem] overflow-hidden border-4 transition-all duration-700 ${currentReel === i ? 'border-[#D4AF37] scale-125 shadow-2xl z-10' : 'border-transparent opacity-30 hover:opacity-100 hover:border-white/20'}`}
                        >
                            <img src={reel.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}
