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

    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('profileImage') || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop';
    });

    const updateProfileImage = useCallback((newImage) => {
        localStorage.setItem('profileImage', newImage);
        setProfileImage(newImage);
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
        localStorage.removeItem('profileImage');
        setToken(null);
        setUser(null);
        setProfileImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop');
    }, []);

    const isAuthenticated = !!token && isTokenValid(token);

    /**
     * Convenience wrapper: fetch with Authorization header pre-attached.
     * If the server returns 401, auto-logout.
     */
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
        <AuthContext.Provider value={{ token, user, profileImage, updateProfileImage, isAuthenticated, login, logout, authFetch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
