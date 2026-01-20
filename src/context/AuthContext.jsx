
import React, { createContext, useState, useContext } from 'react';
import { DataContext } from './DataContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { users, logAction } = useContext(DataContext);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password && u.active);
        if (user) {
            setCurrentUser(user);
            logAction(user.id, user.firstName, 'LOGIN', 'User logged in');
            return { success: true };
        }
        return { success: false, message: 'Email və ya şifrə yanlışdır!' };
    };

    const logout = () => {
        if (currentUser) {
            logAction(currentUser.id, currentUser.firstName, 'LOGOUT', 'User logged out');
        }
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
