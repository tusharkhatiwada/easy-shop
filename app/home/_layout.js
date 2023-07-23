import { Stack, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function HomeLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: "Authentic Cocktails",
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#97B8A4",
        },
        headerTintColor: "#FFFFFF",
      }}
    />
  );
}
