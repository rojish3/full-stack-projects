// ProductContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";

export interface IProduct {
  id: never;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
}

interface ProductContextType {
  loading: boolean;
  allProduct: IProduct[];
}

// Create a context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const { apiData, isLoading } = useFetch("http://localhost:8000/product");

  useEffect(() => {
    setAllProduct(apiData);
    setLoading(isLoading);
  }, [apiData, isLoading]);

  const contextValue: ProductContextType = {
    loading,
    allProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
