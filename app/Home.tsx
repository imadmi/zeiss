import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { router } from "expo-router";

const Home = () => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View className="flex-1 ">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../assets/icons/homebackground.png")}
        contentFit="fill"
        className="w-full h-full -translate-y-36"
      />
      <View
        className={`absolute top-0 left-0 h-full w-full ${
          windowHeight > 700 ? "pt-[60%]" : "pt-[40%]"
        }  items-center`}
      >
        <Text className="text-white text-4xl font-bold">WELCOME BACK</Text>

        <TouchableOpacity onPress={() => {router.push("Signin")}}
          className="mt-[70%] w-[80%] border-2 border-[#007AFF] 
        rounded-full py-3"
        >
          <Text
            className="text-[#007AFF] text-xl font-semibold
          text-center"
          >
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push("Signup")}}
          className="mt-[8%] w-[80%] bg-[#007AFF] 
        rounded-full py-3"
        >
          <Text
            className="text-white text-xl font-semibold
          text-center"
          >
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
