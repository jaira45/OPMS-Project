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

    // Redirect to originally requested page after login, default /home
    const from = location.state?.from?.pathname || '/home';

    // Form fields
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
            setError("Could not reach the server. Please check your connection.");
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
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Could not reach the server. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative h-screen w-full flex flex-col items-center justify-center p-8 md:max-w-[430px] md:mx-auto md:shadow-2xl md:bg-white md:rounded-[3rem]">
            {/* Logo Header */}
            <div className="flex flex-col items-center mb-10">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary text-4xl">domain</span>
                </div>
                <h1 className="font-headline font-extrabold text-3xl text-primary tracking-tight">
                    {isLoginView ? 'Welcome Back' : 'Join OPMS'}
                </h1>
                <p className="text-outline text-sm mt-1">Digital access to MP real estate</p>
            </div>

            {/* Forms Container */}
            <div className="w-full space-y-6">
                {isLoginView ? (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">person</span>
                                <input
                                    type="text"
                                    placeholder="Username or Email"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                            <div className="flex justify-end px-2">
                                <a href="#" className="text-xs font-bold text-secondary tracking-wide uppercase">Forgot Password?</a>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs">{error}</p>}

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 active:scale-95 transition-all flex justify-center items-center"
                        >
                            {loading ? 'Loading...' : 'Login Now'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">person</span>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">phone_iphone</span>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create Password"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs">{error}</p>}

                        <button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full py-5 bg-secondary text-white rounded-2xl font-bold shadow-lg shadow-secondary/25 active:scale-95 transition-all flex justify-center items-center"
                        >
                            {loading ? 'Loading...' : 'Create Account'}
                        </button>
                    </div>
                )}
            </div>

            {/* View Switcher */}
            <div className="mt-10 text-center">
                <p className="text-sm font-medium text-outline">
                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                    onClick={toggleView}
                    className="mt-2 text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary pb-0.5"
                >
                    {isLoginView ? 'Register Now' : 'Login Instead'}
                </button>
            </div>

            {/* Social Auth */}
            <div className="mt-12 w-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-outline/20"></div>
                    <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Or continue with</span>
                    <div className="h-px flex-1 bg-outline/20"></div>
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-gray-100 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
                    </button>
                    <button className="flex-1 py-4 bg-gray-100 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-primary">apple</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
