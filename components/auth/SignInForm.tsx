import React from "react";
import { View } from "react-native";
import { FormikProps } from "formik";

import { FormField } from "@/components/ui/FormField";
import { Divider } from "@/components/ui/Divider";
import { SocialButton } from "@/components/auth/SocialButton";
import { ForgotPasswordLink } from "./ForgetPasswordLink";
import { SignInButton } from "./SignInButton";
import { FormValuesSignIn } from "@/schemas/signInSchema";

interface SignInFormProps extends FormikProps<FormValuesSignIn> {
  pending: boolean;
  handleOAuth: (strategy: "oauth_apple" | "oauth_google") => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  handleOAuth,
  pending,
}) => (
  <View>
    <FormField
      icon="user"
      otherClass="my-2"
      handleBlur={handleBlur("identifier")}
      handleChange={handleChange("identifier")}
      placeholder="Enter Email or Username"
      keyboardType="email-address"
      value={values.identifier}
      errors={touched.identifier && errors.identifier}
    />
    <FormField
      otherClass="my-2"
      icon="lock"
      handleBlur={handleBlur("password")}
      handleChange={handleChange("password")}
      value={values.password}
      errors={touched.password && errors.password}
      placeholder="Enter Password"
      secureTextEntry
    />
    <View className="my-2">
      <Divider text="or sign in with another account" />
    </View>

    <SocialButton
      handleOAuth={handleOAuth}
      strategy="oauth_apple"
      text="Sign in with Apple"
      textColor="white"
    />
    <SocialButton
      handleOAuth={handleOAuth}
      strategy="oauth_google"
      text="Sign in with Google"
      textColor="white"
    />

    <ForgotPasswordLink />
    <SignInButton onPress={handleSubmit} pending={pending} />
  </View>
);
