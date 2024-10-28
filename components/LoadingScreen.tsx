import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
