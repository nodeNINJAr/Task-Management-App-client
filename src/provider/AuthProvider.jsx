import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";


// 
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);





  // google signin
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(auth, provider);
  // signOut
  const userSignOut =()=> signOut(auth);



  //observers
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser("");
        setLoading(false);
      }

      return () => unsubscribe();
    });
  }, []);

  const authInfo = {
    user,
    loading,
    signInWithGoogle,
    userSignOut
  };
  //
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
