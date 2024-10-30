import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, ActivityIndicator, Text } from "react-native";
import { Formik } from "formik";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { AuthFooter } from "@/components/auth/AuthFooter";
import { Logo } from "@/components/Logo";
import { HeaderText } from "@/components/auth/HeaderText";

import { SignInForm } from "@/components/auth/SignInForm";
import { Colors } from "@/constants/Colors";
import { signInSchema, FormValuesSignIn } from "@/schemas/signInSchema";
import { useSignIn } from "@/hooks/useSignIn";
import LoadingScreen from "@/components/LoadingScreen";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

// Custom hook to warm up the Web Browser
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Complete the auth session if needed
WebBrowser.maybeCompleteAuthSession();

export const SignInScreen: React.FC = () => {
  // Warm up the browser
  useWarmUpBrowser();
  const [oauthLoading, setOauthLoading] = useState(false);
  // Hooks for sign-in logic
  const { handleSignIn, isLoading } = useSignIn();

  // Initial values for Formik
  const initialValues: FormValuesSignIn = { identifier: "", password: "" };

  // Handle form submission
  const onSubmit = async (values: FormValuesSignIn) => {
    try {
      await auth().signInWithEmailAndPassword(values.identifier, values.password);
      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle OAuth authentication
  const handleOAuth = useCallback(async (strategy: "oauth_apple" | "oauth_google") => {}, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View
          className="p-6"
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: Colors.background,
          }}
        >
          <Logo />
          <HeaderText
            title="Welcome Back"
            description="Sign in to find cozy spots and favorite cafes near you"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => (
              <SignInForm
                {...formikProps}
                pending={isLoading}
                handleOAuth={handleOAuth}
              />
            )}
          </Formik>

          <AuthFooter
            text="Don't have an account?"
            link="/sign-up"
            label="Sign Up"
          />
        </View>

        {isLoading || (oauthLoading && <LoadingScreen />)}
      </ScrollView>
    </SafeAreaView>
  );
};
