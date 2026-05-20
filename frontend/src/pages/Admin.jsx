import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function Admin() {
    const navigate = useNavigate();
    const { authFetch } = useAuth();
    const [properties, setProperties] = useState([]);
    const [pendingProperties, setPendingProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        fetchAdminProperties();
    }, []);

    const fetchAdminProperties = async () => {
        try {
            const res = await fetch(`${API_URL}/api/properties`);
            if (res.ok) {
                const data = await res.json();
                setProperties(data.properties);
                const pending = data.properties.filter(p => p.status === 'Pending');
                setPendingProperties(pending);
                setActiveCount(data.properties.filter(p => p.status === 'Approved').length);
                setPendingCount(pending.length);
            }

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
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-32">
            <Navbar />

            <main className="pt-20 sm:pt-32 container-responsive space-y-12">
                {/* Header */}
                <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-1">
                        <h1 className="font-headline font-black text-4xl text-primary tracking-tight">Admin Terminal</h1>
                        <p className="text-on-surface-variant font-bold text-sm uppercase tracking-widest">Global Operations Overview</p>
                    </div>
                    <button onClick={() => navigate('/inquiries')} className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:bg-secondary transition-all active:scale-95">
                        <span className="material-symbols-outlined text-base">mail_outline</span>
                        Inquiry Inbox
                    </button>
                </section>

                {/* Metrics */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-primary p-8 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
                        <div className="relative z-10 space-y-2">
                             <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Network Growth</p>
                             <h2 className="text-5xl font-black tracking-tighter">{totalUsers}</h2>
                             <p className="text-xs font-bold text-white/40">Verified Registered Users</p>
                        </div>
                        <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-white/10 text-[12rem] group-hover:scale-110 transition-transform duration-700">group</span>
                    </div>

                    <div className="glass p-8 rounded-[3rem] relative overflow-hidden group shadow-xl">
                        <div className="relative z-10 space-y-2">
                             <p className="text-secondary text-[10px] font-black uppercase tracking-widest">Active Listings</p>
                             <h2 className="text-5xl font-black tracking-tighter text-primary">{activeCount}</h2>
                             <p className="text-xs font-bold text-on-surface-variant/60">Live Premium Estates</p>
                        </div>
                        <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-secondary/5 text-[12rem] group-hover:rotate-12 transition-transform duration-700">real_estate_agent</span>
                    </div>

                    <div className="bg-secondary/5 border-2 border-secondary/10 p-8 rounded-[3rem] relative overflow-hidden group shadow-xl sm:col-span-2 lg:col-span-1">
                        <div className="relative z-10 space-y-2">
                             <p className="text-secondary text-[10px] font-black uppercase tracking-widest">Needs Review</p>
                             <h2 className="text-5xl font-black tracking-tighter text-secondary">{pendingCount}</h2>
                             <p className="text-xs font-bold text-secondary/60">New Listing Submissions</p>
                        </div>
                        <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-secondary/5 text-[12rem] group-hover:translate-x-4 transition-transform duration-700">pending_actions</span>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Review Queue */}
                    <section className="lg:col-span-7 space-y-8">
                        <div className="flex justify-between items-center border-b border-surface-variant pb-4">
                            <h2 className="font-headline font-black text-2xl text-primary">Appraisal Queue</h2>
                            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{pendingProperties.length} Tasks</span>
                        </div>

                        {loading ? (
                             <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                                <span className="text-[10px] font-black uppercase text-primary/40">Loading Queue...</span>
                             </div>
                        ) : pendingProperties.length === 0 ? (
                            <div className="text-center py-20 glass rounded-[2.5rem] space-y-4">
                                <span className="material-symbols-outlined text-4xl text-primary/10">verified</span>
                                <p className="text-on-surface-variant font-bold">Queue clear. No pending appraisals.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {pendingProperties.map((prop) => (
                                    <div key={prop._id} className="flex flex-col sm:flex-row bg-surface border border-surface-variant rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all">
                                        <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={prop.coverImage} alt={prop.title} />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-headline font-black text-xl text-primary leading-tight line-clamp-1">{prop.title}</h3>
                                                    <span className="font-black text-secondary whitespace-nowrap">₹ {prop.price}</span>
                                                </div>
                                                <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">location_on</span> {prop.location}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 mt-6">
                                                <button onClick={() => handleReview(prop._id, 'Approved')} className="bg-primary text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary transition-all active:scale-95">Approve Listing</button>
                                                <button onClick={() => handleReview(prop._id, 'Rejected')} className="bg-error/5 text-error border border-error/10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-error hover:text-white transition-all active:scale-95">Reject</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Master Catalog List */}
                    <section className="lg:col-span-5 space-y-8">
                         <div className="flex justify-between items-center border-b border-surface-variant pb-4">
                            <h2 className="font-headline font-black text-2xl text-primary">Master Catalog</h2>
                            <span className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Approved Only</span>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                            {properties.filter(p => p.status === 'Approved').map((prop) => (
                                <div key={prop._id} className="flex items-center gap-4 p-4 glasse rounded-3xl border border-surface-variant/50 hover:bg-white transition-all group">
                                     <img className="w-16 h-16 rounded-2xl object-cover shadow-lg" src={prop.coverImage} alt={prop.title} />
                                     <div className="flex-1 min-w-0">
                                         <h4 className="font-black text-primary text-sm truncate">{prop.title}</h4>
                                         <p className="text-[10px] font-bold text-on-surface-variant truncate uppercase tracking-widest">{prop.location}</p>
                                     </div>
                                     <button onClick={() => handleDelete(prop._id)} className="w-10 h-10 rounded-xl bg-error/5 text-error opacity-0 group-hover:opacity-100 transition-all hover:bg-error hover:text-white flex items-center justify-center">
                                         <span className="material-symbols-outlined text-lg">delete</span>
                                     </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
