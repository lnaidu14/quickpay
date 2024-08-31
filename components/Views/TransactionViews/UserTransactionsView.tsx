import { StyleSheet, Text, ScrollView } from "react-native";
import { Transaction } from "@/types/Payments";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

export function UserTransactionsView() {
  const [userTransactions, setUserTransactions] = useState<Transaction[]>();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });
  rotation.value = withSequence(
    withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.inOut(Easing.linear) }),
      50
    )
  );

  const fetchUserTransactions = async () => {
    try {
      await axios
        // .get(`http://192.168.2.36:3000/api/users/${user?.sub}/transactions`)
        .get(
          `http://192.168.2.36:3000/api/users/google-oauth2|103164798987606999611/transactions`
        )
        .then((response) => {
          console.log("response: ", response.data);
          setUserTransactions(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => {
      setPage(0);
      await fetchUserTransactions();
    })();
  }, []);
  return (
    <>
      <ScrollView contentContainerStyle={styles.parentContainer}>
        <Text>Transactions</Text>

        {userTransactions ? (
          <DataTable style={{ backgroundColor: "black", flex: 1 }}>
            <DataTable.Header>
              <DataTable.Title>From/To</DataTable.Title>
              <DataTable.Title>Date of Transaction</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {userTransactions
              ?.slice(
                page * itemsPerPage,
                Math.min((page + 1) * itemsPerPage, userTransactions?.length)
              )
              .map((utx) => (
                <DataTable.Row key={utx.tx_id}>
                  <DataTable.Cell>N/A</DataTable.Cell>
                  <DataTable.Cell>
                    {utx.tx_datetime.split("T")[0]}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{utx.amt}</DataTable.Cell>
                </DataTable.Row>
              ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(userTransactions?.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${page * itemsPerPage + 1}-${Math.min(
                (page + 1) * itemsPerPage,
                userTransactions?.length
              )} of ${userTransactions?.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        ) : (
          <>
            <Animated.View style={animatedStyle}>
              <AntDesign name="loading1" size={150} color="white" />
            </Animated.View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
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
});
