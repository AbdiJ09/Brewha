import { Image } from "react-native";

export const Logo: React.FC = () => (
  <Image
    source={require("@/assets/images/b.png")}
    className="w-full h-20"
    resizeMode="contain"
  />
);
