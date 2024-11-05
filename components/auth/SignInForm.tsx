import React from "react";
import { View } from "react-native";
import { FormikProps } from "formik";

import { FormField } from "@/components/ui/FormField";
import { Divider } from "@/components/ui/Divider";
import { SocialButton } from "@/components/auth/SocialButton";
import { ForgotPasswordLink } from "./ForgetPasswordLink";
import { SignInButton } from "./SignInButton";
import Checkbox from "expo-checkbox";
import { FormValuesSignIn } from "@/schemas/signInSchema";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";

interface SignInFormProps extends FormikProps<FormValuesSignIn> {
  pending: boolean;
  handleOAuth: (strategy: "oauth_apple" | "oauth_google") => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleOAuth, pending }) => (
  <View>
    <FormField
      icon="user"
      otherClass="my-2"
      handleBlur={handleBlur("identifier")}
      handleChange={handleChange("identifier")}
      placeholder="ex.brewha@gmail.com"
      keyboardType="email-address"
      label="Email"
      value={values.identifier}
      errors={touched.identifier && errors.identifier}
    />
    <FormField
      otherClass="my-2"
      icon="lock"
      label="Password"
      handleBlur={handleBlur("password")}
      handleChange={handleChange("password")}
      value={values.password}
      errors={touched.password && errors.password}
      placeholder="Enter your password"
      secureTextEntry
    />
    <View className="items-end mt-3 mb-10">
      <ForgotPasswordLink />
    </View>
    <SignInButton
      onPress={handleSubmit}
      pending={pending}
    />
    <View className="my-5">
      <Divider text="Or login with" />
    </View>

    <View className="flex-row items-center justify-center w-full mb-3 space-x-3">
      <View className="w-2/4">
        <SocialButton
          handleOAuth={handleOAuth}
          strategy="oauth_apple"
          textColor="white"
        />
      </View>

      <View className="w-2/4">
        <SocialButton
          handleOAuth={handleOAuth}
          strategy="oauth_google"
          textColor="white"
        />
      </View>
    </View>
  </View>
);
