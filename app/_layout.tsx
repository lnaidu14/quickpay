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
import { Button, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useColorScheme } from "@/hooks/useColorScheme";

// Components
import { QrScannerView } from "@/components/Views/QrScannerView";
import { UserTransactionsView } from "@/components/Views/TransactionViews/UserTransactionsView";

import { DefaultHomeView } from "@/components/Views/DefaultHomeView";
import { ProfileView } from "@/components/Views/ProfileView";
import { PaymentView } from "@/components/Views/TransactionViews/PaymentView";
import { PostTransactionView } from "@/components/Views/TransactionViews/PostTransactionView";
import { ThemedText } from "@/components/ThemedText";

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

  const isUserAuthorized = () => {
    const { authorize, user } = useAuth0();

    const onLogin = async () => {
      try {
        await authorize();
      } catch (e) {
        console.log(e);
      }
    };

    const loggedIn = user !== undefined && user !== null;

    if (!loggedIn) {
      onLogin();
    }
    return { loggedIn, user };
  };

  const Tab = createBottomTabNavigator();

  const HomeStack = createNativeStackNavigator();
  const ProfileStack = createNativeStackNavigator();

  function HomeStackScreen() {
    const authorizedUser = isUserAuthorized();
    return (
      <>
        {authorizedUser.loggedIn && authorizedUser.user ? (
          <>
            <HomeStack.Navigator>
              <HomeStack.Screen
                name="Home"
                component={DefaultHomeView}
                options={{ headerShown: false }}
              />
              <HomeStack.Screen
                name="ScanQrCode"
                component={QrScannerView}
                options={{ headerShown: false }}
              />
              <HomeStack.Screen
                name="PaymentScreen"
                component={PaymentView}
                options={{ headerShown: false }}
              />
              <HomeStack.Screen
                name="TransactionSummary"
                component={PostTransactionView}
                options={{ headerShown: false }}
              />
            </HomeStack.Navigator>
          </>
        ) : (
          <>
            <View style={styles.contentContainer}>
              <ThemedText>Loading</ThemedText>
            </View>
          </>
        )}
      </>
    );
  }

  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          component={ProfileView}
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen
          name="UserTransactions"
          component={UserTransactionsView}
          options={{ headerShown: false }}
        />
      </ProfileStack.Navigator>
    );
  }

  function MyTabBar({ navigation }) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          icon="home"
          onPress={() => {
            navigation.navigate("HomeTab");
          }}
        >
          Home
        </Button>

        <Button
          icon="account"
          onPress={() => {
            navigation.navigate("ProfileTab");
          }}
        >
          Profile
        </Button>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Auth0Provider
          domain={"dev-quickpay.us.auth0.com"}
          clientId={"Z14PvMVMV9tgjEOzMSLJo6cC1eVG7Nfw"}
        >
          <NavigationContainer independent>
            <>
              <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
                <Tab.Screen
                  name="HomeTab"
                  component={HomeStackScreen}
                  options={{ headerShown: false }}
                />
                <Tab.Screen
                  name="ProfileTab"
                  component={ProfileStackScreen}
                  options={{ headerShown: false }}
                />
              </Tab.Navigator>
            </>
          </NavigationContainer>
        </Auth0Provider>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "purple",
  },
  contentContainer: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  childContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    margin: 10,
  },
  qrContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  manualPaymentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
});
