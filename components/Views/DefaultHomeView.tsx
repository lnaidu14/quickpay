import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/templates/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/templates/ThemedView";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";

export function DefaultHomeView() {
  const { authorize, user, isLoading } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const loggedIn = user !== undefined && user !== null;

  if (isLoading) {
    return (
      <View style={styles.contentContainer}>
        <ThemedText>Loading</ThemedText>
      </View>
    );
  }

  if (!loggedIn) {
    onLogin();
  }

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Quickpay</ThemedText>
        </ThemedView>

        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.childContainer}>
            <View style={styles.qrContainer}>
              <CustomShapeButton
                shape="round"
                label="Scan QR Code"
                onPress={() => router.navigate("/scan")}
                styling={{ width: 200, height: 200, borderRadius: 150 }}
              >
                <AntDesign name="qrcode" size={100} color="black" />
              </CustomShapeButton>
            </View>
          </ThemedView>

          <ThemedView style={styles.childContainer}>
            <View style={styles.manualPaymentContainer}>
              <CustomShapeButton
                shape="round"
                label="Send manually"
                onPress={() => router.navigate("/payments")}
                styling={{ width: 200, height: 200, borderRadius: 150 }}
              >
                <AntDesign name="plus" size={100} color="black" />
              </CustomShapeButton>
            </View>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "purple",
  },
  contentContainer: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  childContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    margin: 10,
  },
  qrContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
  manualPaymentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
});
