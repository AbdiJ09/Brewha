import { useState } from "react";
import { Camera, PermissionResponse } from "expo-camera";
import * as Linking from "expo-linking";
import { useAppState } from "./useAppState";

export const useCameraPermissions = () => {
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const [showModalPermission, setShowModalPermission] = useState(false);

  const checkPermissions = async () => {
    const permissionResponse = await Camera.getCameraPermissionsAsync();
    setShowModalPermission(false);
    setPermission(permissionResponse);
  };
  useAppState(checkPermissions);

  const requestPermission = async () => {
    if (!permission?.canAskAgain) {
      await Linking.openSettings();
      return;
    }
    await Camera.requestCameraPermissionsAsync();
    setShowModalPermission(false);
  };

  return {
    permission,
    showModalPermission,
    setShowModalPermission,
    requestPermission,
  };
};
