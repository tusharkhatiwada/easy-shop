import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function Button({
  title,
  loading = false,
  style,
  textStyle,
  ...rest
}) {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[styles.button, style]}
      {...rest}
    >
      <View style={styles.labelContainer}>
        {loading && <ActivityIndicator size='small' color='#FFFFFF' />}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    minHeight: 46,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
