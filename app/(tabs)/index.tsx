import { Image, StyleSheet, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/templates/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/templates/ThemedView";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { QrScannerView } from "@/components/Views/QrScannerView";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { DefaultHomeView } from "@/components/Views/DefaultHomeView";
import { ManualPaymentView } from "@/components/Views/ManualPaymentView";

export default function HomeScreen() {
  const [wasQrBtnPressed, setWasQrBtnPressed] = useState(false);
  const [wasManualPaymentPressed, setWasManualPaymentPressed] = useState(false);
  const [wasExitCameraPressed, setWasExitCameraPressed] = useState(false);
  useEffect(() => {
    if (wasExitCameraPressed) {
      setWasExitCameraPressed(false);
      setWasQrBtnPressed(false);
    }
  }, [wasExitCameraPressed]);

  if (wasQrBtnPressed && !wasExitCameraPressed) {
    return <QrScannerView setWasExitCameraPressed={setWasExitCameraPressed} />;
  } else if (wasManualPaymentPressed) {
    return (
      <ManualPaymentView
        setWasManualPaymentPressed={setWasManualPaymentPressed}
      />
    );
  } else {
    return (
      <DefaultHomeView
        setWasQrBtnPressed={setWasQrBtnPressed}
        setWasManualPaymentPressed={setWasManualPaymentPressed}
      />
    );
  }
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
