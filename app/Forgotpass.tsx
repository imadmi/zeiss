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
} from "react-native";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Signin = () => {
  const { t } = useTranslation();
  const context = useAppContext();
  const windowHeight = Dimensions.get("window").height;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [issecurepassold, setIssecurepassold] = useState(false);
  const [issecurepassnew, setIssecurepassnew] = useState(false);
  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [error, seterror] = useState("");

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
  const accessToken = context.accessToken;

  const signin = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      let body = {
        new_password: new_password,
        old_password: old_password,
      };

      const result = await fetch(
        `${process.env.EXPO_PUBLIC_API_BACKEND}/api/app/change-password`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );

      const res = await result.json();
      console.log(JSON.stringify(res, null, 2)); //
      seterror(res.message.split(".")[0]);
      if (res.success === true) {
        router.push("(tabs)/home");
        seterror("");
        return;
      }
    } catch (error: any) {
      seterror(error.message.split(".")[0]);
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
                isKeyboardVisible && Platform.OS !== "ios"
                  ? "-translate-y-44"
                  : ""
              } 
              ${
                isKeyboardVisible && Platform.OS === "ios"
                  ? "-translate-y-72 "
                  : ""
              }         `}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-16 left-5 z-10"
        accessibilityLabel={t("signIn.backButton")}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
        className={`flex-1 ${
          windowHeight > 700 && !isKeyboardVisible ? "pt-[50%]" : "pt-[40%]"
        }  items-center`}
      >
        <Text className="text-white text-4xl font-bold">
          {t("signIn.changePassword")}
        </Text>

        <View className="w-full items-center">
          <View className="mt-[50%] w-full items-center">
            <View className="mt-6 pb-2 border-b border-[#007AFF] w-[80%] flex-row justify-between">
              <View className="flex-row justify-start">
                <AntDesign name="lock" size={24} color="#007AFF" />
                <TextInput
                  placeholder={t("signIn.oldPasswordPlaceholder")}
                  secureTextEntry={!issecurepassold}
                  autoCapitalize="none"
                  className="ml-[10px] text-[#007AFF] w-[80%]"
                  value={old_password}
                  onChangeText={(old_password) => setold_password(old_password)}
                />
              </View>
              {issecurepassold ? (
                <Feather
                  name="eye"
                  size={20}
                  color="#007AFF"
                  onPress={() => setIssecurepassold(!issecurepassold)}
                />
              ) : (
                <Feather
                  name="eye-off"
                  size={20}
                  color="#007AFF"
                  onPress={() => setIssecurepassold(!issecurepassold)}
                />
              )}
            </View>
            <View className="mt-6 pb-2 border-b border-[#007AFF] w-[80%] flex-row justify-between">
              <View className="flex-row justify-start">
                <AntDesign name="lock" size={24} color="#007AFF" />
                <TextInput
                  placeholder={t("signIn.newPasswordPlaceholder")}
                  secureTextEntry={!issecurepassnew}
                  autoCapitalize="none"
                  className="ml-[10px] text-[#007AFF] w-[80%]"
                  value={new_password}
                  onChangeText={(new_password) => setnew_password(new_password)}
                />
              </View>
              {issecurepassnew ? (
                <Feather
                  name="eye"
                  size={20}
                  color="#007AFF"
                  onPress={() => setIssecurepassnew(!issecurepassnew)}
                />
              ) : (
                <Feather
                  name="eye-off"
                  size={20}
                  color="#007AFF"
                  onPress={() => setIssecurepassnew(!issecurepassnew)}
                />
              )}
            </View>
            {error !== "" && (
              <View className="w-[80%] mt-2 flex-row items-center">
                <MaterialIcons
                  name="report-gmailerrorred"
                  size={22}
                  color="rgb(248 113 113)"
                  accessibilityLabel={t("signIn.errorIconDescription")}
                />
                <Text className="text-red-400 ml-1">{error}</Text>
              </View>
            )}
          </View>
        </View>
        {(!isKeyboardVisible || Platform.OS === "ios") && (
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
              {t("signIn.applyButton")}
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signin;
