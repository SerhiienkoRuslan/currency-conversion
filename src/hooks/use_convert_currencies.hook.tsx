import { ApiClientService, useApiClient } from "../features";

export type ConvertCurrencyResponse = {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
  };
  result: number;
};

type ConvertInput = {
  from: string;
  to: string;
  amount: string;
};

export const useConvertCurrencies = () => {
  const currenciesClient = useApiClient(ApiClientService.CURRENCY);

  const convertCurrencies = async ({ from, to, amount }: ConvertInput): Promise<ConvertCurrencyResponse> => {
    const apiKey = import.meta.env.VITE_CURRENCYBEACON_API_KEY;

    if (!apiKey) {
      throw new Error("ApiKey is not defined in the environment variables.");
    }

    const { data } = await currenciesClient.get("v1/convert", {
      params: { from, to, amount, callback: "callback" },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return data;
  };

  return {
    convertCurrencies,
  };
};
