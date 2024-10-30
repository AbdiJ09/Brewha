import { useMemo, useState } from "react";
import { PermissionResponse } from "expo-camera";
import { ScrollView, View, Text, Pressable, Share } from "react-native";
import { Colors } from "@/constants/Colors";
import { Href, router } from "expo-router";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ChooseProfileModal from "@/components/profile/ChooseProfileModal";
import PermissionModal from "@/components/PermissionModal";
import LoadingScreen from "@/components/LoadingScreen";
import { useProfileImage } from "@/hooks/useProfileImage";
import { useCameraPermissions } from "@/hooks/useCameraPermissions";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import ProfileAction from "@/components/profile/ProfileAction";
import * as MediaLibrary from "expo-media-library";
import { CameraIcon, PhotoIcon, ShareIcon, TrophyIcon, MapPinIcon, UserGroupIcon, FireIcon } from "react-native-heroicons/outline";
import * as Linking from "expo-linking";

// Type definitions
interface UserStats {
  cafesVisited: number;
  reviews: number;
  points: number;
  nextLevelPoints: number;
  rank: number;
  totalUsers: number;
  level: string;
}

interface Badge {
  id: number;
  name: string;
  icon: any;
  achieved: boolean;
  description: string;
  progress?: number;
  total?: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
}

const Profile = () => {
  const { linearGradientColors } = useProfileImage();
  const { permission: permissionCamera, showModalPermission, setShowModalPermission, requestPermission } = useCameraPermissions();
  const { bottomSheetRef, openBottomSheet, renderBackdrop } = useBottomSheetModal();

  // Media Library Permissions
  const [showModalMediaLibraryPermission, setShowModalMediaLibraryPermission] = useState(false);
  const [permissionMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();

  // User Stats Data
  const userStats: UserStats = {
    cafesVisited: 24,
    reviews: 15,
    points: 850,
    nextLevelPoints: 1000,
    rank: 123,
    totalUsers: 5430,
    level: "Nongkrong Kalo Mood",
  };

  // Badges Data
  const badges: Badge[] = [
    {
      id: 1,
      name: "Coffee Expert",
      icon: TrophyIcon,
      achieved: true,
      description: "Review 10 different coffee varieties",
      progress: 10,
      total: 10,
    },
    {
      id: 2,
      name: "Social Butterfly",
      icon: UserGroupIcon,
      achieved: true,
      description: "Share 5 cafe reviews",
      progress: 5,
      total: 5,
    },
    {
      id: 3,
      name: "Explorer",
      icon: MapPinIcon,
      achieved: false,
      description: "Visit cafes in 5 different areas",
      progress: 3,
      total: 5,
    },
    {
      id: 4,
      name: "Streak Master",
      icon: FireIcon,
      achieved: false,
      description: "Visit cafes 5 days in a row",
      progress: 2,
      total: 5,
    },
  ];

  // Active Challenges Data
  const activeChallenges: Challenge[] = [
    {
      id: 1,
      title: "Weekend Explorer",
      description: "Visit 3 new cafes this weekend",
      progress: 1,
      total: 3,
      reward: 100,
    },
    {
      id: 2,
      title: "Review Master",
      description: "Write 5 detailed reviews",
      progress: 3,
      total: 5,
      reward: 150,
    },
  ];

  // Share Profile Handler
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my coffee journey! I've visited ${userStats.cafesVisited} cafes and earned ${badges.filter((b) => b.achieved).length} badges! Level: ${userStats.level}`,
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // Permission Handlers
  const handleRequestPermissionMediaLibrary = async () => {
    if (!permissionMediaLibrary?.canAskAgain) {
      await Linking.openSettings();
    }
    await requestPermissionMediaLibrary();
    setShowModalMediaLibraryPermission(false);
  };

  const profileChangeSelected = async (type: string) => {
    bottomSheetRef.current?.close();
    if (type === "camera") {
      if (!permissionCamera?.granted) {
        setShowModalPermission(true);
        return;
      }
      router.push("/profile/(set-profile)/camera-modal" as Href);
    } else if (type === "gallery") {
      if (!permissionMediaLibrary?.granted) {
        setShowModalMediaLibraryPermission(true);
        return;
      }
      router.push("/profile/(set-profile)/gallery-modal");
    }
  };

  const snapPoints = useMemo(() => ["30%"], []);

  if (!permissionCamera || !permissionMediaLibrary) return <LoadingScreen />;

  return (
    <BottomSheetModalProvider>
      <ScrollView className="bg-background">
        <ProfileHeader
          openBottomSheet={openBottomSheet}
          linearGradientColors={linearGradientColors}
        />

        <View className="-mt-10 ">
          <View className="py-4 shadow-lg px-7 bg-secondary-500 rounded-3xl">
            {/* Profile Header Section */}
            <View className="flex-row items-center justify-between mb-4">
              <ProfileAction />
              <Pressable
                onPress={handleShare}
                className="p-2 rounded-full bg-primary-50"
              >
                <ShareIcon
                  size={24}
                  color={Colors.primary[500]}
                />
              </Pressable>
            </View>

            {/* Stats Grid */}
            <View className="flex-row justify-around p-4 mb-4 bg-accent-500 rounded-xl">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary-500">{userStats.cafesVisited}</Text>
                <Text className="text-sm text-gray-600">Cafes</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary-500">{userStats.reviews}</Text>
                <Text className="text-sm text-gray-600">Reviews</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary-500">#{userStats.rank}</Text>
                <Text className="text-sm text-gray-600">Rank</Text>
              </View>
            </View>

            {/* Level and Progress */}
            <View className="mb-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-lg font-semibold text-foregroundText">{userStats.level}</Text>
                <Text className="text-primary-500">
                  {userStats.points}/{userStats.nextLevelPoints} pts
                </Text>
              </View>
              <View className="h-2 overflow-hidden rounded-full bg-accent-500">
                <View
                  className="h-full bg-primary-500"
                  style={{
                    width: `${(userStats.points / userStats.nextLevelPoints) * 100}%`,
                  }}
                />
              </View>
            </View>

            {/* Badges Section */}
            <View className="mb-4">
              <Text className="mb-3 text-lg font-semibold text-foregroundText">Badges</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pb-2"
              >
                {badges.map((badge) => (
                  <Pressable
                    key={badge.id}
                    className="items-center mr-4"
                  >
                    <View className={`w-16 h-16 rounded-full items-center justify-center ${badge.achieved ? "bg-primary-500" : "bg-accent-500"}`}>
                      <badge.icon
                        size={28}
                        color={badge.achieved ? "white" : Colors.secondary[400]}
                      />
                    </View>
                    <Text className="mt-2 text-xs text-center text-foregroundText">{badge.name}</Text>
                    {badge.progress !== undefined && (
                      <Text className="text-xs text-gray-500">
                        {badge.progress}/{badge.total}
                      </Text>
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Active Challenges */}
            <View className="mb-4">
              <Text className="mb-3 text-lg font-semibold text-foregroundText">Active Challenges</Text>
              {activeChallenges.map((challenge) => (
                <View
                  key={challenge.id}
                  className="p-4 mb-3 bg-accent-500 rounded-xl"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View>
                      <Text className="text-base font-medium">{challenge.title}</Text>
                      <Text className="text-sm text-gray-500">{challenge.description}</Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-medium text-primary-500">
                        {challenge.progress}/{challenge.total}
                      </Text>
                      <Text className="text-xs text-gray-500">+{challenge.reward} pts</Text>
                    </View>
                  </View>
                  <View className="h-2 overflow-hidden bg-gray-200 rounded-full">
                    <View
                      className="h-full bg-primary-500"
                      style={{
                        width: `${(challenge.progress / challenge.total) * 100}%`,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom Sheet Modal */}
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enableContentPanningGesture={false}
          handleIndicatorStyle={{ backgroundColor: "white" }}
          backgroundStyle={{
            backgroundColor: Colors.background,
            borderRadius: 30,
          }}
          enableOverDrag={false}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
        >
          <ChooseProfileModal profileSelected={profileChangeSelected} />
        </BottomSheetModal>

        {/* Permission Modals */}
        <PermissionModal
          icon={
            <CameraIcon
              size={48}
              color={Colors.primary[500]}
            />
          }
          title="Camera Access"
          description="We need access to your camera to use this feature"
          permission={permissionCamera as PermissionResponse}
          visible={showModalPermission}
          onClose={() => setShowModalPermission(false)}
          onGrantPermission={requestPermission}
        />

        <PermissionModal
          icon={
            <PhotoIcon
              size={48}
              color={Colors.primary[500]}
            />
          }
          title="Gallery Access"
          description="We need access to your gallery to use this feature"
          permission={permissionMediaLibrary as MediaLibrary.EXPermissionResponse}
          visible={showModalMediaLibraryPermission}
          onClose={() => setShowModalMediaLibraryPermission(false)}
          onGrantPermission={handleRequestPermissionMediaLibrary}
        />
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default Profile;
