"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const signInWithEmailPassword = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in with email/password");
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with email/password:", error);
      setError(error.message);
      throw error;
    }
  };

  const signUpWithEmailPassword = async (email, password) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created with email/password");
      await createUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error creating user with email/password:", error);
      setError(error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("User signed in with Google");
      await createUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error logging out:", error);
      setError(error.message);
    }
  };

  async function createUser(user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        role: "client",
        username: "",
        elo: 1200,
      });
      console.log("User created in the database.");
      return true;
    }
    console.log("User already exists.");
    return false;
  }

  useEffect(() => {
    console.log("AuthContext - Setting up auth state listener");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AuthContext - Auth state changed:", {
        isAuthenticated: !!user,
        userId: user?.uid,
      });

      if (user) {
        setUser(user);
      } else {
        setUser(null);
        const pathname = window.location.pathname;
        console.log("AuthContext - No user, current pathname:", pathname);

        // Only redirect to signin if not already on an auth page or home
        if (!pathname.startsWith("/auth/") && pathname !== "/") {
          console.log(
            "AuthContext - Redirecting to signin page from:",
            pathname
          );
          router.push("/auth/signin");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithEmailPassword,
        signUpWithEmailPassword,
        signInWithGoogle,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
