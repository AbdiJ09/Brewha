import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { Href, Link, router } from "expo-router";

export const ForgotPasswordLink: React.FC = () => (
  <Link
    href={"/(auth)/forget-password" as Href}
    asChild
  >
    <TouchableOpacity>
      <Text
        className="font-[Manrope-Medium]"
        style={{
          color: Colors.accent[500],
          textDecorationLine: "underline",
        }}
      >
        Forgot Password?
      </Text>
    </TouchableOpacity>
  </Link>
);
