import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: string;
}

interface UserContextValue {
  userInfo: UserInfo | null;
  updateUser: (newUserInfo: UserInfo | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    // Initialize userInfo from localStorage or set it to null
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  useEffect(() => {
    // Whenever userInfo changes, store it in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const updateUser = (newUserInfo: UserInfo | null) => {
    setUserInfo(newUserInfo);
  };

  const clearUser = () => {
    updateUser(null);
  };

  const value: UserContextValue = {
    userInfo,
    updateUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
