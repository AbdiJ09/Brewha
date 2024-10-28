import React, {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";

type User = {
  id: number;
  username: string;
  email: string;
  picture?: string;
};

type AuthContextType = {
  signIn: (
    accessToken: string,
    refreshToken: string,
    user: User
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
  isLoading: true,
  user: null,
  accessToken: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on app start
    const checkSession = async () => {
      try {
        const storedAccessToken = await SecureStore.getItemAsync("accessToken");
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedAccessToken && storedUser) {
          setAccessToken(storedAccessToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = useCallback(
    async (accessToken: string, refreshToken: string, user: User) => {
      try {
        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", refreshToken);
        await SecureStore.setItemAsync("user", JSON.stringify(user));

        setAccessToken(accessToken);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error during sign in:", error);
        throw error;
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("user");

      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    accessToken,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
