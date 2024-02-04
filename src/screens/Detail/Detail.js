import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";

const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

const formatDate = (dateString) => {
  return moment.utc(dateString).format("dddd, DD MMM YYYY");
};

const formatTime = (dateString, utcOffset) => {
  return moment(dateString).utcOffset(utcOffset).format("HH:mm");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40,
  },
  map: {
    height: 600,
    width: "100%",
  },
});

function Detail({ navigation, route }) {
  const { id } = route.params;

  const mapView = useRef();

  const { layout, fonts } = useTheme();

  const getDetailTimezone = async () => {
    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/" + id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  };

  const { data: detailTimezone } = useQuery({
    queryKey: ["getDetailTimezone"],
    queryFn: getDetailTimezone,
  });

  return (
    <SafeScreen>
      <ScrollView
        style={[
          {
            backgroundColor: "#A9A0A0",
            paddingHorizontal: 24,
            paddingTop: 24,
          },
        ]}
      >
        <View
          style={[
            layout.flex_1,
            layout.row,
            layout.justifyBetween,
            layout.itemsCenter,
            { marginBottom: 20 },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>

          <Text style={[fonts.bold, { color: "white", fontSize: 30 }]}>
            {id.split("/")[1]}
          </Text>
        </View>

        {detailTimezone ? (
          <View
            style={[
              layout.row,
              layout.flex_1,
              layout.justifyBetween,
              layout.itemsCenter,
              layout.fullWidth,
              {
                backgroundColor: "#4F4F4F",
                padding: 16,
                borderRadius: 16,
                height: 110,
                maxHeight: 110,
              },
            ]}
          >
            <View>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
                {id.replace("/", ", ")}
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
                {formatDate(detailTimezone.utc_datetime)}
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
                GMT {detailTimezone.utc_offset.split(":")[0]}
              </Text>
            </View>

            <View>
              <Text style={{ color: "white", fontSize: 40, fontWeight: "600" }}>
                {formatTime(
                  detailTimezone.utc_datetime,
                  detailTimezone.utc_offset
                )}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.container}>
          <View style={styles.containerMap}>
            <MapView
              showsUserLocation={true}
              ref={mapView}
              style={styles.map}
              initialRegion={{
                latitude: 6.1944,
                longitude: 106.8229,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
              // it is important
              region={{
                latitude: 0.7893,
                longitude: 113.9213,
                latitudeDelta: 60,
                longitudeDelta: 60,
              }}
              provider={PROVIDER_GOOGLE}
            />
            <Marker
              coordinate={{
                latitude: 6.1944,
                longitude: 106.8229,
              }}
            />

            <Polyline
              coordinates={[
                {
                  latitude: 6.1944,
                  longitude: 106.8229,
                },
              ]}
              strokeColor={"rgb(0, 0, 0)"}
              strokeWidth={6}
            />
          </View>
        </View>

        <View style={{ height: 48 }}></View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Detail;
