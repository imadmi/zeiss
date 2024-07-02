import { View, Platform } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppContext } from "@/context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "@/components/Modal";
import TextInputComp from "@/components/TextInputComp";
import Validation from "@/components/Validation";
import Header from "@/components/Header";
import ChatBubbel from "@/components/ChatBubbel";

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

  return (
    <GestureHandlerRootView>
      <View className={`flex-1 relative bg-white`}>
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
