import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { FloatingInput } from "@/components/FloatingInput";
import { FormData, ScannedData } from "@/types/Payments";

interface Props {
  payeeDetails: ScannedData;
  setTransaction: Dispatch<SetStateAction<FormData>>;
}

export function AfterScanView({ payeeDetails, setTransaction }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      recipient: "",
      amount: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (!Object.keys(errors).length) {
      clearErrors();
      setTransaction({ amount: data.amount, recipient: payeeDetails.username });
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.parentContainer}>
        <Text>Sending money to:</Text>
        <Text>ID: {payeeDetails.id}</Text>
        <Text>Name: {payeeDetails.username}</Text>
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
          label="Submit Transaction"
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
});
