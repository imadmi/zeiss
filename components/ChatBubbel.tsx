import { ScrollView } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChatMessageHistory } from "../app/types";
import { useAppContext } from "@/context";
import ChatMessage from "@/components/ChatMessage";
import chatData from "@/app/chatData";

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

export default ChatBubbel;
