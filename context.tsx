import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ChatHistoryType, Choice, User } from "./app/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AppContextProps = {
  inpuType: "valid" | "notValid" | "text";
  setInpuType: (input: "valid" | "notValid" | "text") => void;
  isFocused: boolean;
  setIsFocused: (input: boolean) => void;
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
  loggedIn: boolean;
  isLoggedIn: (input: boolean) => void;
  accessToken: string;
  setAccessToken: (input: string) => void;
  storeAccessToken: (input: string, user: User) => void;
  getAccessToken: () => void;
  user: User | null;
  setUser: (input: User | null) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // set the accest token to the state

  useEffect(() => {
    getAccessToken();
    getUser();
  }, []);

  const [inpuType, setInpuType] = useState<"valid" | "notValid" | "text">(
    "notValid"
  );
  const [isFocused, setIsFocused] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState("1");
  const [prevMsgs, setPrevMsgs] = useState<ChatHistoryType>([]);
  const [choice, setchoice] = useState<Choice | null>(null);
  const [prevMsgsWithoutLastItem, setPrevMsgsWithoutLastItem] =
    useState<ChatHistoryType>([]);
  const [input, setInput] = useState("");
  const [loggedIn, isLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const storeAccessToken = async (accessToken: string, user: User) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setAccessToken(accessToken);
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token !== null) {
        setAccessToken(token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }

      return user != null ? JSON.parse(user) : null;
    } catch (e) {}
  };

  const contextValue: AppContextProps = {
    inpuType,
    setInpuType,
    isFocused,
    setIsFocused,
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
    loggedIn,
    isLoggedIn,
    accessToken,
    setAccessToken,
    storeAccessToken,
    getAccessToken,
    user,
    setUser,
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
