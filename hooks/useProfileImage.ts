import { useState, useEffect } from "react";
import { getColors } from "react-native-image-colors";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";

export const useProfileImage = () => {
  const { user } = useUser();
  const [linearGradientColors, setLinearGradientColors] = useState<string[]>(["transparent", "transparent"]);
  useEffect(() => {
    const getLinearGradientColorsWithUser = async () => {
      const timestamp = new Date().getTime();
      const imageUrl = user?.imageUrl ? `${user.imageUrl}?t=${timestamp}` : "https://avatar.iran.liara.run/public/26";
      const result = await getColors(imageUrl, {
        fallback: Colors.primary[500],
        cache: false,
        key: `${user?.id}-${timestamp}`,
      });
      if (result.platform === "android") {
        setLinearGradientColors([result.dominant, Colors.secondary[600]]);
      } else if (result.platform === "ios") {
        setLinearGradientColors([result.background, Colors.secondary[600]]);
      }
    };
    getLinearGradientColorsWithUser();
  }, [user?.imageUrl, user?.id]);

  return { linearGradientColors };
};
