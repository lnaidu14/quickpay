import { StyleSheet, Pressable } from "react-native";

interface Props {
  onPress?: () => any;
  label?: string;
  styling?: any;
  children?: any;
}

export function RoundButton({ onPress, label, styling, children }: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      style={[styles.roundButton, styling]}
      onPress={onPress}
    >
      {children}
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
