import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/templates/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/templates/ThemedView";

export function ProfileView() {
  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Profile</ThemedText>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">QR Code Fill</ThemedText>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="default">ID: 1</ThemedText>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="default">Name: Lalit</ThemedText>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="default">Ph: 123456789</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  contentContainer: {
    flexDirection: "row",
    gap: 8,
  },
  contentText: {
    fontSize: 10,
  },
});
