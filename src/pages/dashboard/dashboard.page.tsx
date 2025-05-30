import React, { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";

import { DashboardLayout, CurrencyConverter } from "./components";
import { useConvertCurrencies } from "../../hooks";

export const Dashboard: React.FC = () => {
  const { convertCurrencies } = useConvertCurrencies();
  const [convert, setConvert] = useState<{
    from: string;
    to: string;
    amount: string;
    result: string;
  }>({
    from: "",
    to: "",
    amount: "0",
    result: "0",
  });

  const { mutate: handleConvertCurrencies } = useMutation({
    mutationFn: convertCurrencies,
    onSuccess: (data) => {
      setConvert((prev) => ({
        ...prev,
        result: data.result.toString(),
      }));
    },
  });

  const handleSetConvert = ({
    name,
    value,
  }: {
    name: "from" | "to" | "amount";
    value: string;
  }) => {
    setConvert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (!convert.from || !convert.to || !convert.amount) {
      console.error("Please fill in all fields before converting.");
      return;
    }
    try {
      await handleConvertCurrencies({
        from: convert.from,
        to: convert.to,
        amount: convert.amount,
      });
    } catch (error) {
      console.error("Error converting currencies:", error);
    }
  }, [convert, convertCurrencies]);

  return (
    <DashboardLayout>
      <CurrencyConverter
        label="From"
        selectName="from"
        selectedValue={convert.from}
        amount={convert.amount}
        handleSetConvert={handleSetConvert}
      />
      <CurrencyConverter
        label="To"
        selectName="to"
        selectedValue={convert.to}
        amount={convert.result}
        handleSetConvert={handleSetConvert}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Convert
      </Button>
    </DashboardLayout>
  );
};
