import { Tabs } from "expo-router";
import { Animated, Dimensions, Platform, View } from "react-native";
import { Image } from "expo-image";
import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  const { width, height } = Dimensions.get("window");
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarStyle: {
          display: "flex",
          backgroundColor: "#0C192F",
          marginBottom: 50,
          height: 50,
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 500,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}

    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          tabBarIcon: ({ color }) => (
            <View
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800 ? "translate-y-[13px] " : ""
              } justify-center`}
            >
              <Image
                source={require("../../assets/icons/history.png")}
                placeholder="history"
                contentFit="cover"
                transition={1000}
                className={`w-[24px] h-[24px]`}
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
            <View
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800 ? "translate-y-[13px] " : ""
              }  justify-center`}
            >
              <Image
                source={require("../../assets/icons/home.png")}
                placeholder="history"
                contentFit="cover"
                transition={1000}
                className={`w-[75px] h-[75px] rounded-full  ${
                  focused ? "" : "w-[70px] h-[70px]"
                }`}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="User"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <View
              className={`h-[60px] ${
                Platform.OS === "ios" && height > 800 ? "translate-y-[13px] " : ""
              }  justify-center`}
            >
              <FontAwesome5 name="user-circle" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
