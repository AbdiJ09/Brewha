import { Colors } from "@/constants/Colors";
import { Image, Text, TouchableOpacity } from "react-native";
interface SocialButtonProps {
  strategy: "oauth_apple" | "oauth_google";
  text?: string;
  textColor?: string;
  handleOAuth: (strategy: "oauth_apple" | "oauth_google") => void;
}
export const SocialButton: React.FC<SocialButtonProps> = ({ strategy, text, handleOAuth }) => (
  <TouchableOpacity
    onPress={() => handleOAuth(strategy)}
    className="flex-row items-center justify-center p-4 my-2 border rounded-full border-secondary-400"
  >
    {strategy === "oauth_apple" ? (
      <Image
        source={require("@/assets/images/logo/icons8-apple-50.png")}
        className={`w-6 h-6 ${text && "mr-2"}`}
      />
    ) : (
      <Image
        source={require("@/assets/images/logo/google-logo.png")}
        className={`w-6 h-6 ${text && "mr-2"}`}
      />
    )}
    {text && <Text className={`text-foregroundText font-[Manrope-SemiBold]`}>{text}</Text>}
  </TouchableOpacity>
);
