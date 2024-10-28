import { Image } from "react-native";

export const Logo: React.FC = () => (
  <Image
    source={require("@/assets/images/icon.png")}
    className="self-center w-full h-40 mb-6"
    resizeMode="contain"
  />
);
