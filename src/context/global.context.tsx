import { createContext } from "react";
import type { ReactNode } from "react";

import { useFetchCurrencies } from "../hooks";
import type { Currencies } from "../hooks";

type ContextType = {
  currenciesList: Currencies[];
  isCurrenciesListLoading: boolean;
};

export const GlobalContext = createContext<ContextType>({
  currenciesList: [],
  isCurrenciesListLoading: false,
});

const { Provider } = GlobalContext;

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { currenciesList, isLoading: isCurrenciesListLoading } =
    useFetchCurrencies();

  const providerValue = {
    currenciesList,
    isCurrenciesListLoading,
  };

  return <Provider value={providerValue}>{children}</Provider>;
};
