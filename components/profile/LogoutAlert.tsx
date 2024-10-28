// components/profile/LogoutAlert.tsx
import React from "react";
import { Alert } from "react-native";

interface LogoutAlertProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutAlert: React.FC<LogoutAlertProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  if (visible) {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: onCancel, style: "cancel" },
      { text: "OK", onPress: onConfirm },
    ]);
  }
  return null;
};
