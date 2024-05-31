import { User } from "firebase/auth";
import { createContext } from "react";

type ContextType = {
  user: User | null;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
  isMounted: boolean
}

export const AuthContext = createContext<ContextType>({} as ContextType) 
