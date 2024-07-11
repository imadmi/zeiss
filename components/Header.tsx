import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useRouter } from "expo-router";

const Header = () => {
  return (
    <View
      className="w-full h-28 relative"
      style={{
        backgroundColor: "rgba(12, 25, 47, 1)",
      }}
    >
      <View
        className="absolute top-0 left-0  h-14 w-full flex-row items-center 
          justify-between"
        style={{
          backgroundColor: "rgba(12, 25, 47, 1)",
        }}
      >
        {/* <Text className="text-white font-semibold ml-6 text-lg">Zeiss</Text>
        <MaterialCommunityIcons
          name="bell-ring-outline"
          size={24}
          color="white"
          style={{
            marginRight: 24,
          }}
        /> */}
      </View>
      <View
        className="absolute top-14 left-0 items-center justify-between
          flex-row px-4 h-12 w-full"
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-white font-semibold text-xl">Chat Bot</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
