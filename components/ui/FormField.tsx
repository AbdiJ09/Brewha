import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardTypeOptions, NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, TouchableOpacity, View } from "react-native";
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
  label?: string;
}
export const FormField: React.FC<InputFieldProps> = ({ icon, placeholder, secureTextEntry = false, handleChange, handleBlur, value, errors, keyboardType = "default", otherClass, label }) => {
  const [showSecureText, setShowSecureText] = useState(secureTextEntry);
  return (
    <View className={`${otherClass}`}>
      {label && (
        <Text
          className="text-sm font-[Manrope-SemiBold] mb-3"
          style={{ color: Colors.accent[500] }}
        >
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center p-3 border rounded-full `}
        style={{ borderColor: errors ? "#f87171" : Colors.secondary[400] }}
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
        <View className="flex-row items-center mt-2 space-x-2">
          <Feather
            name="alert-circle"
            size={20}
            color="#f87171"
          />
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
