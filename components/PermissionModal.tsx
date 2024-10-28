import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { Colors } from "@/constants/Colors";
import { PermissionResponse } from "expo-camera";

const CustomPermissionModal = ({ permission, visible, onClose, onGrantPermission, title, description, icon }: { permission: PermissionResponse; visible: boolean; onClose: () => void; onGrantPermission: () => void; title: string; description: string; icon: JSX.Element }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                {icon}
                <Text style={styles.title}>{title}</Text>
              </View>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.option, { backgroundColor: Colors.primary[500] }]}
                  onPress={onGrantPermission}
                >
                  <Text style={[styles.optionText, { color: Colors.secondary[600] }]}>{!permission.canAskAgain ? "Open Settings" : "Allow Access"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.option, { backgroundColor: Colors.secondary[500] }]}
                  onPress={onClose}
                >
                  <Text style={[styles.optionText, { color: Colors.primary[500] }]}>Maybe Later</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 24,
    padding: 32,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 30,
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    gap: 16,
    justifyContent: "space-between",
  },
  option: {
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginHorizontal: 8,
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Manrope-Bold",
    textTransform: "uppercase",
  },
});

export default CustomPermissionModal;
