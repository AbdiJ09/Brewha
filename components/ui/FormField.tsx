import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from "react-native";
interface InputFieldProps {
  icon: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  handleChange?: (e: string) => void;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
  errors?: string | boolean;
  otherClass?: string;
  secureTextEntry?: boolean;
}
export const FormField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  secureTextEntry = false,
  handleChange,
  handleBlur,
  value,
  errors,
  keyboardType = "default",
  otherClass,
}) => {
  const [showSecureText, setShowSecureText] = useState(secureTextEntry);
  return (
    <View>
      <View
        className={`flex-row items-center p-3 border rounded-2xl ${otherClass}`}
        style={{ borderColor: errors ? "#f87171" : Colors.secondary[500] }}
      >
        <Feather
          name={icon as any}
          size={20}
          color={Colors.accent[500]}
          style={{ marginRight: 10 }}
        />
        <TextInput
          value={value}
          onChangeText={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          secureTextEntry={showSecureText}
          placeholderTextColor={Colors.placeholder}
          className="flex-1 font-[Manrope-Regular]"
          style={{ color: Colors.text }}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowSecureText(!showSecureText)}>
            <Feather
              name={showSecureText ? "eye" : "eye-off"}
              size={20}
              color={Colors.accent[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors && (
        <View className="flex-row items-center gap-3">
          <Feather name="alert-circle" size={20} color="#f87171" />
          <Text
            className=" font-[Manrope-Regular]"
            style={{ color: "#f87171" }}
          >
            {errors}
          </Text>
        </View>
      )}
    </View>
  );
};
