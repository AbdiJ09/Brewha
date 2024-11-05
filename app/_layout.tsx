import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import "expo-dev-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import NetworkStatus from "@/components/NetworkStatus";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import Splash from "@/screens/Splash";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalProvider } from "@/context/ModalContext";
// Prevent auto hide
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View
        entering={FadeIn}
        className="flex-1"
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="on-boarding"
            options={{
              headerTitle: "",
              headerTransparent: true,
              headerTintColor: "white",
              headerBackVisible: false,
              headerRight(props) {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      router.push("/(auth)");
                      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
                    }}
                    className={`py-2 px-5 mt-5 rounded-full`}
                    style={{
                      backgroundColor: Colors.primary[500],
                    }}
                  >
                    <Text className="text-white">Skip</Text>
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, animation: "none" }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, animation: "fade" }}
          />
        </Stack>
      </Animated.View>

      <NetworkStatus />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  const AppLayout = () => {
    const [appReady, setAppReady] = useState(false);
    const { initializing } = useAuth();

    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
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

    useEffect(() => {
      const handleFontLoading = async () => {
        if (error) throw error;
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setAppReady(true);
        }
      };
      handleFontLoading();
    }, [fontsLoaded, error]);

    const isLoading = !appReady || !splashAnimationFinished || initializing;
    if (isLoading) {
      return (
        <Splash
          onAnimationFinish={(isCancelled) => {
            if (!isCancelled) {
              setSplashAnimationFinished(true);
            }
          }}
        />
      );
    }

    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <InitialLayout />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  };

  return (
    <AuthProvider>
      <ModalProvider>
        <AppLayout />
      </ModalProvider>
    </AuthProvider>
  );
}
