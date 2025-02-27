import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import CryptoJS from 'crypto-js';
import { UserResponse } from '../types/types';

type AuthContextType = {
    currentUser: number | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    userRole: string | null;
    token: string | null;
    userName: string;
    encryptedNumber?: string | null;
    tokenReset: string | null;
    login: (user: UserResponse) => void;
    logout: () => void;
    decryptData?: (data: string) => string;
    encryptData?: (data: string) => string;
    saveEncryptedNumber?: (id: string) => void;
    saveTokenReset?: (token: string) => void;
    clearResetId: () => void;
};

export interface UserLogin {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const decryptData = (data: string): string => {
        try {
            const bytes = CryptoJS.AES.decrypt(data, 'secret-key');
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {

            return '';
        }
    };

    const encryptData = (data: string): string => {
        return CryptoJS.AES.encrypt(data, 'secret-key').toString();
    };

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storedAuth = sessionStorage.getItem('isAuthenticated');
        return storedAuth === 'true';
    });

    const [userRole, setUserRole] = useState<string | null>(() => {
        const storedRole = sessionStorage.getItem('userRole');
        return storedRole ? decryptData(storedRole) : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        const storedToken = sessionStorage.getItem('token');
        return storedToken ? decryptData(storedToken) : null;
    });

    const [userName, setUserName] = useState<string>(() => {
        const storedUserName = sessionStorage.getItem('userName');
        return storedUserName ? decryptData(storedUserName) : '';
    });

    const [encryptedNumber, setEncryptedNumber] = useState<string | null>(() => {
        const storedNumber = localStorage.getItem('encryptedNumber');
        return storedNumber ? decryptData(storedNumber) : null;
    });

    const [tokenReset, setTokenReset] = useState<string | null>(() => {
        const storedToken = localStorage.getItem('resetToken');
        return storedToken ? decryptData(storedToken) : null;
    });

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const login = async (user: UserResponse) => {
        setIsAuthenticated(true);
        setUserRole(user.rol);
        setToken(user.token);
        setCurrentUser(user.id);

        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('userRole', encryptData(user.rol));
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('currentUser', user.id?.toString() || '');

    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
        setToken(null);
        setUserName('');

        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        localStorage.removeItem('encryptedNumber');
        localStorage.removeItem('resetToken');
    };

    const saveEncryptedNumber = (id: string) => {
        const encrypted = encryptData(id);
        setEncryptedNumber(encrypted);
        localStorage.setItem('encryptedNumber', encrypted);
    };

    const saveTokenReset = (token: string) => {
        const encrypted = encryptData(token);
        setTokenReset(encrypted);
        localStorage.setItem('resetToken', encrypted);
    };

    const clearResetId = () => {
        localStorage.removeItem('encryptedNumber');
        localStorage.removeItem('resetToken');
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            isLoading,
            isAuthenticated,
            userRole,
            token,
            userName,
            encryptedNumber,
            tokenReset,
            login,
            logout,
            decryptData,
            encryptData,
            saveEncryptedNumber,
            saveTokenReset,
            clearResetId,
            
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
