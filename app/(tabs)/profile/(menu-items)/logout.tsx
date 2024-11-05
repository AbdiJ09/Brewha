import ModernAlert from "@/components/ModernAlert";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useAuth } from "@/context/AuthContext";
export default function Logout() {
  const { onLogout } = useAuth();
  const onCancel = () => {
    router.back();
  };
  return (
    <ModernAlert
      visible={true}
      title="Logout"
      message="Are you sure you want to logout?"
      onCancel={onCancel}
      onConfirm={() => onLogout()}
      cancelText="Cancel"
      confirmText="Logout"
    />
  );
}
