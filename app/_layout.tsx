import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Auth0Provider } from "react-native-auth0";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";

import { App } from "@/components/App";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Auth0Provider
          domain={"dev-quickpay.us.auth0.com"}
          clientId={"Z14PvMVMV9tgjEOzMSLJo6cC1eVG7Nfw"}
        >
          <App />
        </Auth0Provider>
      </PaperProvider>
    </ThemeProvider>
  );
}
