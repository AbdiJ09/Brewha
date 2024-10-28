import { Text, TouchableOpacity } from "react-native";

const ProfileAction = () => {
  return (
    <TouchableOpacity className="px-4 py-3 bg-primary-500 rounded-2xl">
      <Text className="font-[Manrope-Bold] text-center text-white/80">
        Edit Profile
      </Text>
    </TouchableOpacity>
  );
};
export default ProfileAction;
