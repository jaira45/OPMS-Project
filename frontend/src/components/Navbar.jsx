import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, LayoutDashboard, LogOut, Building2, Users2, Info, Mail, Home, ChevronDown, User, Bell, Search, Sparkles } from 'lucide-react';

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
        { name: 'Properties', path: '/properties' },
        { name: 'Agents', path: '/agents' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.nav 
                initial={{ y: -120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#071B3A]/95 backdrop-blur-3xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-8'}`}
            >
                <div className="max-w-[1700px] mx-auto px-6 sm:px-10 flex justify-between items-center">
                    {/* Brand Identity */}
                    <div 
                        className="flex items-center gap-4 group cursor-pointer" 
                        onClick={() => navigate('/home')}
                    >
                        <motion.div 
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-gradient rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/5 group-hover:ring-accent/40 transition-all duration-500"
                        >
                            <Building2 className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.div>
                        <div className="flex flex-col leading-none">
                            <span className="font-headline font-bold text-xl sm:text-2xl text-white tracking-widest uppercase italic">OPMS</span>
                            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] text-accent opacity-60 mt-1">Premium Estates</span>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <div className="hidden lg:flex items-center gap-2 bg-white/5 backdrop-blur-2xl px-2 py-2 rounded-full border border-white/10 shadow-xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all relative ${isActive(item.path) ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {isActive(item.path) && (
                                    <motion.span 
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-gold-gradient rounded-full shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Dark Mode & Notifications */}
                        <div className="hidden md:flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/10">
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleDarkMode}
                                className="w-10 h-10 flex items-center justify-center rounded-full text-white/50 transition-all"
                            >
                                {darkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4" />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 relative flex items-center justify-center rounded-full text-white/50 transition-all"
                            >
                                <Bell className="w-4 h-4" />
                                {hasNotifications && (
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-[#071B3A] shadow-lg animate-pulse" />
                                )}
                            </motion.button>
                        </div>

                        {token ? (
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-full border-2 border-accent overflow-hidden shadow-lg">
                                    {profileImage ? <img alt="Profile" src={profileImage} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-white" />}
                                </div>
                                <div className="hidden sm:flex flex-col">
                                    <span className="text-[10px] font-bold text-white tracking-widest uppercase italic truncate max-w-[80px]">{user?.name || 'Member'}</span>
                                    <span className="text-[7px] font-bold text-accent uppercase tracking-widest leading-none flex items-center gap-1">
                                        <Sparkles className="w-2 h-2" />
                                        Verified
                                    </span>
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-white/20 group-hover:text-accent transition-colors" />
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/login')}
                                className="bg-gold-gradient text-primary px-6 sm:px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg italic flex items-center gap-2"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Get Started
                            </motion.button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-11 h-11 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-xl shadow-xl"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed inset-0 z-[60] bg-[#071B3A] p-12 flex flex-col items-center justify-center gap-10"
                    >
                        <motion.button 
                            whileHover={{ rotate: 90, scale: 1.2 }}
                            onClick={() => setIsMenuOpen(false)} 
                            className="absolute top-10 right-10 text-white/20 hover:text-white"
                        >
                            <X className="w-10 h-10" />
                        </motion.button>
                        
                        <div className="flex flex-col items-center gap-6">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link 
                                        to={item.path} 
                                        className="text-3xl sm:text-4xl font-headline font-bold text-white hover:text-accent transition-all uppercase tracking-tighter italic" 
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
                            className="mt-12 flex flex-col items-center gap-4"
                        >
                            <div className="w-px h-16 bg-gold-gradient opacity-30" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.8em] text-accent">Central India Premium Estates</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
