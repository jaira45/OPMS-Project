import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function UserDashboard() {
    const navigate = useNavigate();
    const { user, logout, authFetch, profileImage } = useAuth();
    const [savedCount, setSavedCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);

    useEffect(() => {
        // Count saved favorites from localStorage
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setSavedCount(favs.length);

        // Fetch live inquiry count using authenticated request
        fetchUserInquiries();
    }, []);

    const fetchUserInquiries = async () => {
        try {
            const res = await authFetch(`${API_URL}/api/inquiries`);
            if (res.ok) {
                const data = await res.json();
                // Admins see all; regular users see only their own
                const filtered = user?.email === 'admin@opms.com'
                    ? data.inquiries
                    : data.inquiries.filter(inq => inq.buyerEmail === user?.email);
                setInquiryCount(filtered.length);
            }
        } catch (err) {
            console.error('Error fetching inquiries count:', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return (
        <div className="bg-surface text-on-surface min-h-screen">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20">
                <div 
                    className="flex items-center gap-2 group cursor-pointer" 
                    onClick={() => navigate('/home')}
                >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                        <span className="material-symbols-outlined text-white text-sm">apartment</span>
                    </div>
                    <span className="font-['Manrope'] font-black text-xl text-primary tracking-tighter">OPMS</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100/50 transition-transform active:scale-90">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden">
                        <img className="w-full h-full object-cover rounded-full" src={profileImage} alt="Profile" />
                    </div>
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="pt-24 pb-32 px-6 max-w-md mx-auto min-h-screen">
                {/* Profile Header Section */}
                <section className="mb-10 text-center">
                    <div className="relative inline-block mb-6">
                        <div className="w-28 h-28 rounded-full border-[3px] border-[#1a1a1a] shadow-2xl overflow-hidden mx-auto">
                            <img className="w-full h-full object-cover" src={profileImage} alt="User Avatar" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFF0E5] text-[#FF6B00] px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm border border-[#FFDAB9] min-w-[70px]">
                            {user?.email === 'admin@opms.com' ? 'Admin' : 'Buyer'}
                        </div>
                    </div>
                    <h2 className="font-['Manrope'] font-bold text-3xl text-[#1a1a1a] tracking-tight">{user?.fullName || 'Jyoti Gupta'}</h2>
                    <p className="font-body text-sm text-gray-500 mt-1 font-medium">{user?.email || 'jyotigupta85188@gmail.com'}</p>
                </section>

                {/* Stats Bento Grid */}
                <section className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-white p-5 rounded-xl border border-outline-variant/15 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        <div className="text-center">
                            <p className="text-2xl font-headline font-extrabold text-primary leading-none">{savedCount}</p>
                            <p className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-1">Saved Properties</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-outline-variant/15 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-orange-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                        <div className="text-center relative">
                            <p className="text-2xl font-headline font-extrabold text-primary leading-none">{inquiryCount}</p>
                            <p className="text-[11px] font-semibold text-outline uppercase tracking-wider mt-1">Sent Inquiry</p>
                            <span className="absolute -top-1 -right-4 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                        </div>
                    </div>
                </section>

                {/* Dashboard Menu List */}
                <section className="space-y-3">
                    <h3 className="text-[12px] font-bold text-outline uppercase tracking-[0.2em] mb-4 ml-2">General Settings</h3>
                    <button className="w-full flex items-center justify-between p-5 bg-[#F8F9FB] rounded-[2rem] hover:bg-gray-100 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#1A73E8]">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <span className="font-bold text-lg text-[#1a1a1a]">My Profile</span>
                        </div>
                        <span className="material-symbols-outlined text-[#1a1a1a] font-bold">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined">settings</span>
                            </div>
                            <span className="font-semibold text-on-surface">Account Settings</span>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <span className="material-symbols-outlined">contact_support</span>
                            </div>
                            <span className="font-semibold text-on-surface">Help & Support</span>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group mt-6 border border-red-100">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                <span className="material-symbols-outlined">logout</span>
                            </div>
                            <span className="font-semibold text-red-600">Logout</span>
                        </div>
                        <span className="material-symbols-outlined text-red-300">power_settings_new</span>
                    </button>
                </section>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg docked full-width rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <button onClick={() => navigate('/home')} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all duration-300 ease-out">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Home</span>
                </button>
                <button onClick={() => navigate('/properties')} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all duration-300 ease-out">
                    <span className="material-symbols-outlined">search</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Search</span>
                </button>
                <button onClick={() => navigate('/add-property')} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all duration-300 ease-out cursor-pointer">
                    <span className="material-symbols-outlined text-3xl">add_circle</span>
                </button>
                <button onClick={() => navigate('/favorites')} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all duration-300 ease-out">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Saved</span>
                </button>
                {/* ACTIVE DESTINATION: Admin/Dashboard */}
                <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center text-[#006a63] dark:text-[#4db6ac] bg-[#ffddb8]/20 rounded-xl px-3 py-1 scale-110 transition-all duration-300 ease-out">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Admin</span>
                </button>
            </nav>
        </div>
    );
}
