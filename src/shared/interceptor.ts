import axios from "axios";
import toast from "./toast";

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const customAxios = axios.create({
  baseURL: `http://localhost:7000`,
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // not showing the error when the error is of cancelled request
    if (error.message != "axios request cancelled"){
      toast.error("Oops, something went wrong!");
    } 
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => onRequest(request),
  (error) => onRequestError(error)
);

customAxios.interceptors.response.use(
  (response) => onResponse(response),
  (error) => onResponseError(error)
);

export default customAxios;
