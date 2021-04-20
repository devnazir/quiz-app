/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext } from "react"
import firebase from '../config/firebase';
import { addUser } from '../utils/db'

const AuthContext = createContext()

function useProvideAuth() {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(handleAuthChange);
    }, [])

    const userDataState = async (user) => ({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoUrl: user.photoURL,
        token: await user.getIdToken()
    })

    const handleAuthChange = async (user) => {
        if (!user) {
            setLoading(false)
            return;
        }

        const userData = await userDataState(user)
        setAuth(userData)
        setLoading(false)
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(({ user }) => {
            userHasLogged(user)
        });
    }

    const userHasLogged = async (user) => {
        if (user) {
            const newUser = await userDataState(user)
            await addUser(newUser)
        }
    }

    const resetStateValue = () => {
        setAuth(null)
    }

    const signOut = () => {
        firebase.auth().signOut().then(resetStateValue);
    }

    return {
        auth,
        loading,
        signInWithGoogle,
        signOut,
    }
}

export function AuthProvider({ children }) {
    const auth = useProvideAuth()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)