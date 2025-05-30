import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";

import { useConvertCurrencies } from "../../../hooks";
import type { CurrencyType, CurrencyFieldType } from "../types";

interface CurrencyActionsProps {
  convert: CurrencyType;
  handleSetConvert: (params: {
    name: CurrencyFieldType;
    value: string;
  }) => void;
}

export const CurrencyActions = ({
  convert,
  handleSetConvert,
}: CurrencyActionsProps) => {
  const { convertCurrencies } = useConvertCurrencies();

  const { mutate: handleConvertCurrencie, isPending } = useMutation({
    mutationFn: convertCurrencies,
    onSuccess: (data) => {
      handleSetConvert({
        name: "result",
        value: `${data.value.toFixed(2)}`,
      });
    },
  });

  const handleSubmit = useCallback(async () => {
    if (!convert.from || !convert.to || !convert.amount) {
      console.error("Please fill in all fields before converting.");
      return;
    }
    try {
      await handleConvertCurrencie({
        from: convert.from,
        to: convert.to,
        amount: convert.amount,
      });
    } catch (error) {
      // TODO: Add error handling and loading states for better user experience.
      console.error("Error converting currencies:", error);
    }
  }, [convert, convertCurrencies]);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={!convert.from || !convert.to || !convert.amount || isPending}
    >
      Convert
    </Button>
  );
};
