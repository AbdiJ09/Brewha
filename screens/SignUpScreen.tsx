import React from "react";
import { SafeAreaView, View, ScrollView, Text, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import { Colors } from "@/constants/Colors";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { Logo } from "@/components/Logo";

import { HeaderText } from "@/components/auth/HeaderText";
import { FormValuesSignUp, SignupSchema } from "@/schemas/signUpSchema";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { overlayStyles } from "@/styles/overlayStyles";
import auth from "@react-native-firebase/auth";
export const SignUpScreen: React.FC = () => {
  const initialValues: FormValuesSignUp = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const onSubmit = async (values: FormValuesSignUp) => {
    try {
      await auth().createUserWithEmailAndPassword(values.email, values.password);
      alert("User created successfully");
    } catch (error) {
      console.log(error);
    }
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

          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => (
              <SignUpForm
                {...formikProps}
                isLoading={false}
              />
            )}
          </Formik>
          <AuthFooter
            text="Already have an account?"
            link="/sign-in"
            label="Sign In"
          />
        </View>
        {/* {isLoading && (
          <View style={overlayStyles.overlay}>
            <ActivityIndicator
              size="large"
              color="#ffffff"
            />
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};
