import { StyleSheet, View, Button, Text } from "react-native";

import ParallaxScrollView from "@/templates/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/templates/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { useAuth0 } from "react-native-auth0";
import * as LocalAuthentication from "expo-local-authentication";
import { CustomShapeButton } from "../CustomShapeButton";

export function ProfileView({ navigation }) {
  const { clearSession, user, error } = useAuth0();
  const [qrImageString, setQrImageString] = useState("");
  const [balance, setBalance] = useState("0");
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  const handleAuthentication = async () => {
    LocalAuthentication.hasHardwareAsync();
    LocalAuthentication.isEnrolledAsync().then((data) => {
      setBiometricsEnabled(data);
    });
    // TOOD: Need to revisit biometric authentication flow
    let auth;
    if (biometricsEnabled) {
      auth = LocalAuthentication.authenticateAsync().then(async (data) => {
        return data.success;
      });
    }
    return auth;
  };

  const fetchBalance = async () => {
    try {
      const auth = await handleAuthentication();
      if (auth) {
        await axios
          .get(`http://192.168.2.36:3000/api/users/${user?.sub}/balance`)
          .then((response) => {
            setBalance(response.data);
          });
      } else {
        setBalance("N/A");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const generateQrCode = async () =>
    await axios
      .post(`http://192.168.2.36:3000/api/users/qr/${user?.sub}`, {
        id: user?.sub,
        username: user?.nickname,
        ph: user?.phoneNumber ?? "N/A",
      })
      .then((response) => {
        setQrImageString(response.data);
      });

  useEffect(() => {
    if (user) generateQrCode();
  }, []);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });
  rotation.value = withSequence(
    withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.inOut(Easing.linear) }),
      50
    )
  );

  const loggedIn = user !== undefined && user !== null;

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.childContainer}>
          <View style={styles.metadataContainer}>
            {loggedIn && (
              <>
                <ThemedText>
                  Hello {user.name}! {"\n"}
                  Email: {user.email} {"\n"}
                  Balance: {balance} {"\n"}
                  Ph: {user.phoneNumber ?? "N/A"}
                </ThemedText>
              </>
            )}
          </View>
        </ThemedView>

        <ThemedView style={styles.childContainer}>
          <View style={styles.qrCodeContainer}>
            {qrImageString ? (
              <>
                <Animated.Image
                  entering={FadeIn.duration(200)}
                  style={{
                    width: 300,
                    height: 300,
                    borderWidth: 1,
                  }}
                  source={{ uri: qrImageString }}
                />
              </>
            ) : (
              <>
                <Animated.View style={animatedStyle}>
                  <AntDesign name="loading1" size={150} color="white" />
                </Animated.View>
              </>
            )}
          </View>
        </ThemedView>

        <ThemedView style={styles.childContainer}>
          {/* Button to view user balances */}
          <View style={styles.logoutContainer}>
            {error && <ThemedText>{error.message}</ThemedText>}
            <Button onPress={fetchBalance} title="View Balance" />
          </View>

          {/* Button to view user's last 10 transactions */}
          <CustomShapeButton
            styling={styles.submitBtn}
            shape="roundedSquare"
            label="Transactions"
            onPress={async () => {
              const auth = await handleAuthentication();
              if (auth) {
                navigation.navigate("UserTransactions", { userId: user?.sub });
              }
            }}
          >
            <Text style={{ color: "white" }}>View TX</Text>
          </CustomShapeButton>

          {/* Button to logout */}
          <View style={styles.logoutContainer}>
            {error && <ThemedText>{error.message}</ThemedText>}
            <Button onPress={onLogout} title="Logout" />
          </View>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "purple",
  },
  childContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    margin: 10,
  },
  metadataContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  qrCodeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  logoutContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  submitBtn: {
    height: 50,
    width: 250,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#145DA0",
  },
});
