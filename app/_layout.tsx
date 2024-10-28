import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useFonts } from "expo-font";
import "expo-dev-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View, Animated, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import NetworkStatus from "@/components/NetworkStatus";
import { TokenCache } from "@/types/TokenCache";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore set item error: ", err);
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
}

// Instruct SplashScreen not to hide yet
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [fontsLoaded, error] = useFonts({
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
  });

  const [isSplashReady, setSplashReady] = useState(false);
  const animation = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    const handleFontLoading = async () => {
      if (error) throw error;
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setSplashReady(true); // Set splash ready after fonts are loaded
      }
    };
    handleFontLoading();
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (isSplashReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isSplashReady]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Animated.View style={[styles.splashContainer, { opacity: animation }]}>
        <Animated.Image
          source={require("@/assets/images/splash.png")}
          style={styles.splashImage}
          onLoadEnd={async () => {
            await SplashScreen.hideAsync();
            setSplashReady(true);
          }}
        />
      </Animated.View>

      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={publishableKey}
      >
        <ClerkLoaded>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack>
                  <Stack.Screen
                    name="index"
                    options={{
                      headerTitle: "",
                      headerTransparent: true,
                      headerTintColor: "white",
                      headerBackVisible: false,
                      headerRight(props) {
                        return (
                          <Link
                            href={"/sign-in"}
                            asChild
                          >
                            <TouchableOpacity
                              className={`py-2 px-5 mt-5 rounded-full`}
                              style={{
                                backgroundColor: Colors.primary[500],
                              }}
                            >
                              <Text className="text-white">Skip</Text>
                            </TouchableOpacity>
                          </Link>
                        );
                      },
                    }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
                <NetworkStatus />
                <StatusBar style="light" />
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </QueryClientProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Background color of the splash screen
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
