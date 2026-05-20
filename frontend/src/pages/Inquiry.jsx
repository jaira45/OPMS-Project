import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function Inquiry() {
    const navigate = useNavigate();
    const { authFetch, profileImage } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await authFetch(`${API_URL}/api/inquiries`);
            if (res.ok) {
                const data = await res.json();
                setInquiries(data.inquiries);
                setFilteredInquiries(data.inquiries);
            }
        } catch (err) {
            console.error('Error fetching inquiries:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, currentStatus) => {
        const nextStatusMap = {
            'Sent': 'Viewed',
            'Viewed': 'Responded',
            'Responded': 'Resolved',
            'Resolved': 'Sent'
        };
        const newStatus = nextStatusMap[currentStatus] || 'Sent';

        try {
            const res = await authFetch(`${API_URL}/api/inquiries/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                const updated = inquiries.map(inq =>
                    inq._id === id ? { ...inq, status: newStatus } : inq
                );
                setInquiries(updated);
                filterResults(searchTerm, updated);
            }
        } catch (err) {
            console.error('Error updating inquiry status:', err);
            // Optimistic local update on network failure
            const updated = inquiries.map(inq =>
                inq._id === id ? { ...inq, status: newStatus } : inq
            );
            setInquiries(updated);
            filterResults(searchTerm, updated);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterResults(value, inquiries);
    };

    const filterResults = (search, dataList) => {
        let results = dataList;
        if (search) {
            results = results.filter(inq => 
                inq.propertyName.toLowerCase().includes(search.toLowerCase()) ||
                inq.buyerName.toLowerCase().includes(search.toLowerCase()) ||
                inq.status.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredInquiries(results);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Responded':
                return 'bg-[#99efe5] text-[#006f67] border border-[#80d5cb]/20';
            case 'Resolved':
                return 'bg-[#eeedf2] text-on-surface-variant border border-outline-variant/10';
            case 'Viewed':
                return 'bg-[#ffddb8] text-[#2a1700] border border-[#ffb95f]/20';
            case 'Sent':
            default:
                return 'bg-[#d7e2ff] text-[#001a40] border border-[#acc7ff]/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Responded':
                return 'mark_chat_unread';
            case 'Resolved':
                return 'check_circle';
            case 'Viewed':
                return 'visibility';
            case 'Sent':
            default:
                return 'send';
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
            {/* TopAppBar */}
            <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined text-primary">arrow_back</span>
                    </button>
                    <span className="font-['Manrope'] font-black text-xl text-primary tracking-tighter">Inquiries</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5 overflow-hidden">
                        <img className="w-full h-full object-cover rounded-full" src={profileImage} alt="User" />
                    </div>
                </div>
            </header>

            <main className="mt-20 px-6">
                {/* Header Content */}
                <section className="mb-8">
                    <h2 className="font-headline font-bold text-2xl text-primary tracking-tight">Active Inquiries</h2>
                    <p className="text-on-surface-variant text-sm mt-1">Manage your ongoing property communications.</p>
                </section>

                {/* Search Bar */}
                <div className="mb-8 relative">
                    <div className="flex items-center bg-[#e3e2e7] rounded-full px-5 py-3 w-full">
                        <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
                        <input 
                            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/60" 
                            placeholder="Search inquiries..." 
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <span className="material-symbols-outlined text-on-surface-variant ml-2">tune</span>
                    </div>
                </div>

                {/* Inquiry List */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
                        </div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="text-center py-20 text-on-surface-variant">
                            No active inquiries found.
                        </div>
                    ) : (
                        filteredInquiries.map((inq) => (
                            <div 
                                key={inq._id} 
                                className="relative bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/5 transition-transform hover:scale-[1.01]"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="space-y-0.5">
                                        <h3 className="font-headline font-bold text-lg text-primary">{inq.propertyName}</h3>
                                        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                                            <span>From: <strong className="text-primary">{inq.buyerName}</strong></span>
                                            <span>•</span>
                                            <span>{inq.buyerEmail}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Today'}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed mb-4 italic p-3 bg-surface rounded-lg border-l-2 border-secondary/30">
                                    "{inq.message}"
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                    <button 
                                        onClick={() => updateStatus(inq._id, inq.status)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:opacity-85 ${getStatusStyle(inq.status)}`}
                                    >
                                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: inq.status === 'Resolved' ? "'FILL' 1" : "'FILL' 0" }}>{getStatusIcon(inq.status)}</span>
                                        {inq.status}
                                    </button>
                                    <span className="text-xs font-bold text-secondary">{inq.price || 'Market Rate'}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* BottomNavBar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-t-3xl border-t border-slate-100/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
                <Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all" to="/home">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Home</span>
                </Link>
                <Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all" to="/properties">
                    <span className="material-symbols-outlined">search</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest mt-1">Search</span>
                </Link>
                <div className="relative -top-8">
                    <Link to="/add-property" className="bg-secondary text-white p-4 rounded-full shadow-lg scale-110 active:scale-95 transition-transform flex items-center justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                    </Link>
                </div>
                <Link className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-[#1B3A6B] transition-all" to="/favorites">
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
