import { Stack, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: "Shop Location",
        headerBackTitle: "Back",
        headerBackVisible: true,
        headerLeft: () => (
          <Entypo
            name='chevron-left'
            color='white'
            size={30}
            onPress={() => router.back()}
          />
        ),
        headerStyle: {
          backgroundColor: "#23649A",
        },
        headerTintColor: "#FFFFFF",
      }}
    />
  );
}
