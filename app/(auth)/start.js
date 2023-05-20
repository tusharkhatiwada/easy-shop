import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Button } from "../../components";

import logo from "../../assets/icon.png";

export default function AuthStart() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        resizeMethod='auto'
        resizeMode='contain'
        style={styles.logo}
      />
      <Button title='Login' onPress={() => router.push("/login")} />
      <Button title='Register' onPress={() => router.push("/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
