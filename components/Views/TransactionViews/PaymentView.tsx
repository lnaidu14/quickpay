import { StyleSheet, Text, ScrollView, ToastAndroid } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CustomShapeButton } from "@/components/CustomShapeButton";
import { FloatingInput } from "@/components/FloatingInput";
import { FormData } from "@/types/Payments";
import axios from "axios";
import { useAuth0 } from "react-native-auth0";

export function PaymentView({ route, navigation }) {
  const { user } = useAuth0();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      recipient: route.params.username,
      amount: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!Object.keys(errors).length && route.params.userId && user) {
      console.log("recipient details: ", route.params.userId);
      console.log("sender details: ", user?.sub);
      const res = await axios
        .post(`http://192.168.2.36:3000/api/users/transactions`, {
          amt: Number(data.amount),
          recipientId: route.params.userId,
          senderId: user.sub,
        })
        .then((response) => {
          console.log("response: ", response);
          console.log("response status: ", response.status);
          return { statusCode: response.status, data: response.data };
        })
        .catch((err) => {
          return { statusCode: err.response.status, data: err.response.data };
        });
      console.log("Res; ", res);
      if (res.statusCode === 201) {
        clearErrors();
        reset();
        navigation.navigate("TransactionSummary", {
          amount: data.amount,
          recipient: data.recipient ? data.recipient : route.params.username,
        });
      } else if (res.statusCode === 400 || 404) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.parentContainer}>
        {route.params.username ? (
          <>
            <Text>Sending money to:</Text>
            <Text>Username: {route.params.username}</Text>
          </>
        ) : (
          <>
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
                    lblText="Enter username"
                    value={value}
                    onChange={onChange}
                  />
                </>
              )}
              name="recipient"
            />
            {errors.recipient && (
              <Text style={styles.errText}>A username is required</Text>
            )}
          </>
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
