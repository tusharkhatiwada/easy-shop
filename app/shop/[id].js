import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
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

import { db } from "../../firebaseConfig";

export default function ShopDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [favouriteLoading, setFavouriteLoading] = React.useState(false);
  const [shareLoading, setShareLoading] = React.useState(false);
  const [shopDetail, setShopDetail] = React.useState(null);

  const fetchShopDetails = React.useCallback(async () => {
    setLoading(true);
    const shopRef = doc(db, "shops", id);
    if (id) {
      const shopSnap = await getDoc(shopRef);

      if (shopSnap.exists()) {
        const data = shopSnap.data();
        setShopDetail(data);
        navigation.setOptions({ headerTitle: data.shopName });
      } else {
        console.log("===Mo data found===");
      }
    }
    setLoading(false);
  }, [id]);

  React.useEffect(() => {
    fetchShopDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='tomato' />
      </View>
    );
  }

  const markAsFavourite = async (item) => {
    setFavouriteLoading(true);
    const docRef = doc(db, "shops", id);
    const updatedDoc = await updateDoc(docRef, {
      isFavourite: !item?.isFavourite,
    });
    setFavouriteLoading(false);
    fetchShopDetails();
  };

  const handleShare = async () => {
    setShareLoading(true);
    let fileUri = FileSystem.documentDirectory + `${Math.random() * 1000}.jpg`;
    const res = await FileSystem.downloadAsync(
      shopDetail.shopImageUrl,
      fileUri,
    );
    Sharing.shareAsync(res.uri, {
      mimeType: "image/jpeg",
      dialogTitle: `${shopDetail.shopName} in ${shopDetail.city}. ${shopDetail.products.length} products available`,
    });
    setShareLoading(false);
  };

  return (
    <View>
      <Image
        source={{ uri: shopDetail?.shopImageUrl }}
        contentFit='cover'
        transition={500}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.shopNameContainer}>
          <Text numberOfLines={1} style={styles.shopName}>
            {shopDetail?.shopName}
          </Text>
          {favouriteLoading ? (
            <ActivityIndicator size='small' color='red' />
          ) : (
            <EntypoIcon
              name={shopDetail?.isFavourite ? "heart" : "heart-outlined"}
              color={shopDetail?.isFavourite ? "red" : "gray"}
              size={24}
              onPress={() => markAsFavourite(shopDetail)}
            />
          )}
          {shareLoading ? (
            <ActivityIndicator size='small' color='gray' />
          ) : (
            <EntypoIcon
              name={"share"}
              color={"gray"}
              size={24}
              onPress={handleShare}
            />
          )}
        </View>
        <Text style={styles.description}>{shopDetail?.shopDescription}</Text>
        <View>
          <Text style={styles.header}>Products:</Text>
          {shopDetail?.products &&
            shopDetail?.products.length &&
            shopDetail?.products.map((product, idx) => (
              <View key={String(idx)} style={styles.productWrapper}>
                <View>
                  <Text style={styles.productName}>{product.productName}</Text>
                  <Text style={styles.productDescription}>
                    {product.productCategory}
                  </Text>
                </View>
                <Text style={styles.price}>$ {product.price}</Text>
              </View>
            ))}
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
