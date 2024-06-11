import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image } from "expo-image";
import { ChatMessageHistory } from "@/app/chatTypes";
import { useAppContext } from "@/context";

const TextInputComp = () => {
  const context = useAppContext();
  const addMessage = () => {
    const message: ChatMessageHistory = {
      id: "1",
      message: context.input,
      sender: true,
      avatar:
        "https://www.fairtravel4u.org/wp-content/uploads/2018/06/sample-profile-pic.png",
      choices: [],
    };
    context.setPrevMsgs([...context.prevMsgs, message]);
    context.setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      className={`w-full h-12 justify-center items-center
        ${context.isFocused ? "" : "mb-12"}
        `}
    >
      <View
        className={`w-[95%] h-12 flex-row justify-between items-center border-2 border-gray-400 
         rounded-full shadow-md mx-3 px-4 bg-white 
         `}
      >
        <TextInput
          onChangeText={(text) => context.setInput(text)}
          onFocus={() => context.setIsFocused(true)}
          onBlur={() => context.setIsFocused(false)}
          className={`max-w-[90%] w-[90%] h-full`}
          value={context.input}
          placeholder="Message"
          keyboardType="web-search"
        />
        <TouchableOpacity onPress={addMessage} className="ml-4">
          <Image
            id="validation"
            source={require("../assets/icons/validation-arrow.png")}
            contentFit="cover"
            className="w-6 h-6 filter invert"
            style={{ tintColor: "black" }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputComp;
