import React from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { FormikProps } from "formik";
import { FormField } from "@/components/ui/FormField";
import { Colors } from "@/constants/Colors";
import { FormValuesSignUp } from "@/schemas/signUpSchema";

interface SignUpFormProps extends FormikProps<FormValuesSignUp> {
  isLoading: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  handleChange,
  handleBlur,
  handleSubmit,
  errors,
  values,
  touched,
  isLoading,
}) => (
  <View className="mb-2 space-y-4">
    <FormField
      icon="user"
      otherClass="my-2"
      handleChange={handleChange("username")}
      handleBlur={handleBlur("username")}
      value={values.username}
      errors={touched.username && errors.username}
      placeholder="Username"
    />
    <FormField
      icon="mail"
      otherClass="my-2"
      handleChange={handleChange("email")}
      handleBlur={handleBlur("email")}
      errors={touched.email && errors.email}
      value={values.email}
      placeholder="Email"
      keyboardType="email-address"
    />
    <FormField
      icon="lock"
      otherClass="my-2"
      handleChange={handleChange("password")}
      handleBlur={handleBlur("password")}
      errors={touched.password && errors.password}
      value={values.password}
      placeholder="Password"
      secureTextEntry
    />
    <FormField
      icon="lock"
      otherClass="my-2"
      handleChange={handleChange("confirmPassword")}
      handleBlur={handleBlur("confirmPassword")}
      errors={touched.confirmPassword && errors.confirmPassword}
      value={values.confirmPassword}
      placeholder="Confirm Password"
      secureTextEntry
    />
    <TouchableOpacity
      onPress={() => handleSubmit()}
      disabled={isLoading}
      className="flex-row items-center justify-center p-4 mb-1 rounded-2xl"
      style={{
        backgroundColor: Colors.primary[500],
      }}
    >
      <Text className="text-white text-center font-[Manrope-Bold] mr-2">
        {isLoading ? "Signing Up..." : "Sign Up"}
      </Text>
      {isLoading && <ActivityIndicator color="white" size="small" />}
    </TouchableOpacity>
  </View>
);
