import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function Admin() {
    const navigate = useNavigate();
    const { authFetch, profileImage } = useAuth();
    const [properties, setProperties] = useState([]);
    const [pendingProperties, setPendingProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Metrics
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        fetchAdminProperties();
    }, []);

    const fetchAdminProperties = async () => {
        try {
            // Properties endpoint is public — no auth needed
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                setProperties(data.properties);
                const pending = data.properties.filter(p => p.status === 'Pending');
                setPendingProperties(pending);
                const active = data.properties.filter(p => p.status === 'Approved').length;
                setActiveCount(active);
                setPendingCount(pending.length);
            }

            // Users endpoint is protected
            const usersRes = await authFetch(`${API_URL}/api/users`);
            if (usersRes.ok) {
                const usersData = await usersRes.json();
                setTotalUsers(usersData.users.length);
            }
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReview = async (id, status) => {
        try {
            const res = await authFetch(`${API_URL}/api/properties/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            if (res.ok) await fetchAdminProperties();
        } catch (err) {
            console.error(`Error updating property to ${status}:`, err);
            const updatedPending = pendingProperties.filter(p => p._id !== id);
            setPendingProperties(updatedPending);
            setPendingCount(updatedPending.length);
            if (status === 'Approved') setActiveCount(prev => prev + 1);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await authFetch(`${API_URL}/api/properties/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) await fetchAdminProperties();
        } catch (err) {
            console.error(`Error deleting property ${id}:`, err);
            const updatedProperties = properties.filter(p => p._id !== id);
            setProperties(updatedProperties);
            setActiveCount(updatedProperties.filter(p => p.status === 'Approved').length);
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden hover:border-primary transition-all shadow-sm">
                        <img alt="Admin Profile" src={profileImage} className="w-full h-full object-cover rounded-full" />
                    </button>
                    <span className="font-['Manrope'] font-black text-xl text-primary tracking-tighter">Admin Control</span>
                </div>
                <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100/50 transition-transform active:scale-90 text-primary">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>

            <main className="pt-24 px-6 space-y-10">
                {/* Header Section */}
                <section>
                    <h1 className="text-3xl font-extrabold text-primary tracking-tight">Admin Dashboard</h1>
                    <p className="text-on-surface-variant text-sm mt-1">Property Management Overview</p>
                </section>

                {/* Metrics Bento Grid */}
                <section className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 bg-primary-container p-6 rounded-xl text-white relative overflow-hidden">
                        <div className="relative z-10 animate-fade-in">
                            <p className="text-[#acc7ff] text-xs font-semibold uppercase tracking-widest mb-1">Total Users</p>
                            <h2 className="text-4xl font-bold tracking-tighter">{totalUsers}</h2>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="bg-[#006a63] px-2 py-0.5 rounded-full text-[10px] font-bold">+12% this month</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-9xl">group</span>
                    </div>
                    <div className="bg-[#eeedf2] p-5 rounded-xl flex flex-col justify-between">
                        <div>
                            <span className="material-symbols-outlined text-secondary mb-2">real_estate_agent</span>
                            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">Active Listings</p>
                        </div>
                        <h3 className="text-2xl font-bold text-primary">{activeCount}</h3>
                    </div>
                    <div className="bg-[#ffddb8] p-5 rounded-xl flex flex-col justify-between">
                        <div>
                            <span className="material-symbols-outlined text-tertiary mb-2">pending_actions</span>
                            <p className="text-[#653e00] text-xs font-semibold uppercase tracking-widest">Pending</p>
                        </div>
                        <h3 className="text-2xl font-bold text-tertiary">{pendingCount}</h3>
                    </div>
                </section>

                {/* Quick Actions */}
                <section onClick={() => navigate('/inquiries')} className="bg-[#eeedf2] p-4 rounded-xl flex justify-between items-center cursor-pointer transition-transform hover:scale-[1.01]">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">manage_accounts</span>
                        <span className="font-bold text-primary text-sm">Review Active Inquiries</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-sm">arrow_forward_ios</span>
                </section>

                {/* Review Queue */}
                <section className="space-y-6">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xl font-bold text-primary">Pending Review Queue</h2>
                        <span className="text-secondary text-sm font-bold">{pendingProperties.length} items</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <span className="material-symbols-outlined animate-spin text-primary">sync</span>
                        </div>
                    ) : pendingProperties.length === 0 ? (
                        <div className="text-center py-10 bg-[#eeedf2]/30 rounded-xl text-on-surface-variant text-sm">
                            No properties currently pending review.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {pendingProperties.map((prop) => (
                                <div key={prop._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
                                    <div className="relative h-40">
                                        <img 
                                            alt={prop.title} 
                                            className="w-full h-full object-cover" 
                                            src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                        />
                                        <div className="absolute top-3 left-3 bg-[#ffddb8] px-3 py-1 rounded-full text-[10px] font-bold text-tertiary uppercase tracking-wider">
                                            New Submission
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary leading-tight max-w-[70%]">{prop.title}</h3>
                                            <span className="text-secondary font-bold text-lg">
                                                ₹ {prop.price.includes('Cr') || prop.price.includes('L') || prop.price.startsWith('₹') ? prop.price.replace('₹', '').trim() : parseInt(prop.price).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span> {prop.location}
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button 
                                                onClick={() => handleReview(prop._id, 'Approved')}
                                                className="flex items-center justify-center gap-2 bg-[#006a63] text-white py-3 rounded-lg font-bold text-sm transition-transform active:scale-95 hover:opacity-90"
                                            >
                                                <span className="material-symbols-outlined text-sm">check_circle</span> Approve
                                            </button>
                                            <button 
                                                onClick={() => handleReview(prop._id, 'Rejected')}
                                                className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg font-bold text-sm transition-transform active:scale-95 hover:opacity-90 border border-red-100"
                                            >
                                                <span className="material-symbols-outlined text-sm">cancel</span> Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Active Properties Catalog */}
                <section className="space-y-6">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xl font-bold text-primary">Active Properties Catalog</h2>
                        <span className="text-secondary text-sm font-bold">{properties.filter(p => p.status === 'Approved').length} items</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-10">
                            <span className="material-symbols-outlined animate-spin text-primary">sync</span>
                        </div>
                    ) : properties.filter(p => p.status === 'Approved').length === 0 ? (
                        <div className="text-center py-10 bg-[#eeedf2]/30 rounded-xl text-on-surface-variant text-sm">
                            No active listings catalog found.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {properties.filter(p => p.status === 'Approved').map((prop) => (
                                <div key={prop._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
                                    <div className="p-5 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                className="w-16 h-16 rounded-xl object-cover" 
                                                src={prop.coverImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'} 
                                                alt={prop.title}
                                            />
                                            <div>
                                                <h3 className="text-sm font-bold text-primary truncate max-w-[150px]">{prop.title}</h3>
                                                <p className="text-xs text-on-surface-variant">{prop.location}</p>
                                                <p className="text-xs text-secondary font-bold">₹ {prop.price}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(prop._id)}
                                            className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-600 rounded-xl border border-red-100 transition-transform active:scale-95 hover:opacity-90 cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Recent Activity Feed */}
                <section className="space-y-6 pb-12">
                    <h2 className="text-xl font-bold text-primary">Recent Activity Feed</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-xl bg-[#eeedf2]/50">
                            <div className="w-10 h-10 rounded-full bg-[#99efe5] flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[#006f67]">person_add</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-on-surface">New Agent Registered</p>
                                <p className="text-xs text-on-surface-variant">Arjun Sharma from Jabalpur joined the platform.</p>
                                <p className="text-[10px] text-outline mt-1 uppercase font-bold tracking-tighter">2 mins ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 rounded-xl bg-[#eeedf2]/50">
                            <div className="w-10 h-10 rounded-full bg-[#ffddb8] flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[#653e00]">update</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-on-surface">Listing Updated</p>
                                <p className="text-xs text-on-surface-variant">Price changed for 'Orchard Estate, Gwalior'.</p>
                                <p className="text-[10px] text-outline mt-1 uppercase font-bold tracking-tighter">45 mins ago</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-colors" to="/home">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Home</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-colors" to="/properties">
                    <span className="material-symbols-outlined">search</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Search</span>
                </Link>
                <div className="relative -top-8">
                    <Link to="/add-property" className="bg-secondary text-white p-4 rounded-full shadow-lg scale-110 active:scale-95 transition-transform flex items-center justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                    </Link>
                </div>
                <Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-colors" to="/favorites">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Saved</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-[#006a63] dark:text-[#4db6ac] bg-[#ffddb8]/20 rounded-xl px-3 py-1 scale-110 transition-all duration-300 ease-out" to="/admin">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Admin</span>
                </Link>
            </nav>
        </div>
    );
}
