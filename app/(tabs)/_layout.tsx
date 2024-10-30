import { Platform, StyleSheet, Animated, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { useIsFocused } from "@react-navigation/native";

// Importing outline and solid icons
import { HomeIcon, UserIcon, BookmarkIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { HomeIcon as HomeIconSolid, UserIcon as UserIconSolid, BookmarkIcon as BookmarkIconSolid, MagnifyingGlassCircleIcon as MagnifyingGlassIconSolid } from "react-native-heroicons/solid";

interface TabIconProps {
  iconOutline: React.ComponentType<any>;
  iconSolid: React.ComponentType<any>;
  color: string;
  focused: boolean;
}

const TabIcon = ({ iconOutline: IconOutline, iconSolid: IconSolid, color, focused }: TabIconProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.2 : 1.1,
      useNativeDriver: true,
      friction: 5,
    }).start();

    Animated.timing(textOpacity, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        backgroundColor: isFocused ? Colors.primary[500] : Colors.secondary[400],
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
      }}
    >
      {focused ? (
        <IconSolid
          size={24}
          color={color}
        />
      ) : (
        <IconOutline
          size={24}
          color={color}
        />
      )}
    </Animated.View>
  );
};

const TabsLayout = () => {
  const pathname = usePathname();
  const tabsItems = [
    { name: "home", iconOutline: HomeIcon, iconSolid: HomeIconSolid },
    {
      name: "search",
      iconOutline: MagnifyingGlassIcon,
      iconSolid: MagnifyingGlassIconSolid,
    },
    {
      name: "bookmark",
      iconOutline: BookmarkIcon,
      iconSolid: BookmarkIconSolid,
    },
    { name: "profile", iconOutline: UserIcon, iconSolid: UserIconSolid },
  ];
  const SCREEN_WIDTH = Dimensions.get("window").width;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarStyle: {
          display: pathname.startsWith("/profile") ? "none" : "flex",
          position: "absolute",
          bottom: 30,
          width: SCREEN_WIDTH - 100,
          left: 50,
          right: 50,
          height: 70,
          borderRadius: 50,
          overflow: "hidden",
          borderColor: "transparent",
          shadowOffset: { width: 0, height: -4 },
          elevation: 0,
          backgroundColor: "transparent",
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={Platform.OS === "ios" ? 80 : 0}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 50,
              borderColor: "rgba(0,0,0,0.1)",
              borderWidth: 1,
              overflow: "hidden",
            }}
            className="bg-secondary-500/90"
          />
        ),
      }}
    >
      {tabsItems.map((item, index) => (
        <Tabs.Screen
          key={index}
          name={item.name}
          options={{
            title: item.name,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconOutline={item.iconOutline}
                iconSolid={item.iconSolid}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
