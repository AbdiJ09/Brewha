import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

const ProfileHeader = ({ linearGradientColors, openBottomSheet }: any) => {
  const { user } = useUser();
  return (
    <View style={{ height: 250 }}>
      <LinearGradient
        colors={linearGradientColors}
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View className="items-center p-6 mb-10">
          <View className="relative">
            <Image
              source={user?.hasImage ? { uri: user?.imageUrl } : { uri: "https://avatar.iran.liara.run/public/26" }}
              className="w-24 h-24 border-4 border-white rounded-full"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-500"
              onPress={openBottomSheet}
            >
              <Ionicons
                name="camera-outline"
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
          <Text className="mt-2 text-xl font-[Manrope-Bold] text-foregroundText">{user?.fullName}</Text>
          <Text className="text-sm font-[Manrope-Regular] text-foregroundText">{user?.primaryEmailAddress?.emailAddress}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileHeader;
