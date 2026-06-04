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
    Users, Building2, Clock, CheckCircle2, 
    Trash2, ShieldAlert, LayoutDashboard, BarChart3,
    MoreHorizontal, MapPin, Search, Filter, 
    ChevronRight, ExternalLink, UserMinus
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

export default function Admin() {
    const navigate = useNavigate();
    const { authFetch, user: currentUser } = useAuth();
    const { darkMode } = useTheme();
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ANALYTICS'); // ANALYTICS | PROPERTIES | USERS
    
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProperties: 0,
        pendingProperties: 0,
        approvedProperties: 0,
        totalInquiries: 0
    });

    useEffect(() => {
        if (currentUser?.email !== 'admin@opms.com') {
            navigate('/home');
            return;
        }
        fetchAllData();
    }, [currentUser]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [propRes, userRes, inqRes] = await Promise.all([
                fetch(`${API_URL}/api/properties`),
                authFetch(`${API_URL}/api/users`),
                authFetch(`${API_URL}/api/inquiries`)
            ]);

            if (propRes.ok) {
                const data = await propRes.json();
                setProperties(data.properties);
                setStats(prev => ({
                    ...prev,
                    totalProperties: data.properties.length,
                    pendingProperties: data.properties.filter(p => p.status === 'Pending').length,
                    approvedProperties: data.properties.filter(p => p.status === 'Approved').length
                }));
            }

            if (userRes.ok) {
                const data = await userRes.json();
                setUsers(data.users);
                setStats(prev => ({ ...prev, totalUsers: data.users.length }));
            }

            if (inqRes.ok) {
                const data = await inqRes.json();
                setStats(prev => ({ ...prev, totalInquiries: data.inquiries.length }));
            }
        } catch (err) {
            console.error('Admin Load Error:', err);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };

    const handlePropertyAction = async (id, status) => {
        try {
            const res = await authFetch(`${API_URL}/api/properties/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchAllData();
        } catch (err) {
            console.error('Property Action Error:', err);
        }
    };

    const deleteProperty = async (id) => {
        if (!window.confirm('Delete this property permanentely?')) return;
        try {
            const res = await authFetch(`${API_URL}/api/properties/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAllData();
        } catch (err) {
            console.error('Delete Property Error:', err);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Revoke member credentials?')) return;
        try {
            const res = await authFetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAllData();
        } catch (err) {
            console.error('Delete User Error:', err);
        }
    };

    const chartData = [
        { name: 'Users', value: stats.totalUsers, fill: '#DAA520' },
        { name: 'Estates', value: stats.totalProperties, fill: '#0a192f' },
        { name: 'Inquiries', value: stats.totalInquiries, fill: '#22c55e' },
    ];

    const growthData = [
        { month: 'Jan', value: 400 },
        { month: 'Feb', value: 600 },
        { month: 'Mar', value: 800 },
        { month: 'Apr', value: 1200 },
        { month: 'May', value: stats.totalUsers * 10 || 1500 },
    ];

    if (loading) return (
        <div className="bg-background dark:bg-dark-bg min-h-screen">
            <Navbar />
            <div className="pt-40 flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 border-8 border-primary/10 border-t-secondary rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/40">Syncing Intelligence...</span>
            </div>
            <BottomNav />
        </div>
    );

    return (
        <div className="bg-background dark:bg-dark-bg text-on-surface dark:text-dark-on-surface min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-32 pb-40 container-responsive space-y-16">
                {/* Control Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 pb-12 border-b border-surface-variant dark:border-dark-surface-variant/20">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
                            <ShieldAlert className="w-3 h-3" />
                            Omni-Channel Intelligence
                        </div>
                        <h1 className="font-headline font-black text-5xl sm:text-7xl text-primary dark:text-white tracking-tighter leading-tight italic">
                            Command <span className="text-secondary">Center</span>
                        </h1>
                    </div>

                    <div className="flex bg-white dark:bg-dark-surface-variant p-2 rounded-3xl border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl overflow-x-auto no-scrollbar max-w-full">
                        {['ANALYTICS', 'PROPERTIES', 'USERS'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary dark:bg-dark-primary text-white shadow-lg' : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-primary dark:hover:text-dark-primary'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'ANALYTICS' && (
                        <motion.div 
                            key="analytics"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Elite Members', value: stats.totalUsers, icon: Users, color: 'text-primary', bg: 'bg-primary/5' },
                                    { label: 'Active Estates', value: stats.approvedProperties, icon: Building2, color: 'text-secondary', bg: 'bg-secondary/5' },
                                    { label: 'Queue Depth', value: stats.pendingProperties, icon: Clock, color: 'text-error', bg: 'bg-error/5' },
                                    { label: 'Total Inquiries', value: stats.totalInquiries, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/5' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white dark:bg-dark-surface-variant p-8 rounded-[3rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl">
                                        <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6`}>
                                            <s.icon className="w-6 h-6" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 dark:text-white/40">{s.label}</p>
                                        <h3 className="text-4xl font-black text-primary dark:text-white tracking-tighter">{s.value}</h3>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="bg-white dark:bg-dark-surface-variant p-10 rounded-[4rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl space-y-8">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary dark:text-white opacity-40">Network Expansion</h4>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={growthData}>
                                                <defs>
                                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#DAA520" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#DAA520" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: darkMode ? '#1a2c4e' : '#fff', borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                                    labelStyle={{ fontWeight: '900', color: '#DAA520' }}
                                                />
                                                <Area type="monotone" dataKey="value" stroke="#DAA520" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-dark-surface-variant p-10 rounded-[4rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl space-y-8">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary dark:text-white opacity-40">System Distribution</h4>
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900 }} />
                                                <Tooltip 
                                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                                    contentStyle={{ backgroundColor: darkMode ? '#1a2c4e' : '#fff', borderRadius: '1rem', border: 'none' }}
                                                />
                                                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'PROPERTIES' && (
                        <motion.div 
                            key="properties"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="font-headline font-black text-3xl text-primary dark:text-white tracking-tight uppercase italic">Inventory Intelligence</h2>
                                <p className="text-[10px] font-black text-primary/40 dark:text-white/40 uppercase tracking-widest">{stats.pendingProperties} pending actions</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {properties.map((prop) => (
                                    <div key={prop._id} className="bg-white dark:bg-dark-surface-variant rounded-[3.5rem] p-6 lg:p-8 border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl flex flex-col lg:flex-row items-center gap-8 hover:-translate-y-1 transition-all group">
                                        <div className="w-full lg:w-48 h-48 rounded-[2.5rem] overflow-hidden shrink-0">
                                            <img src={prop.images?.[0] || prop.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                                        </div>
                                        <div className="flex-1 space-y-4 text-center lg:text-left min-w-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                                                    <h3 className="font-black text-2xl text-primary dark:text-white tracking-tight truncate">{prop.title}</h3>
                                                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${prop.status === 'Approved' ? 'bg-green-500/10 text-green-500' : 'bg-secondary/10 text-secondary'}`}>
                                                        {prop.status} Status
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-center lg:justify-start gap-2 text-on-surface-variant dark:text-white/40 font-bold text-sm">
                                                    <MapPin className="w-4 h-4 text-secondary" />
                                                    {prop.location}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                                                <span className="text-[10px] font-black text-primary/40 dark:text-white/20 uppercase tracking-widest">{prop.bedrooms} Bed</span>
                                                <span className="text-[10px] font-black text-primary/40 dark:text-white/20 uppercase tracking-widest">{prop.bathrooms} Bath</span>
                                                <span className="text-secondary font-black text-xs">₹ {prop.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 shrink-0">
                                            {prop.status === 'Pending' && (
                                                <button onClick={() => handlePropertyAction(prop._id, 'Approved')} className="bg-secondary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl transition-all">Approve</button>
                                            )}
                                            <button onClick={() => deleteProperty(prop._id)} className="w-12 h-12 bg-error/5 text-error rounded-2xl flex items-center justify-center hover:bg-error hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                                            <Link to={`/property/${prop._id}`} className="w-12 h-12 bg-primary/5 text-primary dark:text-white dark:bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ExternalLink className="w-5 h-5" /></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'USERS' && (
                        <motion.div 
                            key="users"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="font-headline font-black text-3xl text-primary dark:text-white tracking-tight uppercase italic">Member Dossiers</h2>
                                <p className="text-[10px] font-black text-primary/40 dark:text-white/40 uppercase tracking-widest">{stats.totalUsers} profiles</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {users.map((u) => (
                                    <div key={u._id} className="bg-white dark:bg-dark-surface-variant p-8 rounded-[3.5rem] border border-surface-variant dark:border-dark-surface-variant/20 shadow-xl group">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-primary/5 group-hover:border-secondary transition-all shrink-0">
                                                <img src={u.profileImage || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-black text-primary dark:text-white text-lg truncate tracking-tight">{u.name}</p>
                                                <p className="text-[10px] font-bold text-on-surface-variant dark:text-white/40 truncate uppercase tracking-widest">{u.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-6 border-t border-surface-variant dark:border-dark-surface-variant/20">
                                            <span className="text-[9px] font-black text-primary/40 dark:text-white/40 uppercase tracking-widest bg-primary/5 dark:bg-white/5 px-4 py-1.5 rounded-full">
                                                {u.provider === 'google' ? 'Google Auth' : 'Native Cloud'}
                                            </span>
                                            {u.email !== 'admin@opms.com' && (
                                                <button onClick={() => deleteUser(u._id)} className="w-10 h-10 bg-error/5 text-error rounded-xl flex items-center justify-center hover:bg-error hover:text-white transition-all">
                                                    <UserMinus className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
