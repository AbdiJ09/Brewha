import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

interface ModernAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}

const ModernAlert: React.FC<ModernAlertProps> = ({ visible, title, message, onCancel, onConfirm, cancelText = "Cancel", confirmText = "Confirm" }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)"],
  });

  return (
    <Modal
      transparent
      visible={visible}
    >
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Animated.View style={[styles.alert]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alert: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.text,
  },
  message: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.text,
  },
  buttonContainer: {
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "70%",
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 16,
  },
  confirmButton: {
    width: "70%",
    backgroundColor: Colors.primary[500],
  },
  confirmButtonText: {
    color: "#FFFFFF",
  },
});

export default ModernAlert;
