import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { Colors } from "@/constants/Colors";
import { overlayStyles } from "@/styles/overlayStyles";

export default function LoadingScreen() {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
    >
      <View style={overlayStyles.overlay}>
        <ActivityIndicator
          size="large"
          color={Colors.primary[500]}
        />
      </View>
    </Modal>
  );
}
