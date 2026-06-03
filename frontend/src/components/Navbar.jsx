import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Shield, LayoutDashboard, LogOut, Building2, Users2, Info, Mail, Home, ChevronRight, User } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, user, profileImage, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

    // Re-mapping icons for lucide
    const navItems = [
        { name: 'Home', path: '/home', icon: <Home className="w-5 h-5" /> },
        { name: 'Properties', path: '/properties', icon: <Building2 className="w-5 h-5" /> },
        { name: 'Agents', path: '/agents', icon: <Users2 className="w-5 h-5" /> },
        { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
        { name: 'Contact', path: '/contact', icon: <Mail className="w-5 h-5" /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-primary/40 backdrop-blur-3xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] py-5' : 'bg-transparent py-10'}`}
            >
                <div className="max-w-[1500px] mx-auto px-8 sm:px-16 flex justify-between items-center">
                    {/* Logo */}
                    <div 
                        className="flex items-center gap-5 group cursor-pointer no-select" 
                        onClick={() => navigate('/home')}
                    >
                        <motion.div 
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 bg-gold-gradient rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all duration-500"
                        >
                            <Home className="text-primary w-7 h-7" />
                        </motion.div>
                        <div className="flex flex-col leading-none">
                            <span className="font-black text-3xl text-white tracking-tighter uppercase italic">OPMS</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#D4AF37] hidden lg:block opacity-80 mt-1">Metropolis Estates</span>
                        </div>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] backdrop-blur-3xl p-2 rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`px-10 py-4.5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group flex items-center gap-4 ${isActive(item.path) ? 'text-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <motion.span 
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-gold-gradient rounded-[2rem] -z-10 shadow-lg"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 text-white shadow-xl hover:bg-white hover:text-primary transition-all duration-500"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>

                        {token ? (
                            <div className="flex items-center gap-5">
                                {/* User Profile */}
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => navigate('/dashboard')}
                                    className="hidden sm:flex items-center gap-4 pl-2 pr-6 py-2 bg-white/[0.05] border border-white/10 rounded-full cursor-pointer hover:bg-white/[0.1] transition-all group shadow-xl"
                                >
                                    <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden bg-white/10 ring-4 ring-[#D4AF37]/20 shadow-xl">
                                        {profileImage ? <img alt="Profile" src={profileImage} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-white" />}
                                    </div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest truncate max-w-[120px]">{user?.name?.split(' ')[0] || 'Member'}</span>
                                </motion.div>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="bg-gold-gradient text-primary px-12 py-4.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_15px_30px_rgba(212,175,55,0.3)] active:scale-95"
                            >
                                Initiate Journey
                            </motion.button>
                        )}

                        {/* Hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center text-white bg-white/[0.05] border border-white/10 rounded-2xl shadow-xl"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Overlay Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ backdropFilter: "blur(0px)" }}
                            animate={{ backdropFilter: "blur(12px)" }}
                            className="absolute inset-0 bg-primary/20 dark:bg-dark-bg/60" 
                            onClick={() => setIsMenuOpen(false)} 
                        />
                        
                        {/* Drawer */}
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-dark-surface shadow-2xl flex flex-col pt-8"
                        >
                            {/* Drawer Header */}
                            <div className="flex justify-between items-center px-8 pb-6 border-b border-surface-variant dark:border-dark-surface-variant">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary dark:bg-dark-primary rounded-xl flex items-center justify-center">
                                        <Home className="text-white w-5 h-5" />
                                    </div>
                                    <span className="font-black text-xl text-primary dark:text-dark-on-surface tracking-tighter">OPMS</span>
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-primary/40 dark:text-dark-on-surface-variant bg-surface-variant/20 dark:bg-dark-surface-variant/20 rounded-xl">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* User Info */}
                            {token && (
                                <div className="px-8 py-6 flex items-center gap-4 bg-primary/5 dark:bg-dark-primary/5 border-b border-surface-variant dark:border-dark-surface-variant">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20 dark:border-dark-primary/40 bg-white">
                                        {profileImage ? <img src={profileImage} alt="" className="w-full h-full object-cover" /> : <User className="w-full h-full p-3 text-primary" />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-black text-primary dark:text-dark-on-surface text-lg truncate">{user?.name}</p>
                                        <p className="text-xs font-bold text-primary/40 dark:text-dark-on-surface-variant truncate">{user?.email}</p>
                                    </div>
                                </div>
                            )}

                            {/* Nav Links */}
                            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-base font-black transition-all ${isActive(item.path) ? 'bg-primary dark:bg-dark-primary text-white shadow-lg shadow-primary/20' : 'text-primary dark:text-dark-on-surface-variant hover:bg-primary/5 dark:hover:bg-dark-primary/5'}`}
                                    >
                                        {item.icon}
                                        {item.name}
                                        {!isActive(item.path) && <ChevronRight className="ml-auto w-4 h-4 opacity-20" />}
                                    </Link>
                                ))}
                            </div>

                            {/* Drawer Footer */}
                            <div className="px-6 py-6 border-t border-surface-variant dark:border-dark-surface-variant space-y-3 safe-bottom">
                                {token ? (
                                    <>
                                        <button onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }} className="w-full flex items-center gap-4 px-6 py-4 bg-secondary/5 dark:bg-dark-secondary/5 rounded-2xl text-secondary dark:text-dark-secondary font-black transition-all hover:bg-secondary hover:text-white">
                                            <LayoutDashboard className="w-5 h-5" />
                                            My Dashboard
                                        </button>
                                        <button onClick={() => { logout(); navigate('/login'); setIsMenuOpen(false); }} className="w-full flex items-center gap-4 px-6 py-4 bg-error/5 rounded-2xl text-error font-black transition-all hover:bg-error hover:text-white">
                                            <LogOut className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="w-full py-5 bg-primary dark:bg-dark-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                                        Let's Explore
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
