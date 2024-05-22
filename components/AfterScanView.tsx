import { Dispatch, SetStateAction } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { RoundButton } from "@/components/RoundButton";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  children: any;
}

export function AfterScanView({ children }: Props) {
  return <>{children}</>;
}
