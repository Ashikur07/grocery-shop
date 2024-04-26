import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user by google
    const createUserWithGoogle = (Provider) => {
        return signInWithPopup(auth, Provider);
        setLoading(true);
    }

    // Create user by github
    const createUserWithGitHub = (Provider) => {
        return signInWithPopup(auth, Provider);
        setLoading(true);
    }

    // Create user by email and password
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
        setLoading(true);
    }

    // Sign in user by email and password
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
        setLoading(true);
    }

    // Observe state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])


    // logut function
    const logOut = () => {
        return signOut(auth);
        setLoading(true);
    }

    // set all info
    const authInfo = {
        logOut,
        user,
        createUserWithGoogle,
        createUserWithGitHub,
        createNewUser,
        signInUser,
        loading,
        setUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.prototype = {
    children: PropTypes.node,
}

export default AuthProvider;