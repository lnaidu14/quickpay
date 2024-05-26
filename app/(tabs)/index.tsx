import { Image, StyleSheet, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/templates/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/templates/ThemedView";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import QrScanner from "@/components/QrScanner";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const [wasQrBtnPressed, setWasQrBtnPressed] = useState(false);
  const [wasExitCameraPressed, setWasExitCameraPressed] = useState(false);
  useEffect(() => {
    if (wasExitCameraPressed) {
      setWasExitCameraPressed(false);
      setWasQrBtnPressed(false);
    }
  }, [wasExitCameraPressed]);
  return (
    <>
      {wasQrBtnPressed && !wasExitCameraPressed ? (
        <QrScanner setWasExitCameraPressed={setWasExitCameraPressed} />
      ) : (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.reactLogo}
            />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Quickpay</ThemedText>
            <HelloWave />
          </ThemedView>

          <ThemedView style={styles.parentContainer}>
            <ThemedView style={styles.childContainer}>
              <CustomShapeButton
                shape="round"
                label="Scan QR Code"
                onPress={() => setWasQrBtnPressed(true)}
              >
                <AntDesign name="qrcode" size={24} color="black" />
              </CustomShapeButton>
            </ThemedView>

            <ThemedView style={styles.childContainer}>
              <CustomShapeButton
                shape="round"
                label="Send directly to an ID"
                onPress={() => Alert.alert("Send directly button pressed")}
              >
                <AntDesign name="plus" size={24} color="black" />
              </CustomShapeButton>
            </ThemedView>
          </ThemedView>
        </ParallaxScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  parentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  childContainer: {
    gap: 8,
    margin: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
