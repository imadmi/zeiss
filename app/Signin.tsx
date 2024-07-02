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
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Signin = () => {
  const windowHeight = Dimensions.get("window").height;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [issecurepass, setIssecurepass] = useState(false);

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

  return (
    <View className="flex-1 ">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("../assets/icons/homebackground.png")}
        contentFit="fill"
        className={`absolute top-0 left-0 w-full h-full 
            ${!isKeyboardVisible ? "-translate-y-44" : "-translate-y-72"} 
        `}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
        className={`flex-1 ${
          windowHeight > 700 && !isKeyboardVisible ? "pt-[60%]" : "pt-[40%]"
        }  items-center`}
      >
        <Text className="text-white text-4xl font-bold">SIGN IN</Text>

        <View className="w-full items-center ">
          <View className="mt-[50%] w-full items-center ">
            <View className="pb-2 border-b border-[#007AFF] w-[80%] flex-row">
              <Feather name="mail" size={20} color="#007AFF" />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="ml-3 text-[#007AFF] w-full"
              />
            </View>
            <View className="mt-6 pb-2 border-b border-[#007AFF] w-[80%] flex-row justify-between">
              <AntDesign name="lock" size={24} color="#007AFF" />
              <TextInput
                placeholder="Password"
                secureTextEntry={!issecurepass}
                autoCapitalize="none"
                className="ml-3 text-[#007AFF] w-[80%]"
              />
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
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {}}
          className="absolute bottom-[20%] w-[80%] bg-[#007AFF] 
        rounded-full py-3"
        >
          <Text
            className="text-white text-2xl font-semibold
          text-center"
          >
            SIGN IN
          </Text>
        </TouchableOpacity>

        <View className="absolute bottom-[10%] w-[80%] flex-row justify-center">
          <Text className="text-gray-500 text-center text-md">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('Signup')}>
            <Text className="text-[#007AFF] text-center text-md ml-2 font-semibold">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signin;
