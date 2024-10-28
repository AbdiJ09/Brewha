import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  useSignIn as useClerkSignIn,
  isClerkAPIResponseError,
} from "@clerk/clerk-expo";
import { router } from "expo-router";
import { ClerkAPIError } from "@clerk/types";
import { FormValuesSignIn } from "@/schemas/signInSchema";

export const useSignIn = () => {
  const { signIn, setActive, isLoaded } = useClerkSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: FormValuesSignIn) => {
      if (!isLoaded) throw new Error("Clerk is not loaded");

      const signInAttempt = await signIn?.create({
        identifier: values.identifier,
        password: values.password,
      });

      if (signInAttempt?.status === "complete" && setActive) {
        await setActive({ session: signInAttempt?.createdSessionId });
        return signInAttempt;
      } else {
        throw new Error("Sign in failed");
      }
    },
    onError: (err) => {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
    },
    onSuccess: () => {
      router.replace("/home");
    },
  });

  const handleSignIn = (values: FormValuesSignIn) => {
    mutation.mutate(values);
  };

  return {
    handleSignIn,
    isLoading: mutation.isPending,
    errors,
    isLoaded,
    signIn,
  };
};
