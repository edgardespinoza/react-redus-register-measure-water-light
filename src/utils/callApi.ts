import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./constants";

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const callAPI = async <T>(resource: string): Promise<T> => {
  const response = await axios.get(`${BASE_URL}/${resource}`, config);
  return response.data;
};
