import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

/**
 * Decode JWT payload without a library (base64url decode).
 * Returns null if token is invalid / expired.
 */
function parseJwt(token) {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
}

function isTokenValid(token) {
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    // exp is in seconds; Date.now() is ms
    return payload.exp * 1000 > Date.now();
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    });

    // On mount, validate stored token — clear if expired
    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (stored && !isTokenValid(stored)) {
            logout();
        }
    }, []);

    // Periodic expiry check every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const stored = localStorage.getItem('token');
            if (stored && !isTokenValid(stored)) {
                logout();
            }
        }, 60_000);
        return () => clearInterval(interval);
    }, []);

    const getEffectiveProfileImage = useCallback((u) => {
        const normalizedGender = (u?.gender || "").toLowerCase().trim();

        if (u?.profileImage && u.profileImage.trim() !== '') {
            return u.profileImage;
        }

        if (normalizedGender === "female") {
            return 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80';
        } else if (normalizedGender === "male") {
            return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80';
        } else {
            return 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        }
    }, []);

    const currentProfileImage = user ? getEffectiveProfileImage(user) : null;

    const updateUser = useCallback((updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser({ ...updatedUser }); // Force shadow copy to trigger effect
    }, []);

    const login = useCallback((newToken, newUser) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }, []);

    const isAuthenticated = !!token && isTokenValid(token);

    const authFetch = useCallback(async (url, options = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const res = await fetch(url, { ...options, headers });
        if (res.status === 401) {
            logout();
        }
        return res;
    }, [token, logout]);

    return (
        <AuthContext.Provider value={{ token, user, profileImage: currentProfileImage, updateUser, isAuthenticated, login, logout, authFetch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
