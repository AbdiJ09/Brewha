import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";

interface SignInButtonProps {
  pending: boolean;
  onPress: () => void;
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  onPress,
  pending,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={pending}
    className="flex-row items-center justify-center p-4 mb-2 rounded-2xl"
    style={{ backgroundColor: Colors.primary[500] }}
  >
    <Text className="text-white text-center font-[Manrope-Bold] mr-3">
      {pending ? "Signing In..." : "Sign In"}
    </Text>
    {pending && <ActivityIndicator size="small" color="white" />}
  </TouchableOpacity>
);
