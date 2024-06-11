import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";

const Validation = ({
  valid,
  openBottomSheet,
}: {
  valid?: boolean;
  openBottomSheet?: () => void;
}) => {
  const handleClick = () => {
    if (valid) {
      openBottomSheet && openBottomSheet();
    } else {
      console.log("not valid");
    }
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className={`w-full h-12 bottom-10 justify-center items-center mt-10
          `}
      // ${Platform.OS === "ios" ? " relative " : "absolute "}
    >
      <View
        className={`w-5/6 h-full flex-row justify-center items-center
          ${valid ? "bg-[#0C192F]" : "bg-gray-400"} 
          rounded-full shadow-md `}
      >
        <View>
          <Text className="text-white text-base">Valider la commande</Text>
        </View>
        <View className="ml-4">
          <Image
            id="validation"
            source={require("../assets/icons/validation-arrow.png")}
            contentFit="cover"
            className="w-6 h-6"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Validation;
