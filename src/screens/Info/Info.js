import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { ImageVariant } from "@/components/atoms";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { isImageSourcePropType } from "@/types/guards/image";
import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";
import { useRoute } from "@react-navigation/native";

function Info({ navigation }) {
  const route = useRoute();

  const { t } = useTranslation(["example", "welcome"]);
  const { layout, gutters, fonts, components, backgrounds } = useTheme();

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
        ]}
      >
        <View
          style={[
            layout.flex_1,
            layout.relative,
            layout.fullWidth,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
        >
          <View
            style={[layout.absolute, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <Brand height={300} width={300} />
          </View>
        </View>

        <View
          style={[
            layout.flex_1,
            layout.justifyBetween,
            layout.itemsStart,
            layout.fullWidth,
            gutters.paddingHorizontal_32,
            gutters.marginTop_40,
          ]}
        >
          <View>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t("welcome:title")}
            </Text>
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginBottom_32,
              ]}
            >
              {t("welcome:subtitle")}
            </Text>
            <Text style={[fonts.size_16, fonts.gray200]}>
              {t("welcome:description")}
            </Text>
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
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
export default Info;
