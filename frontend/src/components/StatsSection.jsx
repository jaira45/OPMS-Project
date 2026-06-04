import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, Heart, Star } from 'lucide-react';
import API_URL from '../config/api';

const CountUp = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function StatsSection() {
    const [stats, setStats] = useState({
        totalProperties: 500,
        totalUsers: 250,
        happyClients: 1000,
        premiumProjects: 50
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/properties/stats`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.stats) {
                         // Merge fetched stats with manual high-value milestones if needed.
                    }
                }
            } catch (err) {
                console.error('Stats Fetch Error:', err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Properties Listed', value: 500, icon: Building2, suffix: '+' },
        { label: 'Verified Agents', value: 250, icon: Users, suffix: '+' },
        { label: 'Happy Clients', value: 1000, icon: Heart, suffix: '+' },
        { label: 'Premium Projects', value: 50, icon: Star, suffix: '+' }
    ];

    return (
        <section className="section-padding bg-[#071B3A] relative overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container-responsive px-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 content-gap">
                    {cards.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="relative group h-full"
                        >
                            {/* Card Body */}
                            <div className="bg-[#0A254D] border border-white/5 rounded-[2.5rem] card-padding h-full flex flex-col items-center text-center space-y-6 shadow-2xl transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                
                                {/* Icon Container */}
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                                    <stat.icon className="w-7 h-7 text-accent group-hover:text-primary transition-colors duration-500" />
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="text-5xl font-headline font-bold text-white tracking-tighter flex items-center justify-center gap-1 italic">
                                        <CountUp end={stat.value} />
                                        <span className="text-2xl text-accent font-bold not-italic">{stat.suffix}</span>
                                    </h3>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors duration-500">
                                        {stat.label}
                                    </p>
                                </div>

                                {/* Progress Line Overlay */}
                                <div className="absolute bottom-6 left-10 right-10 h-[1px] bg-white/5 overflow-hidden">
                                    <motion.div 
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                                        className="w-20 h-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"
                                    />
                                </div>
                            </div>

                            {/* Background Number Decal (Subtle) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.02] pointer-events-none select-none z-0">
                                {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
