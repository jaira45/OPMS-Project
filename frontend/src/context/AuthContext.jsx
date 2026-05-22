import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'user';
const TOKEN_KEY = 'opmsToken';

/**
 * Clean professional icons for the profile system
 */
const ICONS = {
    male: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    female: 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png',
    neutral: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
};

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
    return payload.exp * 1000 > Date.now();
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    // Clean up expired tokens on mount
    useEffect(() => {
        if (token && !isTokenValid(token)) {
            logout();
        }
    }, [token]);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
    }, []);

    const login = useCallback((newToken, newUser) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }, []);

    const saveProfile = useCallback((updatedFields) => {
        setUser(prevUser => {
            const updated = {
                ...prevUser,
                ...updatedFields,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Derived Profile Image - THE SINGLE SOURCE OF TRUTH FOR AVATARS
    const profileImage = useMemo(() => {
        if (!user) return ICONS.neutral;
        
        // 1. Custom profile image (if provided and not empty)
        if (user.profileImage && typeof user.profileImage === 'string' && user.profileImage.trim() !== '') {
            return user.profileImage;
        }

        // 2. Gender-based icon
        const g = (user.gender || '').toLowerCase().trim();
        if (g === 'female') return ICONS.female;
        if (g === 'male') return ICONS.male;

        // 3. Fallback to neutral
        return ICONS.neutral;
    }, [user]);

    const isAuthenticated = useMemo(() => !!token && isTokenValid(token), [token]);

    const authFetch = useCallback(async (url, options = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const res = await fetch(url, { ...options, headers });
        if (res.status === 401) logout();
        return res;
    }, [token, logout]);

    const value = {
        token,
        user,
        setUser,
        profileImage,
        isAuthenticated,
        login,
        logout,
        saveProfile,
        authFetch
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
