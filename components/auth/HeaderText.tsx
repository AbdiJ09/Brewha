import { Colors } from "@/constants/Colors";
import { Text } from "react-native";
import React from "react";
interface HeaderTextProps {
  title: string;
  description: string;
}

export const HeaderText: React.FC<HeaderTextProps> = ({ title, description }) => (
  <>
    <Text
      className="text-3xl mt-5 mb-4 text-center font-[Manrope-Bold]"
      style={{ color: Colors.text }}
    >
      {title}
    </Text>
    <Text
      className="text-sm mb-6 text-center opacity-60 font-[Manrope-Regular]"
      style={{ color: Colors.text }}
    >
      {description}
    </Text>
  </>
);
