import React, { createContext, useContext,  useState, useEffect } from 'react';
import{ auth } from '../firebase';

//llamar funciones de autenticacion de firebase
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

///definir el contexto
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

//componente proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //funcion para registrar usuarios
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //funcion para iniciar sesion
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //funcion para cerrar sesion
    const logout = () => {
        return signOut(auth);
    }

    //detectar cambios en la autenticacion
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

