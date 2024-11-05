import { useEffect, useState } from "react";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import LoadingScreen from "@/components/LoadingScreen";

const useDynamicLinks = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLink = async (link: any) => {
      if (!link) {
        setLoading(false); // Jika tidak ada link, set loading menjadi false
        return;
      }

      const url = new URL(link.url);
      const mode = url.searchParams.get("mode");
      const oobCode = url.searchParams.get("oobCode");
      const continueUrl = url.searchParams.get("continueUrl");

      if (mode === "resetPassword") {
        router.replace(`/(auth)/reset-password?oobCode=${oobCode}&continueUrl=${continueUrl}`);
      } else if (mode === "verifyEmail") {
        router.replace(`/sign-up/verify-email-address?oobCode=${oobCode}&continueUrl=${continueUrl}`);
      }

      setLoading(false); // Selesai memproses link, loading selesai
    };

    const unsubscribe = dynamicLinks().onLink(handleLink);

    // Periksa initial link saat aplikasi dibuka pertama kali
    dynamicLinks().getInitialLink().then(handleLink);

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return null; // Mengembalikan null saat tidak loading
};

export default useDynamicLinks;
