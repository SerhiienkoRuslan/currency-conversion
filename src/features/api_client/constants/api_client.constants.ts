export const ApiClientService = {
  CURRENCY: "CURRENCY",
} as const;

export type ApiClientService =
  (typeof ApiClientService)[keyof typeof ApiClientService];

export const ApiClientEndpointsByService: Record<ApiClientService, string> = {
  [ApiClientService.CURRENCY]: "https://api.currencybeacon.com",
};
