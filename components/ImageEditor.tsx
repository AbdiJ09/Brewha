import React, { useRef } from "react";
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CropView } from "react-native-image-crop-tools";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import LoadingScreen from "./LoadingScreen";

const { width } = Dimensions.get("window");

export default function ImageEditor({ uri, onSaveEditedImage, loading }: { uri: string; onSaveEditedImage: (uri: string) => void; loading?: boolean }) {
  const cropViewRef = useRef<any>(null);
  const router = useRouter();
  const containerOpacity = useSharedValue(1);

  const handleImageCrop = async (cropData: any) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(`file://${cropData.uri}`, {
        encoding: FileSystem.EncodingType.Base64,
      });
      onSaveEditedImage(`data:image/jpeg;base64,${base64}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageRotate = () => {
    cropViewRef.current.rotateImage();
  };

  const handleImageSave = () => {
    cropViewRef.current.saveImage(true);
  };

  const handleCancel = () => {
    router.back();
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Animated.View style={[styles.opacityWrapper, containerAnimatedStyle]}>
        {loading && <LoadingScreen />}
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-secondary-500">
          <TouchableOpacity onPress={handleCancel}>
            <Text className="text-primary-500">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-lg font-[Manrope-SemiBold] text-foregroundText">Edit Photo</Text>
          <TouchableOpacity onPress={handleImageSave}>
            <Text className="text-primary-500">Save</Text>
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        <View className="items-center justify-center flex-1 bg-black">
          <CropView
            ref={cropViewRef}
            sourceUrl={uri}
            style={{ width, height: width }}
            onImageCrop={handleImageCrop}
            aspectRatio={{ width: 1, height: 1 }}
            keepAspectRatio
          />
        </View>

        <View className="p-4 bg-secondary-900">
          <TouchableOpacity
            onPress={handleImageRotate}
            className="items-center mb-3"
          >
            <MaterialCommunityIcons
              name="rotate-3d"
              size={24}
              color="white"
            />
            <Text className="mt-1 text-white">Rotate</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  opacityWrapper: {
    flex: 1,
  },
});
