import { useMemo, useState } from "react";
import { PermissionResponse } from "expo-camera";
import { ScrollView, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Href, router } from "expo-router";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import UserLevel from "@/components/profile/UserLevel";
import ProfileMenu from "@/components/profile/ProfileMenu";
import ChooseProfileModal from "@/components/profile/ChooseProfileModal";
import PermissionModal from "@/components/PermissionModal";
import LoadingScreen from "@/components/LoadingScreen";
import { useProfileImage } from "@/hooks/useProfileImage";
import { useCameraPermissions } from "@/hooks/useCameraPermissions";
import { useMenuItems } from "@/hooks/useMenuItems";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import ProfileAction from "@/components/profile/ProfileAction";
import * as MediaLibrary from "expo-media-library";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/outline";
import * as Linking from "expo-linking";
import { useAuth, useUser } from "@clerk/clerk-expo";
const Profile = () => {
  const { linearGradientColors } = useProfileImage();
  const { permission: permissionCamera, showModalPermission, setShowModalPermission, requestPermission } = useCameraPermissions();
  const { menuItems } = useMenuItems();
  const { bottomSheetRef, openBottomSheet, renderBackdrop } = useBottomSheetModal();

  // Media Library
  const [showModalMediaLibraryPermission, setShowModalMediaLibraryPermission] = useState(false);
  const [permissionMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();

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
        <View className="px-6 -mt-10">
          <View className="p-3 shadow-lg bg-background rounded-3xl">
            <ProfileAction />
            <UserLevel level="Nongkrong Kalo Mood" />
            <View className="mt-6">
              <ProfileMenu menuItems={menuItems} />
            </View>
          </View>
        </View>
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
