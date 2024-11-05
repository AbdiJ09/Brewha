import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuth();

  const [checkCompleteOnBoarding, setCheckCompleteOnBoarding] = useState<boolean>(false);
  const [checkCompleteOnBoardingLoading, setCheckCompleteOnBoardingLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkCompleteOnboarding = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem("hasCompletedOnboarding");
      if (hasCompletedOnboarding === "true") {
        setCheckCompleteOnBoarding(true);
        setCheckCompleteOnBoardingLoading(false);
      }
    };
    checkCompleteOnboarding();
  }, []);
  if (checkCompleteOnBoardingLoading) return null;
  if ((checkCompleteOnBoarding && !user) || (checkCompleteOnBoarding && !user?.emailVerified)) return <Redirect href={"/(auth)"} />;
  if (checkCompleteOnBoarding && user && user.emailVerified) {
    return <Redirect href={"/home"} />;
  }
  return <Redirect href="/on-boarding" />;
}
