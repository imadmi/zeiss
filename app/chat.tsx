import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Image } from "expo-image";

const Chat = () => {
  const context = useAppContext();

  useEffect(() => {
    const currentMessage = context.prevMsgs[context.prevMsgs.length - 1];

    if (
      currentMessage?.choices.length === 0 &&
      currentMessage?.sender === false
    ) {
      context.setInpuType("text");
    } else if (context.inpuType === "text" && currentMessage?.sender === true) {
      context.setInpuType("valid");
    } else if (
      currentMessage?.choices.length &&
      currentMessage?.choices.length > 0
    ) {
      context.setInpuType("notValid");
    }
  }, [context.prevMsgs]);
  return (
    <View
      className={`flex-1 relative bg-white
      ${Platform.OS === "ios" ? "mb-2" : "pb-20"}
      `}
    >
      <Header />
      <ChatBubbel />
      {context.inpuType === "notValid" && <Validation />}
      {context.inpuType === "valid" && <Text> valid </Text>}
      {context.inpuType === "text" && <TextInputComp />}

      {/* <TextInputComp /> */}
      {/* <Validation /> */}
    </View>
  );
};

export default Chat;

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
    context.setPrevMsgs(
      // (prevMsgs : ChatMessageHistory[]) =>
      [...context.prevMsgs, message]
    );
    context.setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
      className={`w-full h-12 justify-center items-center z-10
      ${context.isFocused ? "bottom-2 mt-0" : "bottom-10 mt-10"}
      ${Platform.OS === "ios" ? " relative " : "absolute "}
      `}
    >
      <View
        className={`w-[95%] h-12 flex-row justify-between items-center border-2 border-gray-400 
       rounded-full shadow-md m-3 px-4 bg-white`}
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

const Validation = ({valid} : { valid? : boolean}) => {
  const context = useAppContext();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("clicked!");
      }}
      className={`w-full h-12 bottom-10 justify-center items-center z-10
      ${Platform.OS === "ios" ? " relative " : "absolute "}
      `}
    >
      <View
        className={`w-5/6 h-full flex-row justify-center items-center
        ${context.validation ? "bg-[#0C192F]" : "bg-gray-400"} 
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

const Header = () => {
  return (
    <View
      className="w-full h-28 relative"
      style={{
        backgroundColor: "rgba(12, 25, 47, 1)",
      }}
    >
      <View
        className="absolute top-0 left-0  h-14 w-full flex-row items-center 
        justify-between"
        style={{
          backgroundColor: "rgba(12, 25, 47, 1)",
        }}
      >
        <Text className="text-white font-semibold ml-6 text-lg">Zeiss</Text>
        <MaterialCommunityIcons
          name="bell-ring-outline"
          size={24}
          color="white"
          style={{
            marginRight: 24,
          }}
        />
      </View>
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
          <Text className="text-white font-semibold text-xl">Chat Bot</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

import chatData from "./chatData";
import {
  ChatHistoryType,
  ChatMessageHistory,
  ChatType,
  Choice,
} from "./chatTypes";
import { useAppContext } from "@/context";
import LottieView from "lottie-react-native";

const ChatBubbel = () => {
  const context = useAppContext();

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const newMessage = chatData.find(
      (msg) => msg.id === context.currentMessageId
    );
    if (newMessage) {
      const newMessageWithClick = {
        ...newMessage,
        choices: newMessage.choices.map((choice) => {
          return {
            ...choice,
            clicked: false,
          };
        }),
      };

      const lastObject = context.prevMsgs[context.prevMsgs.length - 1];

      if (lastObject) {
        const lastObjectWithClick: ChatMessageHistory = {
          ...lastObject,
          choices: lastObject.choices.map((choix) => {
            if (context.choice && choix.choiceId === context.choice.choiceId) {
              return { ...choix, clicked: true };
            } else {
              return { ...choix, clicked: false };
            }
          }),
        };

        // console.log("newMessage :\n");
        // console.log(JSON.stringify(lastObjectWithClick, undefined, 2));

        context.setPrevMsgs([
          ...context.prevMsgs.slice(0, -1),
          lastObjectWithClick,
          newMessageWithClick,
        ]);
      } else {
        context.setPrevMsgs([...context.prevMsgs, newMessageWithClick]);
      }
    }
  }, [context.currentMessageId, context.choice]);

  useEffect(() => {
    context.setPrevMsgsWithoutLastItem([...context.prevMsgs]);
  }, [context.prevMsgs]);

  const handleChoiceSelected = (choice: any) => {
    context.setchoice(choice);
    context.setCurrentMessageId(choice.next_msg_id);
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {context.prevMsgsWithoutLastItem.map((msg, index) => (
          <ChatMessage
            key={index}
            isLastitem={index === context.prevMsgsWithoutLastItem.length - 1}
            history={true}
            sender={msg.sender}
            message={msg.message}
            avatar={msg.avatar}
            choices={msg.choices}
            onChoiceSelected={handleChoiceSelected}
          />
        ))}
      </ScrollView>
    </>
  );
};
