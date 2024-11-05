import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { FormValuesSignIn } from "@/schemas/signInSchema";
import { FirebaseAuthError } from "@/types/firebaseAuthError";
import { FormValuesSignUp } from "@/schemas/signUpSchema";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const handleLoginError = (error: FirebaseAuthError) => {
  let errorMessage = "An error occurred during login.";
  if (error.code === "auth/user-not-found") {
    errorMessage = "No user found with this email.";
  } else if (error.code === "auth/wrong-password") {
    errorMessage = "Incorrect password. Please try again.";
  } else if (error.code === "auth/invalid-email") {
    errorMessage = "Please enter a valid email address.";
  }
  alert(errorMessage);
};

const handleGoogleLoginError = (error: Error) => {
  console.error("Google login error:", error);
  alert(error.message);
};

export const useAuthMutations = () => {
  const emailLoginMutation = useMutation<{ emailVerified: boolean; loginSuccess: boolean }, FirebaseAuthError, FormValuesSignIn>({
    mutationFn: authService.loginWithEmail,
    onError: handleLoginError,
  });

  const googleLoginMutation = useMutation<{ email: string; needsLinking: boolean; user?: FirebaseAuthTypes.User } | undefined, Error, void>({
    mutationFn: authService.loginWithGoogle,
    onError: handleGoogleLoginError,
  });

  const register = useMutation<boolean, FirebaseAuthError, FormValuesSignUp>({
    mutationFn: (values: FormValuesSignUp) => {
      return authService.register(values);
    },
    onError: (error) => {
      throw error;
    },
  });
  return { emailLoginMutation, googleLoginMutation, register };
};
