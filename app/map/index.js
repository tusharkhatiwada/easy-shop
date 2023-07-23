import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ShopMap() {
  const params = useLocalSearchParams();
  const [region, setRegion] = React.useState({
    latitude: 52.4974437,
    longitude: -2.0284357,
  });
  const { lat, lng, name } = params;
  const mapRef = React.useRef(null);

  console.log("===Params===", params);

  React.useEffect(() => {
    setRegion({
      latitude: Number(lat),
      longitude: Number(lng),
    });
  }, [mapRef]);

  return (
    <MapView
      ref={mapRef}
      region={{
        ...region,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider='google'
      style={styles.map}
    >
      <Marker
        identifier='shopMarker'
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        title={name}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});
