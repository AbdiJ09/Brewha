import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
interface DividerProps {
  text: string;
}
export const Divider: React.FC<DividerProps> = ({ text }) => (
  <View className="flex-row items-center ">
    <View className="flex-1 h-px" style={{ backgroundColor: Colors.divider }} />
    <Text
      className="mx-4 text-sm opacity-60 font-[Manrope-Regular]"
      style={{ color: Colors.text }}
    >
      {text}
    </Text>
    <View className="flex-1 h-px" style={{ backgroundColor: Colors.divider }} />
  </View>
);
