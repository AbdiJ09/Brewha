import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-up/index"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style={"light"} />
    </>
  );
};

export default AuthLayout;
