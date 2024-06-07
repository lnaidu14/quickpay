import { useState } from "react";
import { PostTransactionView } from "@/components/Views/TransactionViews/PostTransactionView";
import { AfterScanView } from "./TransactionViews/AfterScanView";
import { ManualPaymentView } from "./TransactionViews/ManualPaymentView";
import { FormData, ScannedData } from "@/types/Payments";

interface Props {
  scanned: boolean;
  scannedData: ScannedData;
}

export function PaymentView({ scanned, scannedData }: Props) {
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
      ) : scanned ? (
        <AfterScanView
          payeeDetails={scannedData}
          setTransaction={setTransaction}
        />
      ) : (
        <>
          <ManualPaymentView setTransaction={setTransaction} />
        </>
      )}
    </>
  );
}
