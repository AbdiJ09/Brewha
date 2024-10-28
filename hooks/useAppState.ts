import { useEffect } from "react";
import { AppState } from "react-native";

export const useAppState = (onForeground: () => void) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        onForeground();
      }
    });

    onForeground();

    return () => {
      subscription.remove();
    };
  }, []);
};
