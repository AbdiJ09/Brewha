import React, { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Href, router, useGlobalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { useModal } from "@/context/ModalContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function VerifyEmailAddress() {
  const [resendCooldown, setResendCooldown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();
  const { oobCode, continueUrl } = useGlobalSearchParams<{ oobCode: string; continueUrl: string }>();

  useEffect(() => {
    if (!oobCode) return;

    const applyActionCode = async () => {
      setLoading(true);
      try {
        await auth().checkActionCode(oobCode);
        await auth().applyActionCode(oobCode);
        await auth().currentUser?.reload();

        showModal({
          message: "Your email has been successfully verified.",
          title: "Success",
          icon: "check",
          onConfirm: async () => {
            if (continueUrl) {
              router.replace(continueUrl as Href);
            }
          },
        });
      } catch (error) {
        console.error("Error verifying email:", error);
        showModal({ message: "Failed to verify email. Please try again.", title: "Error" });
      } finally {
        setLoading(false);
      }
    };

    applyActionCode();
  }, []);

  const resendVerificationEmail = async () => {
    if (resendCooldown) return;

    const user = auth().currentUser;
    setLoading(true);
    try {
      await user?.sendEmailVerification({
        url: `${process.env.EXPO_PUBLIC_FIREBASE_FULL_DOMAIN}/sign-up/verify-email-address`,
        android: {
          packageName: "com.abdij09.brewha",
          installApp: true,
        },
        dynamicLinkDomain: process.env.EXPO_PUBLIC_FIREBASE_HOST_DYNAMIC_LINK,
        handleCodeInApp: true,
      });
      showModal({
        message: "Verification email sent. Please check your inbox.",
        title: "Email Sent",
      });
      setResendCooldown(true);

      setTimeout(() => setResendCooldown(false), 60000);
    } catch (error) {
      console.error("Error sending verification email:", error);
      showModal({ message: "Failed to send verification email. Please try again.", title: "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 p-4"
      style={{ backgroundColor: Colors.background }}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
      >
        <View>
          <Text className="mt-5 text-4xl font-bold text-foregroundText">Verify Your Email</Text>
          <Text className="mt-2 text-sm font-medium text-foregroundText/50">We’ve sent a verification email to your address. Please check your inbox and verify your account.</Text>

          <View className="flex-row items-center mt-4">
            <Text className="mr-1 text-sm font-medium text-foregroundText">Didn’t receive the email?</Text>
            <TouchableOpacity
              className="px-3 py-1 rounded-full bg-primary-500"
              onPress={resendVerificationEmail}
              disabled={resendCooldown || loading}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <Text
                  className={`font-bold ${resendCooldown ? "opacity-50" : "text-accent-500"}`}
                  style={{ textDecorationLine: "underline" }}
                >
                  Resend
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
}
