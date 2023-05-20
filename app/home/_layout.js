import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "shopLists") {
            iconName = "shop";
          } else if (route.name === "favourites") {
            iconName = "heart";
          }
          return <Entypo name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name='shopLists'
        options={{
          href: "/home/shopLists",
          title: "Shops",
          headerTitle: "Vape & Tobacco Shops",
        }}
      />
      <Tabs.Screen
        name='favourites'
        options={{
          href: "/home/favourites",
          title: "Favourites",
          headerTitle: "My Favourites",
        }}
      />
    </Tabs>
  );
}
