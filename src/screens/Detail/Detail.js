import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";

const formatDate = (dateString) => {
  return moment.utc(dateString).format("dddd, DD MMM YYYY");
};

const formatTime = (dateString, utcOffset) => {
  return moment(dateString).utcOffset(utcOffset).format("HH:mm");
};

function Detail({ navigation, route }) {
  const { id } = route.params;

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

        <View style={{ height: 48 }}></View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Detail;
