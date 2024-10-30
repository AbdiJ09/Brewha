import React, { createContext, useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Platform } from "react-native";

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    let isSubscribed = true;

    const initializeUser = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser && isSubscribed) {
          setUser(currentUser);
          setInitializing(false);
        }

        const unsubscribe = auth().onAuthStateChanged((user) => {
          if (!isSubscribed) {
            return;
          }
          setUser(user);
          setInitializing(false);
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
        });

        if (Platform.OS === "android") {
          timeout = setTimeout(() => {
            if (!isSubscribed) {
              return;
            }
            setInitializing(false);
            const timeoutUser = auth().currentUser;
            if (timeoutUser && isSubscribed) {
              setUser(timeoutUser);
            }
          }, 2000);
        }

        return unsubscribe;
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isSubscribed) {
          setInitializing(false);
        }
        return () => {};
      }
    };

    let unsubscribe: (() => void) | undefined;
    initializeUser().then((cleanup) => {
      unsubscribe = cleanup;
    });

    return () => {
      isSubscribed = false;
      if (timeout) {
        clearTimeout(timeout);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const onLogout = async () => {
    await auth().signOut();
  };

  return <AuthContext.Provider value={{ user, initializing, onLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
