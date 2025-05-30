import React, { useContext, useMemo } from "react";
import { Stack } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import { SelectorField, NumberField } from "../../../components";
import { GlobalContext } from "../../../context/global.context";
import type { CurrencyFieldType } from "../types";

interface Props {
  label: string;
  selectName: "from" | "to";
  selectedValue: string;
  amount: string;
  handleSetConvert: (params: {
    name: CurrencyFieldType;
    value: string;
  }) => void;
}

export const CurrencyConverter: React.FC<Props> = ({
  label,
  selectName,
  selectedValue,
  amount,
  handleSetConvert,
}) => {
  const { currenciesList, isCurrenciesListLoading } = useContext(GlobalContext);

  const options = useMemo(() => {
    return isCurrenciesListLoading
      ? []
      : currenciesList.map((currency) => ({ label: `${currency.short_code} (${currency.name})`, value: currency.short_code }));
  }, [currenciesList, isCurrenciesListLoading]);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    handleSetConvert({ name: selectName, value: event.target.value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Allow empty input for user convenience
    if (inputValue === "") {
      handleSetConvert({ name: "amount", value: "" });
      return;
    }

    const number = Number(inputValue);

    if (!isNaN(number) && number >= 0) {
      handleSetConvert({ name: "amount", value: inputValue });
    }
  };

  return (
    <Stack direction={{ xs: "column" }} spacing={4}>
      <SelectorField
        label={`${label} Currency`}
        value={selectedValue}
        handleChange={handleCurrencyChange}
        values={options}
      />

      <NumberField
        label={label}
        value={amount}
        onChange={handleNumberChange}
        disabled={selectName === "to"}
      />
    </Stack>
  );
};
