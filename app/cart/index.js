import * as React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import EntypoIcon from "@expo/vector-icons/Entypo";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { TextInput, Button } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db } from "../../firebaseConfig";

export default function ShopDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    const prevOrder = await AsyncStorage.getItem("@orders");
    if (prevOrder) {
      setOrders(JSON.parse(prevOrder));
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const totalPrice = React.useCallback(() => {
    // get total amount from the array of orders, orders is an array of objects {shopName, quantity, price}
    let total = 0;
    if (orders.length) {
      orders.forEach((order) => {
        console.log("===Order===", order);
        total += Number(order.quantity) * Number(order.price);
      });
    }
    return total.toFixed(2);
  }, [orders]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='tomato' />
      </View>
    );
  }

  console.log("===Total Processed===", totalPrice());

  return (
    <View>
      <View style={styles.details}>
        {orders.map((order) => (
          <View key={order.shopName} style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Product: {order.itemName}
            </Text>
            <Text>Price: ${order.price} per unit</Text>
            <Text>Qyantity: {order.quantity}</Text>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          borderTopColor: "#23649A",
          borderTopWidth: 2,
          paddingTop: 5,
        }}
      >
        <Text style={{ fontWeight: 800, fontSize: 20 }}>Total</Text>
        <Text style={{ fontWeight: 800, fontSize: 20 }}>$ {totalPrice()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    height: 300,
  },
  shopName: {
    fontWeight: "800",
    fontSize: 20,
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    marginVertical: 10,
  },
  shopNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    padding: 20,
  },
  header: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  productWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  productName: {
    fontWeight: "500",
  },
  productDescription: {
    fontSize: 13,
  },
  price: {
    fontWeight: "500",
  },
});
