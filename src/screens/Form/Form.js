import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useEffect, useState } from "react";
import { storage } from "@/App";
import { TextInput } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

function Form({ navigation }) {
  const route = useRoute();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");

  const { layout, gutters, fonts } = useTheme();

  const handleSave = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const nameHasThemeDefined = storage.contains("name");
    if (!nameHasThemeDefined) {
      storage.set("theme", "default");
      setIsEdit(true);
    } else {
      setName(storage.getString("name"));
      setHobby(storage.getString("hobby"));
    }
  }, []);

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.flex_1,
          layout.justifyBetween,
          layout.itemsStart,
          layout.fullWidth,
          gutters.paddingHorizontal_32,
          gutters.marginTop_40,
        ]}
      >
        <View
          style={[
            layout.flex_1,
            layout.relative,
            layout.fullWidth,
            layout.justifyCenter,
          ]}
        >
          <Text
            style={[
              fonts.gray400,
              fonts.bold,
              fonts.size_24,
              gutters.marginBottom_4,
            ]}
          >
            Nama:
          </Text>

          {isEdit ? (
            <TextInput
              style={[gutters.marginBottom_12, textInputStyle]}
              onChangeText={setName}
              value={name}
              placeholder="Masukan nama"
            />
          ) : (
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_16,
                gutters.marginBottom_12,
              ]}
            >
              {name}
            </Text>
          )}

          <Text
            style={[
              fonts.gray400,
              fonts.bold,
              fonts.size_24,
              gutters.marginBottom_4,
            ]}
          >
            Hobby:
          </Text>

          {isEdit ? (
            <TextInput
              style={[gutters.marginBottom_12, textInputStyle]}
              onChangeText={setHobby}
              value={hobby}
              placeholder="Masukan hobby"
            />
          ) : (
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_16,
                gutters.marginBottom_12,
              ]}
            >
              {hobby}
            </Text>
          )}

          <TouchableOpacity testID="save-button" onPress={handleSave}>
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginTop_32,
              ]}
            >
              {isEdit ? "Simpan" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            layout.row,
            layout.justifyBetween,
            layout.fullWidth,
            gutters.marginTop_16,
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
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginBottom_32,
              ]}
            >
              Maps
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const textInputStyle = {
  borderWidth: 1,
  borderColor: "black",
  borderStyle: "solid",
  height: 50,
  fontSize: 20,
};
export default Form;
