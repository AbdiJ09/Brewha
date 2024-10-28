import { Colors } from "@/constants/Colors";
import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";

export default function Bookmark() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.background }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="items-center justify-center flex-1">
          <Text className="text-black">Bookmark</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
