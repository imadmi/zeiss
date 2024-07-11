import { router, Tabs } from "expo-router";
import {
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  const { width, height } = Dimensions.get("window");
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#0C192F",
          marginBottom: 50,
          height: 50,
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 500,
          // display: route.name === 'support' ? 'none' : 'flex',
          display: "flex",
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          title: "support",
          tabBarIcon: ({ color }) => (
            <View
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800
                  ? "translate-y-[13px] "
                  : ""
              } justify-center`}
            >
              <Image
                source={require("../../assets/icons/items.png")}
                placeholder="history"
                contentFit="cover"
                className={`w-[22px] h-[22px]`}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          tabBarIcon: ({ color }) => (
            <View
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800
                  ? "translate-y-[13px] "
                  : ""
              } justify-center`}
            >
              <Image
                source={require("../../assets/icons/history.png")}
                placeholder="history"
                contentFit="cover"
                className={`w-[26px] h-[26px]`}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          tabBarHideOnKeyboard: true,
          title: "home",
          tabBarIcon: ({ color, focused }) => (
            <TouchableOpacity
              onPress={() => {
                router.push("chat");
              }}
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800
                  ? "translate-y-[13px] "
                  : ""
              }  justify-center`}
            >
              <Image
                source={require("../../assets/icons/home.png")}
                placeholder="history"
                contentFit="cover"
                className={`w-[75px] h-[75px] rounded-full  ${
                  focused ? "" : "w-[70px] h-[70px]"
                }`}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: "products",
          tabBarIcon: ({ color }) => (
            <View
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800
                  ? "translate-y-[13px] "
                  : ""
              }  justify-center`}
            >
              <Feather name="shopping-bag" size={23} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "user",
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              onPress={() => router.push("User")}
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800
                  ? "translate-y-[13px] "
                  : ""
              }  justify-center`}
            >
              <FontAwesome5 name="user-circle" size={24} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
