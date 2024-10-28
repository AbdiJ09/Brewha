import React, { useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import SlideContent from "@/components/on-boarding/SlideContent";
import Svg from "@/assets/svg/ilustration1.svg";
import Svg2 from "@/assets/svg/ilustration2.svg";
import Svg3 from "@/assets/svg/ilustration3.svg";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigateSlide from "@/components/on-boarding/NavigateSlide";

interface Slide {
  title: string;
  description: string;
  image: JSX.Element;
}
export const OnBoardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const slides: Slide[] = [
    {
      title: "Welcome to Brewha",
      description: "Discover the best hangout spots, from cozy cafes to your favorite coffee shops, with ease.",
      image: (
        <Svg
          width={"100%"}
          height={"100%"}
          fill={Colors.text}
        />
      ),
    },
    {
      title: "Explore Various Exciting Places",
      description: "Find coffee, ice, and delicious food in the perfect spots to relax with friends or by yourself.",
      image: (
        <Svg2
          width={"100%"}
          height={"100%"}
          fill={Colors.text}
        />
      ),
    },
    {
      title: "Enjoy Your Hangout Experience",
      description: "Get the nearest locations and book directly, enjoying the warm atmosphere at your chosen place.",
      image: (
        <Svg3
          width={"100%"}
          height={"100%"}
          fill={Colors.text}
        />
      ),
    },
  ];

  const animateSlideChange = (direction: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      if (direction === "next") {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (direction === "prev") {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = async () => {
    if (currentSlide === slides.length - 1) {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      router.push("/sign-in");
    } else {
      animateSlideChange("next");
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      animateSlideChange("prev");
    }
  };
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background, position: "relative" }]}>
      <View style={styles.container}>
        {/* <Header /> */}
        <SlideContent
          colors={Colors}
          currentSlide={currentSlide}
          fadeAnim={fadeAnim}
          slides={slides}
        />

        <NavigateSlide
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentSlide={currentSlide}
          slides={slides}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 16,
  },
});
