import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TextInput, Button } from "../../components";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { app } from "../../firebaseConfig";
import { useAuth } from "../../context/auth";
import firebaseError from "../../utils/firebaseErrorCodes";

import logo from "../../assets/icon.png";
import { getAuth } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const auth = getAuth(app);
  const { signIn } = useAuth();
  const [state, setState] = React.useState({
    email: "test@test.com",
    password: "123456",
    emailError: "",
    passwordError: "",
    formError: "",
    isLoading: false,
  });
  const handleLogin = async () => {
    setState({ ...state, isLoading: true });
    if (!state.email) {
      setState({ ...state, emailError: "Email is required" });
      return;
    }
    if (!state.password) {
      setState({ ...state, passwordError: "Password is required" });
      return;
    }
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // AsyncStorage is used for the data persistence. The user info is stored as a key value pair
        await AsyncStorage.setItem("@user_info", JSON.stringify(user));
        setState({ ...state, isLoading: false });
        signIn(user);
      })
      .catch((error) => {
        const errorMessage = firebaseError(error?.code);
        setState({ ...state, formError: errorMessage, isLoading: false });
      });
  };
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image
        source={logo}
        resizeMethod='auto'
        resizeMode='contain'
        style={styles.logo}
      />
      <View>
        <Text style={styles.header}>Sign in to your account</Text>
      </View>
      <TextInput
        label='Email'
        returnKeyType='next'
        value={state.email}
        onChangeText={(text) =>
          setState({ ...state, email: text, emailError: "" })
        }
        error={!!state.emailError}
        errorText={state.emailError}
        autoCapitalize='none'
        autoCompleteType='email'
        textContentType='emailAddress'
        keyboardType='email-address'
      />
      <TextInput
        label='Password'
        returnKeyType='done'
        value={state.password}
        onChangeText={(text) =>
          setState({ ...state, password: text, passwordError: "" })
        }
        error={!!state.passwordError}
        errorText={state.passwordError}
        secureTextEntry
      />
      {state.formError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{state.formError}</Text>
        </View>
      )}
      <Button
        title='Login'
        onPress={() => handleLogin()}
        loading={state.isLoading}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Don't have account? </Text>
        <View>
          <Button
            title='Register'
            style={{ backgroundColor: "transparent" }}
            textStyle={{ color: "#23649A" }}
            onPress={() => router.push("/register")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
    backgroundColor: "#97B8A4",
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  error: {
    width: "100%",
    backgroundColor: "#fca5a5",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 12,
  },
});
