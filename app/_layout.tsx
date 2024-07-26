import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ApolloWrapper } from "./lib/apollo-wrapper";
import GlobalProvider from "@/context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Recursive-Black": require("../assets/fonts/Recursive-Black.ttf"),
    "Recursive-Bold": require("../assets/fonts/Recursive-Bold.ttf"),
    "Recursive-ExtraBold": require("../assets/fonts/Recursive-ExtraBold.ttf"),
    "Recursive-Light": require("../assets/fonts/Recursive-Light.ttf"),
    "Recursive-Medium": require("../assets/fonts/Recursive-Medium.ttf"),
    "Recursive-Regular": require("../assets/fonts/Recursive-Regular.ttf"),
    "Recursive-SemiBold": require("../assets/fonts/Recursive-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) {
      throw new Error("Failed to load fonts");
    }

    if (fontsLoaded) {
      // Do something after fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ApolloWrapper>
      <GlobalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </GlobalProvider>
    </ApolloWrapper>
  );
}
