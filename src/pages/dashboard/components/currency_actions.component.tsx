import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";

import { useConvertCurrencies } from "../../../hooks";
import type { CurrencyType } from "../types";

interface CurrencyActionsProps {
  convert: CurrencyType;
  setConvert: React.Dispatch<React.SetStateAction<CurrencyType>>;
}

// TODO: Add error handling and loading states for better user experience.
export const CurrencyActions = ({
  convert,
  setConvert,
}: CurrencyActionsProps) => {
  const { convertCurrencies } = useConvertCurrencies();

  const { mutate: handleConvertCurrencie, isPending } = useMutation({
    mutationFn: convertCurrencies,
    onSuccess: (data) => {
      setConvert((prev: CurrencyType) => ({
        ...prev,
        result: data.result.toString(),
      }));
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
