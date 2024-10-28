import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const UserLevel = ({ level }: { level: string }) => {
  const levels = [
    "Nongkrong Kalo Mood",
    "Nongkrong Tiap Hari",
    "Nongkrong Is Life",
    "Nongkrong Legend",
    "Nongkrong Royalty",
  ];
  const index = levels.findIndex((l) => l === level);

  return (
    <View className="p-4 mt-6 bg-secondary-500 rounded-2xl">
      <Text className="mb-3 text-lg font-[Manrope-Bold] text-foregroundText">
        Your Hangout Level
      </Text>
      <View className="flex-row items-center justify-between">
        {levels.map((item, idx) => (
          <View key={idx} className="items-center">
            <Ionicons
              name={idx <= index ? "star" : "star-outline"}
              size={24}
              color={idx <= index ? Colors.accent[500] : Colors.text}
            />
            {idx === index && (
              <View className="px-2 py-1 mt-2 rounded-full bg-primary-500">
                <Text className="text-xs font-[Manrope-Bold] text-foregroundText">
                  {item}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserLevel;
