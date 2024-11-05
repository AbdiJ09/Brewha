import React from "react";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native";
import useDynamicLinks from "@/hooks/useDynamicLinks";
const AuthLayout = () => {
  useDynamicLinks();
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forget-password"
          options={{
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitle: "",
            animation: "slide_from_right",
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="items-center justify-center w-10 h-10 mt-4 ml-1 border rounded-full border-secondary-400"
                >
                  <ChevronLeftIcon
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <Image
                source={require("@/assets/images/logo/brewha_new_icon.png")}
                className="w-10 h-10 mt-4"
              />
            ),
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitle: "",
            animation: "slide_from_right",
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="items-center justify-center w-10 h-10 mt-4 ml-1 border rounded-full border-secondary-400"
                >
                  <ChevronLeftIcon
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <Image
                source={require("@/assets/images/logo/brewha_new_icon.png")}
                className="w-10 h-10 mt-4"
              />
            ),
          }}
        />

        <Stack.Screen
          name="sign-in"
          options={{
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitle: "",
            animation: "slide_from_right",
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => router.navigate("/(auth)")}
                  className="items-center justify-center w-10 h-10 mt-4 ml-1 border rounded-full border-secondary-400"
                >
                  <ChevronLeftIcon
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <Image
                source={require("@/assets/images/logo/brewha_new_icon.png")}
                className="w-10 h-10 mt-4"
              />
            ),
          }}
        />
        <Stack.Screen
          name="sign-up/index"
          options={{
            headerBackVisible: false,
            headerShadowVisible: false,
            animation: "slide_from_right",

            headerTitle: "",
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => router.navigate("/(auth)/sign-in")}
                  className="items-center justify-center w-10 h-10 mt-4 ml-1 border rounded-full border-secondary-400"
                >
                  <ChevronLeftIcon
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <Image
                source={require("@/assets/images/logo/brewha_new_icon.png")}
                className="w-10 h-10 mt-4"
              />
            ),
          }}
        />

        <Stack.Screen
          name="sign-up/verify-email-address"
          options={{
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitle: "",
            animation: "slide_from_right",
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="items-center justify-center w-10 h-10 mt-4 ml-1 border rounded-full border-secondary-400"
                >
                  <ChevronLeftIcon
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <Image
                source={require("@/assets/images/logo/brewha_new_icon.png")}
                className="w-10 h-10 mt-4"
              />
            ),
          }}
        />
      </Stack>
      <StatusBar style={"light"} />
    </>
  );
};

export default AuthLayout;
