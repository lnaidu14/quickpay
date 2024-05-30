import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/templates/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/templates/ThemedView";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export function DefaultHomeView() {
  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Quickpay</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.parentContainer}>
          <ThemedView style={styles.childContainer}>
            <CustomShapeButton
              shape="round"
              label="Scan QR Code"
              onPress={() => router.navigate("/scan")}
            >
              <AntDesign name="qrcode" size={24} color="black" />
            </CustomShapeButton>
          </ThemedView>

          <ThemedView style={styles.childContainer}>
            <CustomShapeButton
              shape="round"
              label="Send manually"
              onPress={() => router.navigate("/payments")}
            >
              <AntDesign name="plus" size={24} color="black" />
            </CustomShapeButton>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
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
