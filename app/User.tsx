import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
const User = () => {
  const context = useAppContext();
  const [lname, setlname] = useState(context.user?.lname);
  const [fname, setfname] = useState(context.user?.fname);
  const [address, setaddress] = useState(context.user?.address);
  const [tele, settele] = useState(context.user?.tel);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [error, seterror] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const saveChanges = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${context.accessToken}`,
      };

      let body = {
        fname: fname,
        lname: lname,
        address: address,
        tel: tele,
      };

      const result = await fetch(
        `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/edit-profile`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );

      const res = await result.json();
      console.log(JSON.stringify(res, null, 2)); //

      if (res.message) {
        seterror(res.message.split(".")[0]);
      }
      if (res.success === true) {
        seterror("");
        alert("Profile updated successfully");
        context.storeAccessToken(context.accessToken, res.user);
        return;
      }
    } catch (error: any) {
      if (error.message) seterror(error.message.split(".")[0]);
    }
  };
  return (
    <View className="relative flex-1 items-center">
      <StatusBar hidden={false} barStyle="light-content" />
      <View
        className="h-52 w-full relative items-center"
        style={{ backgroundColor: "rgba(12, 25, 47, 1)" }}
      >
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
            <Text className="text-white font-semibold text-xl">Profile</Text>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Image
          id="history"
          source={require("../assets/icons/unknown_profile.jpg")}
          contentFit="cover"
          className="w-32 h-32 top-32 rounded-full border-2 border-white"
        />
      </View>
      <View className="relative h-[52%] w-full mt-20 items-center mb-20">
        <ScrollView className="flex-1 w-[80%] ">
          <View className="mb-8">
            <Text className="text-black">First name </Text>
            <TextInput
              placeholder={context.user?.fname}
              keyboardType="default"
              autoCapitalize="none"
              className="text-[#007AFF] w-full border-b-2 border-[#007AFF] h-10"
              value={fname}
              onChangeText={(fname) => setfname(fname)}
            />
          </View>
          <View className="mb-8">
            <Text className="text-black">Last name </Text>
            <TextInput
              placeholder={context.user?.lname}
              keyboardType="default"
              autoCapitalize="none"
              className="text-[#007AFF] w-full border-b-2 border-[#007AFF] h-10"
              value={lname}
              onChangeText={(lname) => setlname(lname)}
            />
          </View>
          <View className="mb-8">
            <Text className="text-black">Adress</Text>
            <TextInput
              placeholder="Your adress"
              keyboardType="default"
              autoCapitalize="none"
              className="text-[#007AFF] w-full border-b-2 border-[#007AFF] h-10"
              value={address as string}
              onChangeText={(address) => setaddress(address)}
            />
          </View>
          <View className="mb-8">
            <Text className="text-black">tel</Text>
            <TextInput
              placeholder="+212X XXX XXX XXX"
              keyboardType="numbers-and-punctuation"
              autoCapitalize="none"
              className="text-[#007AFF] w-full border-b-2 border-[#007AFF] h-10"
              value={tele as string}
              onChangeText={(tele) => settele(tele)}
            />
          </View>
          <View className="mb-8">
            <Text className="text-black">Email</Text>
            <View className="w-full border-b-2 border-[#b3b3b3] h-10 justify-end">
              <Text className="text-[#b3b3b3] mb-2">{context.user?.email}</Text>
            </View>
          </View>
          <View className="mb-8">
            <Text className="text-black">Magasin</Text>
            <View className="w-full border-b-2 border-[#b3b3b3] h-10 justify-end">
              <Text className="text-[#b3b3b3] mb-2">
                {context.user?.magasin}
              </Text>
            </View>
          </View>
          <View className="mb-8">
            <Text className="text-black">City</Text>
            <View className="w-full border-b-2 border-[#b3b3b3] h-10 justify-end">
              <Text className="text-[#b3b3b3] mb-2">
                {context.user?.city_name}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {(!isKeyboardVisible || Platform.OS === "ios") && (
        <>
          <View className="absolute bottom-[11%] w-[70%] rounded-full py-3">
            <Text className="text-red-400">
              {error}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => saveChanges()}
            className="absolute bottom-[5%] w-[70%] rounded-full py-3"
            style={{ backgroundColor: "rgba(12, 25, 47, 1)" }}
          >
            <Text
              className="text-white text-xl font-semibold
          text-center"
            >
              Save changes
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default User;
