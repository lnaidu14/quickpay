import { Dispatch, SetStateAction, memo, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
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

const NumberLabel = memo(() => (
  <Text style={styles.lblText} nativeID="numberLabel">
    Enter payee ID or phone number
  </Text>
));

const AmountLabel = memo(() => (
  <Text style={styles.lblText} nativeID="amountLabel">
    Enter amount to transfer
  </Text>
));

interface Props {
  setWasManualPaymentPressed: Dispatch<SetStateAction<boolean>>;
}

export function ManualPaymentView({ setWasManualPaymentPressed }: Props) {
  //   const [number, onChangeNumber] = useState("");
  //   const [amount, onChangeAmount] = useState("");
  const [isInputBlur, setIsInputBlur] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      number: "",
      amount: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  const handleBlur = () => {
    setIsInputFocus(false);
    setIsInputBlur(true);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsInputFocus(true);
    setIsInputBlur(false);
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
              {/* {isInputFocus ? <NumberLabel /> : <></>} */}
              {/* <TextInput
                style={styles.input}
                placeholder={
                  isInputFocus ? "" : "Enter payee ID or phone number"
                }
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                accessibilityLabelledBy="numberLabel"
              /> */}
              <FloatingInput
                lblText="Enter payee ID or phone number"
                config={{ keyboardType: "numeric" }}
              />
            </>
          )}
          name="number"
        />
        {errors.number && <Text>An ID or Phone number is required</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            max: 10000,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              {/* {isInputFocus ? <AmountLabel /> : <></>} */}
              {/* <TextInput
                style={styles.input}
                placeholder={isInputFocus ? "" : "Enter amount to transfer"}
                accessibilityLabel="Enter ID or phone number of payee"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                accessibilityLabelledBy="amountLabel"
              /> */}
              <FloatingInput
                lblText="Enter amount to transfer"
                config={{ keyboardType: "numeric" }}
              />
            </>
          )}
          name="number"
        />
        {errors.amount && <Text>An amount is required.</Text>}

        <CustomShapeButton
          styling={styles.submitBtn}
          shape="roundedSquare"
          label="Scan QR Code"
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.text}>Submit</Text>
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
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#145DA0",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  lblText: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
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
