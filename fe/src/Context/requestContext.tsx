import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface IRequest {
  id: never;
  name: string;
  email: string;
  quantity: number;
}

interface RequestContextType {
  loading: boolean;
  allRequest: IRequest[];
}

// Create a context
const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function useRequestContext() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequestContext must be used within a RequestProvider");
  }
  return context;
}

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allRequest, setAllRequest] = useState<IRequest[]>([]);

  useEffect(() => {
    const getRequestData = async () => {
      try {
        const response = await axios.get<IRequest[]>(
          "http://localhost:8000/request"
        );
        setLoading(false);
        setAllRequest(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRequestData();
  }, []);

  const requestValue: RequestContextType = {
    loading,
    allRequest,
  };

  return (
    <RequestContext.Provider value={requestValue}>
      {children}
    </RequestContext.Provider>
  );
}
