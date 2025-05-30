import { useQuery } from "@tanstack/react-query";

import { ApiClientService, useApiClient } from "../features";

export type Currencies = {
  code: string;
  decimal_mark: string;
  id: number;
  name: string;
  precision: number;
  short_code: string;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  thousands_separator: string;
};

export type CurrenciesResponse = {
  response: Currencies[];
  meta: {
    code: number;
    disclaimer: string;
  };
};

export const useFetchCurrencies = () => {
  const currenciesClient = useApiClient(ApiClientService.CURRENCY);

  const fetchCurrencies = async (): Promise<CurrenciesResponse> => {
    const apiKey = import.meta.env.VITE_CURRENCYBEACON_API_KEY; // Access token from .env

    if (!apiKey) {
      throw new Error("ApiKey is not defined in the environment variables.");
    }

    const { data: response } = await currenciesClient.get("v1/currencies", {
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });

  return {
    isLoading,
    currenciesList: data?.response || [],
  };
};
