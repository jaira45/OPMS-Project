import { motion } from 'framer-motion';

export const Shimmer = () => (
    <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
    />
);

export const SkeletonCard = () => (
    <div className="space-y-6">
        <div className="relative aspect-[4/3] rounded-[3rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 overflow-hidden">
            <Shimmer />
        </div>
        <div className="space-y-3 px-4">
            <div className="h-8 w-3/4 rounded-xl bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                <Shimmer />
            </div>
            <div className="h-4 w-1/2 rounded-lg bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                <Shimmer />
            </div>
            <div className="flex gap-4 pt-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-12 rounded-lg bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                        <Shimmer />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const SkeletonProfile = () => (
    <div className="flex items-center gap-6 p-8 rounded-[3rem] bg-white dark:bg-dark-surface border border-surface-variant dark:border-dark-surface-variant relative overflow-hidden">
        <div className="w-20 h-20 rounded-[2rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
            <Shimmer />
        </div>
        <div className="space-y-2 flex-1">
            <div className="h-6 w-1/3 rounded-lg bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                <Shimmer />
            </div>
            <div className="h-4 w-1/2 rounded-lg bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                <Shimmer />
            </div>
        </div>
    </div>
);

export const SkeletonDashboard = () => (
    <div className="space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 rounded-[3rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                    <Shimmer />
                </div>
            ))}
        </div>
        <div className="h-64 rounded-[3.5rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
            <Shimmer />
        </div>
    </div>
);

export const SkeletonDetails = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
            <div className="aspect-video rounded-[4rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                <Shimmer />
            </div>
            <div className="space-y-4">
                <div className="h-12 w-3/4 rounded-2xl bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden"><Shimmer /></div>
                <div className="h-6 w-1/2 rounded-xl bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden"><Shimmer /></div>
            </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
            <div className="h-96 rounded-[3.5rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 relative overflow-hidden">
                <Shimmer />
            </div>
        </div>
    </div>
);

export const LoadingPage = () => (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center flex-col gap-6">
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 bg-primary dark:bg-dark-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/40"
        >
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 dark:text-dark-primary/40 animate-pulse">Initializing Premium Experience</span>
    </div>
);
export const SkeletonReel = () => (
    <div className="relative w-full h-full rounded-[3rem] bg-surface-variant/20 dark:bg-dark-surface-variant/20 overflow-hidden">
        <Shimmer />
        <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4">
            <div className="h-4 w-1/4 rounded-lg bg-white/10 relative overflow-hidden"><Shimmer /></div>
            <div className="h-8 w-3/4 rounded-xl bg-white/10 relative overflow-hidden"><Shimmer /></div>
            <div className="h-4 w-1/2 rounded-lg bg-white/10 relative overflow-hidden"><Shimmer /></div>
        </div>
    </div>
);
