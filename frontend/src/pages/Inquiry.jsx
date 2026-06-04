import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Search, Mail, CheckCircle, Zap, Quote, Loader2, Sparkles } from 'lucide-react';

export default function Inquiry() {
    const navigate = useNavigate();
    const { authFetch } = useAuth();
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
                setFilteredInquiries(updated);
            }
        } catch (err) {
            console.error('Error updating inquiry status:', err);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const results = inquiries.filter(inq => 
            inq.propertyName.toLowerCase().includes(value.toLowerCase()) ||
            inq.buyerName.toLowerCase().includes(value.toLowerCase()) ||
            inq.status.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredInquiries(results);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Responded': return 'bg-secondary/10 text-secondary border-secondary/20';
            case 'Resolved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Viewed': return 'bg-primary/5 text-primary border-primary/20';
            case 'Sent': 
            default: return 'bg-primary text-white border-primary';
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen pb-32">
            <Navbar />

            <main className="pt-24 sm:pt-36 container-responsive space-y-12">
                <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-surface-variant pb-8 px-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            Client Relations
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary tracking-tight uppercase italic">My Inquiries</h1>
                        <p className="text-on-surface-variant font-medium text-sm">Manage and track your property interactions.</p>
                    </div>
                    <div className="relative w-full sm:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <input 
                            className="w-full pl-12 pr-4 py-3.5 bg-primary/5 border border-transparent rounded-2xl focus:border-primary/10 focus:bg-white outline-none font-bold transition-all text-sm" 
                            placeholder="Filter messages..." 
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </section>

                <div className="space-y-6 px-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Loading inquiries...</span>
                        </div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="text-center py-32 bg-primary/5 rounded-[3rem] space-y-4 border-2 border-dashed border-primary/10">
                            <Mail className="w-16 h-16 text-primary/10 mx-auto" />
                            <p className="text-on-surface-variant font-bold text-lg">No active inquiries found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredInquiries.map((inq) => (
                                <div 
                                    key={inq._id} 
                                    className="bg-white rounded-[2.5rem] p-8 border border-surface-variant hover:border-primary/20 hover:shadow-2xl transition-all group flex flex-col justify-between space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1 flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-1 truncate">{inq.propertyName}</h3>
                                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest truncate">From <span className="text-primary">{inq.buyerName}</span></p>
                                            </div>
                                            <span className="text-[10px] font-bold text-on-surface-variant/40 whitespace-nowrap ml-4">
                                                {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Recently'}
                                            </span>
                                        </div>
                                        
                                        <div className="bg-primary/5 p-6 rounded-3xl border-l-4 border-secondary relative group-hover:bg-primary/10 transition-colors">
                                            <Quote className="absolute top-2 right-2 text-primary/10 w-6 h-6" />
                                            <p className="text-sm font-medium text-primary/80 leading-relaxed italic line-clamp-3">"{inq.message}"</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-surface-variant/50">
                                        <button 
                                            onClick={() => updateStatus(inq._id, inq.status)}
                                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all active:scale-95 ${getStatusStyle(inq.status)}`}
                                        >
                                            {inq.status === 'Resolved' ? <CheckCircle className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                                            {inq.status}
                                        </button>
                                        <span className="font-bold text-secondary text-sm">{inq.price || 'Market Rate'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
