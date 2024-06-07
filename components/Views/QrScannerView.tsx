import { CameraView, Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PaymentView } from "@/components/Views/PaymentView";
import { ScannedData } from "@/types/Payments";

export function QrScannerView() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [uri, setUri] = useState({ uri: "" });
  const [scannedData, setScannedData] = useState<ScannedData>({
    id: "",
    username: "",
    ph: "",
  });

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { type: any; data: string }) => {
    setScannedData(JSON.parse(data));
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
        <PaymentView scanned scannedData={scannedData} />
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
                styling={{
                  backgroundColor: "red",
                  width: 75,
                  height: 75,
                  borderRadius: 150,
                }}
                onPress={() => router.navigate("/")}
              >
                <AntDesign name="close" size={50} color="black" />
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
