import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";

interface Props {
  config?: any;
  lblText?: string;
}

export const FloatingInput = ({ config, lblText }: Props) => {
  const [text, setText] = useState("");
  const floatingLabelAnimation = useRef(
    new Animated.Value(text ? 1 : 0)
  ).current;

  const handleFocus = () => {
    // Animate the label up and reduce its size when input is focus
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    // If the input is empty, animate the floating label back to its original position
    if (!text) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  // Define animated styles for the floating label
  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [17, -13], // top value
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12], // font size
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.lblText, floatingLabelStyle]}>
        {lblText}
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(val) => setText(val)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...config}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 10,
    position: "relative",
  },
  lblText: {
    paddingLeft: 15,
    position: "absolute",
    fontSize: 8,
    lineHeight: 15,
    letterSpacing: 0.25,
    color: "black",
  },
  input: {
    height: 40,
    width: 250,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default FloatingInput;
