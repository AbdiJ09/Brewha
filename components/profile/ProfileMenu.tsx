import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";

type ProfileMenu = {
  icon: any;
  label: string;
  color?: string;
  url?: string;
};

const ProfileMenu = ({ menuItems }: { menuItems: ProfileMenu[] }) => {
  return (
    <View>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.url as Href}
          asChild
        >
          <TouchableOpacity className="flex-row items-center py-4">
            <View className="items-center justify-center w-10 h-10 mr-4 rounded-full bg-secondary-500">
              <Ionicons
                name={item.icon}
                size={20}
                color={item.color || Colors.text}
              />
            </View>
            <Text className={`flex-1 ${item.color ? `text-${item.color}-500` : "text-foregroundText/80"}`}>{item.label}</Text>
            {item.label !== "Log Out" && (
              <Ionicons
                name="chevron-forward"
                color={Colors.text}
                size={20}
              />
            )}
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default ProfileMenu;
