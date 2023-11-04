import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  // const token = localStorage.getItem("token");
  // const axiosInstance = axios.create({
  //   baseURL: "http://localhost:8000",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
        const data = await resp?.data;
        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { isLoading, apiData, serverError };
};

export default useFetch;
