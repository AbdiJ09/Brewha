import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { Colors } from "@/constants/Colors";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { Logo } from "@/components/Logo";
import { HeaderText } from "@/components/auth/HeaderText";
import { FormValuesSignUp, SignupSchema } from "@/schemas/signUpSchema";
import { useSignUp } from "@/hooks/useSignUp";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Divider } from "@/components/ui/Divider";
import { overlayStyles } from "@/styles/overlayStyles";

export const SignUpScreen: React.FC = () => {
  const { handleSignUp, isLoading, errors, signUp } = useSignUp();

  const initialValues: FormValuesSignUp = {
    username: signUp?.username || "",
    email: signUp?.emailAddress || "",
    password: "",
    confirmPassword: "",
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.background }}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-center flex-1 p-6">
          <Logo />
          <HeaderText
            title="Create an Account"
            description="Get started with our app today!"
          />
          {errors?.map((error, index) => (
            <Text key={index} className="mb-2 text-center text-red-500">
              {error.longMessage}
            </Text>
          ))}
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSignUp}
          >
            {(formikProps) => (
              <SignUpForm {...formikProps} isLoading={isLoading} />
            )}
          </Formik>
          <AuthFooter
            text="Already have an account?"
            link="/sign-in"
            label="Sign In"
          />
        </View>
        {isLoading && (
          <View style={overlayStyles.overlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
