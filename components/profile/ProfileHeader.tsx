import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useUserProfileQuery } from "@/hooks/useUserProfileQuery";
import { Colors } from "@/constants/Colors";

const ProfileHeader = ({ linearGradientColors, openBottomSheet }: any) => {
  const { data: userProfile } = useUserProfileQuery();
  return (
    <View style={{ height: 250 }}>
      <LinearGradient
        colors={[Colors.background, Colors.background]}
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View className="items-center p-6 mb-10">
          <View className="relative">
            <Image
              source={userProfile?.photoURL ? { uri: userProfile?.photoURL } : { uri: "https://avatar.iran.liara.run/public/26" }}
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
          <Text className="mt-2 text-xl font-[Manrope-Bold] text-foregroundText">{userProfile?.name ? userProfile?.name : userProfile?.email}</Text>
          <Text className="text-sm font-[Manrope-Regular] text-foregroundText">{userProfile?.email}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileHeader;
