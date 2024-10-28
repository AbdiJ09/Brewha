import { FormikHelpers } from "formik";
import { UseMutateFunction } from "@tanstack/react-query";
import { Href, router } from "expo-router";
import { AxiosError } from "axios";

interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: any;
  };
}

type SignInFunction = (
  accessToken: string,
  refreshToken: string,
  user: any
) => void;

export function handleSubmit<T extends object>(
  values: T,
  formikHelpers: FormikHelpers<T>,
  mutate: UseMutateFunction<AuthResponse, unknown, T, unknown>,
  signIn: SignInFunction,
  successRoute: string = "/home"
) {
  mutate(values, {
    onSuccess: ({ data }) => {
      const { accessToken, refreshToken, user } = data;
      signIn(accessToken, refreshToken, user);
      router.replace(successRoute as Href);
    },
    onError: (error) => {
      console.log(error);
      formikHelpers.setSubmitting(false);
      if (error instanceof AxiosError) {
        const msg = error.response?.data?.message;
        if (error.response?.status === 409) {
          formikHelpers.setErrors(JSON.parse(msg!));
        } else if (error.response?.status === 401) {
          formikHelpers.setStatus(msg);
        }
      }
    },
  });
}

export function handleSignInSubmit<T extends object>(
  values: T,
  formikHelpers: FormikHelpers<T>,
  mutate: UseMutateFunction<AuthResponse, unknown, T, unknown>,
  signIn: SignInFunction
) {
  return handleSubmit(values, formikHelpers, mutate, signIn, "/home");
}

export function handleSignUpSubmit<T extends object>(
  values: T,
  formikHelpers: FormikHelpers<T>,
  mutate: UseMutateFunction<AuthResponse, unknown, T, unknown>,
  signIn: SignInFunction
) {
  return handleSubmit(values, formikHelpers, mutate, signIn, "/onboarding");
}
