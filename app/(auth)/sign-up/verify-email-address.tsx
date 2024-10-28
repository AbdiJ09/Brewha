import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Image, Text, View, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PencilIcon } from "react-native-heroicons/outline";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { overlayStyles } from "@/styles/overlayStyles";
import { OtpInput } from "react-native-otp-entry";
export default function VerifyEmailAddress() {
  const { email, timer, canResend, handleOtpChange, verifyMutation, errors, resendMutation } = useVerifyEmail();

  return (
    <SafeAreaView
      className="items-center justify-center flex-1 px-4"
      style={{ backgroundColor: Colors.background }}
    >
      <KeyboardAvoidingView className="w-full">
        <View className="items-center px-4">
          <Image
            source={require("@/assets/images/icon_check_email.png")}
            className="w-full h-36"
            style={{ resizeMode: "contain" }}
          />

          <Text className="mt-5 text-2xl text-foregroundText font-[Manrope-Bold]">Verify Your Email</Text>
          <View>
            <Text className="text-sm mt-2 text-foregroundText/50 text-center font-[Manrope-Medium]">Enter the verification code sent to your email </Text>
            <View className="flex-row items-center justify-center mt-2">
              <Text className="font-[Manrope-SemiBold] text-foregroundText/80 ">{email}</Text>
              <TouchableOpacity onPress={() => router.push("/sign-up")}>
                <PencilIcon
                  color={Colors.primary[500]}
                  size={16}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <OtpInput
            numberOfDigits={6}
            onTextChange={handleOtpChange}
            focusColor={Colors.accent[500]}
            focusStickBlinkingDuration={500}
            theme={{
              containerStyle: {
                marginTop: 20,
                marginBottom: 4,
              },
              pinCodeTextStyle: {
                color: Colors.text,
              },
              pinCodeContainerStyle: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: Colors.background,
                borderWidth: 1,
                borderColor: Colors.accent[500],
              },
            }}
          />

          {verifyMutation.isError &&
            errors?.map((e, index) => (
              <Text
                key={index}
                className="text-red-500 text-center font-[Manrope-Medium]"
              >
                {e.longMessage}
              </Text>
            ))}

          <View className="flex-row items-center justify-center mt-2">
            <Text className="text-sm mr-1 text-foregroundText/60 text-center font-[Manrope-Medium]">Didn't receive the code?</Text>
            <TouchableOpacity
              onPress={() => resendMutation.mutate()}
              disabled={!canResend || resendMutation.isPending}
            >
              <Text
                className={`${canResend ? "text-accent-500" : "text-accent-500"} font-[Manrope-Bold]`}
                style={{ textDecorationLine: "underline" }}
              >
                Resend {canResend ? "" : `(${timer}s)`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {verifyMutation.isPending && (
        <View style={overlayStyles.overlay}>
          <ActivityIndicator
            size="large"
            color="#ffffff"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
