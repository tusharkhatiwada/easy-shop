import EntypoIcon from "@expo/vector-icons/Entypo";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import * as React from "react";
import { Link, useFocusEffect, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { Button } from "../../components";

import {
  collection,
  doc,
  getDocs,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const _width = Dimensions.get("screen").width;

export default function ShopLists() {
  const router = useRouter();
  const [shopLists, setShopLists] = React.useState([]);
  const [fixedShopLists, setFixedShopLists] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    setLoading(true);
    if (searchQuery.length) {
      const tempShops = [];
      const tempShopAndItems = [];
      // the collection name is shops and getDocs method available on firebase is getting all the lists
      const querySnapshot = await getDocs(collection(db, "shop"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempShops.push(data);
      });
      const itemsResult = tempShops.filter((d) =>
        d.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );

      const result = itemsResult.map((shop) => {
        shop.items.some((item) => {
          if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            tempShopAndItems.push({
              id: shop.id,
              shopName: shop.name,
              location: shop.location,
              coordinates: shop.coordinates,
              items: {
                itemName: item.name,
                quantity: item.quantity,
                price: item.price,
              },
            });
          }
        });
        return shop.name;
      });
      setShopLists(tempShopAndItems);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#23649A",
          marginBottom: 5,
        }}
      >
        What do you need?
      </Text>
      <TextInput
        placeholder='Eg. Bread, Apples'
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.input}
      />
      <Button title='Search' onPress={() => handleSearch()} loading={loading} />
      <View style={{ marginVertical: 20 }}>
        {shopLists.length ? (
          shopLists.map((shop) => {
            return (
              <Link
                key={shop.shopName}
                href={{
                  pathname: "/shop",
                  params: {
                    shop: JSON.stringify(shop),
                  },
                }}
                style={{
                  marginVertical: 5,
                  borderBottomColor: "dimgray",
                  borderBottomWidth: 1,
                  width: _width,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: _width - 40,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#23649A",
                      }}
                    >
                      Shop: {shop.shopName}
                    </Text>
                    <Link
                      href={{
                        pathname: "/map",
                        params: {
                          lat: shop.coordinates.lat,
                          lng: shop.coordinates.lng,
                          name: shop.shopName,
                        },
                      }}
                    >
                      <EntypoIcon
                        name='location-pin'
                        color='#F6931C'
                        size={40}
                      />
                    </Link>
                  </View>
                  <View style={{ paddingHorizontal: 2 }}>
                    <View
                      style={{
                        marginVertical: 5,
                        gap: 4,
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>
                        {shop.items.itemName}
                      </Text>
                      <Text>Qty: {shop.items.quantity}</Text>
                      <Text>Price: £{shop.items.price}</Text>
                    </View>
                  </View>
                </View>
              </Link>
            );
          })
        ) : searchQuery ? (
          <Text>No Shops found for this item</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#efefef",
  },
  listContainer: {
    flex: 1,
    borderRadius: 8,
    gap: 4,
    marginHorizontal: 4,
    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    height: 180,
    backgroundColor: "#0553",
  },
  shopName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  products: {
    fontSize: 14,
    fontWeight: "400",
  },
  city: {
    flex: 1,
    paddingHorizontal: 5,
  },
  favouriteWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  input: {
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "white",
    minHeight: 50,
    fontSize: 18,
  },
});
