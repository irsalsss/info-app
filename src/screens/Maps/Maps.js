import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";

export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    height: "30%",
    width: "100%",
  },
});

const Maps = ({ navigation }) => {
  const route = useRoute();

  const [location, setLocation] = useState(false);
  const mapView = useRef();
  const { layout, gutters, fonts } = useTheme();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position);
          },
          (error) => {
            // See error code charts below.
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        console.log("You can use Geolocation");
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.containerMap}>
          {!isEmpty(location.coords) && (
            <MapView
              ref={mapView}
              style={styles.map}
              initialRegion={{
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
          )}
        </View>
      </View>

      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.fullWidth,
          gutters.marginTop_16,
          gutters.paddingHorizontal_32,
        ]}
      >
        <TouchableOpacity
          testID="fetch-home-button"
          style={[layout.flex, layout.justifyCenter, layout.itemsCenter]}
          onPress={() => navigation.navigate("Info")}
        >
          <Text
            style={[
              route.name === "Info" ? fonts.red500 : fonts.gray400,
              fonts.bold,
              fonts.size_24,
              gutters.marginBottom_32,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="change-form-button"
          style={[layout.flex, layout.justifyCenter, layout.itemsCenter]}
          onPress={() => navigation.navigate("Form")}
        >
          <Text
            style={[
              route.name === "Form" ? fonts.red500 : fonts.gray400,
              fonts.bold,
              fonts.size_24,
              gutters.marginBottom_32,
            ]}
          >
            Form
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="change-map-button"
          style={[layout.flex, layout.justifyCenter, layout.itemsCenter]}
          onPress={() => navigation.navigate("Maps")}
        >
          <Text
            style={[
              route.name === "Maps" ? fonts.red500 : fonts.gray400,
              ,
              fonts.bold,
              fonts.size_24,
              gutters.marginBottom_32,
            ]}
          >
            Maps
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default Maps;
