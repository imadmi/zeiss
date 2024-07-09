import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  UIManager,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Signup = () => {
  const windowHeight = Dimensions.get("window").height;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [issecurepass, setIssecurepass] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [magasin, setmagasin] = useState("");
  const [lname, setlname] = useState("");
  const [fname, setfname] = useState("");
  const [city_id, setcity_id] = useState("");
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

  const signup = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      let body = {
        password: password,
        magasin: magasin,
        lname: lname,
        fname: fname,
        city_id: city_id,
        email: email,
      };

      const result = await fetch(
        `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/do-register`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );

      const res = await result.json();
      console.log(JSON.stringify(res, null, 2)); //
      seterror(res.message);

      if (res.success === false) {
        return;
      }
      if (res.success === true) {
        router.push("(tabs)/home");
        seterror("");
        return;
      }
    } catch (error: any) {
      seterror(error.message);
    }
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../assets/icons/homebackground.png")}
        contentFit="fill"
        className={`absolute top-0 left-0 w-full h-full ${
          !isKeyboardVisible ? "-translate-y-52" : ""
        } ${
          isKeyboardVisible && Platform.OS !== "ios" ? "-translate-y-44" : ""
        } ${
          isKeyboardVisible && Platform.OS === "ios" ? "-translate-y-72" : ""
        }`}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
        className={`flex-1 ${
          windowHeight > 700 && !isKeyboardVisible ? "pt-[50%]" : "pt-[40%]"
        } items-center`}
      >
        <Text className="text-white text-4xl font-bold">
          {t("signup.title")}
        </Text>

        <View className="w-full items-center">
          <View className="mt-[40%] w-full items-center h-[56%]">
            <ScrollView className="flex-1 w-[80%]">
              <View className="pb-2 border-b border-[#007AFF] flex-row">
                <Feather name="user" size={21} color="#007AFF" />
                <TextInput
                  placeholder={t("signup.firstNamePlaceholder")}
                  keyboardType="default"
                  autoCapitalize="none"
                  className="ml-3 text-[#007AFF] w-full"
                  onChangeText={(fname) => setfname(fname)}
                />
              </View>
              <View className="mt-6 pb-2 border-b border-[#007AFF] flex-row">
                <Feather name="user" size={21} color="#007AFF" />
                <TextInput
                  placeholder={t("signup.lastNamePlaceholder")}
                  keyboardType="default"
                  autoCapitalize="none"
                  className="ml-3 text-[#007AFF] w-full"
                  onChangeText={(lname) => setlname(lname)}
                />
              </View>
              <View className="mt-6 pb-2 border-b border-[#007AFF] flex-row">
                <Feather name="mail" size={20} color="#007AFF" />
                <TextInput
                  placeholder={t("signup.emailPlaceholder")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="ml-3 text-[#007AFF] w-full"
                  onChangeText={(mail) => setemail(mail)}
                />
              </View>
              <View className="mt-6 pb-2 border-b border-[#007AFF] flex-row">
                <Entypo name="shop" size={20} color="#007AFF" />
                <TextInput
                  placeholder={t("signup.magasinPlaceholder")}
                  keyboardType="default"
                  autoCapitalize="none"
                  className="ml-3 text-[#007AFF] w-full"
                  onChangeText={(magasin) => setmagasin(magasin)}
                />
              </View>
              <View className="mt-6 pb-2 border-b border-[#007AFF] flex-row">
                <MaterialCommunityIcons name="city" size={24} color="#007AFF" />
                <TextInput
                  placeholder={t("signup.cityPlaceholder")}
                  keyboardType="default"
                  autoCapitalize="none"
                  className="ml-3 text-[#007AFF] w-full"
                  onChangeText={(city) => setcity_id(city)}
                />
              </View>
              <View className="mt-6 pb-2 border-b border-[#007AFF] flex-row justify-between">
                <View className="flex-row justify-start">
                  <AntDesign name="lock" size={24} color="#007AFF" />
                  <TextInput
                    placeholder={t("signup.passwordPlaceholder")}
                    secureTextEntry={!issecurepass}
                    autoCapitalize="none"
                    className="ml-[10px] text-[#007AFF] w-[80%]"
                    onChangeText={(password) => setpassword(password)}
                  />
                </View>
                {issecurepass ? (
                  <Feather
                    name="eye"
                    size={20}
                    color="#007AFF"
                    onPress={() => setIssecurepass(!issecurepass)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={20}
                    color="#007AFF"
                    onPress={() => setIssecurepass(!issecurepass)}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>

        {(!isKeyboardVisible || Platform.OS === "ios") && (
          <>
            <TouchableOpacity
              onPress={() => {
                signup();
              }}
              className="absolute bottom-[20%] w-[80%] bg-[#007AFF] rounded-full py-3"
            >
              <Text className="text-white text-2xl font-semibold text-center">
                {t("signup.signUpButton")}
              </Text>
            </TouchableOpacity>

            <View
              className="absolute bottom-[10%] w-[80%] flex-row
              justify-center"
            >
              <Text className="text-gray-500 text-center text-md">
                {t("signup.alreadyHaveAccount")}
              </Text>
              <TouchableOpacity onPress={() => router.push("Signin")}>
                <Text className="text-[#007AFF] text-center text-md ml-2 font-semibold">
                  {t("signup.signInText")}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;