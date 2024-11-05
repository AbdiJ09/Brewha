import { Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useModal } from "@/context/ModalContext";
import { router } from "expo-router";
const ProfileAction = () => {
  const { showModal } = useModal();
  const handleResetPassword = async () => {
    router.push("/(auth)");
  };
  return (
    <TouchableOpacity
      onPress={handleResetPassword}
      className="px-4 py-3 bg-primary-500 rounded-2xl"
    >
      <Text className="font-[Manrope-Bold] text-center text-white/80">Reset Password</Text>
    </TouchableOpacity>
  );
};
export default ProfileAction;
