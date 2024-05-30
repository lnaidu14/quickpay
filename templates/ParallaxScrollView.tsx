import { Platform, StatusBar, StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/templates/ThemedView";

interface Props {
  children: any;
}

export default function ParallaxScrollView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <>
      <ThemedView style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={styles.content}
          ref={scrollRef}
          scrollEventThrottle={16}
        >
          {children}
        </Animated.ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "purple",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
