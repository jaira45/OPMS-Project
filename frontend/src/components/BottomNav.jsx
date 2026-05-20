import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const location = useLocation();
    
    const navItems = [
        { label: 'Home', icon: 'home', path: '/home' },
        { label: 'Search', icon: 'search', path: '/properties' },
        { label: 'Add', icon: 'add_circle', path: '/add-property', isMain: true },
        { label: 'Saved', icon: 'favorite', path: '/favorites' },
        { label: 'Admin', icon: 'dashboard', path: '/dashboard' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-6 pt-3 glass rounded-t-3xl border-t border-white/10 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                if (item.isMain) {
                    return (
                        <div key={item.label} className="relative -top-8">
                            <Link 
                                to={item.path} 
                                className="bg-secondary text-white p-4 rounded-full shadow-2xl scale-110 active:scale-95 transition-transform flex items-center justify-center border-4 border-background"
                            >
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </Link>
                        </div>
                    );
                }

                return (
                    <Link 
                        key={item.label}
                        className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-on-surface-variant'}`} 
                        to={item.path}
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                            {item.icon}
                        </span>
                        <span className="font-bold text-[10px] uppercase tracking-widest mt-1">{item.label}</span>
                        {isActive && <div className="w-1 h-1 bg-primary rounded-full mt-0.5" />}
                    </Link>
                );
            })}
        </nav>
    );
}
