import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { overlayStyles } from "@/styles/overlayStyles";
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  iconBgColor?: string;
  title?: string;
  message?: string;
  buttonText?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  showIcon?: boolean;
  customIcon?: React.ReactNode; // untuk custom icon component
  onButtonPress?: () => void; // custom button press handler
  modalBackgroundColor?: string;
  titleStyle?: object; // custom style untuk title
  messageStyle?: object; // custom style untuk message
  buttonStyle?: object; // custom style untuk button
  buttonTextStyle?: object; // custom style untuk text button
  closeIconColor?: string;
  closeIconSize?: number;
  showCloseIcon?: boolean;
  closeIconPosition?: string; // 'left' or 'right'
  closeOnBackdropPress?: boolean;
}
const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  icon = "check",
  iconColor = "white",
  iconSize = 40,
  iconBgColor = Colors.primary[500],
  title = "Title",
  message = "Message",
  buttonText = "OK",
  buttonBgColor = Colors.primary[500],
  buttonTextColor = "white",
  showIcon = true,
  customIcon = null,
  onButtonPress = null,
  modalBackgroundColor = Colors.background,
  titleStyle = {
    color: Colors.text,
  },
  messageStyle = {},
  buttonStyle = {},
  buttonTextStyle = {},
  closeIconColor = Colors.text,
  closeIconSize = 24,
  showCloseIcon = true,
  closeIconPosition = "right", // 'left' or 'right'
  closeOnBackdropPress = true,
}) => {
  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      onClose();
    }
  };
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.centeredView}
        onPress={handleBackdropPress}
      >
        <Pressable style={[styles.modalView, { backgroundColor: modalBackgroundColor }]}>
          {/* Close Icon */}
          {showCloseIcon && (
            <TouchableOpacity
              style={[styles.closeIcon, closeIconPosition === "left" ? styles.closeIconLeft : styles.closeIconRight]}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AntDesign
                name="close"
                size={closeIconSize}
                color={closeIconColor}
              />
            </TouchableOpacity>
          )}

          {/* Icon Section */}
          {showIcon && (
            <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
              {customIcon || (
                <AntDesign
                  name={icon as any}
                  size={iconSize}
                  color={iconColor}
                />
              )}
            </View>
          )}

          {/* Title */}
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

          {/* Message */}
          {message && <Text style={[styles.message, messageStyle]}>{message}</Text>}

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonBgColor }, buttonStyle]}
            onPress={handleButtonPress}
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }, buttonTextStyle]}>{buttonText}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
    maxWidth: 400,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    zIndex: 1,
  },
  closeIconLeft: {
    left: 15,
  },
  closeIconRight: {
    right: 15,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Colors.text,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomModal;
