import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { FormValuesSignIn } from "@/schemas/signInSchema";

export const useSignIn = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: FormValuesSignIn) => {},
    onError: (err) => {},
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
  };
};
