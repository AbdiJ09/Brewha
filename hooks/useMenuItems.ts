import { useState } from "react";
import ProfileMenu from "@/components/profile/ProfileMenu";

export const useMenuItems = () => {
  const [isLogoutAlertVisible, setIsLogoutAlertVisible] = useState(false);
  const menuItems: ProfileMenu[] = [
    {
      icon: "notifications-outline",
      label: "Notifications",
      url: "/profile",
    },
    {
      icon: "settings-outline",
      label: "Settings",
      url: "/profile",
    },
    {
      icon: "bookmark-outline",
      label: "Saved Places",
      url: "/profile",
    },
    {
      icon: "card-outline",
      label: "Payment Method",
      url: "/profile",
    },

    {
      icon: "gift-outline",
      label: "Refer & Get Discount",
      url: "/profile",
    },
    {
      icon: "log-out-outline",
      label: "Log Out",
      color: "red",
      url: "/profile/logout",
    },
  ];

  return {
    menuItems,
    isLogoutAlertVisible,
    setIsLogoutAlertVisible,
  };
};
