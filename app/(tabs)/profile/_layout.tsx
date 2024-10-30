import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link, router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerTitle: "",
          headerLeft: () => (
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="ml-2"
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={Colors.text}
                />
              </TouchableOpacity>
              <Text className="ml-4 text-lg font-[Manrope-SemiBold] text-foregroundText">Profile</Text>
            </View>
          ),
          headerRight: () => (
            <Link
              href={"/profile/(menu-items)/menu-settings" as Href}
              asChild
            >
              <TouchableOpacity className="mr-2">
                <Ionicons
                  name="menu-sharp"
                  size={24}
                  color={Colors.text}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="(set-profile)/camera-modal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(set-profile)/gallery-modal"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(menu-items)/menu-settings"
        options={{
          title: "Settings & Privacy",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          headerShown: true,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="(menu-items)/logout"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
