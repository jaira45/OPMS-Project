import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Building2, Users, LineChart, ShieldCheck } from 'lucide-react';
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
        totalProperties: 0,
        totalUsers: 0,
        totalInquiries: 0,
        activeListings: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/properties/stats`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.stats) setStats(data.stats);
                }
            } catch (err) {
                console.error('Stats Fetch Error:', err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Properties Available', value: 3200, icon: Building2, suffix: '+' },
        { label: 'Verified Sellers', value: 850, icon: Users, suffix: '+' },
        { label: 'Cities Covered', value: 150, icon: LineChart, suffix: '+' },
        { label: 'Customer Satisfaction', value: 98, icon: ShieldCheck, suffix: '%' }
    ];

    return (
        <section className="py-40 container-responsive relative overflow-hidden">
            {/* Background Decorative Ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {cards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="bg-white/[0.03] dark:bg-white/[0.05] backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] text-white space-y-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-xl shadow-[#D4AF37]/20 group-hover:rotate-6 transition-transform duration-500">
                            <stat.icon className="w-8 h-8 text-primary" />
                        </div>
                        
                        <div className="space-y-3 relative z-10">
                            <h3 className="text-5xl font-black tracking-tighter flex items-baseline gap-1">
                                <CountUp end={stat.value} />
                                <span className="text-2xl text-[#D4AF37] font-bold">{stat.suffix}</span>
                            </h3>
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50 group-hover:text-[#D4AF37] transition-colors duration-500">
                                {stat.label}
                            </p>
                        </div>

                        {/* Decorative Icon Background */}
                        <stat.icon className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-1000 rotate-12 pointer-events-none" />
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
