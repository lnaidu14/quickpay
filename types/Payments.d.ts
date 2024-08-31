export interface FormData {
    recipient: string;
    amount: string;
}

export interface Transaction {
    amt: number;
    tx_datetime: string
    tx_id?: string;
}