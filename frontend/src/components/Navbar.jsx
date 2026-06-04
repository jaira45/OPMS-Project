import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Shield, LayoutDashboard, LogOut, Building2, Users2, Info, Mail, Home, ChevronDown, User, Bell, Search, Sparkles } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, user, profileImage, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

    const navItems = [
        { name: 'Home', path: '/home' },
        { name: 'Inventory', path: '/properties' },
        { name: 'Imperial Agents', path: '/agents' },
        { name: 'Legacy', path: '/about' },
        { name: 'Nexus Hub', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.nav 
                initial={{ y: -120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 w-full z-50 transition-all duration-1000 ${scrolled ? 'bg-[#071B3A]/90 backdrop-blur-3xl border-b border-white/5 py-4' : 'bg-transparent py-10'}`}
            >
                <div className="max-w-[1700px] mx-auto px-10 flex justify-between items-center">
                    {/* ─ Master Identity ───────────────────────────────────── */}
                    <div 
                        className="flex items-center gap-4 group cursor-pointer" 
                        onClick={() => navigate('/home')}
                    >
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="w-14 h-14 bg-gold-gradient rounded-[1.25rem] flex items-center justify-center shadow-3xl ring-2 ring-white/10 group-hover:ring-accent/40 transition-all duration-700"
                        >
                            <Building2 className="text-primary w-7 h-7" />
                        </motion.div>
                        <div className="flex flex-col leading-none">
                            <span className="font-headline font-black text-3xl text-white tracking-widest uppercase italic">OPMS</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-accent opacity-60 mt-1">Metropolis Estates</span>
                        </div>
                    </div>

                    {/* ─ Centered Strategic Navigation ─────────────────────── */}
                    <div className="hidden lg:flex items-center gap-2 bg-white/5 backdrop-blur-2xl px-2 py-2 rounded-full border border-white/10 shadow-3xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${isActive(item.path) ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {isActive(item.path) && (
                                    <motion.span 
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-gold-gradient rounded-full shadow-2xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* ─ Presidential Actions ──────────────────────────────── */}
                    <div className="flex items-center gap-6">
                        {/* Utility Interface */}
                        <div className="hidden md:flex items-center gap-4 bg-white/5 p-1.5 rounded-full border border-white/10">
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleDarkMode}
                                className="w-11 h-11 flex items-center justify-center rounded-full text-white/60 transition-all"
                            >
                                {darkMode ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5" />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                className="w-11 h-11 relative flex items-center justify-center rounded-full text-white/60 transition-all"
                            >
                                <Bell className="w-5 h-5" />
                                {hasNotifications && (
                                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#071B3A] shadow-2xl animate-pulse" />
                                )}
                            </motion.button>
                        </div>

                        {token ? (
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-4 pl-1.5 pr-6 py-1.5 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-all ring-1 ring-white/0 hover:ring-accent/20 group"
                            >
                                <div className="w-10 h-10 rounded-full border-2 border-accent overflow-hidden shadow-3xl ring-2 ring-[#071B3A]">
                                    {profileImage ? <img alt="Profile" src={profileImage} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-white" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white tracking-widest uppercase italic">{user?.name || 'Vanguard'}</span>
                                    <span className="text-[7px] font-black text-accent uppercase tracking-widest leading-none">Imperial Member</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/login')}
                                className="bg-gold-gradient text-primary px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(212,175,55,0.3)] italic"
                            >
                                Join Elite
                            </motion.button>
                        )}

                        {/* Tactical Menu Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-14 h-14 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-2xl shadow-3xl"
                        >
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Terminal Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-[60] bg-[#071B3A]/95 p-16 flex flex-col items-center justify-center gap-16"
                    >
                        <motion.button 
                            whileHover={{ rotate: 90, scale: 1.2 }}
                            onClick={() => setIsMenuOpen(false)} 
                            className="absolute top-12 right-12 text-white/40 hover:text-accent"
                        >
                            <X className="w-10 h-10" />
                        </motion.button>
                        
                        <div className="flex flex-col items-center gap-12">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link 
                                        to={item.path} 
                                        className="text-5xl font-headline font-black text-white hover:text-accent transition-all uppercase tracking-tighter italic" 
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-20 flex flex-col items-center gap-6"
                        >
                            <div className="w-1 h-20 bg-gold-gradient opacity-40" />
                            <span className="text-[10px] font-black uppercase tracking-[1em] text-accent">OPMS Metropolis</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
