import { View, Text } from "react-native";
import React from "react";
import { useCameraPermission } from "react-native-vision-camera";

const cool = () => {
  const { hasPermission } = useCameraPermission()
  if (!hasPermission) return null
  return (
    <View>
      <Text>cooltab no lie</Text>
    </View>
  );
};

export default cool;
