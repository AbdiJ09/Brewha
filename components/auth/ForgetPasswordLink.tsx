import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export const ForgotPasswordLink: React.FC = () => (
  <TouchableOpacity>
    <Text
      className="mt-5 mb-2 font-[Manrope-Medium]"
      style={{
        color: Colors.accent[500],
        textDecorationLine: "underline",
        textAlign: "right",
      }}
    >
      Forgot Password?
    </Text>
  </TouchableOpacity>
);
