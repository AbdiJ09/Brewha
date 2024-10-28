import { Colors } from "@/constants/Colors";
import { Image, Text, TouchableOpacity } from "react-native";
interface SocialButtonProps {
  strategy: "oauth_apple" | "oauth_google";
  text: string;
  textColor: string;
  borderColor?: string;
  handleOAuth: (strategy: "oauth_apple" | "oauth_google") => void;
}
export const SocialButton: React.FC<SocialButtonProps> = ({
  strategy,
  text,
  textColor,
  borderColor,
  handleOAuth,
}) => (
  <TouchableOpacity
    onPress={() => handleOAuth(strategy)}
    className="flex-row items-center justify-center p-3 my-2 rounded-2xl"
    style={{
      backgroundColor: Colors.secondary[500],
      borderColor,
      borderWidth: borderColor ? 1 : 0,
    }}
  >
    {strategy === "oauth_apple" ? (
      <Image
        source={require("@/assets/images/logo/icons8-apple-50.png")}
        className="w-5 h-5 mr-2"
      />
    ) : (
      <Image
        source={require("@/assets/images/logo/icons8-google-50.png")}
        className="w-5 h-5 mr-2"
      />
    )}
    <Text className={`text-${textColor} font-[Manrope-Bold]`}>{text}</Text>
  </TouchableOpacity>
);
