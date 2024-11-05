import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function googleConfig() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });
}
