import { createContext, useEffect } from "react";
import type { ReactNode, ReactElement } from "react";
import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";

export interface IApiClientContext {
  apiClient: AxiosInstance;
}

const axiosClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const ApiClientContext = createContext<IApiClientContext>({
  apiClient: undefined!,
});

/**
 * The ApiClientProvider has the intention of being used as a wrapper for the whole application
 * It will provide a unique instance of the axios client to be used across the application
 * It is the intention to use this context through the useApiClient hook
 * that will allow consumers to not care about defining the necessary endpoints depending on the environment
 */
export const ApiClientProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  useEffect(() => {
    axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        const rejectedError = AxiosError.from({
          ...error,
          isAxiosError: true,
          response: {
            ...error.response,
            data: {
              ...error.data,
            },
          },
        });

        return Promise.reject(rejectedError);
      },
    );

    return () => {
      axiosClient.interceptors.response.clear();
    };
  }, [location.pathname]);

  return (
    <ApiClientContext.Provider value={{ apiClient: axiosClient }}>
      {children}
    </ApiClientContext.Provider>
  );
};
