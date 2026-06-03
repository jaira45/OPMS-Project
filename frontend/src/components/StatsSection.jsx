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
        { label: 'Cloud Catalog', value: stats.totalProperties, icon: Building2, color: 'bg-primary' },
        { label: 'Elite Members', value: stats.totalUsers, icon: Users, color: 'bg-secondary' },
        { label: 'Total Inquiries', value: stats.totalInquiries, icon: LineChart, color: 'bg-primary' },
        { label: 'Active Estates', value: stats.activeListings, icon: ShieldCheck, color: 'bg-secondary' }
    ];

    return (
        <section className="py-24 container-responsive">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`${stat.color} p-10 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}
                    >
                        {/* Decorative Icon */}
                        <stat.icon className="absolute -right-6 -bottom-6 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <stat.icon className="w-7 h-7" />
                        </div>
                        
                        <div className="space-y-1 relative z-10">
                            <h3 className="text-4xl font-black tracking-tighter">
                                <CountUp end={stat.value} />
                                <span className="text-xl opacity-60 ml-1 font-bold">+</span>
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60">
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
