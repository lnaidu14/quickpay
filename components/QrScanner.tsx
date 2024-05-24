import { CameraView, Camera } from "expo-camera";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AfterScanView } from "@/components/AfterScanView";

interface Props {
  setWasExitCameraPressed: Dispatch<SetStateAction<boolean>>;
  children?: any;
}

const TempComponent = () => (
  <>
    <Text>Hello world!</Text>
  </>
);

export default function QrScanner({
  setWasExitCameraPressed,
  children,
}: Props) {
  console.log("Entering QrScanner");
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [uri, setUri] = useState({ uri: "" });

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: any;
    data: string;
  }) => {
    setScanned(true);
    setUri({ uri: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned && uri ? (
        <>
          <AfterScanView setScanned={setScanned} ScannedView={TempComponent}>
            {children}
          </AfterScanView>
        </>
      ) : (
        <>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <View style={styles.buttonContainer}>
            {scanned && (
              <View
                style={{ flex: 1, alignSelf: "flex-end", alignItems: "center" }}
              >
                <CustomShapeButton
                  shape="round"
                  label="Exit"
                  onPress={() => setScanned(false)}
                >
                  <MaterialIcons name="refresh" size={24} color="black" />
                </CustomShapeButton>
              </View>
            )}
            <View
              style={{ flex: 1, alignSelf: "flex-end", alignItems: "center" }}
            >
              <CustomShapeButton
                shape="round"
                label="Exit"
                styling={{ backgroundColor: "red" }}
                onPress={() => {
                  setWasExitCameraPressed(true);
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </CustomShapeButton>
            </View>
          </View>
        </>
      )}
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
