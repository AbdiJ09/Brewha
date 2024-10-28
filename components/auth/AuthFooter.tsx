import { Colors } from "@/constants/Colors";
import { Href, Link, Redirect, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

export const AuthFooter: React.FC<{
  text: string;
  link: Href;
  label: string;
}> = ({ text, link, label }) => {
  return (
    <View className="flex-row items-center justify-center mt-3">
      <Text
        className="text-sm text-center font-[Manrope-Regular]"
        style={{ color: Colors.text }}
      >
        {text}{" "}
      </Text>
      <Link href={link}>
        <Text
          className="font-[Manrope-SemiBold]"
          style={{
            color: Colors.accent[500],
            textDecorationLine: "underline",
          }}
        >
          {label}
        </Text>
      </Link>
    </View>
  );
};
