import { Colors } from "@/constants/Colors";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventHero } from "@/components/EventHero";
import { HomeHeader } from "@/components/home/HomeHeader";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ArrowRightIcon, ArrowUpRightIcon, MapPinIcon } from "react-native-heroicons/outline";

export const HomeScreen = () => {
  const dataShop = [
    {
      id: 1,
      name: "Shop 1",
      range: "5 km",
      image: require("@/assets/images/shop1.png"),
    },
    {
      id: 2,
      name: "Shop 2",
      range: "5 km",
      image: require("@/assets/images/shop2.png"),
    },
    {
      id: 3,
      name: "Shop 3",
      range: "5 km",
      image: require("@/assets/images/shop3.png"),
    },
    {
      id: 4,
      name: "Shop 4",
      range: "5 km",
      image: require("@/assets/images/shop4.png"),
    },
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Featured Item 1",
      image: {
        uri: "https://images.unsplash.com/photo-1641119171572-ab8336065a84?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    {
      id: 2,
      title: "Featured Item 2",
      image: {
        uri: "https://images.unsplash.com/photo-1597528662465-55ece5734101?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.background }}
    >
      <HomeHeader />
      <ScrollView>
        <View>
          <EventHero />

          {/* Nearby Shop Section */}
          <View className="m-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl text-foregroundText/90 font-[Manrope-SemiBold]">Nearby Shop</Text>
              <View className="flex-row items-center">
                <Text className="mr-2 text-foregroundText/90">See All</Text>
                <ArrowRightIcon
                  color={Colors.text}
                  size={16}
                />
              </View>
            </View>
            <View>
              <Text className="text-sm text-foregroundText/50 font-[Manrope-Regular]">Find the best shop in your area</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataShop}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="relative p-1 mt-3 mr-2 overflow-hidden rounded-3xl bg-secondary-500">
                    <Image
                      source={item.image}
                      className="w-40 h-32 rounded-3xl"
                    />
                    <View className="p-3">
                      <Text className="text-sm text-foregroundText/90 font-[Manrope-SemiBold]">{item.name}</Text>
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center mt-2 gap-x-1">
                          <MapPinIcon
                            color={Colors.text}
                            size={16}
                          />
                          <Text className="text-xs text-foregroundText/50 font-[Manrope-Regular]">{item.range}</Text>
                        </View>
                        <TouchableOpacity className="absolute flex-row items-center justify-center w-12 h-12 p-1 mt-2 rounded-full -right-3 -bottom-3 gap-x-1 bg-primary-500">
                          <ArrowUpRightIcon
                            color={Colors.text}
                            size={16}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                centerContent
              />
            </View>
          </View>

          {/* Featured Items Section */}
          <View className="m-5">
            <Text className="text-xl text-foregroundText/90 font-[Manrope-SemiBold]">Featured Items</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="relative p-1 mt-3 mr-2 overflow-hidden rounded-3xl bg-secondary-500">
                  <Image
                    source={item.image}
                    className="w-40 h-32 rounded-3xl"
                  />
                  <Text className="p-3 text-sm text-foregroundText/90 font-[Manrope-SemiBold]">{item.title}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
