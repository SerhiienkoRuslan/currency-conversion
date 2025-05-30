import React, { useContext, useMemo } from "react";
import { Stack } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import { SelectorField, NumberField } from "../../../components";
import { GlobalContext } from "../../../context/global.context";

interface Props {
  label: string;
  selectName: "from" | "to";
  selectedValue: string;
  amount: string;
  handleSetConvert: (params: {
    name: "from" | "to" | "amount";
    value: string;
  }) => void;
}

// TODO: Add validation for amount input to ensure it is a valid number and handle edge cases like negative values or non-numeric input.
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
      : currenciesList.map((currency) => currency.name);
  }, [currenciesList, isCurrenciesListLoading]);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    handleSetConvert({ name: selectName, value: event.target.value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectName === "from") {
      handleSetConvert({ name: "amount", value: event.target.value });
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
