import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, ActivityIndicator, Text } from "react-native";
import { Formik } from "formik";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { AuthFooter } from "@/components/auth/AuthFooter";
import { Logo } from "@/components/Logo";
import { HeaderText } from "@/components/auth/HeaderText";
import { SignInForm } from "@/components/auth/SignInForm";
import { Colors } from "@/constants/Colors";
import { signInSchema, FormValuesSignIn } from "@/schemas/signInSchema";
import { overlayStyles } from "@/styles/overlayStyles";
import { useSignIn } from "@/hooks/useSignIn";
import LoadingScreen from "../LoadingScreen";

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
  const { handleSignIn, isLoading, errors, isLoaded } = useSignIn();

  // OAuth strategies for Google and Apple
  const { startOAuthFlow: startGoogleAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleAuth } = useOAuth({
    strategy: "oauth_apple",
  });

  // Initial values for Formik
  const initialValues: FormValuesSignIn = { identifier: "", password: "" };

  // Handle form submission
  const onSubmit = (values: FormValuesSignIn) => {
    if (!isLoaded) return;
    handleSignIn(values);
  };

  // Handle OAuth authentication
  const handleOAuth = async (strategy: "oauth_apple" | "oauth_google") => {
    const selectedAuth = {
      oauth_apple: startAppleAuth,
      oauth_google: startGoogleAuth,
    }[strategy];

    try {
      setOauthLoading(true);
      const { createdSessionId, setActive } = await selectedAuth({
        redirectUrl: Linking.createURL("/home"),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      setOauthLoading(false);
    }
  };

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

          {errors?.map((error, index) => (
            <Text
              className="text-center text-red-400 font-[Manrope-Medium]"
              key={index}
            >
              {error.message}
            </Text>
          ))}

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
