import { StyleSheet, View } from "react-native";

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

export function ProfileView() {
  const [qrImageString, setQrImageString] = useState("");
  const fetchQrCode = async () =>
    await axios
      .get(
        "http://192.168.2.36:3000/api/user/c85b4c8e-07ab-4c02-849d-71d495d6f905"
      )
      .then((response) => setQrImageString(response.data));

  useEffect(() => {
    fetchQrCode();
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
  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile</ThemedText>
        </ThemedView>

        <ThemedView style={styles.childContainer}>
          <View style={styles.qrCodeContainer}>
            {qrImageString ? (
              <>
                <Animated.Image
                  entering={FadeIn.duration(200)}
                  style={{
                    width: 350,
                    height: 350,
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
  qrCodeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
});
