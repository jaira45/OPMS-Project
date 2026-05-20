import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function AddProperty() {
    const navigate = useNavigate();
    const { authFetch } = useAuth();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [bhk, setBhk] = useState('3 BHK');
    const [floor, setFloor] = useState('2nd Floor');
    const [carpetArea, setCarpetArea] = useState('');
    const [builtupArea, setBuiltupArea] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const submitProperty = async (e) => {
        e.preventDefault();
        if (!title || !price || !location) {
            setError("Title, Price, and Location are required fields.");
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const res = await authFetch(`${API_URL}/api/properties`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    price,
                    location,
                    bhk,
                    floor,
                    carpetArea: carpetArea ? `${carpetArea} sqft` : '',
                    builtupArea: builtupArea ? `${builtupArea} sqft` : '',
                    coverImage: coverImage || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60',
                    status: 'Pending'
                })
            });

            if (res.ok) {
                navigate('/admin');
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to submit property.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-32">
            <Navbar />

            <main className="pt-20 sm:pt-32 container-responsive">
                <div className="max-w-3xl mx-auto space-y-12 animate-fade-in-up">
                    
                    {/* Header Section */}
                    <div className="space-y-4 text-center">
                        <h1 className="font-headline font-black text-4xl sm:text-5xl text-primary tracking-tight">List Your Estate</h1>
                        <p className="text-on-surface-variant font-bold text-base sm:text-lg max-w-xl mx-auto text-balance">
                            Join Madhya Pradesh's most exclusive real estate network. Your property will be reviewed by our curators before going live.
                        </p>
                    </div>

                    <form onSubmit={submitProperty} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface p-8 sm:p-12 rounded-[3rem] border border-surface-variant shadow-2xl relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
                        
                        <div className="col-span-1 md:col-span-2 space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Property Highlight Title</label>
                             <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                placeholder="e.g. Maharana Suite at Shyamala Hills"
                                type="text"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Location Details</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                placeholder="e.g. Arera Colony, Bhopal"
                                type="text"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Expected Valuation</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary">₹</span>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full pl-10 pr-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                    placeholder="e.g. 2.4 Cr"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Structure Type</label>
                            <select
                                value={bhk}
                                onChange={(e) => setBhk(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all appearance-none cursor-pointer"
                            >
                                <option>1 BHK</option>
                                <option>2 BHK</option>
                                <option>3 BHK</option>
                                <option>4 BHK</option>
                                <option>5 BHK+</option>
                                <option>Penthouse</option>
                                <option>Villa</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Floor Level</label>
                            <select
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all appearance-none cursor-pointer"
                            >
                                <option>Ground Floor</option>
                                <option>1st Floor</option>
                                <option>2nd Floor</option>
                                <option>3rd Floor</option>
                                <option>4th Floor+</option>
                                <option>Top Floor</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Carpet Space (SQFT)</label>
                            <input
                                value={carpetArea}
                                onChange={(e) => setCarpetArea(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                placeholder="1250"
                                type="number"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Built-up Space (SQFT)</label>
                            <input
                                value={builtupArea}
                                onChange={(e) => setBuiltupArea(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                placeholder="1500"
                                type="number"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Cover Showcase Image URL</label>
                            <input
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="w-full px-6 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                placeholder="https://images.unsplash.com/your-image-url"
                                type="url"
                            />
                            <p className="text-[10px] font-bold text-on-surface-variant/40 px-1 uppercase tracking-widest">High-resolution photography increases appraisal value.</p>
                        </div>

                        {error && (
                            <div className="col-span-1 md:col-span-2 bg-error/10 border border-error/20 p-4 rounded-xl flex items-center gap-3 text-error">
                                <span className="material-symbols-outlined">error</span>
                                <span className="text-xs font-black uppercase tracking-widest">{error}</span>
                            </div>
                        )}

                        <div className="col-span-1 md:col-span-2 pt-6">
                            <button
                                disabled={isSubmitting}
                                className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>Dispatching...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit for Appraisal</span>
                                        <span className="material-symbols-outlined text-sm">send</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
