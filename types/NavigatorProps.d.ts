export type HomeStackParamList = {
  Home: undefined;
  ScanQrCode: undefined;
  AfterScan
  PaymentScreen: { username?: string };
  TransactionSummary: { amount: string; recipient: string };
};

type ProfileStackParamList = {};
