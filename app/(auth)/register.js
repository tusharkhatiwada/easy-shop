import * as React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import { TextInput, Button } from "../../components";

import logo from "../../assets/icon.png";
import { useAuth } from "../../context/auth";
import firebaseError from "../../utils/firebaseErrorCodes";

export default function Register() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    formError: "",
  });

  const handleRegister = () => {
    if (!state.name) {
      setState({ ...state, nameError: "Full name is required" });
      return;
    }
    if (!state.email) {
      setState({ ...state, emailError: "Email is required" });
      return;
    }
    if (!state.password) {
      setState({ ...state, passwordError: "Password is required" });
      return;
    }
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("===User===", user);
        signIn(user);
      })
      .catch((error) => {
        const errorMessage = firebaseError(error.code);
        setState({ ...state, formError: errorMessage });
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
        <Text style={styles.header}>Register an account</Text>
      </View>
      <TextInput
        label='Full Name'
        returnKeyType='next'
        value={state.name}
        onChangeText={(text) =>
          setState({ ...state, name: text, nameError: "" })
        }
        error={!!state.nameError}
        errorText={state.nameError}
      />
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
      <Button title='Register' onPress={handleRegister} />
      <Button
        title='Go Back'
        style={{ backgroundColor: "transparent" }}
        textStyle={{ color: "#3498db" }}
        onPress={() => router.back()}
      />
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
