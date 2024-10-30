import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, Dimensions, Animated } from "react-native";
import { View, TouchableOpacity } from "react-native";
export const EventHero = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const autoSlideIntervalRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const dataEvent = [
    {
      id: 1,
      title: "Event 1",
      higlight: "OFF 20%",
      date: "2023-04-01",
      image: require("@/assets/images/coffee_event1.png"),
    },
  ];

  const { width } = Dimensions.get("window");

  const startAutoSlide = () => {
    autoSlideIntervalRef.current = setInterval(() => {
      if (!flatListRef.current) {
        return;
      }
      const nextIndex = (currentIndex + 1) % dataEvent.length;

      flatListRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
        viewPosition: 0.5,
        viewOffset: 0,
      });
      setCurrentIndex(nextIndex);
    }, 2000);
  };

  useEffect(() => {
    if (isAutoSliding) {
      startAutoSlide();
    }

    return () => clearInterval(autoSlideIntervalRef.current);
  }, [isAutoSliding, currentIndex]);

  const onMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAutoSliding(true);
    }, 2000);
  };

  const onScrollBeginDrag = () => {
    setIsAutoSliding(false);
    if (autoSlideIntervalRef.current !== null) {
      clearInterval(autoSlideIntervalRef.current);
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: "clamp",
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          width,
          opacity,
          transform: [{ scale }, { translateX }],
        }}
      >
        <View className="relative p-4 m-5 overflow-hidden bg-accent-900 rounded-3xl">
          <View>
            <Text className="text-sm uppercase text-neutral-500 font-[Manrope-SemiBold]">{item.title}</Text>
            <Text className="text-3xl mt-5 text-neutral-900 font-[Manrope-ExtraBold]">{item.higlight}</Text>
            <TouchableOpacity className="w-32 p-5 mt-5 rounded-full bg-primary-500">
              <Text className="text-sm text-foregroundText text-center font-[Manrope-Bold]">Get Event</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={item.image}
            className="absolute w-96 h-96 rounded-xl -right-32 -top-28"
            resizeMode="contain"
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={dataEvent}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScrollBeginDrag={onScrollBeginDrag}
      getItemLayout={getItemLayout}
      renderItem={renderItem}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={width}
      snapToAlignment="center"
    />
  );
};
