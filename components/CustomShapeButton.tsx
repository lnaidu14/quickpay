import { StyleSheet, Pressable } from "react-native";

interface Props {
  onPress?: () => any;
  label?: string;
  styling?: any;
  children?: any;
  shape: string;
}

export function CustomShapeButton({
  onPress,
  label,
  styling,
  children,
  shape,
}: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      style={[styles[`${shape}`], styling]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  round: {
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
  square: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    elevation: 3,
    backgroundColor: "white",
    width: 50,
    height: 50,
  },
  roundedSquare: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    width: 50,
    height: 50,
  },
});
