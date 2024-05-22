import { CameraView, useCameraPermissions } from "expo-camera";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RoundButton } from "@/components/RoundButton";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  setWasExitCameraPressed: Dispatch<SetStateAction<boolean>>;
}

export default function QrScanner({ setWasExitCameraPressed }: Props) {
  console.log("Entering QrScanner");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        // onBarcodeScanned={Alert.alert("Bar code scanned")}
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* <View style={styles.buttonContainer}>
          <RoundButton
            styling={{ flex: 1, alignSelf: "flex-end", alignItems: "center" }}
            icon="qrcode"
            label="Scan QR Code"
            onPress={toggleCameraFacing}
          />
        </View> */}
        <View style={styles.buttonContainer}>
          <View
            style={{ flex: 1, alignSelf: "flex-end", alignItems: "center" }}
          >
            <RoundButton
              label="Exit"
              styling={{ backgroundColor: "red" }}
              onPress={() => {
                setWasExitCameraPressed(true);
                // setWasQrBtnPressed(false);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </RoundButton>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  childContainer: {
    gap: 8,
    margin: 10,
  },
});

const renderScanner = () => {};

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   parentContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   childContainer: {
//     gap: 8,
//     margin: 10,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
