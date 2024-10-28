import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { BellIcon, MapPinIcon } from "react-native-heroicons/outline";

export const HomeHeader: React.FC = () => (
  <Stack.Screen
    options={{
      headerLeft: () => (
        <View className="flex-row items-start mt-5 ml-5">
          <View className="items-center justify-center w-12 h-12 border rounded-full border-secondary-500">
            <MapPinIcon size={24} color={Colors.secondary[200]} />
          </View>
          <View className="ml-2">
            <Text className="text-[17px] text-foregroundText/70 font-[Manrope-SemiBold]">
              Jakarta, Indonesia
            </Text>
            <Text className="text-xs text-foregroundText/50 font-[Manrope-Regular]">
              Jl. Bundaran 123
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View className="mt-5 mr-5">
          <TouchableOpacity className="relative items-center justify-center w-12 h-12 rounded-full bg-secondary-500">
            <BellIcon size={24} color={Colors.secondary[200]} />
            <View className="absolute w-2.5 h-2.5 bg-red-500 rounded-full top-0 right-0" />
          </TouchableOpacity>
        </View>
      ),
      headerShown: true,
      headerStyle: { backgroundColor: Colors.background },
      headerShadowVisible: false,
      headerTitle: "",
    }}
  />
);
