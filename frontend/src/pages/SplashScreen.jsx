import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            // If already logged in, skip login screen entirely
            navigate(isAuthenticated ? '/home' : '/login');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate, isAuthenticated]);

    return (
        <main className="relative h-screen w-full flex flex-col items-center justify-between bg-gradient-to-br from-[#1B3A6B] to-[#0F766E] p-8 overflow-hidden">
            {/* Top Visual Element (Subtle Glass Circle) */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            {/* Spacer for top weight */}
            <div className="h-10"></div>
            
            {/* Center Identity Branding */}
            <div className="flex flex-col items-center text-center space-y-6 z-10">
                {/* Logo Container */}
                <div className="relative w-28 h-28 flex items-center justify-center bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20">
                    <span className="material-symbols-outlined text-white text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        domain
                    </span>
                    {/* Abstract "Key" Accent */}
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#ffddb8] rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-[#2a1700] text-2xl">
                            vpn_key
                        </span>
                    </div>
                </div>
                {/* Brand Name & Tagline */}
                <div className="space-y-2">
                    <h1 className="font-headline font-extrabold text-5xl tracking-tighter text-white">
                        OPMS
                    </h1>
                    <p className="font-label text-sm font-semibold tracking-[0.2em] text-[#d7e2ff] uppercase opacity-90">
                        Online Property Management System
                    </p>
                </div>
            </div>
            
            {/* Bottom Content & Loading */}
            <div className="w-full flex flex-col items-center space-y-12 z-10">
                {/* Platform Description */}
                <div className="text-center px-4">
                    <p className="text-white/70 font-body text-sm leading-relaxed max-w-[240px]">
                        A Web-Based Real Estate Platform for Madhya Pradesh
                    </p>
                </div>
                {/* Loading Indicator */}
                <div className="w-full max-w-[160px] space-y-4">
                    <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-[#ffddb8] rounded-full animate-[pulse_1.5s_infinite]"></div>
                    </div>
                    <div className="flex justify-center">
                        <span className="text-[10px] font-label font-bold text-white/40 tracking-widest uppercase">
                            Initializing Curator
                        </span>
                    </div>
                </div>
                {/* Ornamental Footer Element */}
                <div className="flex items-center space-y-1">
                    <div className="w-8 h-[1px] bg-white/20"></div>
                    <div className="mx-3 text-[10px] font-label font-medium text-white/30 italic">
                        The Digital Curator
                    </div>
                    <div className="w-8 h-[1px] bg-white/20"></div>
                </div>
            </div>
            
            {/* Bottom Visual Element (Subtle Glass Circle) */}
            <div className="absolute bottom-[-5%] right-[-5%] w-48 h-48 bg-[#99efe5]/10 rounded-full blur-3xl"></div>
            {/* Safe Area Home Indicator (Visual Only) */}
            <div className="mb-2 w-32 h-1 bg-white/20 rounded-full"></div>
        </main>
    );
}
