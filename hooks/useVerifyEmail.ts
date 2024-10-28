import { useState, useEffect } from "react";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { ClerkAPIError } from "@clerk/types";

export const useVerifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [timer, setTimer] = useState(60);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const verifyMutation = useMutation<void, ClerkAPIError[], string>({
    mutationFn: async (fullOtp: string) => {
      if (!isLoaded) throw new Error("Clerk is not loaded");

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: fullOtp,
      });

      if (completeSignUp.status !== "complete") {
        throw new Error("Verification failed");
      }

      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/home");
    },
    onError: (err) => {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
    },
  });

  const resendMutation = useMutation<void, Error>({
    mutationFn: async () => {
      if (!isLoaded || !canResend)
        throw new Error("Cannot resend at this time");

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setTimer(60);
      setCanResend(false);
    },
  });

  const handleOtpChange = (value: string) => {
    if (value.length === 6) {
      verifyMutation.mutate(value);
    }
  };

  return {
    email: signUp?.emailAddress,
    timer,
    canResend,
    handleOtpChange,
    verifyMutation,
    errors,
    resendMutation,
  };
};
