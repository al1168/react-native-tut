import {
  View,
  Text,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { AntDesign } from "@expo/vector-icons";
import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import HoldableButton from "@/components/HoldableButton";

const Meditate = () => {
  const SECONDS_IN_A_MINUTE = 60;
  const { id } = useLocalSearchParams();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { width } = useWindowDimensions();
  const buttonWidth = width / 3;
  const [isMeditating, setMeditating] = useState<boolean>(false);
  const startTime = () => {
    setMeditating(!isMeditating);
  };
  const transformSecondsToTime = (seconds: number) => {
    const minutes = Math.floor(seconds / SECONDS_IN_A_MINUTE);
    const remainingSeconds = seconds % SECONDS_IN_A_MINUTE;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining === 0) {
      setMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining, isMeditating]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        className="flex-1"
        resizeMode="cover"
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
          <Pressable className="" onPress={() => router.back()}>
            <AntDesign name="leftcircle" size={25} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="bg-neutral-100 mx-auto rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-blue-400 font-bold text-4xl">
                {transformSecondsToTime(timeRemaining)}
              </Text>
            </View>
          </View>
          <View className="mb-8 space-y-4">
            <CustomButton
              containerStyles="mx-auto"
              title={isMeditating ? "Stop" : "Start"}
              onPress={startTime}
              style={{ width: buttonWidth }}
            />
            <HoldableButton
              containerStyles="mx-auto"
              title="AddTime"
              incrementFactor={5}
              setHolder={setTimeRemaining}
              holder={timeRemaining}
              style={{ width: buttonWidth }}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
