import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const ChooseProfileModal = ({
  profileSelected,
}: {
  profileSelected: (type: string) => void;
}) => {
  return (
    <BottomSheetView style={styles.container}>
      <Text style={styles.title}>Choose an option</Text>
      <View style={styles.optionsContainer}>
        <View className="items-center justify-center">
          <TouchableOpacity
            style={styles.option}
            onPress={() => profileSelected("camera")}
          >
            <Ionicons
              name="camera-outline"
              size={24}
              color={Colors.primary[500]}
            />
          </TouchableOpacity>
          <Text style={styles.optionText}>Camera</Text>
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            style={styles.option}
            onPress={() => profileSelected("gallery")}
          >
            <Ionicons
              name="image-outline"
              size={24}
              color={Colors.primary[500]}
            />
          </TouchableOpacity>
          <Text style={styles.optionText}>gallery</Text>
        </View>
      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 50,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    padding: 10,
    borderColor: Colors.secondary[400],
    borderWidth: 1,
    borderRadius: 50,
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text,
    opacity: 0.7,
  },
});

export default ChooseProfileModal;
