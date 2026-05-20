import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

export default function LoginSignup() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/home';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter username/email and password.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token, data.user);
                navigate(from, { replace: true });
            } else {
                setError(data.message || "Invalid email or password.");
            }
        } catch (err) {
            setError("Could not reach the server.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!fullName || !email || !password) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, phone, password })
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token, data.user);
                navigate('/home', { replace: true });
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError("Could not reach the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background overflow-hidden">
            {/* Visual Side (Laptop/Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary p-12 flex-col justify-between">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/home')}>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center rotate-3">
                            <span className="material-symbols-outlined text-primary">apartment</span>
                        </div>
                        <span className="font-black text-2xl text-white tracking-tighter">OPMS</span>
                    </div>
                </div>
                
                <div className="relative z-10 space-y-6">
                    <h2 className="text-6xl font-black text-white leading-tight">Find your <br/> next <span className="text-secondary-container">exclusive</span> <br/> estate.</h2>
                    <p className="text-white/70 text-lg max-w-md font-medium">Join thousands of premium buyers discovering the most iconic residences in Madhya Pradesh.</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&fit=crop" className="w-full h-full object-cover" alt="Luxury House" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-transparent"></div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 overflow-y-auto">
                <div className="w-full max-w-md space-y-10 animate-fade-in-up">
                    <div className="space-y-2">
                        <div className="lg:hidden flex items-center gap-2 mb-8">
                             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-sm">apartment</span>
                            </div>
                            <span className="font-black text-xl text-primary tracking-tighter">OPMS</span>
                        </div>
                        <h1 className="font-headline font-black text-4xl text-primary tracking-tight">
                            {isLoginView ? 'Welcome back' : 'Start your journey'}
                        </h1>
                        <p className="text-on-surface-variant font-bold text-base">
                            {isLoginView ? 'Sign in to access your dashboard.' : 'Create an account to explore premium listings.'}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {!isLoginView && (
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Full Name</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">person</span>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full pl-12 pr-4 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">alternate_email</span>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 px-1">Security Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-surface-variant/20 border-2 border-transparent rounded-2xl focus:border-primary/20 focus:bg-white focus:ring-0 font-bold transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-error/10 border border-error/20 p-4 rounded-xl flex items-center gap-3 text-error animate-fade-in">
                                <span className="material-symbols-outlined">error</span>
                                <span className="text-xs font-black uppercase tracking-widest">{error}</span>
                            </div>
                        )}

                        <button
                            onClick={isLoginView ? handleLogin : handleSignup}
                            disabled={loading}
                            className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <span>{isLoginView ? 'Login Security' : 'Create Account'}</span>
                            )}
                        </button>
                    </div>

                    <div className="pt-6 text-center">
                        <p className="text-sm font-bold text-on-surface-variant">
                            {isLoginView ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <button
                            onClick={toggleView}
                            className="mt-2 text-primary font-black uppercase tracking-widest text-xs border-b-2 border-primary hover:text-secondary group transition-all"
                        >
                            {isLoginView ? 'Request Registration' : 'Return to Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
