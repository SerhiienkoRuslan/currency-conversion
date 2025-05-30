import { useContext } from "react";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiClientContext } from "../contexts/api_client.context";
import {
  ApiClientEndpointsByService,
  ApiClientService,
} from "../constants/api_client.constants";

export interface IApiClientHook {
  (
    service: ApiClientService,
    config?: AxiosRequestConfig,
  ): {
    get: <T = any>(
      path: string,
      options?: AxiosRequestConfig,
    ) => Promise<AxiosResponse<T>>;
    post: <T = any, D = unknown>(
      path: string,
      payload?: D,
      options?: AxiosRequestConfig,
    ) => Promise<AxiosResponse<T>>;
    put: <T = any, D = unknown>(
      path: string,
      payload?: D,
      options?: AxiosRequestConfig,
    ) => Promise<AxiosResponse<T>>;
    patch: <T = any, D = unknown>(
      path: string,
      payload?: D,
      options?: AxiosRequestConfig,
    ) => Promise<AxiosResponse<T>>;
    delete: (
      path: string,
      options?: AxiosRequestConfig,
    ) => Promise<AxiosResponse>;
  };
}

/**
 * The useApiClient is a hook that works together with the ApiClientContext to provide a simple way to make requests
 * In any general case, consumers should make calls using this hook and not the context directly
 * This is to ensure that the baseURL is set correctly
 */
export const useApiClient: IApiClientHook = (
  service: ApiClientService,
  clientConfig: AxiosRequestConfig = {},
) => {
  const { apiClient } = useContext(ApiClientContext);

  const getConfig = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
    const baseURL = ApiClientEndpointsByService[service];

    return {
      ...clientConfig,
      baseURL,
      ...config,
    };
  };

  const get = <T>(path: string, config?: AxiosRequestConfig) => {
    return apiClient.get<T>(path, getConfig(config));
  };

  const post = async <T, D = unknown>(
    path: string,
    payload?: D,
    config?: AxiosRequestConfig,
  ) => {
    return await apiClient.post<T>(path, payload, getConfig(config));
  };

  const put = async <T, D = unknown>(
    path: string,
    payload?: D,
    config?: AxiosRequestConfig,
  ) => {
    return await apiClient.put<T>(path, payload, getConfig(config));
  };

  const patch = async <T, D = unknown>(
    path: string,
    payload: D,
    config?: AxiosRequestConfig,
  ) => {
    return await apiClient.patch<T>(path, payload, getConfig(config));
  };

  const deleteFn = async (path: string, config?: AxiosRequestConfig) => {
    return await apiClient.delete(path, getConfig(config));
  };

  return {
    get,
    post,
    put,
    patch,
    delete: deleteFn,
  };
};
