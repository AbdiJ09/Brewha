import React, { createContext, useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  onLogout: () => Promise<void>;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    setTimeout(() => {
      if (initializing) setInitializing(false);
    }, 2000);

    return () => unsubscribe();
  }, []);

  const onLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <AuthContext.Provider value={{ user, onLogout, initializing, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
