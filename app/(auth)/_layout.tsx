import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@clerk/clerk-expo";

const AuthLayout = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) return <Redirect href="/home" />;
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={"light"} />
    </>
  );
};

export default AuthLayout;
