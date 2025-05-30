import React, { useState } from "react";
import { DashboardLayout, CurrencyConverter, CurrencyActions } from "./components";
import type { CurrencyType } from "./types";

// TODO: Add error handling and loading states for better user experience.
// TODO: validate input values before making the conversion request.
export const Dashboard: React.FC = () => {
  const [convert, setConvert] = useState<CurrencyType>({
    from: "",
    to: "",
    amount: "0",
    result: "0",
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
      <CurrencyActions convert={convert} setConvert={setConvert} />
    </DashboardLayout>
  );
};
