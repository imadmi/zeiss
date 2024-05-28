import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Animated, Text, View } from "react-native";
import { Image } from "expo-image";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
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
            <View className="h-[60px] translate-y-[13px] justify-center">
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
        name="tags"
        options={{
          title: "tags",
          tabBarIcon: ({ color }) => (
            <View className="h-[60px] translate-y-[13px] justify-center">
              <Image
                source={require("../../assets/icons/index.png")}
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
          title: "home",
          tabBarIcon: ({ color, focused }) => (
            <View className="h-[60px] translate-y-[13px] justify-center">
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
        name="items"
        options={{
          title: "items",
          tabBarIcon: ({ color }) => (
            <View className="h-[60px] translate-y-[13px] justify-center">
              <Image
                source={require("../../assets/icons/items.png")}
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
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ color }) => (
            <View className="h-[60px] translate-y-[13px] justify-center">
              <FontAwesome name="gear" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
