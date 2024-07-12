import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";

const History = () => {
  const context = useAppContext();

  React.useEffect(() => {
      const notificationToken = async () => {
        try {
          const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${context.accessToken}`,
          };
  
          let body = {
            token: "expoPushToken",
          };
  
          const result = await fetch(
            `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/set-notification-token`,
            {
              method: "POST",
              headers,
              body: JSON.stringify(body),
            }
          );
  
          const res = await result.json();
          // console.log(JSON.stringify(res, null, 2)); //
          if (res.success === false) {
            alert(res.message.split(".")[0]);
            return;
          }
          if (res.success === true) {
            console.log("notification-token setted");
          }
        } catch (error: any) {
          if (error.message) console.log(error.message.split(".")[0]);
        }
      };
      notificationToken();
    }, [context.accessToken]);



  return (
    <View className="flex-1 relative">
      {/* <StatusBar hidden /> */}
      <StatusBar hidden={false} barStyle="light-content" />

      <ScrollView className="flex-1">
        <View
          className="absolute top-0 left-0  h-14 w-full flex-row items-center justify-between"
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
        <View className="absolute top-14 left-0 w-full h-44 justify-start items-start">
          <Image
            id="history"
            source={require("../../assets/icons/zeiss_home.jpg")}
            placeholder="history"
            contentFit="cover"
            className="w-full h-full"
          />
        </View>
        <View className="flex-1 ">
          <View className="mt-24 ml-4">
            <Text className="font-bold text-white text-[24px]">
              Dépasser les limites de
            </Text>
            <Text className="font-bold text-white text-[24px]">
              l'imagination
            </Text>
            <Text className="text-gray-200 text-lg">ZEISS en France</Text>
          </View>
          <View className="mt-20">
            <Search />
            <View className="mt-6 mx-4">
              <Text className="font-semibold text-base">Commande en cours</Text>
              <View className="">
                <Commande />
                <Commande />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default History;

import { useAppContext } from "@/context";

const Commande = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/chat");
      }}
    >
      <View className="bg-[#EBF0FF] w-full shadow-sm flex-row justify-between rounded-lg mt-4">
        <View className="space-y-2 p-4">
          <Text className="text-black font-bold text-xs">BL 4873/2024</Text>
          <Text className="text-base text-black">Mohammad Jannati</Text>
          <View className="flex-row">
            <Image
              id="building"
              source={require("../../assets/icons/building.png")}
              contentFit="contain"
              className="w-4 h-4 mr-2"
            />
            <Text className="text-xs text-black">Livraison 12/03/2024</Text>
          </View>
        </View>
        <View className="space-y-2 p-4">
          <View className="flex-row rounded-xl justify-end">
            <Text className="text-xs bg-white p-1 px-2 font-bold rounded-xl">
              1.6
            </Text>
            <Text className="text-xs bg-gray-200 p-1 px-2 font-bold rounded-xl">
              SILVER
            </Text>
          </View>
          <View className="justify-end items-end">
            <Text className="font-thin text-[10px] text-black">
              UV PROTECT DURAVISION
            </Text>
          </View>
          <View className="justify-end items-end">
            <Text className="text-lg text-black ">340 DH</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Search = () => {
  return (
    <View className="border-2 border-gray-400 mx-4 rounded-full flex-row items-center justify-end">
      <TextInput
        placeholder="Recherch..."
        keyboardType="default"
        className="p-3 pl-4 flex-1"
      />
      <FontAwesome5
        name="search"
        size={18}
        color="rgb(156 163 175)"
        style={{
          marginRight: 16,
        }}
      />
    </View>
  );
};
