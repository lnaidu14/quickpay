import { useState } from "react";
import { PostTransactionView } from "@/components/Views/TransactionViews/PostTransactionView";
import { AfterScanView } from "@/components/Views/TransactionViews/AfterScanView";
import { FormData, ScannedData } from "@/types/Payments";

interface Props {
  scannedData: ScannedData;
}

export function PaymentView({ scannedData }: Props) {
  const [transaction, setTransaction] = useState<FormData>({
    recipient: "",
    amount: "",
  });
  return (
    <>
      {transaction.amount && transaction.recipient ? (
        <PostTransactionView
          amount={transaction.amount}
          recipient={transaction.recipient}
        />
      ) : (
        <AfterScanView
          payeeDetails={scannedData}
          setTransaction={setTransaction}
        />
      )}
    </>
  );
}
