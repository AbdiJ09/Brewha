import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function Page() {
  const { user } = useAuth();
  if (user) {
    return <Redirect href={"/home"} />;
  }
  return <Redirect href="/on-boarding" />;
}
