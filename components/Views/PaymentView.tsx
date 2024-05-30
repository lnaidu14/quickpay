import { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { FloatingInput } from "@/components/FloatingInput";
import { PostTransactionView } from "@/components/Views/TransactionViews/PostTransactionView";

type FormData = {
  recipient: string;
  amount: string;
};

export function PaymentView() {
  const [transaction, setTransaction] = useState({ amount: "", recipient: "" });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      recipient: "",
      amount: "",
    },
  });

  // useEffect(() => {
  //   // reset();
  // }, [isSubmitSuccessful]);

  const onSubmit = (data: FormData) => {
    if (!Object.keys(errors).length) {
      clearErrors();
      setTransaction({ amount: data.amount, recipient: data.recipient });
    }
  };

  return (
    <>
      {isSubmitSuccessful && transaction ? (
        <PostTransactionView
          amount={transaction.amount}
          recipient={transaction.recipient}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      ) : (
        <>
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
              name="recipient"
            />
            {errors.recipient && (
              <Text style={styles.errText}>
                An ID or Phone number is required
              </Text>
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
              label="Submit Transaction"
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </CustomShapeButton>
          </ScrollView>
        </>
      )}
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
