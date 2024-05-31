import { useState } from "react";
import { PostTransactionView } from "@/components/Views/TransactionViews/PostTransactionView";
import { AfterScanView } from "./TransactionViews/AfterScanView";
import { ManualPaymentView } from "./TransactionViews/ManualPaymentView";

type FormData = {
  recipient: string;
  amount: string;
};

interface Props {
  scanned: boolean;
}

export function PaymentView({ scanned }: Props) {
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
          payeeDetails={{ id: "1234", name: "Lalit" }}
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
