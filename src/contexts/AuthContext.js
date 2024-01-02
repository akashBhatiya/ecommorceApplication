import { createContext, useContext, useEffect,useState } from "react";
import { auth } from "../configs/firebase";
import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try{
            await signInWithPopup(auth, provider);
            toast.success('Sign in successful!');
            navigate(-1);
        }catch(error){
            console.error("Error in Sign in with google",error);
            toast.error('Sign in failed. Please try again.')
        }
    }

    const signOutUser = async () => {
        try{
            await signOut(auth);
            toast.success('Sign out successful!');
            navigate(-1);
        }catch(error){
            console.error("Error while signing out the user" , error);
            toast.error("Sign out failed");
        }
    }

    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        } );

        return () => unsubscribe();
    },[]);

    const value = {
        user, 
        signInWithGoogle,
        signOutUser
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>

}   

export default AuthProvider;
