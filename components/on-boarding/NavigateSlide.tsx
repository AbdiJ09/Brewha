import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Colors } from "@/constants/Colors";
interface NavigateSlideProps {
  currentSlide: number;
  handleNext: () => void;
  handlePrev: () => void;
  slides: {
    title: string;
    description: string;
    image: any;
  }[];
}

const NavigateSlide: React.FC<NavigateSlideProps> = ({
  currentSlide,
  handleNext,
  handlePrev,
  slides,
}) => {
  return (
    <View
      style={{ backgroundColor: Colors.secondary[500] }}
      className="absolute flex-row justify-between px-2 py-2 overflow-hidden rounded-full shadow-lg bottom-10 left-5 right-5"
    >
      <Pressable
        onPress={handlePrev}
        className="items-center justify-center rounded-full w-14 h-14"
        style={{ backgroundColor: Colors.primary[500] }}
      >
        <AntDesign name="caretleft" size={20} color={"white"} />
      </Pressable>

      <View className="flex-row items-center">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`mx-1 rounded-full ${
              index === currentSlide ? "w-8 h-2" : "w-2 h-2"
            }`}
            style={{
              backgroundColor:
                index === currentSlide ? Colors.primary[500] : Colors.text,
            }}
          />
        ))}
      </View>

      {/* Tombol "Next" */}
      <Pressable
        onPress={handleNext}
        className="items-center justify-center rounded-full w-14 h-14"
        style={{ backgroundColor: Colors.primary[500] }}
      >
        <AntDesign name="caretright" size={20} color={"white"} />
      </Pressable>
    </View>
  );
};

export default NavigateSlide;
