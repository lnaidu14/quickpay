import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { AntDesign } from "@expo/vector-icons";
import FloatingInput from "../FloatingInput";

type FormData = {
  number: string;
  amount: string;
};

interface Props {
  setWasManualPaymentPressed: Dispatch<SetStateAction<boolean>>;
}

export function ManualPaymentView({ setWasManualPaymentPressed }: Props) {
  //   const [number, onChangeNumber] = useState("");
  //   const [amount, onChangeAmount] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      number: "",
      amount: "",
    },
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = (data) => {
    console.log("submitted");
    console.log(data);
    if (!errors) {
      clearErrors();
      console.log(data);
    }
  };

  return (
    <>
      <View style={styles.statusBarBottom}>
        <CustomShapeButton
          shape="roundedSquare"
          label="Exit"
          styling={styles.closeBtn}
          onPress={() => setWasManualPaymentPressed(false)}
        >
          <AntDesign name="close" size={24} color="black" />
        </CustomShapeButton>
      </View>
      <ScrollView contentContainerStyle={styles.parentContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 36,
            minLength: 1,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <FloatingInput
                lblText="Enter payee ID or phone number"
                config={{ keyboardType: "numeric" }}
                value={value}
                onChange={onChange}
              />
            </>
          )}
          name="number"
        />
        {errors.number && (
          <Text style={styles.errText}>An ID or Phone number is required</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
            max: 10000,
            minLength: 1,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <FloatingInput
                lblText="Enter amount to transfer"
                config={{ keyboardType: "numeric" }}
                value={value}
                onChange={onChange}
              />
            </>
          )}
          name="amount"
        />
        {errors && errors.amount && (
          <Text style={styles.errText}>An amount is required.</Text>
        )}

        <CustomShapeButton
          styling={styles.submitBtn}
          shape="roundedSquare"
          label="Scan QR Code"
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </CustomShapeButton>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 250,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  submitBtn: {
    height: 50,
    width: 250,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#145DA0",
  },
  submitBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  errText: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
  },
  closeBtn: {
    backgroundColor: "white",
    margin: 10,
  },
  statusBarBottom: {
    backgroundColor: "grey",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
