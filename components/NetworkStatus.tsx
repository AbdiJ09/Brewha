import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";

const NetworkStatus = () => {
  const insets = useSafeAreaInsets();
  const netInfo = useNetInfo();
  const animation = useSharedValue(0);
  const iconOpacity = useSharedValue(1);

  useEffect(() => {
    animation.value = withSpring(netInfo.isConnected ? 0 : 1, {
      damping: 20,
      stiffness: 120,
    });

    iconOpacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      true
    );
  }, [netInfo.isConnected]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animation.value, [0, 1], [100, 0]),
      },
    ],
    opacity: animation.value,
  }));

  if (netInfo.isConnected) return null;
  return (
    <Animated.View
      className="absolute bottom-0 left-0 right-0 overflow-hidden bg-secondary-500 "
      style={[containerStyle, { paddingBottom: insets.bottom + 10 }]}
    >
      <View className="flex-row items-center justify-center gap-3 pt-1 ">
        <Text className="text-xs font-semibold" style={{ color: Colors.text }}>
          No internet connection
        </Text>
      </View>
    </Animated.View>
  );
};

export default NetworkStatus;
