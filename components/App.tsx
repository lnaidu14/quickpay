// Components
import { QrScannerView } from "@/components/Views/QrScannerView";
import { UserTransactionsView } from "@/components/Views/TransactionViews/UserTransactionsView";

import { DefaultHomeView } from "@/components/Views/DefaultHomeView";
import { ProfileView } from "@/components/Views/ProfileView";
import { PaymentView } from "@/components/Views/TransactionViews/PaymentView";
import { PostTransactionView } from "@/components/Views/TransactionViews/PostTransactionView";

import axios from "axios";

import "react-native-reanimated";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { CustomShapeButton } from "./CustomShapeButton";
import { useEffect, useState } from "react";

export function App() {
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const isUserRegistered = async (userId: any) => {
    console.log("isUserRegistered() running");
    console.log("userId: ", userId);
    const userProfile = await axios
      .post(`http://192.168.2.36:3000/api/authorize/${userId}`)
      .then((response) => {
        console.log("authorize response.data: ", response.data);
        return response.data;
      });
    console.log("userProfile: ", userProfile);
    if (userProfile.identities[0].access_token) {
      const fetchedUser = await axios
        .get(`http://192.168.2.36:3000/api/users/${userId}`)
        .then((response) => response.data);
      console.log("fetchedUser: ", fetchedUser);
      setIsRegisteredUser(true);
      if (!fetchedUser) {
        console.log("Creating user...");
        await axios
          .post(`http://192.168.2.36:3000/api/users`, {
            id: userProfile.user_id,
            username: userProfile.nickname,
          })
          .then(() => setIsRegisteredUser(true));
        return;
      }
    }
  };

  const { authorize, user, isLoading } = useAuth0();

  useEffect(() => {
    (async () => {
      if (user) {
        await isUserRegistered(user.sub);
      }
    })();
  }, [user]);

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  const loggedIn = user !== undefined && user !== null;

  const Tab = createBottomTabNavigator();

  const HomeStack = createNativeStackNavigator();
  const ProfileStack = createNativeStackNavigator();

  function HomeStackScreen() {
    return (
      <>
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
    <>
      {loggedIn ? (
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
      ) : (
        <>
          <View style={styles.container}>
            <CustomShapeButton
              styling={styles.submitBtn}
              shape="roundedSquare"
              label="Login"
              onPress={onLogin}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </CustomShapeButton>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    height: 50,
    width: 250,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#145DA0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
