/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { API_HOST } from "@/constants/api.constant";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IRequestState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: AxiosError<T>;
  data?: T;
}

interface IRequestConfig extends AxiosRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

interface IUseRequest {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: AxiosError<any, any>;
  data?: any;
  makeRequest: (config: IRequestConfig) => Promise<AxiosResponse<any, any>>;
}

const useRequest = (): IUseRequest => {
  const navigate = useRouter();

  const [source] = useState(axios.CancelToken.source());

  const [requestState, setRequestState] = useState<IRequestState<any>>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(
    () => () => {
      requestState.isLoading && source.cancel("This was cancelled!");
    },
    []
  );

  const makeRequest = useCallback(
    async (config: IRequestConfig) => {
      setRequestState({ isLoading: true, isSuccess: false, isError: false });

      const axiosInstance = axios.create({
        baseURL: API_HOST,
        cancelToken: source.token,
      });

      const promise = new Promise<AxiosResponse | AxiosError>((res, rej) => {
        const rejectErr = (error: AxiosError | any) => {
          setRequestState({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error,
          });
          rej(error);
        };

        const request = async () => {
          try {
            const response: AxiosResponse<any> =
              await axiosInstance.request(config);
            setRequestState({
              isLoading: false,
              isSuccess: true,
              isError: false,
              data: response.data,
            });

            res(response);
          } catch (error: AxiosError | any) {
            const { code } = error;
            const networkErrorCodes = ["ERR_CONNECTION_REFUSED"];
            console.log(code);
            if (networkErrorCodes.includes(code))
              toast.error("Make sure you have a proper internet connection!", {
                duration: 5000,
              });

            if (!axios.isCancel(error)) {
              rejectErr(error);
            }
          }
        };

        request();
      });

      return promise as unknown as Promise<AxiosResponse>;
    },
    [navigate, source]
  );

  return { makeRequest, ...requestState };
};

export default useRequest;
