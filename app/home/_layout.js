import { Stack, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function HomeLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: "Easy Shops",
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#23649A",
        },
        headerTintColor: "#FFFFFF",
        headerRight: () => (
          <Entypo
            name='shopping-cart'
            color='white'
            size={30}
            onPress={() => router.push("/cart")}
          />
        ),
      }}
    />
  );
}
