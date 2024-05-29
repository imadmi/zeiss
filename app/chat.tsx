import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Image } from "expo-image";

const Chat = () => {
  return (
    <View className="flex-1 relative bg-white">
      <Header />
      <Validation />
      <ChatBubbel />
    </View>
  );
};

export default Chat;

const Validation = () => {
  const [validation, setValidation] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("clicked!");
      }}
      className={`w-full h-12 absolute bottom-10 justify-center items-center`}
    >
      <View
        className={`w-5/6 h-full flex-row justify-center items-center
        ${validation ? "bg-[#0C192F]" : "bg-gray-400"} 
        rounded-full shadow-md`}
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

const ChatMessage = ({ message, avatar, choices, onChoiceSelected }: any) => {
  return (
    <View className="flex-row ">
      <View className="m-4 mr-0">
        <Image
          id="avatar"
          source={{ uri: avatar }}
          contentFit="cover"
          className="w-12 h-12 rounded-full"
        />
      </View>
      <View className="m-4 flex-1">
        <View className="bg-[#EBF0FF] rounded-xl p-3 mb-2 ">
          <Text className=" font-semibold text-sm ">{message}</Text>
        </View>
        <View className="">
          {choices.map((choice: any) => (
            <TouchableOpacity
              key={choice.choiceId}
              onPress={() => onChoiceSelected(choice.next_msg_id)}
              className="bg-[#EBF0FF] rounded-md py-3 px-4 my-1 shadow-sm self-start"
            >
              <Text className="text-sm font-[800]">{choice.choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

import chatData from "./chatData";
import { ChatType } from "./chatTypes";

const ChatBubbel = () => {
  const [currentMessageId, setCurrentMessageId] = useState("1");
  const currentMessage = chatData.find((msg) => msg.id === currentMessageId);

  const [prevMsgs, setprevMsgs] = useState<ChatType>([]);

  useEffect(() => {
    const newMessage = chatData.find((msg) => msg.id === currentMessageId);
    if (newMessage) {
      setprevMsgs((prevMsgs) => [...prevMsgs, newMessage]);
    }
  }, [currentMessageId]);

  const handleChoiceSelected = (next_msg_id: any) => {
    if (next_msg_id.startsWith("http")) {
      // Linking.openURL(next_msg_id);
    } else {
      setCurrentMessageId(next_msg_id);
    }
  };

  return (
    <ScrollView className="h-4/6">
      {
        prevMsgs.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            avatar={msg.avatar}
            choices={msg.choices}
            onChoiceSelected={handleChoiceSelected}
          />
        ))
      }
      
      {currentMessage && (
        <ChatMessage
          message={currentMessage.message}
          avatar={currentMessage.avatar}
          choices={currentMessage.choices}
          onChoiceSelected={handleChoiceSelected}
        />
      )}
    </ScrollView>
  );
};
