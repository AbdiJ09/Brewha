import { Colors } from "@/constants/Colors";
import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { View } from "react-native";

export default function Search() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.background }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="items-center justify-center flex-1">
          <Text className="text-black">Search</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
