import EntypoIcon from "@expo/vector-icons/Entypo";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "expo-router";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const _width = Dimensions.get("screen").width;

export default function Favourites() {
  const [favouriteLists, setFavouriteLists] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchShops = React.useCallback(async () => {
    setLoading(true);
    const tempShops = [];
    const q = query(collection(db, "shops"), where("isFavourite", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempShops.push({
        ...doc.data(),
        shopImageUrl: "https://picsum.photos/300/300/?blur=2",
        id: doc.id,
      });
    });
    setFavouriteLists(tempShops);
    setLoading(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchShops();
    }, []),
  );

  const markAsFavourite = async (item) => {
    setLoading(true);
    const docRef = doc(db, "shops", item.id);
    const updatedDoc = await updateDoc(docRef, {
      isFavourite: !item?.isFavourite,
    });
    fetchShops();
  };

  const renderList = (item) => {
    return (
      <View style={styles.listContainer}>
        <Image
          source={{ uri: item.shopImageUrl }}
          contentFit='cover'
          transition={500}
          style={styles.image}
        />
        <Text numberOfLines={1} style={styles.shopName}>
          {item.shopName}
        </Text>
        <Text numberOfLines={1} style={styles.city}>
          {item.city}
        </Text>
        <View style={styles.favouriteWrapper}>
          <Text style={styles.products}>{item.products.length} products</Text>
          <EntypoIcon
            name={item.isFavourite ? "heart" : "heart-outlined"}
            color={item.isFavourite ? "red" : "gray"}
            size={24}
            style={{ marginRight: 10 }}
            onPress={() => markAsFavourite(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlashList
        data={favouriteLists}
        renderItem={({ item }) => renderList(item)}
        estimatedItemSize={200}
        numColumns={2}
        refreshControl={
          <ActivityIndicator size='large' color='tomato' animating={loading} />
        }
      />
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
  },
});
