import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { overlayStyles } from "@/styles/overlayStyles";

export default function LoadingScreen() {
  return (
    <View style={overlayStyles.overlay}>
      <ActivityIndicator
        size="large"
        color={Colors.primary[500]}
      />
    </View>
  );
}
