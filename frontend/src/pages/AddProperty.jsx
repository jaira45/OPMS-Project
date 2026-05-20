import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function AddProperty() {
    const navigate = useNavigate();
    const { authFetch, profileImage } = useAuth();
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
                alert('Property submitted for review successfully!');
                navigate('/admin'); // Redirect to admin panel to see pending list
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
        <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
            {/* TopAppBar Shell */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin')} className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden hover:border-primary transition-all shadow-sm">
                        <img alt="Profile" className="w-full h-full object-cover rounded-full" src={profileImage} />
                    </button>
                    <span className="font-['Manrope'] font-black text-xl text-primary tracking-tighter">List Property</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-100/50 rounded-full transition-transform active:scale-90">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>

            <main className="pt-24 px-6 max-w-md mx-auto">
                {/* Progress Stepper */}
                <div className="flex justify-between items-center mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">1</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Info</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">2</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Specs</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">3</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Valuation</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-4 ring-white">4</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Media</span>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Header Section */}
                    <section>
                        <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight mb-2">List Your Property</h1>
                        <p className="text-outline text-sm leading-relaxed">Showcase your estate in Madhya Pradesh's premier curated marketplace.</p>
                    </section>

                    {/* Form Step: Dynamic Form */}
                    <form className="space-y-6" onSubmit={submitProperty}>
                        {/* Title Input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Property Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm"
                                placeholder="e.g. Shyamala Hills Heritage Suite"
                                type="text"
                                required
                            />
                        </div>

                        {/* Location Input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Location</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm"
                                placeholder="e.g. Arera Colony, Bhopal"
                                type="text"
                                required
                            />
                        </div>

                        {/* Valuation */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Expected Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-semibold">₹</span>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full pl-10 pr-4 py-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm"
                                    placeholder="e.g. 1.2 Cr or 85 L"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>

                        {/* Area Details */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Area Details (Optional)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-outline uppercase">Carpet Area</span>
                                    <div className="relative">
                                        <input
                                            value={carpetArea}
                                            onChange={(e) => setCarpetArea(e.target.value)}
                                            className="w-full p-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm"
                                            placeholder="1450"
                                            type="number"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-outline">SQFT</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-outline uppercase">Built-up Area</span>
                                    <div className="relative">
                                        <input
                                            value={builtupArea}
                                            onChange={(e) => setBuiltupArea(e.target.value)}
                                            className="w-full p-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm"
                                            placeholder="1800"
                                            type="number"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-outline">SQFT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Specifications</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-100 rounded-xl flex items-center justify-between">
                                    <span className="text-xs font-semibold">BHK Type</span>
                                    <select
                                        value={bhk}
                                        onChange={(e) => setBhk(e.target.value)}
                                        className="bg-transparent border-none text-xs font-bold text-primary focus:ring-0 text-right cursor-pointer"
                                    >
                                        <option value="1 BHK">1 BHK</option>
                                        <option value="2 BHK">2 BHK</option>
                                        <option value="3 BHK">3 BHK</option>
                                        <option value="4 BHK">4 BHK</option>
                                        <option value="5 BHK">5 BHK</option>
                                        <option value="Penthouse">Penthouse</option>
                                    </select>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-xl flex items-center justify-between">
                                    <span className="text-xs font-semibold">Floor</span>
                                    <select
                                        value={floor}
                                        onChange={(e) => setFloor(e.target.value)}
                                        className="bg-transparent border-none text-xs font-bold text-primary focus:ring-0 text-right cursor-pointer"
                                    >
                                        <option value="Ground Floor">Ground</option>
                                        <option value="1st Floor">1st</option>
                                        <option value="2nd Floor">2nd</option>
                                        <option value="3rd Floor">3rd</option>
                                        <option value="4th Floor">4th</option>
                                        <option value="5th Floor">5th</option>
                                        <option value="6th Floor">6th</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Cover Image Input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary">Cover Image URL (Optional)</label>
                            <input
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm"
                                placeholder="Paste image link, or leave blank for a default"
                                type="url"
                            />
                        </div>

                        {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

                        {/* Submit Action */}
                        <div className="pt-4">
                            <button
                                disabled={isSubmitting}
                                className="w-full py-5 bg-gradient-to-r from-primary to-blue-900 text-white rounded-full font-bold shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3 cursor-pointer"
                                type="submit"
                            >
                                <span>{isSubmitting ? 'Submitting...' : 'Submit for Review'}</span>
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* BottomNavBar Shell */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <Link to="/home" className="flex flex-col items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined transition-all duration-300 ease-out">home</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Home</span>
                </Link>
                <Link to="/properties" className="flex flex-col items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined transition-all duration-300 ease-out">search</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Search</span>
                </Link>
                <Link to="/add-property" className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-3 py-1 scale-110 transition-all duration-300 ease-out">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Add</span>
                </Link>
                <Link to="/favorites" className="flex flex-col items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined transition-all duration-300 ease-out">favorite</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Saved</span>
                </Link>
                <Link to="/admin" className="flex flex-col items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined transition-all duration-300 ease-out">dashboard</span>
                    <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Admin</span>
                </Link>
            </nav>
        </div>
    );
}
