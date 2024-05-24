import { Dispatch, SetStateAction } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  setScanned: Dispatch<SetStateAction<boolean>>;
  ScannedView: any;
}

export function AfterScanView({ setScanned, ScannedView }: Props) {
  return (
    <>
      <View>
        <CustomShapeButton
          shape="roundedSquare"
          label="Exit"
          styling={styles.closeBtn}
          onPress={() => setScanned(false)}
        >
          <AntDesign name="close" size={24} color="black" />
        </CustomShapeButton>
      </View>
      <SafeAreaView style={styles.container}>
        <ScannedView />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  statusBarBottom: {
    backgroundColor: "grey",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  closeBtn: {
    backgroundColor: "white",
    margin: 10,
  },
});
