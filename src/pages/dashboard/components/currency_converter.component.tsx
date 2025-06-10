import React, { useContext, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { z } from "zod";

import { SelectorField, NumberField } from "../../../components";
import { GlobalContext } from "../../../context/global.context";
import type { CurrencyFieldType } from "../types";

const amountSchema = z
  .string()
  .min(1, "Amount is required")
  .refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" })
  .refine((val) => Number(val) >= 0, { message: "Amount must be non-negative" });

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
  const [error, setError] = useState<string | null>(null);

  const options = useMemo(() => {
    return isCurrenciesListLoading
      ? []
      : currenciesList.map((currency) => ({
          label: `${currency.short_code} (${currency.name})`,
          value: currency.short_code,
        }));
  }, [currenciesList, isCurrenciesListLoading]);

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    handleSetConvert({ name: selectName, value: event.target.value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Allow empty input for user convenience
    if (inputValue === "") {
      setError(null);
      handleSetConvert({ name: "amount", value: "" });
      return;
    }

    const result = amountSchema.safeParse(inputValue);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
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
        hasError={!!error}
        helperText={error ?? ""}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Stack>
  );
};
