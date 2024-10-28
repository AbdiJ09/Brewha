import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
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
        name="(menu-items)/logout"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
