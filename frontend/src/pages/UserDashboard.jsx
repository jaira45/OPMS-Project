import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, MessageSquare, 
    Settings, LogOut, Camera,
    Building2, Sparkles, X
} from 'lucide-react';
import { SkeletonDashboard } from '../components/Skeleton';

export default function UserDashboard() {
    const navigate = useNavigate();
    const { user, logout, authFetch, profileImage, saveProfile, toggleFavorite } = useAuth();
    const { darkMode } = useTheme();
    
    const [inquiryCount, setInquiryCount] = useState(0);
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [listedProperties, setListedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        gender: "other",
        profileImage: "",
        about: "",
        phoneNumber: ""
    });

    const [updateLoading, setUpdateLoading] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name || user.fullName || "",
                gender: user.gender || "other",
                profileImage: user.profileImage || "",
                about: user.about || "",
                phoneNumber: user.phoneNumber || ""
            });
            fetchUserInquiries();
            fetchSavedProperties();
            fetchUserListedProperties();
        }
    }, [user]);

    const fetchUserInquiries = async () => {
        try {
            const res = await authFetch(`${API_URL}/api/inquiries`);
            if (res.ok) {
                const data = await res.json();
                const filtered = data.inquiries.filter(inq => inq.buyerEmail === user?.email);
                setInquiryCount(filtered.length);
                setRecentInquiries(filtered.slice(0, 3));
            }
        } catch (err) {
            console.error('Error fetching inquiries count:', err);
        }
    };

    const fetchSavedProperties = async () => {
        if (!user?.favorites || user.favorites.length === 0) {
            setSavedProperties([]);
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                const filtered = data.properties.filter(p => user.favorites.includes(p._id));
                setSavedProperties(filtered);
            }
        } catch (err) {
            console.error('Error fetching saved properties:', err);
        }
    };

    const fetchUserListedProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                // Logic: If user is agent, show properties they've listed (placeholder logic using agent name)
                const filtered = data.properties.filter(p => p.agentName === user?.name || p.contactEmail === user?.email);
                setListedProperties(filtered);
            }
        } catch (err) {
            console.error('Error fetching listed properties:', err);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    }

    const calculateProfileCompletion = () => {
        if (!user) return 0;
        const fields = ['name', 'email', 'profileImage', 'gender', 'about', 'phoneNumber'];
        const filled = fields.filter(f => user[f] && user[f] !== '').length;
        return Math.round((filled / fields.length) * 100);
    }

    const handleUpdateProfile = async (e) => {
        if (e) e.preventDefault();
        setUpdateLoading(true);
        try {
            await saveProfile(editData);
            setIsEditModalOpen(false);
        } catch (err) {
            console.error('Error updating profile:', err);
        } finally {
            setUpdateLoading(false);
        }
    };

    const uploadAvatarToCloudinary = async (file) => {
        setUploadingAvatar(true);
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_upload';
        
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (result.secure_url) {
                setEditData(prev => ({ ...prev, profileImage: result.secure_url }));
                // Update user context after successful upload
                await saveProfile({ ...editData, profileImage: result.secure_url });
            }
        } catch (err) {
            console.error('Avatar Upload Error:', err);
        } finally {
            setUploadingAvatar(false);
        }
    };

    const dashboardCards = [
        { label: 'Saved Properties', value: user?.favorites?.length || 0, icon: Heart, color: 'text-error', bg: 'bg-error/10', path: '/favorites' },
        { label: 'Recent Inquiries', value: inquiryCount, icon: MessageSquare, color: 'text-secondary', bg: 'bg-secondary/10', path: '/inquiries' },
        { label: 'Listed Estates', value: listedProperties.length, icon: Building2, color: 'text-primary', bg: 'bg-primary/10', path: '#' },
        { label: 'Profile Status', value: `${calculateProfileCompletion()}%`, icon: Sparkles, color: 'text-accent', bg: 'bg-accent/10', path: '#' },
    ];

    if (!user) return null;

    return (
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-32 pb-40 container-responsive space-y-12">
                {/* Header Welcome */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b border-surface-variant dark:border-dark-surface-variant/20">
                    <div className="space-y-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold uppercase tracking-widest"
                        >
                            <Sparkles className="w-3 h-3" />
                            User Dashboard
                        </motion.div>
                        <h1 className="font-headline font-bold text-5xl sm:text-7xl text-primary dark:text-white tracking-tighter leading-tight italic">
                            Welcome, <span className="text-secondary">{user.name.split(' ')[0]}</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 max-w-[200px] h-1.5 bg-primary/5 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${calculateProfileCompletion()}%` }}
                                    className="h-full bg-accent"
                                />
                            </div>
                            <span className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-widest">Profile {calculateProfileCompletion()}% Complete</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-4 bg-white dark:bg-dark-surface-variant border border-surface-variant dark:border-dark-surface-variant/20 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/10">
                            <img src={profileImage || user.profileImage} className="w-full h-full object-cover" alt="" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-white">Edit Profile</span>
                        <Settings className="w-4 h-4 text-primary/40 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {loading ? (
                    <SkeletonDashboard />
                ) : (
                    <>
                        {/* 4-Card Hub */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {dashboardCards.map((card, i) => (
                                <motion.div
                                    key={card.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => card.path !== '#' && navigate(card.path)}
                                    className="bg-white dark:bg-dark-surface-variant p-6 sm:p-8 rounded-[2.5rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl hover:shadow-2xl transition-all cursor-pointer group hover:border-accent/20"
                                >
                                    <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                         <card.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 dark:text-white/30">{card.label}</p>
                                        <h3 className="text-3xl font-bold text-primary dark:text-white tracking-tight italic">{card.value}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-12">
                                {/* Favorite Properties */}
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-primary dark:text-white tracking-tight uppercase italic flex items-center gap-3">
                                            <Heart className="w-6 h-6 text-error" />
                                            Saved Properties
                                        </h2>
                                        <Link to="/favorites" className="text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">View All</Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {savedProperties.slice(0, 4).map((prop) => (
                                            <div key={prop._id} className="flex gap-4 p-4 bg-white dark:bg-dark-surface-variant rounded-3xl border border-surface-variant dark:border-dark-surface-variant/20 group hover:shadow-xl transition-all">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                                    <img src={prop.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="space-y-1 py-1">
                                                    <h4 className="font-bold text-primary dark:text-white truncate max-w-[150px]">{prop.title}</h4>
                                                    <p className="text-[10px] font-medium text-on-surface-variant/60">{prop.location}</p>
                                                    <p className="text-xs font-bold text-secondary">₹ {prop.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {savedProperties.length === 0 && (
                                            <div className="col-span-full py-12 text-center bg-primary/5 rounded-[2.5rem] border-2 border-dashed border-primary/10">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/20">No Saved Properties</p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* My Listed Properties */}
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-primary dark:text-white tracking-tight uppercase italic flex items-center gap-3">
                                            <Building2 className="w-6 h-6 text-primary" />
                                            My Listings
                                        </h2>
                                        <Link to="/add-property" className="text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">Add New</Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {listedProperties.slice(0, 4).map((prop) => (
                                            <div key={prop._id} className="flex gap-4 p-4 bg-white dark:bg-dark-surface-variant rounded-3xl border border-surface-variant dark:border-dark-surface-variant/20 hover:shadow-xl transition-all">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                                                    <img src={prop.images?.[0]} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="space-y-1 py-1">
                                                    <h4 className="font-bold text-primary dark:text-white truncate max-w-[120px]">{prop.title}</h4>
                                                    <div className="inline-flex px-3 py-0.5 bg-green-500/10 text-green-500 text-[8px] font-bold uppercase rounded-full">Active</div>
                                                </div>
                                            </div>
                                        ))}
                                        {listedProperties.length === 0 && (
                                            <div className="col-span-full py-12 text-center bg-primary/5 rounded-[2.5rem] border-2 border-dashed border-primary/10">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/20">No Listed Properties</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                {/* Recent Inquiries */}
                                <section className="bg-white dark:bg-dark-surface-variant rounded-[2.5rem] p-8 border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-lg uppercase italic">Recent Inquiries</h3>
                                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {recentInquiries.map((inq) => (
                                            <div key={inq._id} className="p-3 bg-primary/5 rounded-xl space-y-1 border border-primary/5">
                                                <p className="text-xs font-bold text-primary dark:text-white truncate">{inq.propertyTitle || 'Property Inquiry'}</p>
                                                <p className="text-[9px] font-medium text-on-surface-variant/60 line-clamp-1">{inq.message}</p>
                                                <div className="flex justify-between items-center text-[7px] font-bold uppercase tracking-widest text-primary/40">
                                                    <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                                                    <span className="text-accent">Pending Response</span>
                                                </div>
                                            </div>
                                        ))}
                                        {recentInquiries.length === 0 && (
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-primary/20 text-center py-6">No Recent Communications</p>
                                        )}
                                    </div>
                                    <button onClick={() => navigate('/inquiries')} className="w-full py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-lg">View All Inquiries</button>
                                </section>

                                <button onClick={logout} className="w-full py-4 bg-error/5 text-error border border-error/10 rounded-2xl font-bold uppercase tracking-widest text-[9px] hover:bg-error hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <Footer />
            <BottomNav />

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="fixed inset-0 bg-primary/20 dark:bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-dark-surface-variant w-full max-w-xl rounded-[3rem] shadow-3xl p-8 space-y-8 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-primary dark:text-white tracking-tight uppercase italic">Edit Profile</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/5 hover:bg-primary/10 transition-all">
                                    <X className="w-5 h-5 text-primary dark:text-white" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="flex justify-center">
                                    <label className="relative group cursor-pointer inline-block">
                                        <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-primary/10 group-hover:border-secondary transition-all shadow-xl">
                                            <img src={editData.profileImage || profileImage} className="w-full h-full object-cover" alt="Avatar" />
                                            {uploadingAvatar && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 right-0 bg-secondary text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <Camera className="w-4 h-4" />
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadAvatarToCloudinary(e.target.files[0])} />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/40 dark:text-white/20 px-3">Full Name</label>
                                        <input className="w-full px-6 py-3.5 bg-primary/5 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-primary dark:text-white" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/40 dark:text-white/20 px-3">Gender</label>
                                        <select className="w-full px-6 py-3.5 bg-primary/5 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-primary dark:text-white appearance-none cursor-pointer" value={editData.gender} onChange={(e) => setEditData({ ...editData, gender: e.target.value })} required>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/40 dark:text-white/20 px-3">Phone Number</label>
                                        <input className="w-full px-6 py-3.5 bg-primary/5 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-primary dark:text-white" value={editData.phoneNumber} onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })} placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-bold uppercase tracking-widest text-primary/40 dark:text-white/20 px-3">About Me</label>
                                        <textarea rows={1} className="w-full px-6 py-3.5 bg-primary/5 dark:bg-white/5 border-none rounded-2xl outline-none font-bold text-primary dark:text-white resize-none" value={editData.about} onChange={(e) => setEditData({ ...editData, about: e.target.value })} placeholder="Tell us about yourself..." />
                                    </div>
                                </div>

                                <button type="submit" disabled={updateLoading || uploadingAvatar} className="w-full py-4 bg-primary dark:bg-dark-primary text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-secondary transition-all shadow-xl disabled:opacity-50">
                                    {updateLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
