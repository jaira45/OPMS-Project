import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share2, MapPin } from 'lucide-react';

const reels = [
    {
        id: 1,
        video: "https://assets.mixkit.co/videos/preview/mixkit-luxury-home-entrance-at-night-4434-large.mp4",
        title: "The Midnight Manor",
        location: "Indore",
        likes: "1.2k",
        comments: "45"
    },
    {
        id: 2,
        video: "https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-a-pool-and-garden-4428-large.mp4",
        title: "Azure Pool Villa",
        location: "Bhopal",
        likes: "2.5k",
        comments: "82"
    },
    {
        id: 3,
        video: "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-with-a-fireplace-4431-large.mp4",
        title: "Heritage Penthouse",
        location: "Gwalior",
        likes: "950",
        comments: "31"
    }
];

export default function PropertyReels() {
    const [currentReel, setCurrentReel] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="container-responsive py-24 space-y-16">
            <div className="text-center space-y-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary dark:text-dark-primary rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                    Elite Experiences
                </motion.div>
                <h2 className="font-headline font-black text-4xl sm:text-6xl text-primary dark:text-dark-on-surface tracking-tighter">
                    Property <span className="text-accent italic font-display">Reels</span>
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                {/* Reel Player */}
                <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-black group">
                    <video
                        ref={videoRef}
                        src={reels[currentReel].video}
                        loop
                        muted={isMuted}
                        autoPlay
                        className="w-full h-full object-cover"
                        onClick={togglePlay}
                    />

                    {/* Overlay UI */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
                    
                    {/* Controls */}
                    <div className="absolute top-8 right-6 flex flex-col gap-4">
                        <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-primary transition-all pointer-events-auto"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Interaction Bar */}
                    <div className="absolute right-6 bottom-32 flex flex-col gap-6 items-center pointer-events-auto">
                        <div className="flex flex-col items-center gap-1 group/icon cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover/icon:bg-red-500 transition-all">
                                <Heart className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black text-white">{reels[currentReel].likes}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group/icon cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover/icon:bg-accent transition-all">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black text-white">{reels[currentReel].comments}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group/icon cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover/icon:bg-white group-hover/icon:text-primary transition-all">
                                <Share2 className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-8 left-8 right-20 pointer-events-none">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{reels[currentReel].location}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 leading-tight">{reels[currentReel].title}</h3>
                        <p className="text-white/60 text-xs font-medium">Experience the pinnacle of luxury living in this curated estate tour.</p>
                    </div>

                    {/* Play/Pause Indicator (Overlay) */}
                    <AnimatePresence>
                        {!isPlaying && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                    <Play className="w-10 h-10 text-white fill-current" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Thumbnails / Selector */}
                <div className="flex lg:flex-col gap-6">
                    {reels.map((reel, i) => (
                        <button
                            key={reel.id}
                            onClick={() => { setCurrentReel(i); setIsPlaying(true); }}
                            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] overflow-hidden border-4 transition-all ${currentReel === i ? 'border-accent scale-110 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80`} className="w-full h-full object-cover" alt="" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
