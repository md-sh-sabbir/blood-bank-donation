import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import { jsx } from 'react/jsx-runtime';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userStatus, setUserStatus] = useState('')

    const axiosSecure = useAxios()

    // console.log(user);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        }).then(() => {
            setUser({
                ...auth.currentUser,
                displayName: name,
                photoURL: photo
            });
        });
    }

    const emailVerification = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser)
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe
        }
    }, [])

    useEffect(() => {
        if(!user) return 
        axiosSecure.get(`/user/role/${user?.email}`)
            .then(res => {
                setUserStatus(res.data.status)
            })
    })

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUser,
        setUser,
        emailVerification,
        resetPassword,
        userStatus
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;