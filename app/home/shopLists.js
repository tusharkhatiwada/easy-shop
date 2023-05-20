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

  // this is the callback function that is fetching all the list of vape shops from firebase collection
  const fetchShops = React.useCallback(async () => {
    setLoading(true);
    const tempShops = [];
    // the collection name is shops and getDocs method available on firebase is getting all the lists
    const querySnapshot = await getDocs(collection(db, "shops"));
    querySnapshot.forEach((doc) => {
      tempShops.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setShopLists(tempShops);
    setFixedShopLists(tempShops);
    setLoading(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchShops();
    }, []),
  );

  const filterShop = React.useCallback(() => {
    const filtered = fixedShopLists.filter((el) =>
      el?.city?.includes(searchQuery),
    );
    setShopLists(filtered);
  }, [searchQuery]);

  React.useEffect(() => {
    filterShop();
  }, [searchQuery]);

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
      <Pressable
        onPress={() => router.push(`/shop/${item?.id}`)}
        style={styles.listContainer}
      >
        <>
          <Image
            source={{ uri: item?.shopImageUrl }}
            contentFit='cover'
            transition={500}
            style={styles.image}
          />
          <Text numberOfLines={1} style={styles.shopName}>
            {item?.shopName}
          </Text>
          <Text numberOfLines={1} style={styles.city}>
            {item?.city}
          </Text>
          <View style={styles.favouriteWrapper}>
            <Text style={styles.products}>
              {item.products?.length} products
            </Text>
            <EntypoIcon
              name={item?.isFavourite ? "heart" : "heart-outlined"}
              color={item?.isFavourite ? "red" : "gray"}
              size={24}
              style={{ marginRight: 10 }}
              onPress={() => markAsFavourite(item)}
            />
          </View>
        </>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter location to search...'
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.input}
      />
      <FlashList
        data={shopLists}
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
