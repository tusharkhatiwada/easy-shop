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
        tabBarActiveTintColor: "#97B8A4",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#97B8A4",
        },
      })}
    >
      <Tabs.Screen
        name='shopLists'
        options={{
          href: "/home/shopLists",
          title: "Drinks",
          headerTitle: "Authentic Cocktails",
        }}
      />
      <Tabs.Screen
        name='favourites'
        options={{
          href: "/home/favourites",
          title: "Favourite Cocktails",
          headerTitle: "Favourite Cocktails",
        }}
      />
    </Tabs>
  );
}
