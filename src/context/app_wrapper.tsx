import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { ApiClientProvider } from "../features/api_client";
import { theme } from "../styles/theme";

import { GlobalContextProvider } from "./global.context";

interface AppWrapperProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {},
});

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ApiClientProvider>
          <ThemeProvider theme={theme}>
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </ThemeProvider>
        </ApiClientProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
