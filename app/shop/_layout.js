import { Stack, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function ShopLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTitle: "Cocktail Details",
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: "#97B8A4",
        },
        headerTintColor: "#000000",
        headerLeft: () => (
          <Entypo
            name='chevron-left'
            color='black'
            size={30}
            onPress={() => router.back()}
          />
        ),
      }}
    />
  );
}
