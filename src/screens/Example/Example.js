import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useQuery } from "@tanstack/react-query";

function Example({ navigation }) {
  const { layout, fonts } = useTheme();

  const getAllTimezone = async () => {
    const response = await fetch("https://worldtimeapi.org/api/timezone/Asia", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  };

  const { data: timezones = [] } = useQuery({
    queryKey: ["getAllTimezone"],
    queryFn: getAllTimezone,
  });

  console.log("timezones", timezones);

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
        <View style={[layout.flex_1, { marginBottom: 20 }]}>
          <Text style={[fonts.bold, { color: "white", fontSize: 30 }]}>
            TIMEZONE
          </Text>
        </View>

        {timezones.map((timezone) => (
          <TouchableOpacity
            key={timezone}
            testID="timezone-item"
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
                marginBottom: 16,
              },
            ]}
            onPress={() => navigation.navigate("Detail", { id: timezone })}
          >
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
              <Text style={{ color: "white", fontSize: 32, fontWeight: "500" }}>
                {timezone.replace("/", ", ")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 48 }}></View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
