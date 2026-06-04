import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Shield, LayoutDashboard, LogOut, Building2, Users2, Info, Mail, Home, ChevronDown, User, Bell, Search } from 'lucide-react';

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
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-50 transition-all duration-1000 ${scrolled ? 'bg-[#071B3A]/90 backdrop-blur-3xl border-b border-white/5 py-3' : 'bg-transparent py-8'}`}
            >
                <div className="max-w-[1700px] mx-auto px-10 flex justify-between items-center">
                    {/* Logo Section */}
                    <div 
                        className="flex items-center gap-3 group cursor-pointer" 
                        onClick={() => navigate('/home')}
                    >
                        <motion.div 
                            whileHover={{ rotate: 5 }}
                            className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center"
                        >
                            <Building2 className="text-primary w-5 h-5" />
                        </motion.div>
                        <div className="flex flex-col leading-none">
                            <span className="font-headline font-black text-xl text-white tracking-widest uppercase">OPMS</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-accent opacity-80">Premium Real Estate</span>
                        </div>
                    </div>

                    {/* Centered Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 bg-black/20 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/5">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`px-8 py-2.5 rounded-full text-[11px] font-bold tracking-wider transition-all relative ${isActive(item.path) ? 'text-white' : 'text-white/60 hover:text-white'}`}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {isActive(item.path) && (
                                    <motion.span 
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-[#0A254D] rounded-full border border-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDarkMode}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white hover:text-primary transition-all"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </motion.button>

                        {/* Notifications */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white hover:text-primary transition-all"
                        >
                            <Bell className="w-4 h-4" />
                            {hasNotifications && (
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#071B3A]" />
                            )}
                        </motion.button>

                        {token ? (
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-all"
                            >
                                <div className="w-8 h-8 rounded-full border-2 border-accent overflow-hidden shadow-lg">
                                    {profileImage ? <img alt="Profile" src={profileImage} className="w-full h-full object-cover" /> : <User className="w-full h-full p-1.5 text-white" />}
                                </div>
                                <span className="text-[10px] font-bold text-white tracking-wide">{user?.name || 'User'}</span>
                                <ChevronDown className="w-3 h-3 text-white/40" />
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/login')}
                                className="bg-gold-gradient text-primary px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg"
                            >
                                Join Elite
                            </motion.button>
                        )}

                        {/* Hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-xl"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu (simplified for briefness) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[60] bg-[#071B3A] p-10 flex flex-col items-center justify-center gap-10"
                    >
                        <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white"><X /></button>
                        {navItems.map(item => (
                            <Link key={item.name} to={item.path} className="text-3xl font-headline font-black text-white uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
