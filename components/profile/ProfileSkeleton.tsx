// ProfileSkeleton.js
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Shimmer = () => {
  return (
    <LinearGradient
      colors={["#2a2a2a", "#3a3a3a", "#2a2a2a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="absolute w-full h-full"
      style={{
        opacity: 0.5,
      }}
    />
  );
};

const ProfileSkeleton = () => {
  return (
    <View className="flex-1 pt-10 bg-background">
      {/* Header */}

      <View>
        {/* Profile Image */}
        <View className="items-center mb-6">
          <View className="relative w-24 h-24 overflow-hidden rounded-full bg-secondary-700">
            <Shimmer />
          </View>
        </View>

        {/* Email */}
        <View className="items-center mb-6">
          <View className="relative w-48 h-6 overflow-hidden rounded bg-secondary-700">
            <Shimmer />
          </View>
        </View>
      </View>

      <View className="py-4 px-7 bg-secondary-500 rounded-t-3xl">
        {/* Reset Password Button */}
        <View className="flex-row items-center justify-between">
          <View className="items-center mb-8">
            <View className="h-12 w-48 bg-[#B08968] rounded-full overflow-hidden relative">
              <Shimmer />
            </View>
          </View>
          <View className="items-center mb-8">
            <View className="h-12 w-12 bg-[#B08968] rounded-full overflow-hidden relative">
              <Shimmer />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row items-center justify-between p-4 mb-8 bg-accent-500 rounded-xl">
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              className="items-center"
            >
              <View className="relative w-16 h-8 mb-2 overflow-hidden rounded bg-secondary-300">
                <Shimmer />
              </View>
              <View className="relative w-20 h-6 overflow-hidden rounded bg-secondary-300">
                <Shimmer />
              </View>
            </View>
          ))}
        </View>

        {/* Mood Bar */}
        <View className="mb-8">
          <View className="relative w-48 h-6 mb-2 overflow-hidden rounded bg-secondary-700">
            <Shimmer />
          </View>
          <View className="relative h-4 overflow-hidden rounded-full bg-secondary-700">
            <Shimmer />
          </View>
        </View>

        {/* Badges */}
        <View className="mb-8">
          <Text className="mb-4 text-xl text-foregroundText">Badges</Text>
          <View className="flex-row justify-around">
            {[1, 2, 3, 4].map((_, index) => (
              <View
                key={index}
                className="items-center"
              >
                <View className="relative w-16 h-16 mb-2 overflow-hidden rounded-full bg-secondary-700">
                  <Shimmer />
                </View>
                <View className="relative w-20 h-4 mb-1 overflow-hidden rounded bg-secondary-700">
                  <Shimmer />
                </View>
                <View className="relative w-12 h-4 overflow-hidden rounded bg-secondary-700">
                  <Shimmer />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active Challenges */}
        <View>
          <Text className="mb-4 text-xl text-foregroundText">Active Challenges</Text>
          <View className="p-4 mb-4 bg-accent-500 rounded-xl">
            <View className="relative w-48 h-6 mb-2 overflow-hidden rounded bg-secondary-300">
              <Shimmer />
            </View>
            <View className="relative w-full h-4 overflow-hidden rounded-full bg-secondary-300">
              <Shimmer />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSkeleton;
