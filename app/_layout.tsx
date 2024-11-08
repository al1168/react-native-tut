import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    DancingScript: require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync;
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null
  if (!fontsLoaded && !error) return null

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
