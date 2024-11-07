import React, { Dispatch, SetStateAction, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface HoldableButtonProps {
  title: string;
  textStyles?: string;
  containerStyles?: string;
  incrementFactor: number;
  holder: number;
  setHolder: Dispatch<SetStateAction<number>>;
  style?: StyleProp<ViewStyle>;
}

function HoldableButton({
  title,
  textStyles = "",
  containerStyles = "",
  incrementFactor = 1,
  setHolder,
  holder,
  style,
}: HoldableButtonProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const incrementCount = () => {
    setHolder((prevCount) => prevCount + incrementFactor);
  };
  const handlePressin = () => {
    intervalRef.current = setInterval(() => {
      incrementCount();
    }, 50);
  };
  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white rounded-full min-h-[62px] justify-center items-center ${containerStyles}`}
      onPressIn={handlePressin}
      onPressOut={handlePressOut}
      style={style}
    >
      <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default HoldableButton;
