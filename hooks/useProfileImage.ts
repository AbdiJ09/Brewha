import { useState, useEffect } from "react";
import { getColors } from "react-native-image-colors";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";

export const useProfileImage = () => {
  const { user } = useAuth();
  const [linearGradientColors, setLinearGradientColors] = useState<string[]>(["transparent", "transparent"]);
  useEffect(() => {
    const getLinearGradientColorsWithUser = async () => {
      const timestamp = new Date().getTime();
      const imageUrl = user?.photoURL ? `${user.photoURL}?t=${timestamp}` : "https://avatar.iran.liara.run/public/26";
      const result = await getColors(imageUrl, {
        fallback: Colors.primary[500],
        cache: false,
        key: `${user?.uid}-${timestamp}`,
      });
      if (result.platform === "android") {
        setLinearGradientColors([result.average, result.dominant]);
      }
    };
    getLinearGradientColorsWithUser();
  }, [user?.photoURL, user?.uid]);

  return { linearGradientColors };
};
