import ProfileMenu from "@/components/profile/ProfileMenu";
import { useMenuItems } from "@/hooks/useMenuItems";
import { View } from "react-native";

export default function ProfileMenuModal() {
  const { menuItems } = useMenuItems();
  return (
    <View className="flex-1 p-4 bg-background">
      <ProfileMenu menuItems={menuItems} />
    </View>
  );
}
