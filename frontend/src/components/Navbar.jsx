import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { token, profileImage, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Properties', path: '/properties' },
        { name: 'About', path: '/about' },
        { name: 'Agents', path: '/agents' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-500 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/home')}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <span className="material-symbols-outlined text-white text-base sm:text-xl">apartment</span>
                    </div>
                    <span className="font-black text-lg sm:text-xl text-primary tracking-tighter">OPMS</span>
                </div>

                {/* Navigation Menu (Desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>

                {/* Auth CTA & Hamburger */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {token ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden hover:border-primary transition-all shadow-sm"
                                title="My Dashboard"
                            >
                                <img alt="Profile" src={profileImage || 'https://via.placeholder.com/40'} className="w-full h-full object-cover rounded-full" />
                            </button>
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                className="hidden lg:flex items-center gap-1.5 border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all"
                            >
                                <span className="material-symbols-outlined text-base">logout</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-primary hover:bg-secondary text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-primary/20"
                        >
                            Login
                        </button>
                    )}

                    {/* Hamburger Button (Mobile/Tablet) */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex md:hidden items-center justify-center w-10 h-10 text-primary hover:bg-primary/5 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div 
                className={`fixed top-16 sm:top-20 left-0 w-full bg-white z-50 md:hidden shadow-2xl transition-all duration-300 ease-in-out transform ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <div className="flex flex-col p-6 gap-2">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between w-full p-4 rounded-xl text-lg font-bold text-primary hover:bg-primary/5 transition-all"
                        >
                            <span>{item.name}</span>
                            <span className="material-symbols-outlined text-primary/30">chevron_right</span>
                        </Link>
                    ))}
                    
                    <div className="h-px bg-primary/10 my-2"></div>
                    
                    {token ? (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
                                className="flex items-center gap-3 w-full p-4 rounded-xl text-lg font-bold text-primary hover:bg-primary/5 transition-all"
                            >
                                <span className="material-symbols-outlined">dashboard</span>
                                <span>My Dashboard</span>
                            </button>
                            <button
                                onClick={() => { logout(); navigate('/login'); setIsMenuOpen(false); }}
                                className="flex items-center gap-3 w-full p-4 rounded-xl text-lg font-bold text-error hover:bg-error/5 transition-all"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                            className="w-full mt-2 bg-primary text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-all"
                        >
                            <span className="material-symbols-outlined">login</span>
                            Login to Account
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
