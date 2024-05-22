import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Pressable } from "react-native";

interface Props {
  icon: any;
  onPress: () => void;
  label: string;
}

export function RoundButton({ icon, onPress, label }: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      style={styles.roundButton}
      onPress={onPress}
    >
      <AntDesign name={icon} size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
