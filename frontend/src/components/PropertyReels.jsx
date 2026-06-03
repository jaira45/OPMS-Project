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
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        title: "Modern Glass Villa",
        location: "Indore, MP",
        price: "₹4.5 Cr",
        agent: "Rajesh Sharma",
        likes: "1.2k",
        comments: "45"
    },
    {
        id: 2,
        video: "https://player.vimeo.com/external/454503827.sd.mp4?s=72fd290dfc10976159c65636f1c422c5443de7a1&profile_id=165&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        title: "Azure Pool Estate",
        location: "Bhopal, MP",
        price: "₹8.2 Cr",
        agent: "Anjali Gupta",
        likes: "2.5k",
        comments: "82"
    },
    {
        id: 3,
        video: "https://player.vimeo.com/external/371433843.sd.mp4?s=236307498247f117f397223296c098939c36c726&profile_id=165&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1600607687940-4e524cb3515a?w=800&q=80",
        title: "Skyline Penthouse",
        location: "Gwalior, MP",
        price: "₹3.8 Cr",
        agent: "Vikram Singh",
        likes: "950",
        comments: "31"
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
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentReel((prev) => (prev - 1 + reels.length) % reels.length);
        setIsLoading(true);
        setIsPlaying(true);
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
            const p = (video.currentTime / video.duration) * 100;
            setProgress(p);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, [currentReel]);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.play().catch(() => setIsPlaying(false));
            else videoRef.current.pause();
        }
    }, [currentReel, isPlaying]);

    return (
        <section className="container-responsive py-24 space-y-16 overflow-hidden">
            <div className="text-center space-y-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary dark:text-dark-primary rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                    <ShieldCheck className="w-3 h-3" />
                    Verified Estates
                </motion.div>
                <h2 className="font-headline font-black text-4xl sm:text-6xl text-primary dark:text-dark-on-surface tracking-tighter">
                    Property <span className="text-accent italic font-display">Reels</span>
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                {/* Reel Player Container */}
                <div className="relative group/player">
                    {/* Navigation Buttons (Desktop) */}
                    <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex opacity-0 group-hover/player:opacity-100 transition-opacity">
                        <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-accent transition-all">
                            <ChevronUp className="w-6 h-6" />
                        </button>
                        <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-accent transition-all">
                            <ChevronDown className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="relative w-[340px] sm:w-[380px] aspect-[9/16] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] bg-black ring-8 ring-white/5">
                        
                        {/* Loading State */}
                        {isLoading && (
                            <div className="absolute inset-0 z-50">
                                <SkeletonReel />
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            src={reels[currentReel].video}
                            poster={reels[currentReel].thumbnail}
                            loop
                            muted={isMuted}
                            autoPlay
                            playsInline
                            onLoadStart={() => setIsLoading(true)}
                            onCanPlay={() => setIsLoading(false)}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={togglePlay}
                        />

                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/20 z-40">
                            <motion.div 
                                className="h-full bg-accent"
                                style={{ width: `${progress}%` }}
                                transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                            />
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
                        
                        {/* Mute Toggle */}
                        <div className="absolute top-8 right-6 z-40">
                            <button 
                                onClick={() => setIsMuted(!isMuted)}
                                className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all"
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Right Interaction Bar */}
                        <div className="absolute right-6 bottom-40 flex flex-col gap-6 items-center z-40">
                            {[
                                { icon: Heart, value: reels[currentReel].likes, color: 'hover:bg-red-500' },
                                { icon: MessageCircle, value: reels[currentReel].comments, color: 'hover:bg-accent' },
                                { icon: Share2, value: '', color: 'hover:bg-white hover:text-primary' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1 group/btn cursor-pointer">
                                    <div className={`w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 transition-all ${item.color}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    {item.value && <span className="text-[10px] font-black text-white">{item.value}</span>}
                                </div>
                            ))}
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-10 left-8 right-20 z-40 pointer-events-none">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30">
                                        <MapPin className="w-3 h-3 text-accent" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{reels[currentReel].location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                        <DollarSign className="w-3 h-3 text-accent" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{reels[currentReel].price}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-white leading-tight tracking-tighter">{reels[currentReel].title}</h3>
                                    <div className="flex items-center gap-2 text-white/60">
                                        <div className="w-6 h-6 rounded-full bg-primary/40 flex items-center justify-center border border-white/10">
                                            <User className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase">Listed by {reels[currentReel].agent}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Play State Indicator */}
                        <AnimatePresence>
                            {!isPlaying && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.5 }}
                                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                                >
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-white fill-current" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation Controls */}
                    <div className="flex justify-center gap-4 mt-8 lg:hidden">
                        <button onClick={handlePrev} className="px-6 py-3 rounded-2xl bg-primary/5 text-primary dark:text-dark-on-surface border border-primary/10 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <ChevronUp className="w-4 h-4" /> Prev
                        </button>
                        <button onClick={handleNext} className="px-6 py-3 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20">
                            Next <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Thumbnails Sidebar (Desktop) */}
                <div className="hidden lg:flex flex-col gap-6 scale-90">
                    {reels.map((reel, i) => (
                        <button
                            key={reel.id}
                            onClick={() => { setCurrentReel(i); setIsPlaying(true); }}
                            className={`group relative w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 transition-all duration-500 ${currentReel === i ? 'border-accent scale-110 shadow-2xl opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
                        >
                            <img src={reel.thumbnail} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
