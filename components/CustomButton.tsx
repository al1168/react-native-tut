import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
  style: StyleProp<ViewStyle>;
}

function CustomButton({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white rounded-full min-h-[62px] justify-center items-center ${containerStyles}`}
      onPress={onPress}
      style={style}
    >
      <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
