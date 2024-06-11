import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image } from "expo-image";
import { useAppContext } from "@/context";
import LottieView from "lottie-react-native";

const ChatMessage = ({
  history,
  message,
  sender,
  avatar,
  choices,
  onChoiceSelected,
}: any) => {
  const context = useAppContext();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <View className={`${sender === false ? "flex-row " : "flex-row-reverse"}`}>
      <View className={`${sender === false ? "m-4 mr-0" : "m-4 mt-1 ml-0 "}`}>
        <Image
          id="avatar"
          source={{ uri: avatar }}
          contentFit="cover"
          className="w-12 h-12 rounded-full"
        />
      </View>
      <View
        className={`m-4 mt-2 #flex-1 ${sender === false ? "pr-20 " : "pl-20"}`}
      >
        {isVisible && sender === false && (
          <View className="rounded-xl bg-[#EBF0FF] my-2">
            <LottieView
              autoPlay
              style={{
                width: 60,
                height: 40,
              }}
              source={require("../assets/icons/loadingC.json")}
            />
          </View>
        )}

        {!(isVisible && sender === false) && (
          <>
            {message === "" ? null : (
              <View className="bg-[#EBF0FF] rounded-xl p-3 mb-2">
                <Text className=" font-semibold text-sm ">{message}</Text>
              </View>
            )}
            <View className="">
              {choices.map((choice: any) => (
                <TouchableOpacity
                  key={choice.choiceId}
                  onPress={() => onChoiceSelected(choice)}
                  className={`${
                    history === true && choice.clicked === true
                      ? "bg-[#253A5E]"
                      : "bg-[#EBF0FF]"
                  }  rounded-md py-3 px-4 my-1 shadow-sm self-start`}
                >
                  <Text
                    className={`text-sm font-[800] ${
                      history === true && choice.clicked === true
                        ? "text-white"
                        : "text-black"
                    }  ]`}
                  >
                    {choice.choice}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ChatMessage;
