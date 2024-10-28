import ModernAlert from "@/components/ModernAlert";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function Logout() {
  const { signOut } = useAuth();
  const onLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };
  const onCancel = () => {
    router.back();
  };
  return (
    <ModernAlert
      visible={true}
      title="Logout"
      message="Are you sure you want to logout?"
      onCancel={onCancel}
      onConfirm={onLogout}
      cancelText="Cancel"
      confirmText="Logout"
    />
  );
}
