import { FormField } from "@/components/ui/FormField";
import { FormikProps, useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth";
import { router, useGlobalSearchParams } from "expo-router";
import { useModal } from "@/context/ModalContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

type FormValuesResetPassword = Yup.InferType<typeof validationSchema>;

export default function ForgetPassword() {
  const { showModal } = useModal();
  const formik: FormikProps<FormValuesResetPassword> = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: any) => {
    try {
      await auth().sendPasswordResetEmail(values.email, {
        url: `${process.env.EXPO_PUBLIC_FIREBASE_FULL_DOMAIN}/sign-in`,
        android: {
          packageName: "com.abdij09.brewha",
          installApp: true,
        },
        dynamicLinkDomain: process.env.EXPO_PUBLIC_FIREBASE_HOST_DYNAMIC_LINK,
        handleCodeInApp: true,
      });
      showModal({
        message: "Password reset link has been sent to your email",
        title: "Success",
        icon: "check",
      });
      router.navigate("/(auth)/sign-in");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 p-6 bg-background">
        {/* Content */}
        <View className="justify-between flex-1 mt-3 ">
          <View>
            <Text className="mb-2 text-4xl font-semibold text-white">Forgot Password</Text>
            <Text className="mb-8 text-sm text-gray-400">Please enter your email account to send the link verification to reset your password</Text>

            <FormField
              icon="mail"
              handleBlur={formik.handleBlur("email")}
              placeholder="ex. brewha@example.com"
              value={formik.values.email}
              handleChange={formik.handleChange("email")}
              keyboardType="email-address"
              errors={formik.touched.email && formik.errors.email}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            disabled={!formik.isValid || formik.isSubmitting}
            className={`w-full py-4 rounded-full  bg-primary-500 flex items-center justify-center`}
            onPress={() => formik.handleSubmit()}
          >
            <Text className="font-medium text-white">{formik.isSubmitting ? "Submitting..." : "Send Email"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
