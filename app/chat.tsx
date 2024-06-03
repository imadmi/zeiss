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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 relative bg-white"
    >
      <Header />
      <ChatBubbel />
      {/* {context.inpuType === "notValid" && <Validation />}
      {context.inpuType === "valid" && <Text> valid </Text>}
      {context.inpuType === "text" && <TextInputComp />} */}
      {/* <TextInputComp /> */}
      {/* <Validation /> */}
    </KeyboardAvoidingView>
  );
};

export default Chat;

const TextInputComp = ({ addMessage, input, setInput }: any) => {
  const context = useAppContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`w-full h-12 justify-center items-center z-10 ${
        isFocused ? "bottom-2 mt-0" : "bottom-10 mt-10"
      }`}
    >
      <View
        className={`w-[95%] h-full flex-row justify-between items-center border-2 border-gray-400 
       rounded-full shadow-md m-3 px-4 bg-white`}
      >
        <TextInput
          onChangeText={(text) => setInput(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`max-w-[90%]`}
          value={input}
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

const Validation = () => {
  const [validation, setValidation] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("clicked!");
      }}
      className={`w-full h-12 bottom-10 justify-center items-center z-10`}
    >
      <View
        className={`w-5/6 h-full flex-row justify-center items-center
        ${validation ? "bg-[#0C192F]" : "bg-gray-400"} 
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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
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
          <LottieView
            autoPlay
            style={{
              width: 60,
              height: 40,
              backgroundColor: "#EBF0FF",
              borderRadius: 12,
              marginBottom: 8,
            }}
            source={require("../assets/icons/loadingC.json")}
          />
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
import { ChatHistoryType, ChatType, Choice } from "./chatTypes";
import { useAppContext } from "@/context";
import LottieView from "lottie-react-native";

const ChatBubbel = () => {
  const [currentMessageId, setCurrentMessageId] = useState("1");
  const currentMessage = chatData.find((msg) => msg.id === currentMessageId);
  const scrollViewRef = useRef<ScrollView>(null);

  const [prevMsgs, setPrevMsgs] = useState<ChatHistoryType>([]);
  const [choice, setchoice] = useState<Choice | null>(null);
  const [prevMsgsWithoutLastItem, setPrevMsgsWithoutLastItem] =
    useState<ChatHistoryType>([]);

  useEffect(() => {
    const newMessage = chatData.find((msg) => msg.id === currentMessageId);
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

      const lastObject = prevMsgs[prevMsgs.length - 1];

      if (lastObject) {
        const lastObjectWithClick = {
          ...lastObject,
          choices: lastObject.choices.map((choix) => {
            if (choice && choix.choiceId === choice.choiceId) {
              return { ...choix, clicked: true };
            } else {
              return { ...choix, clicked: false };
            }
          }),
        };

        setPrevMsgs((prevMsgs) => [
          ...prevMsgs.slice(0, -1),
          lastObjectWithClick,
        ]);

        // console.log("newMessage :\n");
        // console.log(JSON.stringify(lastObjectWithClick, undefined, 2));

        setPrevMsgs((prevMsgs) => [...prevMsgs, newMessageWithClick]);
        // setPrevMsgsWithoutLastItem((prevMsgs) => prevMsgs.slice(0, -1));
        // setPrevMsgsWithoutLastItem((prevMsgs) => prevMsgs.slice(0,prevMsgs.length ));
      } else {
        setPrevMsgs((prevMsgs) => [...prevMsgs, newMessageWithClick]);
      }
    }
  }, [currentMessageId, choice]);

  useEffect(() => {
    // setPrevMsgsWithoutLastItem([...prevMsgs.slice(0, prevMsgs.length - 1)]);
    setPrevMsgsWithoutLastItem([...prevMsgs.slice(0, prevMsgs.length)]);
  }, [prevMsgs]);

  const handleChoiceSelected = (choice: any) => {
    setchoice(choice);
    setCurrentMessageId(choice.next_msg_id);
  };

  const [input, setInput] = useState("");

  const addMessage = () => {
    const message = {
      id: "1",
      message: input,
      sender: true,
      avatar:
        "https://play-lh.googleusercontent.com/jQme0II-P0joIy0VBanDAY7RyccZvP4c6A7us6t3oGzcnNOvc6KcfS05m7Gq8jUOR-s=w480-h960-rw",
      choices: [],
    };
    setPrevMsgs((prevMsgs) => [...prevMsgs, message]);
    setInput("");
  };

  const context = useAppContext();

  // useEffect(() => {
  //   if (currentMessage?.choices.length === 0) {
  //     context.setInpuType("text");
  //   } else {
  //     context.setInpuType("notValid");
  //   }
  // }, [currentMessage]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {prevMsgsWithoutLastItem.map((msg, index) => (
          <ChatMessage
            key={index}
            isLastitem={index === prevMsgsWithoutLastItem.length - 1}
            history={true}
            sender={msg.sender}
            message={msg.message}
            avatar={msg.avatar}
            choices={msg.choices}
            onChoiceSelected={handleChoiceSelected}
          />
        ))}

        {/* {currentMessage && (
        <ChatMessage
        history={false}
        message={currentMessage.message}
        avatar={currentMessage.avatar}
        choices={currentMessage.choices}
        onChoiceSelected={handleChoiceSelected}
        />
      )} */}
      </ScrollView>
      <TextInputComp
        addMessage={addMessage}
        input={input}
        setInput={setInput}
      />
    </>
  );
};
