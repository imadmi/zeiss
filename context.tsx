import { createContext, useContext, useState, ReactNode } from "react";
import { ChatHistoryType, Choice } from "./app/chatTypes";

type AppContextProps = {
  inpuType: "valid" | "notValid" | "text";
  setInpuType: (input: "valid" | "notValid" | "text") => void;
  isFocused: boolean;
  setIsFocused: (input: boolean) => void;
  validation: boolean;
  setValidation: (input: boolean) => void;
  currentMessageId: string;
  setCurrentMessageId: (input: string) => void;
  prevMsgs: ChatHistoryType;
  setPrevMsgs: (input: ChatHistoryType) => void;
  choice: Choice | null;
  setchoice: (input: Choice | null) => void;
  prevMsgsWithoutLastItem: ChatHistoryType;
  setPrevMsgsWithoutLastItem: (input: ChatHistoryType) => void;
  input: string;
  setInput: (input: string) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [inpuType, setInpuType] = useState<"valid" | "notValid" | "text">(
    "notValid"
  );
  const [isFocused, setIsFocused] = useState(false);
  const [validation, setValidation] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState("1");
  const [prevMsgs, setPrevMsgs] = useState<ChatHistoryType>([]);
  const [choice, setchoice] = useState<Choice | null>(null);
  const [prevMsgsWithoutLastItem, setPrevMsgsWithoutLastItem] =
    useState<ChatHistoryType>([]);
  const [input, setInput] = useState("");

  const contextValue: AppContextProps = {
    inpuType,
    setInpuType,
    isFocused,
    setIsFocused,
    validation,
    setValidation,
    currentMessageId,
    setCurrentMessageId,
    prevMsgs,
    setPrevMsgs,
    choice,
    setchoice,
    prevMsgsWithoutLastItem,
    setPrevMsgsWithoutLastItem,
    input,
    setInput,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
