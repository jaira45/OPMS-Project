import { motion } from 'framer-motion';
import { ShieldCheck, Lock, UserCheck, TrendingUp, Scale, Sparkles } from 'lucide-react';

const pillars = [
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        desc: "Every property undergoes a 48-point verification process for legal clarity and physical accuracy."
    },
    {
        icon: UserCheck,
        title: "Trusted Advisors",
        desc: "Certified luxury experts dedicated to securing your legacy through expert real estate navigation."
    },
    {
        icon: Lock,
        title: "Secure Transactions",
        desc: "End-to-end encrypted protocols ensuring your financial data and contracts remain impenetrable."
    },
    {
        icon: TrendingUp,
        title: "Market Intelligence",
        desc: "Data-driven insights and forecasting to ensure your investment stands the test of time."
    },
    {
        icon: Scale,
        title: "Legal Assistance",
        desc: "Comprehensive legal support from document vetting to final registration for a seamless transfer."
    }
];

export default function TrustSection() {
    return (
        <section className="section-padding bg-[#071B3A] relative overflow-hidden px-4">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.03] blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] blur-[100px] rounded-full -ml-32 -mb-32" />

            <div className="container-responsive relative z-10 space-y-10 sm:space-y-16">
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        The OPMS Guarantee
                    </motion.div>
                    <h2 className="text-4xl sm:text-6xl font-headline font-bold text-white uppercase italic tracking-tighter leading-[0.95]">
                        Founded on <span className="text-gold-gradient">Absolute Trust</span>
                    </h2>
                    <p className="text-white/40 font-medium text-lg italic max-w-2xl leading-relaxed">
                        In the world of high-value real estate, transparency is the ultimate luxury. We've built our platform on five core pillars of security and excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative bg-[#0A254D] border border-white/5 p-10 sm:p-12 rounded-[2.5rem] hover:border-accent/20 transition-all duration-700 flex flex-col gap-8 shadow-xl overflow-hidden min-w-0"
                        >
                            {/* Card Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent/50 group-hover:bg-gold-gradient group-hover:text-primary transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] shrink-0">
                                <pillar.icon className="w-7 h-7" />
                            </div>
                            
                            <div className="space-y-3 min-w-0">
                                <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors duration-500 leading-snug" style={{wordBreak:'normal', overflowWrap:'normal', hyphens:'none', whiteSpace:'normal'}}>
                                    {pillar.title}
                                </h3>
                                <p className="text-white/40 text-sm font-normal leading-[1.7] group-hover:text-white/60 transition-colors duration-500" style={{overflowWrap:'break-word', hyphens:'none'}}>
                                    {pillar.desc}
                                </p>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-accent/5 blur-[40px] rounded-full group-hover:bg-accent/20 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
