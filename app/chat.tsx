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
  Dimensions,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useRouter } from "expo-router";
import { Image } from "expo-image";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BlurView } from "expo-blur";

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

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomSheetRef = useRef<any>(null);

  const openBottomSheet = () => {
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  };

  const height = Dimensions.get("window").height - 112;
  return (
    <GestureHandlerRootView>
      <View
        className={`flex-1 relative bg-white
       ${Platform.OS === "ios" ? "#pb-2" : "#pb-20"}
      `}
      >
        <Header />
        <View
          className={`
          ${Platform.OS === "ios" ? "flex-1 justify-end" : "flex-1 justify-end"}
          `}
        >
          <ChatBubbel />
          {context.inpuType === "notValid" && <Validation />}
          {context.inpuType === "valid" && (
            <Validation valid openBottomSheet={openBottomSheet} />
          )}
          {context.inpuType === "text" && <TextInputComp />}
        </View>

        <Modal
          bottomSheetRef={bottomSheetRef}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Chat;

const Modal = ({ bottomSheetRef, isSheetOpen, setIsSheetOpen }: any) => {
  const snapPoints = useMemo(() => ["50%", "60%"], []);

  const closeBottomSheet = () => {
    setIsSheetOpen(false);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    closeBottomSheet();
  }, []);

  const screenHeight = Dimensions.get("window").height;
  const calculatedIconSize = screenHeight * (6 / 100);
  return (
    <>
      {isSheetOpen && (
        <>
          <BlurView
            intensity={10}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,50,150,0.5)",
            }}
          />
          <BottomSheet
            ref={bottomSheetRef}
            // onClose={() => setIsSheetOpen(false)}
            snapPoints={snapPoints}
            index={0}
            style={{ zIndex: 20, elevation: 20 }}
            handleStyle={{
              display: "none",
            }}
          >
            <View className="flex-1">
              <View className="w-full h-[40%] bg-[#0C192F] rounded-t-xl items-center">
                <View className="mt-[4%] items-center">
                  <Ionicons
                    name="checkmark-done-sharp"
                    size={calculatedIconSize}
                    color="white"
                  />
                  <View className="w-[70%] mt-[4%]">
                    <Text className="text-white text-xl text-center">
                      Nous avons bien reçu votre commande
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 py-4 px-6 ">
                <Text className="text-lg">Commande N°</Text>
                <Text className="text-2xl font-semibold">234/77494</Text>
                <View className="items-center">
                  <TouchableOpacity
                    onPress={closeBottomSheet}
                    className="w-[90%] mt-[7%] bg-[#0C192F] flex-row justify-center p-3 
                rounded-full space-x-4 items-center"
                  >
                    <Text className="text-white text-center text-lg">
                      Nouvelle commande ?
                    </Text>
                    <SimpleLineIcons name="refresh" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.back();
                    }}
                    className="w-[90%] mt-[4%] border border-[#0C192F] flex-row p-[10px] 
              rounded-full space-x-4 items-center justify-center"
                  >
                    <Text className="text-[#0C192F] text-center text-lg">
                      Accéder à l’accueil
                    </Text>
                    <MaterialCommunityIcons
                      name="home"
                      size={26}
                      color="#0C192F"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BottomSheet>
        </>
      )}
    </>
  );
};

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

  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     UIManager.setLayoutAnimationEnabledExperimental &&
  //       UIManager.setLayoutAnimationEnabledExperimental(true);
  //   }

  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //       console.log("keyboardDidShow");
  //       context.setIsFocused(true);
  //     }
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     () => {
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //       console.log("keyboardDidHide");
  //       context.setIsFocused(false);
  //     }
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

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

const Validation = ({
  valid,
  openBottomSheet,
}: {
  valid?: boolean;
  openBottomSheet?: () => void;
}) => {
  const handleClick = () => {
    if (valid) {
      openBottomSheet && openBottomSheet();
    } else {
      console.log("not valid");
    }
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className={`w-full h-12 bottom-10 justify-center items-center mt-10
        `}
        // ${Platform.OS === "ios" ? " relative " : "absolute "}
    >
      <View
        className={`w-5/6 h-full flex-row justify-center items-center
        ${valid ? "bg-[#0C192F]" : "bg-gray-400"} 
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
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        className={`pb-6`}
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
