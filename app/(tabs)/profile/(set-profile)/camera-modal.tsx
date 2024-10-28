import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { CameraView, CameraType, FlashMode } from "expo-camera";
import { router } from "expo-router";
import Animated, { SlideInDown, useAnimatedStyle, withTiming, useSharedValue, withSequence, withRepeat, runOnJS } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageEditor from "@/components/ImageEditor";

const uploadImage = async (user: any, uri: string) => {
  await user.setProfileImage({
    file: uri,
  });
};

const LoadingSpinner = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withSequence(withTiming(360, { duration: 1000 })), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.loadingContainer, animatedStyle]}>
      <Ionicons
        name="reload-outline"
        size={24}
        color="white"
      />
    </Animated.View>
  );
};

const CameraModal = () => {
  const { user } = useUser();
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cameraViewRef, setCameraViewRef] = useState<CameraView | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [imageManipulation, setImageManipulation] = useState<boolean>(false);
  const shutterScale = useSharedValue(1);
  const confirmScale = useSharedValue(1);
  const containerOpacity = useSharedValue(1);

  const handleNavigateBack = () => {
    router.back();
  };

  const mutation = useMutation({
    mutationFn: (uri: string) => uploadImage(user, uri),
    onSuccess: () => {
      containerOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(handleNavigateBack)();
        }
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const takePicture = async () => {
    if (!cameraViewRef) return;

    shutterScale.value = withSequence(withTiming(0.8, { duration: 100 }), withTiming(1, { duration: 100 }));

    const photo = await cameraViewRef.takePictureAsync({
      base64: true,
      quality: 0.7,
    });
    setPhotoUri(photo?.uri || null);
    setIsPreview(true);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((current) => {
      switch (current) {
        case "off":
          return "on";
        case "on":
          return "auto";
        case "auto":
          return "off";
        default:
          return "off";
      }
    });
  };

  const confirmPicture = async () => {
    if (photoUri && !mutation.isPending) {
      confirmScale.value = withSequence(withTiming(0.8, { duration: 100 }), withTiming(1, { duration: 100 }));
      setImageManipulation(true);
    }
  };

  const resetPreview = () => {
    setPhotoUri(null);
    setIsPreview(false);
    containerOpacity.value = withTiming(1);
  };

  const cancelPicture = () => {
    containerOpacity.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(resetPreview)();
      }
    });
  };

  const shutterAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shutterScale.value }],
  }));

  const confirmAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confirmScale.value }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const getFlashIcon = () => {
    switch (flash) {
      case "on":
        return "flash";
      case "off":
        return "flash-off";
      case "auto":
        return "flash-auto";
      default:
        return "flash-off";
    }
  };

  const handleSaveImage = (uri: string) => {
    mutation.mutate(uri);
  };

  return (
    <View style={styles.wrapper}>
      {imageManipulation ? (
        <ImageEditor
          loading={mutation.isPending}
          onSaveEditedImage={handleSaveImage}
          uri={photoUri as string}
        />
      ) : (
        <View style={StyleSheet.absoluteFill}>
          {/* New Animated wrapper for opacity animation */}
          <Animated.View style={[styles.opacityWrapper, containerAnimatedStyle]}>
            <TouchableOpacity
              onPress={handleNavigateBack}
              style={StyleSheet.absoluteFill}
            />

            <Animated.View
              entering={SlideInDown}
              style={styles.modalContainer}
            >
              {isPreview ? (
                <View style={styles.previewContainer}>
                  {photoUri && (
                    <Image
                      source={{ uri: photoUri }}
                      style={styles.camera}
                    />
                  )}
                  <View style={styles.previewOverlay}>
                    <Text style={styles.previewText}>Preview</Text>
                  </View>
                </View>
              ) : (
                <CameraView
                  style={styles.camera}
                  facing={facing}
                  ref={(ref) => setCameraViewRef(ref)}
                  flash={flash}
                />
              )}

              <View style={styles.controlsContainer}>
                {isPreview ? (
                  <View style={styles.previewControls}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={cancelPicture}
                      disabled={mutation.isPending}
                    >
                      <Ionicons
                        name="close"
                        size={32}
                        color="white"
                      />
                    </TouchableOpacity>

                    <Animated.View style={confirmAnimatedStyle}>
                      <TouchableOpacity
                        style={[styles.actionButton, mutation.isPending && styles.actionButtonDisabled]}
                        onPress={confirmPicture}
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          <LoadingSpinner />
                        ) : (
                          <Ionicons
                            name="checkmark"
                            size={32}
                            color="white"
                          />
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                ) : (
                  <View style={styles.cameraControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={toggleFlash}
                    >
                      <MaterialCommunityIcons
                        name={getFlashIcon()}
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>

                    <Animated.View style={[styles.shutterContainer, shutterAnimatedStyle]}>
                      <TouchableOpacity
                        style={styles.shutterButton}
                        onPress={takePicture}
                      >
                        <View style={styles.shutterInner} />
                      </TouchableOpacity>
                    </Animated.View>

                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={toggleCameraFacing}
                    >
                      <Ionicons
                        name="camera-reverse"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  opacityWrapper: {
    flex: 1,
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  previewContainer: {
    flex: 1,
    position: "relative",
  },
  previewOverlay: {
    position: "absolute",
    top: 16,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  previewText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterContainer: {
    padding: 4,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#000",
  },
  previewControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraModal;
