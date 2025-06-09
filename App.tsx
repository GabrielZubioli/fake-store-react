import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import FavoritesScreen from "./screens/FavoriteScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Produtos") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Favoritos") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return (
            <Ionicons
              name={iconName ?? "alert-circle-outline"}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#3742fa",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Produtos" component={ProductListScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Products"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
