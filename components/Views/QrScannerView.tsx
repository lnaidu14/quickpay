import { CameraView, Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export function QrScannerView({ navigation }) {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    data,
  }: {
    type: any;
    data: string;
  }) => {
    setScanned(true);
    const barCodeData = data;
    console.log("barCodeData: ", barCodeData);
    const res = await axios
      .get(`http://192.168.2.36:3000/api/auth/users/${barCodeData}`)
      .then((response) => {
        console.log("handleBarCodeScanned(), response.data: ", response.data);
        return { statusCode: response.status, data: response.data };
      })
      .catch((err) => err.response.data);
    if (res.statusCode === 200)
      navigation.navigate("PaymentScreen", {
        username: res.data.nickname,
        userId: res.data.user_id,
      });
    else if (res.statusCode === 400 || 404) {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        onBarcodeScanned={scanned ? () => {} : handleBarCodeScanned}
      />
      <View style={styles.buttonContainer}>
        {scanned && (
          <View
            style={{ flex: 1, alignSelf: "flex-end", alignItems: "center" }}
          >
            <CustomShapeButton
              shape="round"
              label="Exit"
              styling={{
                width: 75,
                height: 75,
                borderRadius: 150,
              }}
              onPress={() => setScanned(false)}
            >
              <MaterialIcons name="refresh" size={50} color="black" />
            </CustomShapeButton>
          </View>
        )}
        <View style={{ flex: 1, alignSelf: "flex-end", alignItems: "center" }}>
          <CustomShapeButton
            shape="round"
            label="Exit"
            styling={{
              backgroundColor: "red",
              width: 75,
              height: 75,
              borderRadius: 150,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="close" size={50} color="black" />
          </CustomShapeButton>
        </View>
      </View>
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
