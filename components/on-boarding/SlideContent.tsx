import React, { useEffect, useState } from "react";
import { Animated, View, Dimensions, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const normalize = (size: number, factor = 0.15) => {
  return size + (SCREEN_WIDTH / 400 - 1) * size * factor;
};

interface SlideContentProps {
  currentSlide: number;
  fadeAnim: Animated.Value;
  colors: typeof Colors;
  slides: {
    title: string;
    description: string;
    image: any;
  }[];
}

const SlideContent: React.FC<SlideContentProps> = ({
  colors,
  currentSlide,
  fadeAnim,
  slides,
}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (slides[currentSlide].image.uri) {
      Image.getSize(slides[currentSlide].image.uri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [currentSlide]);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.imageContainer, { opacity: fadeAnim, aspectRatio }]}
      >
        {slides[currentSlide].image}
      </Animated.View>
      <Animated.Text
        style={[styles.title, { opacity: fadeAnim, color: colors.text }]}
      >
        {slides[currentSlide].title}
      </Animated.Text>
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Animated.Text style={[styles.description, { color: colors.text }]}>
          {slides[currentSlide].description}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
  },
  imageContainer: {
    width: "100%",
    marginBottom: normalize(10),
    borderRadius: normalize(12),
    overflow: "hidden",
  },
  title: {
    fontSize: normalize(29),
    fontFamily: "Manrope-Bold",
    marginBottom: normalize(16),
    textAlign: "center",
  },
  description: {
    fontSize: normalize(16),
    opacity: 0.6,
    textAlign: "center",
    fontFamily: "Manrope-Regular",
  },
});

export default SlideContent;
