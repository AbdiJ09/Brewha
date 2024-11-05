import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin";
import { FormValuesSignIn } from "@/schemas/signInSchema";
import { checkEmail, createUser } from "@/apiServices/authApiServices";
import googleConfig from "@/config/googleSignInConfig";
import { FormValuesSignUp } from "@/schemas/signUpSchema";
import { FirebaseAuthError } from "@/types/firebaseAuthError";
import { AxiosError } from "axios";

googleConfig();

class AuthServices {
  constructor() {
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  private async handleNewUser(userCredential: FirebaseAuthTypes.UserCredential, email: string, name?: string | null) {
    if (userCredential.additionalUserInfo?.isNewUser) {
      const createUserRequest = {
        name: name || null,
        email,
        firebaseUid: userCredential.user.uid,
      };
      await createUser(createUserRequest);
    }
  }

  async loginWithEmail(values: FormValuesSignIn) {
    try {
      const result = await auth().signInWithEmailAndPassword(values.identifier, values.password);
      await this.handleNewUser(result, values.identifier);

      if (!result.user.emailVerified) {
        await result.user.sendEmailVerification({
          url: `${process.env.EXPO_PUBLIC_FIREBASE_FULL_DOMAIN}/home`,
          android: {
            packageName: "com.abdij09.brewha",
            installApp: true,
          },
          dynamicLinkDomain: process.env.EXPO_PUBLIC_FIREBASE_HOST_DYNAMIC_LINK,
          handleCodeInApp: true,
        });
        return { emailVerified: false, loginSuccess: false };
      }

      return { emailVerified: true, loginSuccess: true };
    } catch (error) {
      throw new Error(`Login failed: ${(error as FirebaseAuthError).message}`);
    }
  }

  async loginWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const res = await checkEmail(response.data.user.email, response.data.idToken);

        if (res.emailExists && res.providers.length > 0 && res.providers[0] !== "google.com") {
          await GoogleSignin.signOut();
          return { email: response.data.user.email, needsLinking: true };
        }

        const googleCredential = auth.GoogleAuthProvider.credential(response.data.idToken);
        const user = await auth().signInWithCredential(googleCredential);

        await this.handleNewUser(user, response.data.user.email, response.data.user.name);
        return { email: response.data.user.email, needsLinking: false, user: user.user };
      }
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(`Google sign-in failed: ${error.message}`);
      throw error;
    }
  }

  async register(values: FormValuesSignUp) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(values.email, values.password);
      await userCredential.user.sendEmailVerification({
        url: `${process.env.EXPO_PUBLIC_FIREBASE_FULL_DOMAIN}/home`,
        android: {
          packageName: "com.abdij09.brewha",
          installApp: true,
        },
        dynamicLinkDomain: process.env.EXPO_PUBLIC_FIREBASE_HOST_DYNAMIC_LINK,
        handleCodeInApp: true,
      });
      await this.handleNewUser(userCredential, values.email, values.name);
      return true;
    } catch (error) {
      throw new Error(`Registration failed: ${(error as FirebaseAuthError).message}`);
    }
  }
}

export const authService = new AuthServices();
