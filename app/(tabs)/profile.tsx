import { StyleSheet } from "react-native";

import { ProfileView } from "@/components/Views/ProfileView";

export default function ProfileScreen() {
  return <ProfileView />;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
