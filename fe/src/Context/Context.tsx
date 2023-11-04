// ProductContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";

export interface IUser {
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  role?: string;
  image: string;
}

interface AllUserContextType {
  loading: boolean;
  allUser: IUser[];
}

// Create a context
const AllUserContext = createContext<AllUserContextType | undefined>(undefined);

export function useAllUserContext() {
  const context = useContext(AllUserContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export function AllUserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allUser, setAllUser] = useState<IUser[]>([]);
  const { isLoading, apiData } = useFetch("http://localhost:8000/user");

  useEffect(() => {
    setAllUser(apiData);
    setLoading(isLoading);
  }, [apiData, isLoading]);

  const contextValue: AllUserContextType = {
    loading,
    allUser,
  };

  return (
    <AllUserContext.Provider value={contextValue}>
      {children}
    </AllUserContext.Provider>
  );
}
