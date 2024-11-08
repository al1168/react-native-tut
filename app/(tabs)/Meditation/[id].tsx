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
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/meditation-data";

const Meditate = () => {
  const SECONDS_IN_A_MINUTE = 60;
  const { id } = useLocalSearchParams();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { width } = useWindowDimensions();
  const buttonWidth = width / 3;
  const [isMeditating, setMeditating] = useState<boolean>(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState<boolean>(false);
  // const { duration: secondsRemaining, setDuration } =
  //       useContext(TimerContext);
  const toggleMeditating = async () => {
    setMeditating(!isMeditating);
    await toggleSound();
  };
  const transformSecondsToTime = (seconds: number) => {
    const minutes = Math.floor(seconds / SECONDS_IN_A_MINUTE);
    const remainingSeconds = seconds % SECONDS_IN_A_MINUTE;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  };
  const initalizedSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };
  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initalizedSound();
    const status = await sound?.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setPlayingAudio(false);
    }
  };
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timeRemaining === 0 && isMeditating) {
      setMeditating(false);
      toggleSound();
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

  // handles
  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

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
              <Text className="text-blue-400 font-bold text-4xl font-tmono">
                {transformSecondsToTime(timeRemaining)}
              </Text>
            </View>
          </View>
          <View className="mb-8 space-y-4">
            <CustomButton
              containerStyles="mx-auto"
              title={isMeditating ? "Stop" : "Start"}
              onPress={toggleMeditating}
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
