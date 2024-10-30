import { Colors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Image, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeOut, ZoomOut } from "react-native-reanimated";

interface SplashProps {
  onAnimationFinish?: (isCancelled: boolean) => void;
}
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function Splash({ onAnimationFinish }: SplashProps): JSX.Element {
  const animation = useRef<LottieView>(null);
  return (
    <View className="items-center justify-center flex-1 ">
      <Animated.Image
        exiting={FadeOut.duration(1000)}
        source={require("@/assets/images/splash.png")}
        className="w-full h-full"
      />
      <AnimatedLottieView
        exiting={FadeOut.duration(1000)}
        ref={animation}
        style={{
          position: "absolute",
          bottom: 370,
          width: "100%",
          height: 50,
        }}
        source={require("@/assets/waveloading.json")}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
}
