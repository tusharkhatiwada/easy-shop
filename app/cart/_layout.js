import { Stack, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function ShopLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: "Orders",
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#23649A",
        },
        headerTintColor: "#FFFFFF",
        headerLeft: () => (
          <Entypo
            name='chevron-left'
            color='white'
            size={30}
            onPress={() => router.back()}
          />
        ),
      }}
    />
  );
}
