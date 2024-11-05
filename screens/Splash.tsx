import { Colors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Image, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeInRight, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";

interface SplashProps {
  onAnimationFinish?: (isCancelled: boolean) => void;
}
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function Splash({ onAnimationFinish }: SplashProps): JSX.Element {
  const animation = useRef<LottieView>(null);
  return (
    <View className="items-center justify-center flex-1">
      <AnimatedLottieView
        exiting={FadeOut}
        ref={animation}
        style={{
          width: "50%",
          height: "50%",
        }}
        resizeMode={"cover"}
        source={require("@/assets/search_animation.json")}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
}
