import React, { useEffect, useState } from "react";
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
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Signin = () => {
  const windowHeight = Dimensions.get("window").height;
  const context = useAppContext();
  const [issecurepass, setIssecurepass] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const signin = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      let body = {
        email: email,
        password: password,
      };

      const result = await fetch(
        `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/login`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );

      // imad@gmail.com imad@gmail.com
      // m@gmail.com mmmmmmmm

      const res = await result.json();
      // console.log(JSON.stringify(res, null, 2)); //

      if (res.message) {
        seterror(res.message.split(".")[0]);
      }
      if (res.success === true) {
        router.push("(tabs)/home");
        context.isLoggedIn(true);
        context.storeAccessToken(res.access_token, res.user);
        seterror("");
        return;
      }
    } catch (error: any) {
      if (error.message) seterror(error.message.split(".")[0]);
    }
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../assets/icons/homebackground.png")}
        contentFit="fill"
        className={`absolute top-0 left-0 w-full h-full 
          ${!isKeyboardVisible ? "-translate-y-52 " : ""} 
          ${
            isKeyboardVisible && Platform.OS !== "ios" ? "-translate-y-44" : ""
          } 
          ${
            isKeyboardVisible && Platform.OS === "ios" ? "-translate-y-72 " : ""
          }`}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
        className={`flex-1 ${
          windowHeight > 700 && !isKeyboardVisible ? "pt-[50%]" : "pt-[40%]"
        }  items-center`}
      >
        <Text className="text-white text-4xl font-bold">
          {t("signin.sign_in")}
        </Text>

        <View className="w-full items-center">
          <View className="mt-[50%] w-full items-center">
            <View className="pb-2 border-b border-[#007AFF] w-[80%] flex-row">
              <Feather name="mail" size={20} color="#007AFF" />
              <TextInput
                placeholder={t("signin.email_placeholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                className="ml-3 text-[#007AFF] w-full"
                value={email}
                onChangeText={(email) => setemail(email)}
              />
            </View>
            <View className="mt-6 pb-2 border-b border-[#007AFF] w-[80%] flex-row justify-between">
              <View className="flex-row justify-start">
                <AntDesign name="lock" size={24} color="#007AFF" />
                <TextInput
                  placeholder={t("signin.password_placeholder")}
                  secureTextEntry={!issecurepass}
                  autoCapitalize="none"
                  className="ml-[10px] text-[#007AFF] w-[80%]"
                  value={password}
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
            {error !== "" && (
              <View className="w-[80%] mt-2 flex-row items-center">
                <MaterialIcons
                  name="report-gmailerrorred"
                  size={22}
                  color="rgb(248 113 113)"
                />
                <Text className="text-red-400 ml-1">{error}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => router.push("Forgotpass")}
              className="w-[80%] mt-6 items-end"
            >
              <Text className="text-[#007AFF]  ml-1">
                {t("signin.forgot_password")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {(!isKeyboardVisible || Platform.OS === "ios") && (
          <>
            <TouchableOpacity
              onPress={() => {
                signin();
              }}
              className="absolute bottom-[20%] w-[80%] bg-[#007AFF] 
          rounded-full py-3"
            >
              <Text
                className="text-white text-2xl font-semibold
          text-center"
              >
                {t("signin.sign_in_button")}
              </Text>
            </TouchableOpacity>

            <View className="absolute bottom-[10%] w-[80%] flex-row justify-center">
              <Text className="text-gray-500 text-center text-md">
                {t("signin.no_account")}
              </Text>
              <TouchableOpacity onPress={() => router.push("Signup")}>
                <Text className="text-[#007AFF] text-center text-md ml-2 font-semibold">
                  {t("signin.sign_up")}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signin;
