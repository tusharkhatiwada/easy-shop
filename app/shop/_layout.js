import { Stack } from "expo-router";

export default function ShopLayout() {
  return (
    <Stack
      screenOptions={{ headerTitle: "Shop Details", headerBackTitle: "Back" }}
    />
  );
}
