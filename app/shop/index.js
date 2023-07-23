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
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [favouriteLoading, setFavouriteLoading] = React.useState(false);
  const [shareLoading, setShareLoading] = React.useState(false);
  const [shopDetail, setShopDetail] = React.useState(JSON.parse(params.shop));
  const [quantity, setQuantity] = React.useState("1");
  const [orders, setOrders] = React.useState([]);
  const [orderAdded, setOrderAdded] = React.useState(false);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='tomato' />
      </View>
    );
  }

  const handleOrder = async () => {
    setOrderAdded(false);
    const newOrder = {
      shopName: shopDetail?.shopName,
      itemName: shopDetail?.items.itemName,
      price: shopDetail?.items.price,
      quantity: quantity,
    };
    const totalOrder = [...orders, newOrder];
    await AsyncStorage.setItem("@orders", JSON.stringify(totalOrder));
    setOrderAdded(true);
  };

  return (
    <View>
      <View style={styles.details}>
        <View style={styles.shopNameContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.shopName}>Shop Name: </Text>
            <Text numberOfLines={1} style={styles.shopName}>
              {shopDetail?.shopName}
            </Text>
          </View>
        </View>
        <View>
          {shopDetail?.items && (
            <View style={styles.productWrapper}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.productName}>Product: </Text>
                  <Text style={styles.productName}>
                    {shopDetail?.items.itemName}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.productName}>Price: </Text>
                  <Text style={styles.price}>$ {shopDetail?.items.price}</Text>
                </View>
                <TextInput
                  label='Quantity'
                  returnKeyType='next'
                  value={quantity}
                  onChangeText={(text) => setQuantity(text)}
                  keyboardType='numeric'
                />
              </View>
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              title='Save Order'
              onPress={() => handleOrder()}
              loading={loading}
            />
            <Button
              title='Cancel & Go Back'
              style={{ backgroundColor: "transparent" }}
              textStyle={{ color: "#23649A" }}
              onPress={() => router.back()}
            />
          </View>
          {orderAdded && (
            <Text
              style={{ fontSize: 12, color: "green", paddingHorizontal: 10 }}
            >
              Product added sucessfully...
            </Text>
          )}
        </View>
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
