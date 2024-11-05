import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import Feather from "@expo/vector-icons/Feather";
import { FormField } from "@/components/ui/FormField";
import { useModal } from "@/context/ModalContext";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long")
    .required("Password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain at least one letter and one number"),
});

type FormValuesResetPassword = Yup.InferType<typeof validationSchema>;

export default function ResetPassword() {
  const navigation = useNavigation();
  const { showModal } = useModal();
  const { oobCode, continueUrl } = useGlobalSearchParams<{
    oobCode: string;
    continueUrl: string;
  }>();

  const handlePasswordReset = async (values: FormValuesResetPassword) => {
    if (!oobCode) {
      showModal({
        message: "Invalid or missing oobCode",
        title: "Error",
        iconColor: "red",
        icon: "alert-triangle",
      });
      return;
    }
    try {
      await auth().confirmPasswordReset(oobCode, values.newPassword);
      showModal({
        message: "Your password has been successfully reset",
        title: "Success",
        icon: "check",
      });

      if (continueUrl) {
        const decodedUrl = decodeURIComponent(continueUrl);
        if (isValidContinueUrl(decodedUrl)) {
          const pathName = decodedUrl.split("/").pop();
          navigation.reset({
            index: 0,
            routes: [{ name: pathName as never }],
          });
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "sign-in" as never }],
        });
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      showModal({
        message: errorMessage,
        title: "Error",
        iconColor: "red",
        customIcon: (
          <Feather
            name="alert-triangle"
            size={40}
            color="white"
          />
        ),
      });
    }
  };

  const formik: FormikProps<FormValuesResetPassword> = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema,
    onSubmit: handlePasswordReset,
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 p-6 bg-background">
        <View className="justify-between flex-1 mt-3">
          <View>
            <Text className="mb-2 text-4xl font-semibold text-white">Reset your password</Text>
            <Text className="mb-8 text-sm text-gray-400">Please enter your new password below</Text>

            <FormField
              icon="lock"
              handleBlur={formik.handleBlur("newPassword")}
              placeholder="New Password"
              value={formik.values.newPassword}
              handleChange={formik.handleChange("newPassword")}
              errors={formik.touched.newPassword && formik.errors.newPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className={`w-full py-4 rounded-full bg-primary-500 flex items-center justify-center ${!formik.isValid || formik.isSubmitting ? "opacity-50" : ""}`}
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            <Text className="font-medium text-white">{formik.isSubmitting ? "Resetting..." : "Reset Password"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const isValidContinueUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === process.env.EXPO_PUBLIC_FIREBASE_HOSTNAME;
  } catch {
    return false;
  }
};

const getErrorMessage = (error: any): string => {
  switch (error.code) {
    case "auth/expired-action-code":
      return "The password reset link has expired. Please request a new one.";
    case "auth/invalid-action-code":
      return "The password reset link is invalid. Please request a new one.";
    case "auth/weak-password":
      return "The password is too weak. Please choose a stronger password.";
    default:
      return "An error occurred while resetting your password. Please try again.";
  }
};
