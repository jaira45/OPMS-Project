import { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent.');
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-24 overflow-x-hidden">
            <Navbar />
            
            <main className="pt-24 sm:pt-32 space-y-16 sm:space-y-24">
                <section className="container-responsive px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h1 className="text-4xl sm:text-7xl font-black text-primary leading-none tracking-tighter">Get in touch</h1>
                                <p className="text-on-surface-variant text-lg font-medium leading-relaxed max-w-lg">
                                    Have questions about a property or want to list your own? We're here to help you navigate the market.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { title: 'Email', val: 'contact@opms.com', icon: 'alternate_email' },
                                    { title: 'Phone', val: '+91 98765 43210', icon: 'call' },
                                    { title: 'Address', val: 'DB Mall, Arera Hills, Bhopal, MP', icon: 'distance' }
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-6 items-center group">
                                        <div className="w-14 h-14 bg-primary/5 rounded-[1.25rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{item.title}</span>
                                            <p className="text-xl font-bold text-primary">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-primary/5 border border-surface-variant animate-fade-in-up">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full bg-primary/5 border-none rounded-2xl p-4 font-bold text-primary focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                                        <input 
                                            type="email" 
                                            required
                                            className="w-full bg-primary/5 border-none rounded-2xl p-4 font-bold text-primary focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">Subject</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-primary/5 border-none rounded-2xl p-4 font-bold text-primary focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="Interested in a property"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">Message</label>
                                    <textarea 
                                        rows="4" 
                                        className="w-full bg-primary/5 border-none rounded-2xl p-4 font-bold text-primary focus:ring-2 focus:ring-primary transition-all resize-none"
                                        placeholder="Tell us what you're looking for..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>
                                <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                                    <span>Send Message</span>
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="container-responsive px-4">
                    <div className="w-full h-[400px] bg-primary/5 rounded-[3rem] overflow-hidden shadow-inner flex items-center justify-center relative">
                        <img 
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&fit=crop" 
                            className="w-full h-full object-cover grayscale opacity-20"
                            alt="Map Placeholder"
                        />
                        <div className="absolute glass px-8 py-4 rounded-full font-black text-primary border border-primary/20 shadow-xl">
                            Interactive Map Coming Soon
                        </div>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
