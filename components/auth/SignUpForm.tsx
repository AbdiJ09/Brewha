import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator, Button } from "react-native";
import { FormikProps } from "formik";
import { FormField } from "@/components/ui/FormField";
import { Colors } from "@/constants/Colors";
import { FormValuesSignUp } from "@/schemas/signUpSchema";
import { SocialButton } from "./SocialButton";
import { Divider } from "../ui/Divider";

interface SignUpFormProps extends FormikProps<FormValuesSignUp> {
  isLoading: boolean;
  handleSignUpWithGoogle: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ handleChange, handleBlur, handleSubmit, handleSignUpWithGoogle, errors, values, touched, isLoading }) => (
  <View className="mb-2 space-y-4">
    <FormField
      icon="user"
      otherClass="my-2"
      label="Name"
      handleChange={handleChange("name")}
      handleBlur={handleBlur("name")}
      errors={touched.name && errors.name}
      value={values.name}
      placeholder="ex. Brewha"
      keyboardType="default"
    />
    <FormField
      label="Email"
      icon="mail"
      otherClass="my-2"
      handleChange={handleChange("email")}
      handleBlur={handleBlur("email")}
      errors={touched.email && errors.email}
      value={values.email}
      placeholder="Enter Your Email"
      keyboardType="email-address"
    />
    <FormField
      icon="lock"
      otherClass="my-2"
      label="Password"
      handleChange={handleChange("password")}
      handleBlur={handleBlur("password")}
      errors={touched.password && errors.password}
      value={values.password}
      placeholder="Enter Password"
      secureTextEntry
    />

    <TouchableOpacity
      onPress={() => handleSubmit()}
      disabled={isLoading}
      className="flex-row items-center justify-center p-4 mb-1 rounded-full"
      style={{
        backgroundColor: Colors.primary[500],
      }}
    >
      <Text className="text-white text-center font-[Manrope-Bold] mr-2">{isLoading ? "Signing Up..." : "Sign Up"}</Text>
      {isLoading && (
        <ActivityIndicator
          color="white"
          size="small"
        />
      )}
    </TouchableOpacity>
    <View className="my-4">
      <Divider text="Or register with" />
    </View>
    <View className="flex-row items-center justify-center space-x-3">
      <View className="w-2/4">
        <SocialButton
          handleOAuth={() => null}
          strategy="oauth_apple"
        />
      </View>
      <View className="w-2/4">
        <SocialButton
          handleOAuth={handleSignUpWithGoogle}
          strategy="oauth_google"
        />
      </View>
    </View>
  </View>
);
