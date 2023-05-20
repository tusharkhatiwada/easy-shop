import React from "react";
import { View, StyleSheet, Text, TextInput as Input } from "react-native";

export default function TextInput({ errorText, description, label, ...props }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Input style={styles.input} selectionColor='#b45309' {...props} />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  label: {
    color: "#64748b",
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderColor: "#b45309",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 42,
  },
  description: {
    fontSize: 13,
    color: "#64748b",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "#dc2626",
    paddingTop: 8,
  },
});
