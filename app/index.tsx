import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { OnBoardingScreen } from "@/components/screens/OnBoarding";

export default function AppPage() {
  const { sessionId, isLoaded } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const completed = await AsyncStorage.getItem("hasCompletedOnboarding");
        setHasCompletedOnboarding(completed === "true");
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (!isLoaded || hasCompletedOnboarding === null) {
    return null;
  }

  if (sessionId) {
    return <Redirect href="/home" />;
  }

  return <OnBoardingScreen />;
}
