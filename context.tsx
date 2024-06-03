import { createContext, useContext, useState, ReactNode } from "react";

type AppContextProps = {
  inpuType: "valid" | "notValid" | "text";
  setInpuType: (input: "valid" | "notValid" | "text") => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [inpuType, setInpuType] = useState<"valid" | "notValid" | "text">("notValid");

  const contextValue: AppContextProps = {
    inpuType,
    setInpuType,
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
