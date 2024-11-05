import React, { useCallback, useState, useEffect, useRef } from "react";
import { SafeAreaView, View, ScrollView, Text } from "react-native";
import { Formik, FormikProps } from "formik";

import { AuthFooter } from "@/components/auth/AuthFooter";
import { HeaderText } from "@/components/auth/HeaderText";
import { SignInForm } from "@/components/auth/SignInForm";
import { Colors } from "@/constants/Colors";
import { signInSchema, FormValuesSignIn } from "@/schemas/signInSchema";
import LoadingScreen from "@/components/LoadingScreen";
import { router, useLocalSearchParams } from "expo-router";
import { useAuthMutations } from "@/hooks/useAuthMutations";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomModal from "@/components/ModalCustom";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const SignInScreen: React.FC = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [showModalAlert, setShowModalAlert] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const { emailLoginMutation, googleLoginMutation } = useAuthMutations();
  const { showModal } = useModal();
  const { setUser } = useAuth();

  const initialValues: FormValuesSignIn = { identifier: "", password: "" };

  const onSubmit = async (values: FormValuesSignIn) => {
    const res = await emailLoginMutation.mutateAsync(values);
    if (res.emailVerified && res.loginSuccess) {
      router.replace("/home");
    } else {
      showModal({
        icon: "info",
        title: "Email not verified",
        message: "Please check your email to verify your account",
        buttonStyle: { marginTop: 10 },
      });
    }
  };

  const handleOAuth = useCallback(async () => {
    try {
      const res = await googleLoginMutation.mutateAsync();
      if (res) {
        if (res.needsLinking) {
          setGoogleEmail(res.email);
          setShowModalAlert(true);
          return;
        }

        setUser(res.user as FirebaseAuthTypes.User);
        router.replace("/home");
      }
    } catch (error) {
      console.log("🚀 ~ handleOAuth ~ error:", error);
    }
  }, []);

  const handleConfirmAlert = (setFieldValue: (field: string, value: string) => void) => {
    if (googleEmail) {
      setFieldValue("identifier", googleEmail);
    }
    setShowModalAlert(false);
  };
  const formikRef = useRef<FormikProps<FormValuesSignIn>>(null);
  useEffect(() => {
    if (email && formikRef.current) {
      formikRef.current.setFieldValue("identifier", email);
    }
  }, [email]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background, paddingTop: top }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6">
          <HeaderText
            title="Welcome Back"
            description="Please enter your email and password to continue"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {(formikProps) => {
              return (
                <>
                  <SignInForm
                    {...formikProps}
                    pending={emailLoginMutation.isPending || googleLoginMutation.isPending}
                    handleOAuth={handleOAuth}
                  />
                  <CustomModal
                    visible={showModalAlert}
                    onClose={() => setShowModalAlert(false)}
                    onButtonPress={() => handleConfirmAlert(formikProps.setFieldValue)}
                    icon="info"
                    title="Email already in use"
                    message="Please log in with the email and password that is connected to this account"
                    buttonStyle={{ marginTop: 10 }}
                  />
                </>
              );
            }}
          </Formik>

          <AuthFooter
            text="Don't have an account?"
            link="/sign-up"
            label="Register"
          />
        </View>

        {(emailLoginMutation.isPending || googleLoginMutation.isPending) && <LoadingScreen />}
      </ScrollView>
    </SafeAreaView>
  );
};
