import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
    updateProfile: (name: string) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('smartlearn_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signup = (name: string, email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('smartlearn_users') || '[]');
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('smartlearn_users', JSON.stringify(users));
    };

    const login = (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('smartlearn_users') || '[]');
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            const sessionUser = { name: foundUser.name, email: foundUser.email };
            setUser(sessionUser);
            localStorage.setItem('smartlearn_session', JSON.stringify(sessionUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('smartlearn_session');
    };

    const updateProfile = (name: string) => {
        if (user) {
            const updatedUser = { ...user, name };
            setUser(updatedUser);
            localStorage.setItem('smartlearn_session', JSON.stringify(updatedUser));

            // Update in the users list as well
            const users = JSON.parse(localStorage.getItem('smartlearn_users') || '[]');
            const updatedUsers = users.map((u: any) =>
                u.email === user.email ? { ...u, name } : u
            );
            localStorage.setItem('smartlearn_users', JSON.stringify(updatedUsers));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isAuthenticated: !!user }}>
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
