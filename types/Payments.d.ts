export interface FormData {
    recipient: string;
    amount: number;
}

export interface Transaction {
    amt: number;
    tx_datetime: string
    tx_id?: string;
    sender_id: string
}