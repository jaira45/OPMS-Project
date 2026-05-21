import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function Agents() {
    const agents = [
        { name: 'Vikram Singh', role: 'Luxury Estate Specialist', area: 'Bhopal', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
        { name: 'Ananya Sharma', role: 'Commercial Advisor', area: 'Indore', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
        { name: 'Rajesh Dubey', role: 'Heritage Properties', area: 'Gwalior', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        { name: 'Priya Verma', role: 'Residential Expert', area: 'Jabalpur', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
        { name: 'Arjun Mehra', role: 'New Launch Specialist', area: 'Indore', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
        { name: 'Sonal Gupta', role: 'Legal & Documentation', area: 'Bhopal', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=400&fit=crop' }
    ];

    return (
        <div className="bg-background text-on-surface min-h-screen pb-24 overflow-x-hidden">
            <Navbar />
            
            <main className="pt-24 sm:pt-32 space-y-16 sm:space-y-24">
                <section className="container-responsive px-4 text-center space-y-6">
                    <h1 className="text-4xl sm:text-7xl font-black text-primary tracking-tighter">Expert Agents</h1>
                    <p className="text-on-surface-variant text-base sm:text-lg max-w-xl mx-auto font-medium">Our team of local experts is here to guide you through every step of your property journey.</p>
                </section>

                <section className="container-responsive px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agents.map((agent) => (
                        <div key={agent.name} className="group relative bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-surface-variant hover:-translate-y-2 text-center">
                            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl overflow-hidden mb-6 shadow-xl border-4 border-surface">
                                <img src={agent.img} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-primary mb-1">{agent.name}</h3>
                            <p className="text-secondary text-xs sm:text-sm font-black uppercase tracking-widest mb-4">{agent.role}</p>
                            
                            <div className="flex items-center justify-center gap-2 text-on-surface-variant font-bold text-sm mb-6">
                                <span className="material-symbols-outlined text-lg">location_on</span>
                                {agent.area}
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-2xl font-bold hover:bg-secondary transition-all">
                                    <span className="material-symbols-outlined text-base">mail</span>
                                    Contact
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center bg-primary/5 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all">
                                    <span className="material-symbols-outlined">call</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="container-responsive px-4">
                    <div className="bg-primary text-white p-8 sm:p-16 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        <h2 className="text-3xl sm:text-5xl font-black relative z-10">Want to join our team?</h2>
                        <p className="max-w-xl mx-auto text-white/80 text-lg relative z-10 font-medium">We are always looking for passionate people to help redefine the real estate experience.</p>
                        <button className="bg-white text-primary px-10 py-4 rounded-full font-black hover:bg-secondary-container transition-all relative z-10 shadow-xl">Apply Now</button>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
