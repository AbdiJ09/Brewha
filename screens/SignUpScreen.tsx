import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Formik } from "formik";
import { Colors } from "@/constants/Colors";
import { AuthFooter } from "@/components/auth/AuthFooter";

import { HeaderText } from "@/components/auth/HeaderText";
import { FormValuesSignUp, SignupSchema } from "@/schemas/signUpSchema";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useAuthMutations } from "@/hooks/useAuthMutations";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import { withModal } from "@/hoc/withModal";
import { ModalConfig } from "@/types/ModalConfig";
import { useAuth } from "@/context/AuthContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface SignUpProps {
  showModal?: (config: ModalConfig) => void;
}
export const SignUpScreen: React.FC<SignUpProps> = withModal(({ showModal }) => {
  const { register, googleLoginMutation } = useAuthMutations();
  const { setUser } = useAuth();
  const initialValues: FormValuesSignUp = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: FormValuesSignUp, action: any) => {
    try {
      await register.mutateAsync(values);
      router.push("/sign-up/verify-email-address");
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        const firebaseError = error as { code: string; message: string };
        if (firebaseError.code === "auth/email-already-in-use") {
          action.setFieldError("email", "Email already in use");
        }
      }
    }
  };

  const handleSignUpWithGoogle = async () => {
    const res = await googleLoginMutation.mutateAsync();
    if (res) {
      if (res.needsLinking) {
        showModal({
          icon: "info",
          title: "Email already in use",
          message: "Please log in with the email and password that is connected to this account",
          buttonStyle: { marginTop: 10 },
          onConfirm: () => {
            router.navigate("/sign-in");
            router.setParams({ email: res.email });
          },
        });
        return;
      }
      setUser(res.user as FirebaseAuthTypes.User);

      router.replace("/home");
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.background }}
      className="flex-1 "
    >
      <ScrollView>
        <View className="p-6">
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
                handleSignUpWithGoogle={handleSignUpWithGoogle}
              />
            )}
          </Formik>
          <AuthFooter
            text="Already have an account?"
            link="/sign-in"
            label="Sign In"
          />
        </View>
      </ScrollView>

      {(register.isPending || googleLoginMutation.isPending) && <LoadingScreen />}
    </SafeAreaView>
  );
});
