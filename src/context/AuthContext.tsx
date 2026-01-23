import React, { createContext, useContext, useState, useEffect } from 'react';
import { type User, MOCK_USERS } from '../lib/mockData';

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage or session
        const storedUser = localStorage.getItem('agro_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
                localStorage.removeItem('agro_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        // Mock login logic
        const foundUser = MOCK_USERS.find(u => u.email === email);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('agro_user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('agro_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
