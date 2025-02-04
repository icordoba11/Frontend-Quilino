import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import app from '../../configs/firebase/firebase-config';
import { auth } from '../../configs/firebase/firebase-config';
import { useSnackbar } from 'notistack';


type AuthContextType = {
    currentUser: User | null;
    isLoading: boolean;
    login: (user: UserLogin) => void;
    logout: () => void;
};


export interface UserLogin {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (user: UserLogin) => {
        try {
            await signInWithEmailAndPassword(auth, user.email, user.password);

        } catch (error) {
            enqueueSnackbar("Credenciales incorrectas", { variant: 'error' })

        }
    };

    const logout = () => {
        const auth = getAuth(app);
        auth.signOut().then(() => {
            setCurrentUser(null);
        });
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, login, logout }}>
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
