import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  isClerkAPIResponseError,
  useSignUp as useClerkSignUp,
} from "@clerk/clerk-expo";
import { router } from "expo-router";
import { FormValuesSignUp } from "@/schemas/signUpSchema";
import { ClerkAPIError } from "@clerk/types";
export const useSignUp = () => {
  const { signUp, isLoaded } = useClerkSignUp();
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const mutation = useMutation({
    mutationFn: async (values: FormValuesSignUp) => {
      if (!isLoaded) throw new Error("Clerk is not loaded");

      const signUpAttempt = await signUp.create({
        username: values.username,
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      return signUpAttempt;
    },
    onError: (error: any) => {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
    },
    onSuccess: () => {
      router.push("/sign-up/verify-email-address");
    },
  });

  const handleSignUp = (values: FormValuesSignUp) => {
    mutation.mutate(values);
  };

  return {
    handleSignUp,
    isLoading: mutation.isPending,
    errors,
    signUp,
    isLoaded,
  };
};
