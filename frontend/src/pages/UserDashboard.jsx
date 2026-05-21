import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function UserDashboard() {
    const navigate = useNavigate();
    const { user, logout, authFetch, profileImage, updateUser } = useAuth();
    const [savedCount, setSavedCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);

    // Edit Profile States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState(user?.fullName || '');
    const [editGender, setEditGender] = useState(user?.gender || 'Other');
    const [editImage, setEditImage] = useState(user?.profileImage || '');
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setSavedCount(favs.length);
        fetchUserInquiries();
    }, []);

    // Sync form states when modal opens or user updates
    useEffect(() => {
        if (isEditModalOpen) {
            setEditName(user?.fullName || '');
            setEditGender(user?.gender || 'Other');
            setEditImage(user?.profileImage || '');
        }
    }, [isEditModalOpen, user]);

    const fetchUserInquiries = async () => {
        try {
            const res = await authFetch(`${API_URL}/api/inquiries`);
            if (res.ok) {
                const data = await res.json();
                const filtered = user?.email === 'admin@opms.com'
                    ? data.inquiries
                    : data.inquiries.filter(inq => inq.buyerEmail === user?.email);
                setInquiryCount(filtered.length);
            }
        } catch (err) {
            console.error('Error fetching inquiries count:', err);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            const res = await authFetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                body: JSON.stringify({
                    fullName: editName,
                    gender: editGender,
                    profileImage: editImage
                })
            });
            if (res.ok) {
                const data = await res.json();
                updateUser(data.user);
                setIsEditModalOpen(false);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-24">
            <Navbar />

            <main className="pt-20 sm:pt-32 container-responsive">
                <div className="max-w-4xl mx-auto space-y-10 sm:space-y-16">
                    
                    {/* Profile Section */}
                    <section className="flex flex-col items-center text-center space-y-6">
                        <div className="relative group">
                            <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-[2.5rem] sm:rounded-[3.5rem] border-4 border-primary/10 p-1 group-hover:border-primary transition-all duration-500 overflow-hidden shadow-2xl">
                                <img 
                                    className="w-full h-full object-cover rounded-[2rem] sm:rounded-[3rem]" 
                                    src={profileImage || 'https://via.placeholder.com/150'} 
                                    alt="Profile" 
                                />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg border-2 border-white">
                                {user?.email === 'admin@opms.com' ? 'Administrator' : 'Premium Buyer'}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-headline font-black text-3xl sm:text-5xl text-primary tracking-tight">{user?.fullName || 'User Name'}</h2>
                            <p className="font-bold text-on-surface-variant text-base sm:text-lg">{user?.email}</p>
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="mt-4 flex items-center gap-2 mx-auto bg-primary/5 hover:bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-black transition-all"
                            >
                                <span className="material-symbols-outlined text-base">edit</span>
                                Edit Profile
                            </button>
                        </div>
                    </section>

                    {/* Stats Grid */}
                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { label: 'Saved Items', value: savedCount, icon: 'favorite', color: 'text-error bg-error/5' },
                            { label: 'Sent Inquiries', value: inquiryCount, icon: 'send', color: 'text-secondary bg-secondary/5' },
                            { label: 'Active Alerts', value: '4', icon: 'notifications', color: 'text-primary bg-primary/5' },
                            { label: 'Verified Status', value: 'Prime', icon: 'verified', color: 'text-secondary bg-secondary/5' }
                        ].map((stat, i) => (
                            <div key={i} className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-center transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                                    <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-primary transition-all">{stat.value}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Menu Options */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: 'Personal Information', icon: 'person', desc: 'Manage your profile and contact details' },
                            { title: 'Security Settings', icon: 'security', desc: 'Password, 2FA, and session management' },
                            { title: 'Application Settings', icon: 'settings', desc: 'Notification preferences and display' },
                            { title: 'Support & Feedback', icon: 'contact_support', desc: 'Get help or report an issue' }
                        ].map((item, i) => (
                            <button key={i} className="flex items-center gap-6 p-6 bg-surface border border-surface-variant hover:border-primary/20 rounded-[2.5rem] transition-all hover:shadow-xl group text-left">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-primary text-lg">{item.title}</p>
                                    <p className="text-xs font-bold text-on-surface-variant">{item.desc}</p>
                                </div>
                                <span className="material-symbols-outlined text-primary/20 group-hover:text-primary transition-colors">chevron_right</span>
                            </button>
                        ))}
                    </section>

                    {/* Danger Zone */}
                    <section>
                        <button onClick={logout} className="w-full flex items-center justify-between p-6 bg-error/5 border-2 border-error/10 rounded-[2.5rem] hover:bg-error/10 transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center text-error group-hover:rotate-12 transition-transform">
                                    <span className="material-symbols-outlined">logout</span>
                                </div>
                                <div>
                                    <p className="font-black text-error text-lg uppercase tracking-widest">Logout Account</p>
                                    <p className="text-xs font-black text-error/60 uppercase tracking-widest">End active session securely</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-error/30">lock_open</span>
                        </button>
                    </section>
                </div>
            </main>

            <BottomNav />

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 space-y-8 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-black text-primary">Edit Profile</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/20 transition-all">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Full Name</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">person</span>
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Gender</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">wc</span>
                                    <select
                                        className="w-full pl-12 pr-4 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all appearance-none cursor-pointer"
                                        value={editGender}
                                        onChange={(e) => setEditGender(e.target.value)}
                                        required
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">expand_more</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Profile Image URL</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">image</span>
                                    <input
                                        type="url"
                                        placeholder="Paste image URL (optional)"
                                        className="w-full pl-12 pr-4 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                        value={editImage}
                                        onChange={(e) => setEditImage(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={updateLoading}
                                className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                            >
                                {updateLoading ? 'Saving Changes...' : 'Save Profile'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
