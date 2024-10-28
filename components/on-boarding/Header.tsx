import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { Themes } from "@/constants/Colors";
const Header = () => {
  const { colorScheme } = useColorScheme();
  const colors = Themes[colorScheme];
  return (
    <View className="absolute right-5 top-12">
      <Pressable
        onPress={() => router.push("/sign-in")}
        className={`px-6 py-2 rounded-full `}
        style={{
          backgroundColor: colors.primary,
        }}
      >
        <Text className={` font-[Manrope-SemiBold] text-white`}> Skip</Text>
      </Pressable>
    </View>
  );
};
export default Header;
