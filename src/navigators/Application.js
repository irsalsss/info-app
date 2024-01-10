import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Example, Form, Info, Startup, Maps } from "@/screens";
import { useTheme } from "@/theme";

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Example" component={Example} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default ApplicationNavigator;
