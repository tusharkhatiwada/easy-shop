import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
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
    const shopRef = doc(db, "drinks", id);
    if (id) {
      const shopSnap = await getDoc(shopRef);

      if (shopSnap.exists()) {
        const data = shopSnap.data();
        setShopDetail(data);
        navigation.setOptions({ headerTitle: data.drinkName });
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
    const docRef = doc(db, "drinks", id);
    const updatedDoc = await updateDoc(docRef, {
      isFavourite: !item?.isFavourite,
    });
    setFavouriteLoading(false);
    fetchShopDetails();
  };

  const handleShare = async () => {
    setShareLoading(true);
    let fileUri = FileSystem.documentDirectory + `${Math.random() * 1000}.jpg`;
    const res = await FileSystem.downloadAsync(shopDetail.thumb, fileUri);
    Sharing.shareAsync(res.uri, {
      mimeType: "image/jpeg",
      dialogTitle: `${shopDetail.drinkName} is available. Receipe in details`,
    });
    setShareLoading(false);
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: shopDetail?.thumb }}
        contentFit='cover'
        transition={500}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.shopNameContainer}>
          <Text numberOfLines={1} style={styles.shopName}>
            {shopDetail?.drinkName}
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
        <Text style={styles.price}>Category: {shopDetail?.category}</Text>
        <Text style={styles.price}>Is Alcoholic?: {shopDetail?.alcoholic}</Text>
        <Text style={styles.price}>Glass Type: {shopDetail?.glass}</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.price}>Instructions to prepare:</Text>
          <Text style={styles.description}>{shopDetail?.instructions}</Text>
        </View>
      </View>
    </ScrollView>
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
