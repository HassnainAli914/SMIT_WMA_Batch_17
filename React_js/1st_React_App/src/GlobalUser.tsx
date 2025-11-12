import { createContext } from "react";

type SignContextType = {
  sign: string;
  setSign: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalUser = createContext<SignContextType | undefined>(undefined);
export default GlobalUser;
