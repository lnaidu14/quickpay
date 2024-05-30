import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { BounceIn } from "react-native-reanimated";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

interface Props {
  amount: string;
  recipient: string;
  isSubmitSuccessful: true;
}

export const PostTransactionView = ({
  amount,
  recipient,
  isSubmitSuccessful,
}: Props) => {
  const transactionEvents = {
    home: "Home",
    success: {
      message: "Transaction Successful",
      details: `${amount} was transferred to ${recipient}`,
      next: "Make another transaction",
    },
    failure: {
      message: "Transaction Failed",
      next: "Try again",
    },
  };
  const condition = "f";
  return (
    <>
      <View style={styles.container}>
        <Text
          style={isSubmitSuccessful ? styles.successText : styles.failureText}
        >
          {condition === "s"
            ? transactionEvents.success.message
            : transactionEvents.failure.message}
        </Text>
        <View style={styles.iconContainer}>
          <Animated.View
            entering={BounceIn.duration(200)}
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome
              style={
                condition === "s"
                  ? styles.successCircle
                  : {
                      backgroundColor: "red",
                      borderRadius: 150,
                      width: 250,
                      height: 250,
                      position: "absolute",
                    }
              }
              name="circle-thin"
              size={250}
              color={condition === "s" ? "green" : "red"}
            />
          </Animated.View>
          <Animated.View
            entering={BounceIn.delay(200)}
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {condition === "s" ? (
              <AntDesign
                style={styles.successCheck}
                name="check"
                size={200}
                color="white"
              />
            ) : (
              <Entypo
                style={styles.successCheck}
                name="cross"
                size={200}
                color="white"
              />
            )}
          </Animated.View>
        </View>
        <Text style={{ color: "white", fontSize: 16 }}>
          ${amount} was transferred to {recipient}
        </Text>
        <CustomShapeButton
          styling={styles.continueBtn}
          shape="roundedSquare"
          label={condition === "s" ? "Make another transaction" : "Try again"}
          onPress={() => router.push("/payments")}
        >
          <Text style={styles.continueBtnText}>
            {condition === "s"
              ? transactionEvents.success.message
              : transactionEvents.failure.next}
          </Text>
        </CustomShapeButton>

        <CustomShapeButton
          styling={styles.continueBtn}
          shape="roundedSquare"
          label="Return to home page"
          onPress={() => router.navigate("/")}
        >
          <Text style={styles.continueBtnText}>Home</Text>
        </CustomShapeButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  continueBtn: {
    height: 50,
    width: 250,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#145DA0",
  },
  continueBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  successText: {
    fontSize: 30,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    paddingTop: 50,
  },
  failureText: {
    fontSize: 30,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    paddingTop: 50,
  },
  iconContainer: {
    position: "relative",
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: 400,
  },
  successCircle: {
    backgroundColor: "green",
    borderRadius: 150,
    width: 250,
    height: 250,
    position: "absolute",
  },
  successCheck: {
    position: "absolute",
  },
});
