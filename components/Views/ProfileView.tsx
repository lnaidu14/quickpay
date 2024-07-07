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

export function ProfileView() {
  const { clearSession, user, error } = useAuth0();
  const [qrImageString, setQrImageString] = useState("");

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };
  const fetchQrCode = async () =>
    await axios
      .post(`http://192.168.2.36:3000/api/user/${user?.sub}`, {
        id: user?.sub,
        username: user?.nickname,
        ph: user?.phoneNumber ?? "N/A",
      })
      .then((response) => {
        setQrImageString(response.data);
      });

  useEffect(() => {
    if (user) fetchQrCode();
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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile</ThemedText>
        </ThemedView>

        <ThemedView style={styles.childContainer}>
          <View style={styles.metadataContainer}>
            {loggedIn && (
              <>
                <ThemedText>
                  Hello {user.name}! {"\n"}
                  Email: {user.email}
                  {"\n"}
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
});
